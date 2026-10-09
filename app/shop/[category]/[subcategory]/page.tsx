import { getAllProducts, getCollections } from "@/lib/shopify/products"
import { ShopClient } from "@/app/shop/shop-client"
import { Product, Collection } from "@/types/ecommerce"
import { getCategoryBySlug } from "@/lib/config/shop-categories"
import { Metadata } from "next"

// Revalidate every 60 seconds (Incremental Static Regeneration)
export const revalidate = 60

interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const resolved = await params
  const config = getCategoryBySlug(resolved.category)
  const sub = config?.subcategories.find(
    (s) =>
      s.slug.toLowerCase() === resolved.subcategory.toLowerCase() ||
      s.id.toLowerCase() === resolved.subcategory.toLowerCase()
  )

  const catTitle = config ? config.name : "Shop"
  const subTitle = sub ? sub.name : resolved.subcategory
  const title = `${subTitle} - ${catTitle} | Anu Arts Studio`
  const description =
    sub?.description ||
    config?.description ||
    "Browse premium craft supplies, tools, and materials at Anu Arts Studio."

  return {
    title,
    description,
  }
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const resolvedParams = await params
  const [initialProducts, initialCollections] = await Promise.all([
    getAllProducts({ first: 100 }).catch(() => []),
    getCollections().catch(() => []),
  ])

  return (
    <ShopClient
      initialCategory={resolvedParams.category}
      initialSubcategory={resolvedParams.subcategory}
      initialProducts={initialProducts}
      initialCollections={initialCollections}
    />
  )
}
