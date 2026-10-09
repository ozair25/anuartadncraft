import { getProductByHandle, getProductsByCollection } from "@/lib/shopify/products"
import { ProductDetailClient } from "./product-detail-client"
import { Metadata } from "next"
import { Product } from "@/types/ecommerce"

// Revalidate product pages every 60 seconds (Incremental Static Regeneration)
// Delivers sub-30ms instant page loads while keeping inventory and prices fresh
export const revalidate = 60

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

  let relatedProducts: Product[] = []
  if (product?.collection) {
    try {
      const collectionProducts = await getProductsByCollection(product.collection, 6)
      relatedProducts = collectionProducts.filter((p) => p.id !== product.id).slice(0, 4)
    } catch {
      // Graceful fallback
    }
  }

  return (
    <ProductDetailClient
      initialProduct={product}
      initialRelatedProducts={relatedProducts}
      slug={decodedSlug}
    />
  )
}
