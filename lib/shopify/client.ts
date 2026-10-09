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
  // Ensure server-side environment variables from AI Studio / container runtime are loaded
  if (typeof window === "undefined") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("fs")
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require("path")

      // 1. Check AI Studio container runtime environment file
      if (!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
        const devEnvPath = "/app/.dev.env.json"
        if (fs.existsSync(devEnvPath)) {
          const raw = fs.readFileSync(devEnvPath, "utf-8")
          const envJson = JSON.parse(raw)
          for (const [k, v] of Object.entries(envJson)) {
            if (!process.env[k] && typeof v === "string") {
              process.env[k] = v
            }
          }
        }
      }

      // 2. Check local environment file as fallback
      if (!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
        const envLocalPath = path.resolve(process.cwd(), ".env.local")
        if (fs.existsSync(envLocalPath)) {
          const lines = fs.readFileSync(envLocalPath, "utf-8").split("\n")
          for (const line of lines) {
            const trimmed = line.trim()
            if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
              const [key, ...vals] = trimmed.split("=")
              const k = key.trim()
              const v = vals.join("=").trim().replace(/^["']|["']$/g, "")
              if (!process.env[k]) {
                process.env[k] = v
              }
            }
          }
        }
      }
    } catch {
      // Safely ignore file access issues
    }
  }

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
    const fetchInit: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Storefront-Access-Token": config.accessToken,
      },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(8000),
    }

    if (revalidate !== undefined) {
      // @ts-expect-error Next.js extended RequestInit
      fetchInit.next = { revalidate }
    } else if (cache) {
      fetchInit.cache = cache
    }

    const response = await fetch(config.endpoint, fetchInit)

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
