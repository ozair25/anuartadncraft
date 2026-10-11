import { NextRequest, NextResponse } from "next/server"
import {
  getAllProducts,
  getProductByHandle,
  getProductsByCollection,
  getCollections,
  searchShopifyProducts,
} from "@/lib/shopify/products"
import { checkRateLimit } from "@/lib/security/rate-limit"
import { sanitizeSearchQuery } from "@/lib/security/schemas"

export const dynamic = "force-dynamic"

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
}

export async function GET(req: NextRequest) {
  // 1. Rate limiting check (100 product requests per minute per IP)
  const rateLimit = checkRateLimit(req, "products", 100, 60)
  const rateLimitHeaders = {
    ...CACHE_HEADERS,
    "X-RateLimit-Limit": String(rateLimit.limit),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(rateLimit.reset),
  }

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many product requests. Please slow down." },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders,
          "Retry-After": String(rateLimit.retryAfterSeconds || 60),
        },
      }
    )
  }

  try {
    const { searchParams } = new URL(req.url)
    const rawHandle = searchParams.get("handle")
    const rawCollection = searchParams.get("collection")
    const rawQuery = searchParams.get("query")
    const fetchCollections = searchParams.get("collections")

    // Handle collections list request
    if (fetchCollections) {
      const collections = await getCollections()
      return NextResponse.json({ collections }, { headers: rateLimitHeaders })
    }

    // Handle single product by handle
    if (rawHandle) {
      const handle = rawHandle.slice(0, 150).trim()
      const product = await getProductByHandle(handle)
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404, headers: rateLimitHeaders }
        )
      }
      return NextResponse.json({ product }, { headers: rateLimitHeaders })
    }

    // Handle products in collection
    if (rawCollection) {
      const collection = rawCollection.slice(0, 150).trim()
      const products = await getProductsByCollection(collection)
      return NextResponse.json({ products }, { headers: rateLimitHeaders })
    }

    // Handle search query
    if (rawQuery) {
      const query = sanitizeSearchQuery(rawQuery)
      const rawLimit = Number(searchParams.get("first") || searchParams.get("limit")) || 36
      const limit = Math.min(Math.max(isNaN(rawLimit) ? 36 : rawLimit, 1), 60)
      const rawCursor = searchParams.get("cursor")
      const cursor = rawCursor && rawCursor.length <= 250 ? rawCursor : null

      const searchResult = await searchShopifyProducts({
        query,
        first: limit,
        cursor,
      })

      return NextResponse.json(
        {
          products: searchResult.products,
          totalCount: searchResult.totalCount,
          pageInfo: searchResult.pageInfo,
        },
        { headers: rateLimitHeaders }
      )
    }

    // Default: fetch all products
    const products = await getAllProducts({ fetchAll: true })
    return NextResponse.json({ products }, { headers: rateLimitHeaders })
  } catch (error) {
    console.error(
      "Shopify Products API error:",
      error instanceof Error ? error.message : "Internal error"
    )
    return NextResponse.json(
      { error: "Unable to retrieve products at this time" },
      { status: 500, headers: rateLimitHeaders }
    )
  }
}
