import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbListSchema,
  getOrganizationSchema,
} from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Contact Us | Studio Location & Craft Inquiries",
  description:
    "Get in touch with Anu Arts & Craft Studio. Visit our studio in Old Palasia, Indore, call +91 94253 56009, or message us for supplies, workshops, and bulk orders.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    title: `Contact Us | Studio Location & Craft Inquiries | ${SITE_NAME}`,
    description:
      "Get in touch with Anu Arts & Craft Studio. Visit our studio in Old Palasia, Indore, call +91 94253 56009, or message us for supplies, workshops, and bulk orders.",
    images: [
      {
        url: "/images/hero-banner-bg.png",
        width: 1200,
        height: 630,
        alt: "Contact Anu Arts & Craft Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | Studio Location & Craft Inquiries | ${SITE_NAME}`,
    description:
      "Visit our studio in Old Palasia, Indore, call +91 94253 56009, or send a craft inquiry.",
    images: ["/images/hero-banner-bg.png"],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ])

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    description:
      "Contact Anu Arts & Craft for product orders, bulk art materials, workshop enrollments, and customized DIY craft kits.",
    mainEntity: getOrganizationSchema(),
  }

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, contactPageSchema]} />
      {children}
    </>
  )
}
