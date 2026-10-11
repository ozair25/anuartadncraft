import { getProductByHandle, getProductsByCollection } from "@/lib/shopify/products"
import { ProductDetailClient } from "./product-detail-client"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Product } from "@/types/ecommerce"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  cleanMetaDescription,
  getProductSchema,
  getBreadcrumbListSchema,
} from "@/lib/seo/config"

// Revalidate product pages every 60 seconds (Incremental Static Regeneration)
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
      title: "Product Not Found | Anu Arts & Craft",
      description: "The requested art and craft supply item could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const cleanDesc = cleanMetaDescription(
    product.shortDescription || product.description,
    155
  )
  const canonicalUrl = `${SITE_URL}/product/${product.slug}`
  const ogImages = product.images?.length
    ? product.images.slice(0, 4).map((url) => ({
        url,
        alt: `${product.name} - Anu Arts & Craft`,
      }))
    : product.thumbnail
    ? [{ url: product.thumbnail, alt: product.name }]
    : []

  return {
    title: `${product.name} | ${SITE_NAME}`,
    description: cleanDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: `${product.name} | ${SITE_NAME}`,
      description: cleanDesc,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${SITE_NAME}`,
      description: cleanDesc,
      images: ogImages.length ? [ogImages[0].url] : [],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolved = await params
  const decodedSlug = decodeURIComponent(resolved.slug)
  const product = await getProductByHandle(decodedSlug)

  if (!product) {
    notFound()
  }

  let relatedProducts: Product[] = []
  if (product.collection) {
    try {
      const collectionProducts = await getProductsByCollection(product.collection, 6)
      relatedProducts = collectionProducts.filter((p) => p.id !== product.id).slice(0, 4)
    } catch {
      // Graceful fallback
    }
  }

  const productJsonLd = getProductSchema(product)
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    ...(product.category
      ? [
          {
            name: product.category,
            url: `/shop/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          },
        ]
      : []),
    { name: product.name, url: `/product/${product.slug}` },
  ])

  return (
    <>
      <JsonLd data={[productJsonLd, breadcrumbsJsonLd]} />
      <ProductDetailClient
        initialProduct={product}
        initialRelatedProducts={relatedProducts}
        slug={decodedSlug}
      />
    </>
  )
}
