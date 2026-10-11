import { NextRequest, NextResponse } from "next/server"
import {
  createShopifyCart,
  addLinesToShopifyCart,
  updateShopifyCartLines,
  removeShopifyCartLines,
  getShopifyCart,
} from "@/lib/shopify/cart"
import { checkRateLimit } from "@/lib/security/rate-limit"
import { CartRequestBodySchema } from "@/lib/security/schemas"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  // 1. Rate limiting check (40 requests per minute per IP)
  const rateLimit = checkRateLimit(req, "cart", 40, 60)
  const rateLimitHeaders = {
    "X-RateLimit-Limit": String(rateLimit.limit),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(rateLimit.reset),
  }

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many cart requests. Please slow down." },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders,
          "Retry-After": String(rateLimit.retryAfterSeconds || 60),
        },
      }
    )
  }

  // 2. Validate Content-Type
  const contentType = req.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Invalid Content-Type. Expected application/json." },
      { status: 415, headers: rateLimitHeaders }
    )
  }

  try {
    const rawBody = await req.json().catch(() => null)
    if (!rawBody) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400, headers: rateLimitHeaders }
      )
    }

    // 3. Strict schema validation
    const parsed = CartRequestBodySchema.safeParse(rawBody)
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Invalid cart request payload"
      return NextResponse.json(
        { error: errorMsg },
        { status: 400, headers: rateLimitHeaders }
      )
    }

    const { action, cartId, lines, lineIds } = parsed.data

    const addLines = (lines || [])
      .filter((l): l is { merchandiseId: string; quantity: number } => "merchandiseId" in l && typeof (l as any).merchandiseId === "string")
      .map((l) => ({ merchandiseId: l.merchandiseId, quantity: l.quantity }))

    const updateLines = (lines || [])
      .filter((l): l is { id: string; quantity: number } => "id" in l && typeof (l as any).id === "string")
      .map((l) => ({ id: l.id, quantity: l.quantity }))

    switch (action) {
      case "create": {
        const result = await createShopifyCart(addLines.length > 0 ? addLines : undefined)
        if (result.error && !result.cart) {
          return NextResponse.json(
            { error: result.error, userErrors: result.userErrors, cart: null },
            { status: 400, headers: rateLimitHeaders }
          )
        }
        return NextResponse.json({ cart: result.cart }, { headers: rateLimitHeaders })
      }

      case "add": {
        if (!cartId) {
          const result = await createShopifyCart(addLines)
          if (result.error && !result.cart) {
            return NextResponse.json(
              { error: result.error, userErrors: result.userErrors, cart: null },
              { status: 400, headers: rateLimitHeaders }
            )
          }
          return NextResponse.json({ cart: result.cart }, { headers: rateLimitHeaders })
        }

        let result = await addLinesToShopifyCart(cartId, addLines)

        // If the existing cart was deleted or expired, fallback seamlessly to creating a new cart
        if (
          !result.cart &&
          (result.error?.toLowerCase().includes("does not exist") ||
            result.error?.toLowerCase().includes("not found") ||
            result.error?.toLowerCase().includes("expired"))
        ) {
          result = await createShopifyCart(addLines)
        }

        if (result.error && !result.cart) {
          return NextResponse.json(
            { error: result.error, userErrors: result.userErrors, cart: null },
            { status: 400, headers: rateLimitHeaders }
          )
        }
        return NextResponse.json({ cart: result.cart }, { headers: rateLimitHeaders })
      }

      case "update": {
        if (!cartId) {
          return NextResponse.json(
            { error: "Missing cartId" },
            { status: 400, headers: rateLimitHeaders }
          )
        }
        const result = await updateShopifyCartLines(cartId, updateLines)
        if (result.error && !result.cart) {
          return NextResponse.json(
            { error: result.error, userErrors: result.userErrors, cart: null },
            { status: 400, headers: rateLimitHeaders }
          )
        }
        return NextResponse.json({ cart: result.cart }, { headers: rateLimitHeaders })
      }

      case "remove": {
        if (!cartId) {
          return NextResponse.json(
            { error: "Missing cartId" },
            { status: 400, headers: rateLimitHeaders }
          )
        }
        const result = await removeShopifyCartLines(cartId, lineIds || [])
        if (result.error && !result.cart) {
          return NextResponse.json(
            { error: result.error, userErrors: result.userErrors, cart: null },
            { status: 400, headers: rateLimitHeaders }
          )
        }
        return NextResponse.json({ cart: result.cart }, { headers: rateLimitHeaders })
      }

      case "get": {
        if (!cartId) {
          return NextResponse.json(
            { error: "Missing cartId" },
            { status: 400, headers: rateLimitHeaders }
          )
        }
        const result = await getShopifyCart(cartId)
        return NextResponse.json(
          { cart: result.cart, error: result.error },
          { headers: rateLimitHeaders }
        )
      }

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400, headers: rateLimitHeaders }
        )
    }
  } catch (error) {
    console.error("Shopify Cart API error:", error instanceof Error ? error.message : "Cart processing failure")
    return NextResponse.json(
      { error: "Unable to process cart operation" },
      { status: 500, headers: rateLimitHeaders }
    )
  }
}
