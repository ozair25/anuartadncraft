import { getAllProducts, getCollections } from "@/lib/shopify/products"
import { ShopClient } from "@/app/shop/shop-client"
import { Product, Collection } from "@/types/ecommerce"
import { getCategoryBySlug } from "@/lib/config/shop-categories"
import { Metadata } from "next"

// Revalidate every 60 seconds (Incremental Static Regeneration)
export const revalidate = 60

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolved = await params
  const config = getCategoryBySlug(resolved.category)
  const title = config ? `${config.name} | Anu Arts Shop` : "Shop Art & Craft Supplies | Anu Arts"
  const description = config?.description || "Browse curated art and craft supplies from Anu Art & Craft Studio."

  return {
    title,
    description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const [initialProducts, initialCollections] = await Promise.all([
    getAllProducts({ first: 100 }).catch(() => []),
    getCollections().catch(() => []),
  ])

  return (
    <ShopClient
      initialCategory={resolvedParams.category}
      initialProducts={initialProducts}
      initialCollections={initialCollections}
    />
  )
}
