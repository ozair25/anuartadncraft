import { getProductByHandle } from "@/lib/shopify/products"
import { ProductDetailClient } from "./product-detail-client"
import { Metadata } from "next"

export const dynamic = "force-dynamic"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolved = await params
  const decodedSlug = decodeURIComponent(resolved.slug)
  const product = await getProductByHandle(decodedSlug)

  if (!product) {
    return {
      title: "Art & Craft Product | Anu Arts Studio",
      description: "Handcrafted supplies and curated materials.",
    }
  }

  return {
    title: `${product.name} | Anu Arts Studio`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolved = await params
  const decodedSlug = decodeURIComponent(resolved.slug)
  const product = await getProductByHandle(decodedSlug)

  return <ProductDetailClient initialProduct={product} slug={decodedSlug} />
}
