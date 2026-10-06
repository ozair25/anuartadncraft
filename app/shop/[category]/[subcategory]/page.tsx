import { getAllProducts, getCollections } from "@/lib/shopify/products"
import { ShopClient } from "@/app/shop/shop-client"
import { Product, Collection } from "@/types/ecommerce"
import { getCategoryBySlug } from "@/lib/config/shop-categories"
import { Metadata } from "next"

export const dynamic = "force-dynamic"

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
    console.error("SubcategoryPage server fetch error:", err)
  }

  return (
    <ShopClient
      initialProducts={products}
      initialCollections={collections}
      initialCategory={resolvedParams.category}
      initialSubcategory={resolvedParams.subcategory}
    />
  )
}
