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

// In-memory catalog cache for high performance & instant responses across all categories
let cachedCatalog: {
  products: Product[]
  timestamp: number
} | null = null

const CATALOG_CACHE_TTL = 15 * 60 * 1000 // 15 minutes cache
let activeFetchPromise: Promise<Product[]> | null = null

/**
 * Fetch all products from Shopify Storefront API with full cursor-based pagination.
 * Fetches all pages until hasNextPage is false.
 */
async function fetchAllProductsFromShopify(query?: string): Promise<Product[]> {
  const allProducts: Product[] = []
  let cursor: string | null = null
  let hasNextPage = true
  let page = 0
  const maxPages = 40 // supports up to 4000 products

  while (hasNextPage && page < maxPages) {
    page++
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
        first: 100,
        cursor,
        query: query || undefined,
      },
      revalidate: 180,
    })

    if (response.errors && response.errors.length > 0) {
      const errorMsg = response.errors.map((e) => e.message).join("; ")
      console.error(`[Shopify Pagination] Error on page ${page}:`, errorMsg)
      break
    }

    const edges = response.data?.products?.edges || []
    if (edges.length === 0) break

    for (const edge of edges) {
      allProducts.push(normalizeShopifyProduct(edge.node))
    }

    hasNextPage = Boolean(response.data?.products?.pageInfo?.hasNextPage)
    cursor = response.data?.products?.pageInfo?.endCursor || null
    console.log(
      `[Shopify Catalog] Page ${page}: retrieved ${edges.length} products (cumulative: ${allProducts.length}, hasNextPage: ${hasNextPage})`
    )
  }

  return allProducts
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

  // If a specific search query is provided, query directly
  if (options?.query) {
    const products = await fetchAllProductsFromShopify(options.query)
    if (options.first && options.first > 0 && !options.fetchAll) {
      return products.slice(0, options.first)
    }
    return products
  }

  // Check valid in-memory cache
  if (cachedCatalog) {
    const age = Date.now() - cachedCatalog.timestamp
    if (age < CATALOG_CACHE_TTL && cachedCatalog.products.length > 0) {
      if (options?.first && options.first > 0 && !options.fetchAll) {
        return cachedCatalog.products.slice(0, options.first)
      }
      return cachedCatalog.products
    }
  }

  // Deduplicate concurrent fetch requests using a shared promise
  if (!activeFetchPromise) {
    activeFetchPromise = fetchAllProductsFromShopify().then((products) => {
      if (products.length > 0) {
        cachedCatalog = {
          products,
          timestamp: Date.now(),
        }
      }
      return products
    }).finally(() => {
      activeFetchPromise = null
    })
  }

  const allProducts = await activeFetchPromise

  if (options?.first && options.first > 0 && !options.fetchAll) {
    return allProducts.slice(0, options.first)
  }

  return allProducts
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
