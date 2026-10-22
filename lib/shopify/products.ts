import { cache } from "react"
import { Product, Collection } from "@/types/ecommerce"
import { shopifyFetch, getShopifyConfig, ShopifyResponse } from "./client"
import {
  GET_ALL_PRODUCTS_QUERY,
  GET_ALL_PRODUCTS_PAGINATED_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
  GET_COLLECTIONS_QUERY,
  SEARCH_PRODUCTS_QUERY,
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
    const response: ShopifyResponse<{
      products: {
        pageInfo: {
          hasNextPage: boolean
          endCursor: string | null
        }
        edges: Array<{
          node: ShopifyProductNode
        }>
      }
    }> = await shopifyFetch<{
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
      revalidate: 3600,
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

export interface SearchProductsOptions {
  query: string
  first?: number
  cursor?: string | null
}

export interface SearchProductsResult {
  products: Product[]
  totalCount: number
  pageInfo: {
    hasNextPage: boolean
    endCursor: string | null
  }
}

/**
 * Builds an optimized Shopify search query string for the Storefront API search() root field.
 * Formats partial words, terms, and handles single-letter or multi-word inputs gracefully.
 */
function buildShopifySearchQuery(input: string): string {
  const sanitized = input
    .replace(/["'\\()]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  if (!sanitized) return ""

  const terms = sanitized.split(" ").filter(Boolean)
  const wildcardTerms = terms.map((term) =>
    term.endsWith("*") ? term : `${term}*`
  )

  return wildcardTerms.join(" ")
}

/**
 * Ranks search results by relevance to ensure direct name matches and keyword matches appear first.
 */
function rankSearchResults(products: Product[], rawQuery: string): Product[] {
  const queryLower = rawQuery.trim().toLowerCase()
  if (!queryLower) return products

  const tokens = queryLower.split(/\s+/).filter(Boolean)

  return [...products].sort((a, b) => {
    const scoreA = computeRelevanceScore(a, queryLower, tokens)
    const scoreB = computeRelevanceScore(b, queryLower, tokens)
    return scoreB - scoreA
  })
}

function computeRelevanceScore(product: Product, queryLower: string, tokens: string[]): number {
  let score = 0
  const title = (product.name || "").toLowerCase()
  const category = (product.category || "").toLowerCase()
  const desc = (product.shortDescription || product.description || "").toLowerCase()

  // 1. Full title match
  if (title === queryLower) {
    score += 300
  } else if (title.startsWith(queryLower)) {
    score += 200
  } else if (title.includes(` ${queryLower}`) || title.includes(`-${queryLower}`)) {
    score += 150
  } else if (title.includes(queryLower)) {
    score += 100
  }

  // 2. Individual token matches in title
  for (const token of tokens) {
    if (token.length > 0) {
      if (title.startsWith(token)) {
        score += 80
      } else if (title.includes(` ${token}`) || title.includes(`-${token}`)) {
        score += 60
      } else if (title.includes(token)) {
        score += 40
      }

      if (category.includes(token)) {
        score += 25
      }

      if (desc.includes(token)) {
        score += 5
      }
    }
  }

  // Available in stock bonus
  if (product.inStock || product.stock > 0) {
    score += 2
  }

  return score
}

/**
 * Searches the entire eligible Shopify Storefront catalog using Shopify's native search capabilities.
 * Supports partial matching, prefix wildcards, and relevance ranking across ~2500 products.
 */
export const searchShopifyProducts = cache(
  async (options: SearchProductsOptions): Promise<SearchProductsResult> => {
    const config = getShopifyConfig()
    const emptyResult: SearchProductsResult = {
      products: [],
      totalCount: 0,
      pageInfo: { hasNextPage: false, endCursor: null },
    }

    if (!config.isConfigured) {
      return emptyResult
    }

    const rawQuery = (options.query || "").trim()
    if (!rawQuery) {
      return emptyResult
    }

    const shopifyQuery = buildShopifySearchQuery(rawQuery)
    const limit = Math.min(Math.max(options.first || 24, 1), 100)

    try {
      const response: ShopifyResponse<{
        search: {
          totalCount: number
          pageInfo: {
            hasNextPage: boolean
            endCursor: string | null
          }
          edges: Array<{
            node: ShopifyProductNode
          }>
        }
      }> = await shopifyFetch<{
        search: {
          totalCount: number
          pageInfo: {
            hasNextPage: boolean
            endCursor: string | null
          }
          edges: Array<{
            node: ShopifyProductNode
          }>
        }
      }>({
        query: SEARCH_PRODUCTS_QUERY,
        variables: {
          query: shopifyQuery,
          first: limit,
          cursor: options.cursor || undefined,
        },
        revalidate: 3600,
      })

      if (response.errors && response.errors.length > 0) {
        console.error(
          "[Shopify Search] Storefront API error:",
          response.errors.map((e) => e.message).join("; ")
        )
      }

      const edges = response.data?.search?.edges || []
      const rawProducts = edges
        .map((edge) => normalizeShopifyProduct(edge.node))
        .filter((p) => Boolean(p.id && p.name))

      const rankedProducts = rankSearchResults(rawProducts, rawQuery)

      return {
        products: rankedProducts,
        totalCount: response.data?.search?.totalCount || rankedProducts.length,
        pageInfo: {
          hasNextPage: Boolean(response.data?.search?.pageInfo?.hasNextPage),
          endCursor: response.data?.search?.pageInfo?.endCursor || null,
        },
      }
    } catch (err) {
      console.error("[Shopify Search] Exception during search:", err)
      return emptyResult
    }
  }
)

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

  // If a search query is provided, use native Shopify search directly
  if (options?.query) {
    const searchResult = await searchShopifyProducts({
      query: options.query,
      first: options.first || 48,
    })
    return searchResult.products
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
    revalidate: 3600,
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
    revalidate: 3600,
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
      revalidate: 3600,
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
