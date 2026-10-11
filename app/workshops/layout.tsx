import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbListSchema,
  getWorkshopCourseSchema,
} from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Creative Art Workshops & Online Classes",
  description:
    "Join creative workshops at Anu Arts & Craft Studio. Learn the Koi Fish and Resin Lotus Pond art with complete guidance, materials kit, and lifetime tutorial access.",
  alternates: {
    canonical: `${SITE_URL}/workshops`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/workshops`,
    siteName: SITE_NAME,
    title: `Creative Art Workshops & Online Classes | ${SITE_NAME}`,
    description:
      "Join creative workshops at Anu Arts & Craft Studio. Learn the Koi Fish and Resin Lotus Pond art with complete guidance, materials kit, and lifetime tutorial access.",
    images: [
      {
        url: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1791665950/WhatsApp_Image_2026-10-11_at_12.01.10_AM_b7fcnh.jpg",
        width: 1200,
        height: 630,
        alt: "Koi Fish and Resin Lotus Pond Workshop - Anu Arts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Creative Art Workshops & Online Classes | ${SITE_NAME}`,
    description:
      "Join creative workshops at Anu Arts & Craft Studio. Learn the Koi Fish and Resin Lotus Pond art.",
    images: [
      "https://res.cloudinary.com/dtrvyelcg/image/upload/v1791665950/WhatsApp_Image_2026-10-11_at_12.01.10_AM_b7fcnh.jpg",
    ],
  },
}

export default function WorkshopsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Workshops", url: "/workshops" },
  ])

  const courseJsonLd = getWorkshopCourseSchema({
    title: "Koi Fish and Resin Lotus Pond — Online Workshop",
    description:
      "Learn the art of creating a lotus pond from scratch with clay embellishments, painting, and resin pouring with complete workshop kit and lifetime tutorial guidance.",
    image:
      "https://res.cloudinary.com/dtrvyelcg/image/upload/v1791665950/WhatsApp_Image_2026-10-11_at_12.01.10_AM_b7fcnh.jpg",
    mode: "Online workshop",
  })

  return (
    <>
      <JsonLd data={[breadcrumbsJsonLd, courseJsonLd]} />
      {children}
    </>
  )
}
