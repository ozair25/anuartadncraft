import { getAllProducts, getCollections } from "@/lib/shopify/products"
import { ShopClient } from "@/app/shop/shop-client"
import { getCategoryBySlug } from "@/lib/config/shop-categories"
import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  cleanMetaDescription,
  getBreadcrumbListSchema,
} from "@/lib/seo/config"

export const revalidate = 60

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolved = await params
  const config = getCategoryBySlug(resolved.category)
  const categoryName = config ? config.name : resolved.category.replace(/-/g, " ")
  const title = `${categoryName} | Art & Craft Supplies | ${SITE_NAME}`
  const description = cleanMetaDescription(
    config?.description ||
      `Explore high-grade ${categoryName} materials, tools, and accessories at Anu Arts & Craft. Authentic craft supplies shipped across India.`
  )
  const canonicalUrl = `${SITE_URL}/shop/${resolved.category}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: "/images/hero-banner-bg.png",
          width: 1200,
          height: 630,
          alt: `${categoryName} - Anu Arts & Craft`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero-banner-bg.png"],
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const config = getCategoryBySlug(resolvedParams.category)
  const categoryName = config ? config.name : resolvedParams.category.replace(/-/g, " ")

  const [initialProducts, initialCollections] = await Promise.all([
    getAllProducts({ fetchAll: true }).catch(() => []),
    getCollections().catch(() => []),
  ])

  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: categoryName, url: `/shop/${resolvedParams.category}` },
  ])

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} - Art & Craft Supplies`,
    description: config?.description || `Explore ${categoryName} products at Anu Arts & Craft.`,
    url: `${SITE_URL}/shop/${resolvedParams.category}`,
  }

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, collectionSchema]} />
      <ShopClient
        initialCategory={resolvedParams.category}
        initialProducts={initialProducts}
        initialCollections={initialCollections}
      />
    </>
  )
}
