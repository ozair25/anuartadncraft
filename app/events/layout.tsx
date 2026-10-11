import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbListSchema,
} from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Creative Events & Craft Exhibitions",
  description:
    "Join upcoming art exhibitions, live resin craft demos, painting masterclasses, and artisan meets hosted by Anu Arts & Craft in Indore and online.",
  alternates: {
    canonical: `${SITE_URL}/events`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/events`,
    siteName: SITE_NAME,
    title: `Creative Events & Craft Exhibitions | ${SITE_NAME}`,
    description:
      "Join upcoming art exhibitions, live resin craft demos, painting masterclasses, and artisan meets hosted by Anu Arts & Craft in Indore and online.",
    images: [
      {
        url: "/images/hero-banner-bg.png",
        width: 1200,
        height: 630,
        alt: "Creative Art Events & Exhibitions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Creative Events & Craft Exhibitions | ${SITE_NAME}`,
    description:
      "Art exhibitions, live demos, and creative workshops at Anu Arts Studio.",
    images: ["/images/hero-banner-bg.png"],
  },
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Events", url: "/events" },
  ])

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd]} />
      {children}
    </>
  )
}
