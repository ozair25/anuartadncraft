import { NextRequest, NextResponse } from "next/server"
import { searchShopifyProducts } from "@/lib/shopify/products"
import { checkRateLimit } from "@/lib/security/rate-limit"
import { sanitizeSearchQuery } from "@/lib/security/schemas"

export const dynamic = "force-dynamic"

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
}

export async function GET(req: NextRequest) {
  // 1. Rate limiting check (60 search queries per minute per IP)
  const rateLimit = checkRateLimit(req, "search", 60, 60)
  const rateLimitHeaders = {
    ...CACHE_HEADERS,
    "X-RateLimit-Limit": String(rateLimit.limit),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(rateLimit.reset),
  }

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many search requests. Please slow down.", products: [], totalCount: 0 },
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
    const rawQuery = searchParams.get("q") || searchParams.get("query") || ""
    const query = sanitizeSearchQuery(rawQuery)

    const rawLimit = Number(searchParams.get("limit") || searchParams.get("first")) || 10
    const limit = Math.min(Math.max(isNaN(rawLimit) ? 10 : rawLimit, 1), 50)

    const rawCursor = searchParams.get("cursor")
    const cursor = rawCursor && rawCursor.length <= 250 ? rawCursor : null

    if (!query) {
      return NextResponse.json(
        { products: [], totalCount: 0, pageInfo: { hasNextPage: false, endCursor: null } },
        { headers: rateLimitHeaders }
      )
    }

    const result = await searchShopifyProducts({
      query,
      first: limit,
      cursor,
    })

    return NextResponse.json(
      {
        products: result.products,
        totalCount: result.totalCount,
        pageInfo: result.pageInfo,
      },
      { headers: rateLimitHeaders }
    )
  } catch (error) {
    console.error(
      "[Shopify Search API] Error:",
      error instanceof Error ? error.message : "Search error"
    )
    return NextResponse.json(
      { error: "Search failed. Please try again.", products: [], totalCount: 0 },
      { status: 500, headers: rateLimitHeaders }
    )
  }
}
