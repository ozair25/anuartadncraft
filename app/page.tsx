import { getAllProducts } from "@/lib/shopify/products"
import { HomePageClient } from "@/components/home-page-client"
import { Product } from "@/types/ecommerce"

// Revalidate homepage every 60 seconds (Incremental Static Regeneration)
// Ensures instant sub-50ms TTFB while maintaining fresh Shopify catalog
export const revalidate = 60

export default async function Page() {
  let products: Product[] = []
  try {
    products = await getAllProducts({ first: 48 })
  } catch (err) {
    console.error("Homepage server products fetch error:", err)
  }

  return <HomePageClient initialProducts={products} />
}

