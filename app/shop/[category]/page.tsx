import { getAllProducts, getCollections } from "@/lib/shopify/products"
import { ShopClient } from "@/app/shop/shop-client"
import { Product, Collection } from "@/types/ecommerce"
import { getCategoryBySlug } from "@/lib/config/shop-categories"
import { Metadata } from "next"

export const dynamic = "force-dynamic"

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
    console.error("CategoryPage server fetch error:", err)
  }

  return (
    <ShopClient
      initialProducts={products}
      initialCollections={collections}
      initialCategory={resolvedParams.category}
    />
  )
}
