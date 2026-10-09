import { cache } from "react"
import { Product, Collection } from "@/types/ecommerce"
import { shopifyFetch, getShopifyConfig } from "./client"
import {
  GET_ALL_PRODUCTS_QUERY,
  GET_ALL_PRODUCTS_PAGINATED_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
  GET_COLLECTIONS_QUERY,
} from "./queries"
import {
  normalizeShopifyProduct,
  normalizeShopifyCollection,
  ShopifyProductNode,
  ShopifyCollectionNode,
} from "./normalizers"

// In-memory catalog cache for high performance & instant responses across all 16 categories
let cachedCatalog: {
  products: Product[]
  timestamp: number
} | null = null

const CATALOG_CACHE_TTL = 30 * 60 * 1000 // 30 minutes cache
let isRefreshingCatalog = false

async function refreshFullCatalogInBackground() {
  if (isRefreshingCatalog) return
  isRefreshingCatalog = true
  try {
    const allProducts: Product[] = []
    let cursor: string | null = null
    let hasNextPage = true
    let safetyLimit = 15

    while (hasNextPage && safetyLimit > 0) {
      safetyLimit--
      const response = await shopifyFetch<{
        products: {
          pageInfo: {
            hasNextPage: boolean
            endCursor: string | null
          }
          edges: Array<{
            node: ShopifyProductNode
          }>
        }
      }>({
        query: GET_ALL_PRODUCTS_PAGINATED_QUERY,
        variables: {
          first: 250,
          cursor,
        },
        revalidate: 180,
      })

      if (response.errors && response.errors.length > 0) break

      const edges = response.data?.products?.edges || []
      for (const edge of edges) {
        allProducts.push(normalizeShopifyProduct(edge.node))
      }

      hasNextPage = response.data?.products?.pageInfo?.hasNextPage ?? false
      cursor = response.data?.products?.pageInfo?.endCursor ?? null
    }

    if (allProducts.length > 0) {
      cachedCatalog = {
        products: allProducts,
        timestamp: Date.now(),
      }
    }
  } catch (err) {
    console.error("Background catalog refresh failed:", err)
  } finally {
    isRefreshingCatalog = false
  }
}

/**
 * Fetch all products from Shopify Storefront API with complete pagination.
 * Shopify is the single source of truth for product catalog data.
 */
export const getAllProducts = cache(async (options?: {
  query?: string
  first?: number
  fetchAll?: boolean
}): Promise<Product[]> => {
  const config = getShopifyConfig()
  if (!config.isConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Shopify access token is not configured. Returning empty product list.")
    }
    return []
  }

  // If a search query is passed or small slice is requested specifically
  if (options?.query || (options?.first && !options?.fetchAll && options.first <= 100)) {
    const response = await shopifyFetch<{
      products: {
        edges: Array<{
          node: ShopifyProductNode
        }>
      }
    }>({
      query: GET_ALL_PRODUCTS_QUERY,
      variables: {
        first: options?.first || 100,
        query: options?.query,
      },
      revalidate: 60,
    })

    if (response.errors && response.errors.length > 0) {
      const errorMsg = response.errors.map((e) => e.message).join("; ")
      console.error("Shopify GraphQL errors:", errorMsg)
      throw new Error(`Shopify API Error: ${errorMsg}`)
    }

    if (response.data?.products?.edges) {
      return response.data.products.edges.map((edge) =>
        normalizeShopifyProduct(edge.node)
      )
    }

    return []
  }

  // Return cached full catalog if available (stale-while-revalidate)
  if (cachedCatalog) {
    const age = Date.now() - cachedCatalog.timestamp
    if (age > CATALOG_CACHE_TTL) {
      refreshFullCatalogInBackground()
    }
    return cachedCatalog.products
  }

  // Fast first page fetch to immediately populate catalog without blocking 15 serial roundtrips
  const firstPageResponse = await shopifyFetch<{
    products: {
      pageInfo: {
        hasNextPage: boolean
        endCursor: string | null
      }
      edges: Array<{
        node: ShopifyProductNode
      }>
    }
  }>({
    query: GET_ALL_PRODUCTS_PAGINATED_QUERY,
    variables: {
      first: 250,
      cursor: null,
    },
    revalidate: 180,
  })

  const firstPageEdges = firstPageResponse.data?.products?.edges || []
  const initialProducts = firstPageEdges.map((edge) => normalizeShopifyProduct(edge.node))

  if (initialProducts.length > 0) {
    cachedCatalog = {
      products: initialProducts,
      timestamp: Date.now(),
    }

    // If there are more pages, background-populate the rest
    if (firstPageResponse.data?.products?.pageInfo?.hasNextPage) {
      refreshFullCatalogInBackground()
    }

    return initialProducts
  }

  return []
})

/**
 * Fetch a single product by handle/slug from Shopify.
 * Wrapped with React cache() to deduplicate metadata & page server component requests.
 */
export const getProductByHandle = cache(async (handle: string): Promise<Product | undefined> => {
  const config = getShopifyConfig()

  if (!config.isConfigured) {
    return undefined
  }

  const response = await shopifyFetch<{
    product: ShopifyProductNode | null
  }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    revalidate: 60,
  })

  if (response.errors && response.errors.length > 0) {
    const errorMsg = response.errors.map((e) => e.message).join("; ")
    console.error(`Shopify getProductByHandle error for '${handle}':`, errorMsg)
    throw new Error(`Shopify API Error: ${errorMsg}`)
  }

  if (response.data?.product) {
    return normalizeShopifyProduct(response.data.product)
  }

  // Product not found in Shopify
  return undefined
})

/**
 * Fetch products in a collection by handle.
 * Wrapped with React cache() for per-render deduplication.
 */
export const getProductsByCollection = cache(async (
  collectionHandle: string,
  first = 50
): Promise<Product[]> => {
  const config = getShopifyConfig()

  if (!config.isConfigured) {
    return []
  }

  const response = await shopifyFetch<{
    collection: {
      products: {
        edges: Array<{
          node: ShopifyProductNode
        }>
      }
    } | null
  }>({
    query: GET_COLLECTION_PRODUCTS_QUERY,
    variables: {
      handle: collectionHandle,
      first,
    },
    revalidate: 60,
  })

  if (response.errors && response.errors.length > 0) {
    const errorMsg = response.errors.map((e) => e.message).join("; ")
    console.error(`Shopify getProductsByCollection error for '${collectionHandle}':`, errorMsg)
    throw new Error(`Shopify API Error: ${errorMsg}`)
  }

  if (response.data?.collection?.products?.edges) {
    return response.data.collection.products.edges.map((e) =>
      normalizeShopifyProduct(e.node)
    )
  }

  return []
})

/**
 * Fetch collections from Shopify.
 * Wrapped with React cache() for per-render deduplication.
 */
export const getCollections = cache(async (first = 100): Promise<Collection[]> => {
  const config = getShopifyConfig()

  if (!config.isConfigured) {
    return []
  }

  try {
    const response = await shopifyFetch<{
      collections: {
        edges: Array<{
          node: ShopifyCollectionNode
        }>
      }
    }>({
      query: GET_COLLECTIONS_QUERY,
      variables: { first },
      revalidate: 300,
    })

    if (
      response.data?.collections?.edges &&
      response.data.collections.edges.length > 0
    ) {
      return response.data.collections.edges.map((e) =>
        normalizeShopifyCollection(e.node)
      )
    }
  } catch (error) {
    console.error("Failed to fetch collections from Shopify:", error)
  }

  return []
})
