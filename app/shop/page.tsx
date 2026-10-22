import { ShopClient } from "@/app/shop/shop-client"
import { getAllProducts, getCollections } from "@/lib/shopify/products"
import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { SITE_URL, SITE_NAME, getBreadcrumbListSchema } from "@/lib/seo/config"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Shop Art & Craft Supplies, DIY Kits & Tools",
  description:
    "Browse over 2,500 craft supplies, resin art essentials, MDF cutouts, acrylic paints, and DIY kits from Anu Arts & Craft. Fast pan-India delivery.",
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/shop`,
    siteName: SITE_NAME,
    title: `Shop Art & Craft Supplies, DIY Kits & Tools | ${SITE_NAME}`,
    description:
      "Browse over 2,500 craft supplies, resin art essentials, MDF cutouts, acrylic paints, and DIY kits from Anu Arts & Craft. Fast pan-India delivery.",
    images: [
      {
        url: "/images/hero-banner-bg.png",
        width: 1200,
        height: 630,
        alt: "Anu Arts & Craft Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Shop Art & Craft Supplies, DIY Kits & Tools | ${SITE_NAME}`,
    description:
      "Browse over 2,500 craft supplies, resin art essentials, MDF cutouts, acrylic paints, and DIY kits from Anu Arts & Craft.",
    images: ["/images/hero-banner-bg.png"],
  },
}

export default async function ShopPage() {
  const [initialProducts, initialCollections] = await Promise.all([
    getAllProducts({ first: 48 }).catch(() => []),
    getCollections().catch(() => []),
  ])

  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ])

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Art & Craft Supplies Catalog",
    description:
      "Complete catalog of art and craft materials, painting supplies, and DIY kits available at Anu Arts & Craft.",
    url: `${SITE_URL}/shop`,
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
      name: SITE_NAME,
    },
  }

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, collectionPageSchema]} />
      <ShopClient
        initialProducts={initialProducts}
        initialCollections={initialCollections}
      />
    </>
  )
}
