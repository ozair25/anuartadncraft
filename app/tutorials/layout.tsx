import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbListSchema,
  getVideoObjectSchema,
} from "@/lib/seo/config"
import { TUTORIALS_DATA } from "@/lib/data/tutorials-data"

export const metadata: Metadata = {
  title: "Free Art & Craft Tutorials | Step-by-Step Video Guides",
  description:
    "Watch free step-by-step art and craft video tutorials by Anu Arts & Craft Studio. Learn mini mandala canvas painting, resin art techniques, and creative DIY projects.",
  alternates: {
    canonical: `${SITE_URL}/tutorials`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/tutorials`,
    siteName: SITE_NAME,
    title: `Free Art & Craft Tutorials | Step-by-Step Video Guides | ${SITE_NAME}`,
    description:
      "Watch free step-by-step art and craft video tutorials by Anu Arts & Craft Studio. Learn mini mandala canvas painting, resin art techniques, and creative DIY projects.",
    images: [
      {
        url: "/images/hero-banner-bg.png",
        width: 1200,
        height: 630,
        alt: "Art Tutorials & Video Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Art & Craft Tutorials | Step-by-Step Video Guides | ${SITE_NAME}`,
    description:
      "Watch free step-by-step art and craft video tutorials by Anu Arts & Craft Studio.",
    images: ["/images/hero-banner-bg.png"],
  },
}

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Tutorials", url: "/tutorials" },
  ])

  // Build VideoObject schema for available tutorials
  const videoSchemas = TUTORIALS_DATA.slice(0, 5).map((tut) =>
    getVideoObjectSchema({
      title: tut.title,
      description: tut.shortDescription,
      thumbnailUrl: tut.posterUrl || `${SITE_URL}/images/hero-banner-bg.png`,
      contentUrl: tut.videoUrl,
    })
  )

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, ...videoSchemas]} />
      {children}
    </>
  )
}
