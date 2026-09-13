import { Product, Collection } from "@/types/ecommerce"
import { shopifyFetch, getShopifyConfig } from "./client"
import {
  GET_ALL_PRODUCTS_QUERY,
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

/**
 * Fetch all products from Shopify Storefront API.
 * Shopify is the single source of truth for product catalog data.
 */
export async function getAllProducts(options?: {
  query?: string
  first?: number
}): Promise<Product[]> {
  const config = getShopifyConfig()
  if (!config.isConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Shopify access token is not configured. Returning empty product list.")
    }
    return []
  }

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
    revalidate: 60, // Cache for 60 seconds
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

/**
 * Fetch a single product by handle/slug from Shopify.
 */
export async function getProductByHandle(handle: string): Promise<Product | undefined> {
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
}

/**
 * Fetch products in a collection by handle.
 */
export async function getProductsByCollection(
  collectionHandle: string,
  first = 50
): Promise<Product[]> {
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
}

/**
 * Fetch collections from Shopify.
 */
export async function getCollections(first = 20): Promise<Collection[]> {
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
}
