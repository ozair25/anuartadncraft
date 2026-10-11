import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbListSchema,
} from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Art Studio Gallery | Handcrafted Art & Student Creations",
  description:
    "Explore our art gallery featuring resin ocean art, handcrafted lippan mirrors, acrylic canvas paintings, and creative student projects at Anu Arts & Craft Studio.",
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/gallery`,
    siteName: SITE_NAME,
    title: `Art Studio Gallery | Handcrafted Art & Student Creations | ${SITE_NAME}`,
    description:
      "Explore our art gallery featuring resin ocean art, handcrafted lippan mirrors, acrylic canvas paintings, and creative student projects at Anu Arts & Craft Studio.",
    images: [
      {
        url: "/images/anu-studio.jpg",
        width: 1200,
        height: 630,
        alt: "Anu Arts Studio Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Art Studio Gallery | Handcrafted Art & Student Creations | ${SITE_NAME}`,
    description:
      "Explore resin ocean art, lippan mirrors, and canvas paintings at Anu Arts Studio Gallery.",
    images: ["/images/anu-studio.jpg"],
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Gallery", url: "/gallery" },
  ])

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Anu Arts Studio Gallery",
    description:
      "Exhibition of handmade resin artworks, lippan mirror craft, acrylic paintings, and student masterclass creations.",
    url: `${SITE_URL}/gallery`,
  }

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, gallerySchema]} />
      {children}
    </>
  )
}
