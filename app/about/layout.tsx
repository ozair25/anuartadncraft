import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbListSchema,
  getOrganizationSchema,
} from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "About Us | Studio Story & Artisan Heritage",
  description:
    "Discover the story of Anu Arts & Craft Studio. Based in Indore, we empower artists and crafters with authentic supplies, resin kits, and inspiring workshops.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    title: `About Us | Studio Story & Artisan Heritage | ${SITE_NAME}`,
    description:
      "Discover the story of Anu Arts & Craft Studio. Based in Indore, we empower artists and crafters with authentic supplies, resin kits, and inspiring workshops.",
    images: [
      {
        url: "/images/anu-studio.jpg",
        width: 1200,
        height: 630,
        alt: "Anu Arts & Craft Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | Studio Story & Artisan Heritage | ${SITE_NAME}`,
    description:
      "Discover the story of Anu Arts & Craft Studio in Indore. Craft supplies, resin art, and workshops.",
    images: ["/images/anu-studio.jpg"],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ])

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${SITE_NAME}`,
    url: `${SITE_URL}/about`,
    description:
      "Learn about Anu Arts & Craft Studio, our passion for artistic craft mediums, our Indore creative space, and our commitment to artisan craft supplies.",
    mainEntity: getOrganizationSchema(),
  }

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, aboutPageSchema]} />
      {children}
    </>
  )
}
