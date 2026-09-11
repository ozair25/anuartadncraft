import { NextRequest, NextResponse } from "next/server"
import {
  getAllProducts,
  getProductByHandle,
  getProductsByCollection,
  getCollections,
} from "@/lib/shopify/products"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const handle = searchParams.get("handle")
    const collection = searchParams.get("collection")
    const query = searchParams.get("query")
    const fetchCollections = searchParams.get("collections")

    if (fetchCollections) {
      const collections = await getCollections()
      return NextResponse.json({ collections })
    }

    if (handle) {
      const product = await getProductByHandle(handle)
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }
      return NextResponse.json({ product })
    }

    if (collection) {
      const products = await getProductsByCollection(collection)
      return NextResponse.json({ products })
    }

    const products = await getAllProducts({ query: query || undefined })
    return NextResponse.json({ products })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products"
    console.error("Shopify Products API error:", error)
    return NextResponse.json(
      { error: message, details: String(error) },
      { status: 500 }
    )
  }
}
