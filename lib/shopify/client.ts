/**
 * Shopify Storefront API GraphQL Client
 * Single source of truth for connecting to Shopify Storefront API.
 */

export interface ShopifyFetchOptions<TVariables = Record<string, unknown>> {
  query: string
  variables?: TVariables
  cache?: RequestCache
  revalidate?: number
}

export interface ShopifyResponse<TData> {
  data?: TData
  errors?: Array<{ message: string; locations?: unknown; path?: unknown }>
}

export function getShopifyConfig() {
  const rawDomain =
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    "e08d97-2b.myshopify.com"

  const domain = rawDomain.replace(/^https?:\/\//, "").replace(/\/$/, "")
  const accessToken =
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    ""
  const apiVersion =
    process.env.SHOPIFY_API_VERSION ||
    process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ||
    "2026-04"

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`
  const isConfigured = Boolean(accessToken && accessToken.trim().length > 0)

  return {
    domain,
    accessToken,
    apiVersion,
    endpoint,
    isConfigured,
  }
}

export async function shopifyFetch<TData, TVariables = Record<string, unknown>>({
  query,
  variables,
  cache = "no-store",
  revalidate,
}: ShopifyFetchOptions<TVariables>): Promise<ShopifyResponse<TData>> {
  const config = getShopifyConfig()

  if (!config.isConfigured) {
    return {
      errors: [
        {
          message:
            "Shopify Storefront Access Token is not configured. Please set SHOPIFY_STOREFRONT_ACCESS_TOKEN in your environment.",
        },
      ],
    }
  }

  try {
    const nextOptions = revalidate !== undefined ? { next: { revalidate } } : {}
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Storefront-Access-Token": config.accessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      ...nextOptions,
    })

    if (!response.ok) {
      const errorText = await response.text()
      return {
        errors: [
          {
            message: `Shopify HTTP error ${response.status}: ${errorText}`,
          },
        ],
      }
    }

    const json = (await response.json()) as ShopifyResponse<TData>
    return json
  } catch (error) {
    return {
      errors: [
        {
          message:
            error instanceof Error ? error.message : "Unknown error occurred during Shopify fetch",
        },
      ],
    }
  }
}
