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

  const catTitle = config ? config.name : resolved.category.replace(/-/g, " ")
  const subTitle = sub ? sub.name : resolved.subcategory.replace(/-/g, " ")
  const title = `${subTitle} - ${catTitle} | ${SITE_NAME}`
  const description = cleanMetaDescription(
    sub?.description ||
      config?.description ||
      `Find premium ${subTitle} supplies in our ${catTitle} collection at Anu Arts & Craft.`
  )
  const canonicalUrl = `${SITE_URL}/shop/${resolved.category}/${resolved.subcategory}`

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
          alt: `${subTitle} - ${catTitle}`,
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

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const resolvedParams = await params
  const config = getCategoryBySlug(resolvedParams.category)
  const sub = config?.subcategories.find(
    (s) =>
      s.slug.toLowerCase() === resolvedParams.subcategory.toLowerCase() ||
      s.id.toLowerCase() === resolvedParams.subcategory.toLowerCase()
  )

  const catTitle = config ? config.name : resolvedParams.category.replace(/-/g, " ")
  const subTitle = sub ? sub.name : resolvedParams.subcategory.replace(/-/g, " ")

  const [initialProducts, initialCollections] = await Promise.all([
    getAllProducts({ fetchAll: true }).catch(() => []),
    getCollections().catch(() => []),
  ])

  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: catTitle, url: `/shop/${resolvedParams.category}` },
    { name: subTitle, url: `/shop/${resolvedParams.category}/${resolvedParams.subcategory}` },
  ])

  const subcategorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${subTitle} - ${catTitle}`,
    description: sub?.description || config?.description || `Explore ${subTitle} at Anu Arts & Craft.`,
    url: `${SITE_URL}/shop/${resolvedParams.category}/${resolvedParams.subcategory}`,
  }

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, subcategorySchema]} />
      <ShopClient
        initialCategory={resolvedParams.category}
        initialSubcategory={resolvedParams.subcategory}
        initialProducts={initialProducts}
        initialCollections={initialCollections}
      />
    </>
  )
}
