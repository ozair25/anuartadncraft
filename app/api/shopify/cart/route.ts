import { NextRequest, NextResponse } from "next/server"
import {
  createShopifyCart,
  addLinesToShopifyCart,
  updateShopifyCartLines,
  removeShopifyCartLines,
  getShopifyCart,
} from "@/lib/shopify/cart"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action, cartId, lines, lineIds } = body

    switch (action) {
      case "create": {
        const result = await createShopifyCart(lines)
        if (result.error && !result.cart) {
          return NextResponse.json(
            { error: result.error, userErrors: result.userErrors, cart: null },
            { status: 400 }
          )
        }
        return NextResponse.json({ cart: result.cart })
      }
      case "add": {
        if (!cartId) {
          const result = await createShopifyCart(lines)
          if (result.error && !result.cart) {
            return NextResponse.json(
              { error: result.error, userErrors: result.userErrors, cart: null },
              { status: 400 }
            )
          }
          return NextResponse.json({ cart: result.cart })
        }

        let result = await addLinesToShopifyCart(cartId, lines)

        // If the existing cart was deleted or expired, fallback seamlessly to creating a new cart with lines
        if (
          !result.cart &&
          (result.error?.toLowerCase().includes("does not exist") ||
            result.error?.toLowerCase().includes("not found") ||
            result.error?.toLowerCase().includes("expired"))
        ) {
          console.warn(
            `[Shopify Cart API] Cart ${cartId} expired or not found. Creating a fresh cart.`
          )
          result = await createShopifyCart(lines)
        }

        if (result.error && !result.cart) {
          return NextResponse.json(
            { error: result.error, userErrors: result.userErrors, cart: null },
            { status: 400 }
          )
        }
        return NextResponse.json({ cart: result.cart })
      }
      case "update": {
        if (!cartId) {
          return NextResponse.json({ error: "Missing cartId" }, { status: 400 })
        }
        const result = await updateShopifyCartLines(cartId, lines)
        if (result.error && !result.cart) {
          return NextResponse.json(
            { error: result.error, userErrors: result.userErrors, cart: null },
            { status: 400 }
          )
        }
        return NextResponse.json({ cart: result.cart })
      }
      case "remove": {
        if (!cartId) {
          return NextResponse.json({ error: "Missing cartId" }, { status: 400 })
        }
        const result = await removeShopifyCartLines(cartId, lineIds)
        if (result.error && !result.cart) {
          return NextResponse.json(
            { error: result.error, userErrors: result.userErrors, cart: null },
            { status: 400 }
          )
        }
        return NextResponse.json({ cart: result.cart })
      }
      case "get": {
        if (!cartId) {
          return NextResponse.json({ error: "Missing cartId" }, { status: 400 })
        }
        const result = await getShopifyCart(cartId)
        return NextResponse.json({ cart: result.cart, error: result.error })
      }
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Failed to process cart operation"
    console.error("Shopify Cart API error:", error)
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    )
  }
}
