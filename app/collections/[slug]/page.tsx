import { getCollections, getProductsByCollection } from "@/lib/shopify/products"
import { CollectionDetailClient } from "./collection-detail-client"
import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  cleanMetaDescription,
  getBreadcrumbListSchema,
} from "@/lib/seo/config"

export const revalidate = 60

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const resolved = await params
  const collections = await getCollections().catch(() => [])
  const collection = collections.find(
    (c) =>
      c.slug.toLowerCase() === resolved.slug.toLowerCase() ||
      c.id === resolved.slug
  )

  const titleName = collection?.title || resolved.slug.replace(/-/g, " ")
  const title = `${titleName} Collection | ${SITE_NAME}`
  const description = cleanMetaDescription(
    collection?.description ||
      `Explore handpicked supplies and materials in the ${titleName} collection at Anu Arts & Craft Studio.`
  )
  const canonicalUrl = `${SITE_URL}/collections/${resolved.slug}`

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
      images: collection?.image
        ? [{ url: collection.image, alt: titleName }]
        : [{ url: "/images/hero-banner-bg.png", alt: titleName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: collection?.image ? [collection.image] : ["/images/hero-banner-bg.png"],
    },
  }
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const resolved = await params
  const [collections, initialProducts] = await Promise.all([
    getCollections().catch(() => []),
    getProductsByCollection(resolved.slug, 36).catch(() => []),
  ])

  const collection = collections.find(
    (c) =>
      c.slug.toLowerCase() === resolved.slug.toLowerCase() ||
      c.id === resolved.slug
  )

  const titleName = collection?.title || resolved.slug.replace(/-/g, " ")

  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Collections", url: "/collections" },
    { name: titleName, url: `/collections/${resolved.slug}` },
  ])

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${titleName} Collection`,
    description: collection?.description || `Explore the ${titleName} collection at Anu Arts & Craft.`,
    url: `${SITE_URL}/collections/${resolved.slug}`,
  }

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, collectionSchema]} />
      <CollectionDetailClient
        slug={resolved.slug}
        initialCollection={collection || null}
        initialProducts={initialProducts}
      />
    </>
  )
}
