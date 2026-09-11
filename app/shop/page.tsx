import { getAllProducts } from "@/lib/shopify/products"
import { ShopClient } from "@/app/shop/shop-client"
import { Product } from "@/types/ecommerce"

export const dynamic = "force-dynamic"

export default async function ShopPage() {
  let products: Product[] = []
  try {
    products = await getAllProducts()
  } catch (err) {
    console.error("ShopPage server fetch error:", err)
  }

  return <ShopClient initialProducts={products} />
}
