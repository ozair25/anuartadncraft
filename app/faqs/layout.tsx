import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbListSchema,
  getFaqPageSchema,
} from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | Shipping & Policies",
  description:
    "Find answers to common questions about delivery times, product authenticity, COD availability, order tracking, and refund policies at Anu Arts & Craft.",
  alternates: {
    canonical: `${SITE_URL}/faqs`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/faqs`,
    siteName: SITE_NAME,
    title: `Frequently Asked Questions (FAQs) | ${SITE_NAME}`,
    description:
      "Find answers to common questions about delivery times, product authenticity, COD availability, order tracking, and refund policies at Anu Arts & Craft.",
    images: [
      {
        url: "/images/hero-banner-bg.png",
        width: 1200,
        height: 630,
        alt: "Anu Arts FAQs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Frequently Asked Questions (FAQs) | ${SITE_NAME}`,
    description:
      "Answers about shipping, authenticity, COD, and order tracking at Anu Arts.",
    images: ["/images/hero-banner-bg.png"],
  },
}

const FAQS_DATA = [
  {
    q: "How long does shipping take across India?",
    a: "Our processing time at Anu Arts ranges from 0 to 2 days, and delivery typically takes 6 to 8 working days. Shipping charges are calculated based on actuals. Express shipping is available on request.",
  },
  {
    q: "Are all products guaranteed 100% authentic?",
    a: "Yes! All craft and art supplies are studio-verified and sourced directly from reputable manufacturers and artisan distributors.",
  },
  {
    q: "What is your refund & replacement policy?",
    a: "We offer replacements or refunds for goods damaged during transit when claimed with parcel unboxing video proof. Exchanges are not accepted once goods are sold in perfect condition.",
  },
  {
    q: "Do you offer cash on delivery (COD)?",
    a: "Yes, COD is available for most serviceable pin codes across India for orders up to ₹5,000.",
  },
  {
    q: "How can I track my order status?",
    a: "Simply visit our Track Order page and enter your order reference number to check real-time courier dispatch status.",
  },
]

export default function FaqsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "FAQs", url: "/faqs" },
  ])

  const faqJsonLd = getFaqPageSchema(FAQS_DATA)

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, faqJsonLd]} />
      {children}
    </>
  )
}
