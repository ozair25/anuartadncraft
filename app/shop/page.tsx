import { ShopClient } from "@/app/shop/shop-client"
import { getAllProducts, getCollections } from "@/lib/shopify/products"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Art & Craft Supplies | Anu Arts Studio",
  description: "Browse premium craft supplies, tools, resin art, MDF bases, paints, and DIY kits from Anu Art & Craft Studio.",
}

export const dynamic = "force-dynamic"

export default async function ShopPage() {
  const [initialProducts, initialCollections] = await Promise.all([
    getAllProducts().catch(() => []),
    getCollections().catch(() => []),
  ])

  return (
    <ShopClient
      initialProducts={initialProducts}
      initialCollections={initialCollections}
    />
  )
}
