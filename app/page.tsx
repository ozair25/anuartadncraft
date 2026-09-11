import { getAllProducts } from "@/lib/shopify/products"
import { HomePageClient } from "@/components/home-page-client"
import { Product } from "@/types/ecommerce"

export const dynamic = "force-dynamic"

export default async function Page() {
  let products: Product[] = []
  try {
    products = await getAllProducts()
  } catch (err) {
    console.error("Homepage server products fetch error:", err)
  }

  return <HomePageClient initialProducts={products} />
}

