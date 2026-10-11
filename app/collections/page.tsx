import { getCollections } from "@/lib/shopify/products"
import { CollectionsClient } from "./collections-client"
import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbListSchema,
} from "@/lib/seo/config"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Curated Art Collections & Craft Supply Bundles",
  description:
    "Explore handpicked craft themes and supplies bundles for acrylic painting, resin art, journal essentials, and DIY kits from Anu Arts & Craft.",
  alternates: {
    canonical: `${SITE_URL}/collections`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/collections`,
    siteName: SITE_NAME,
    title: `Curated Art Collections & Craft Supply Bundles | ${SITE_NAME}`,
    description:
      "Explore handpicked craft themes and supplies bundles for acrylic painting, resin art, journal essentials, and DIY kits from Anu Arts & Craft.",
    images: [
      {
        url: "/images/hero-banner-bg.png",
        width: 1200,
        height: 630,
        alt: "Curated Art Collections",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Curated Art Collections & Craft Supply Bundles | ${SITE_NAME}`,
    description:
      "Explore handpicked craft themes and supplies bundles for acrylic painting, resin art, journal essentials, and DIY kits from Anu Arts & Craft.",
    images: ["/images/hero-banner-bg.png"],
  },
}

export default async function CollectionsPage() {
  const collections = await getCollections().catch(() => [])

  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Collections", url: "/collections" },
  ])

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Curated Art Collections & Bundles",
    description:
      "Handpicked complete supplies bundles designed for specific mediums and artistic projects.",
    url: `${SITE_URL}/collections`,
  }

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, collectionPageSchema]} />
      <CollectionsClient initialCollections={collections} />
    </>
  )
}
