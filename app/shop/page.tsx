import { getAllProducts, getCollections } from "@/lib/shopify/products"
import { ShopClient } from "@/app/shop/shop-client"
import { Product, Collection } from "@/types/ecommerce"

export const dynamic = "force-dynamic"

export default async function ShopPage() {
  let products: Product[] = []
  let collections: Collection[] = []
  try {
    const [prodsRes, colsRes] = await Promise.all([
      getAllProducts(),
      getCollections(100),
    ])
    products = prodsRes
    collections = colsRes
  } catch (err) {
    console.error("ShopPage server fetch error:", err)
  }

  return (
    <ShopClient
      initialProducts={products}
      initialCollections={collections}
    />
  )
}
