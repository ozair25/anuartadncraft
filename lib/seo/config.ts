/**
 * Centralized SEO Configuration & Structured Data Builders for Anu Arts & Craft
 * Production domain: https://anuarts.in
 */

export const SITE_URL = "https://anuarts.in"
export const SITE_NAME = "Anu Arts & Craft"
export const SITE_TAGLINE = "Art Supplies, DIY Kits & Creative Workshops"
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-banner-bg.png`

/**
 * Strips HTML tags, trims whitespace, and limits character count for meta descriptions.
 */
export function cleanMetaDescription(text?: string | null, maxLength = 158): string {
  if (!text || typeof text !== "string") {
    return "Explore premium art supplies, DIY kits, resin art materials, workshops, and tutorials at Anu Arts & Craft."
  }
  const stripped = text
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()

  if (stripped.length <= maxLength) return stripped
  return stripped.slice(0, maxLength - 1).trim() + "…"
}

/**
 * Generates absolute canonical URL
 */
export function absoluteUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`
}

/**
 * Organization Schema (LocalBusiness / Store)
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["Anu Arts", "Anu Art & Craft Studio"],
    url: SITE_URL,
    logo: `${SITE_URL}/images/anu-logo-clean.png`,
    image: DEFAULT_OG_IMAGE,
    description:
      "Premier art and craft supplies destination and creative learning studio in Indore, India. Specializing in resin art, DIY kits, MDF cutouts, and fine painting supplies.",
    telephone: "+91 94253 56009",
    email: "contact@anuarts.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "105-106, Navneet Plaza, 5/2, Old Palasia",
      addressLocality: "Indore",
      addressRegion: "Madhya Pradesh",
      postalCode: "452018",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.7244",
      longitude: "75.8839",
    },
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "11:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/anuarts_studio",
      "https://www.facebook.com/anuartsstudio",
      "https://wa.me/919425356009",
    ],
  }
}

/**
 * WebSite Schema with Sitelinks Searchbox
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: "Your one-stop destination for quality art and craft supplies, resin essentials, DIY kits, and creative workshops.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-IN",
  }
}

/**
 * BreadcrumbList Schema
 */
export function getBreadcrumbListSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * Product Schema for Shopify Products
 */
export function getProductSchema(product: {
  id: string
  name: string
  slug: string
  sku?: string
  description: string
  shortDescription?: string
  price: number
  originalPrice?: number
  images: string[]
  thumbnail: string
  brand?: string
  stock: number
  inStock?: boolean
  rating?: number
  reviewsCount?: number
  category?: string
}) {
  const images = (product.images && product.images.length > 0)
    ? product.images
    : [product.thumbnail || DEFAULT_OG_IMAGE]

  const inStock = product.stock > 0 || product.inStock !== false

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/product/${product.slug}/#product`,
    name: product.name,
    description: cleanMetaDescription(product.shortDescription || product.description, 300),
    image: images,
    url: `${SITE_URL}/product/${product.slug}`,
    sku: product.sku || product.id,
    brand: {
      "@type": "Brand",
      name: product.brand || SITE_NAME,
    },
    category: product.category || "Art & Craft Supplies",
    offers: {
      "@type": "Offer",
      "@id": `${SITE_URL}/product/${product.slug}/#offer`,
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      priceValidUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      itemCondition: "https://schema.org/NewCondition",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
    },
  }

  // Only include genuine aggregate ratings if visible and present
  if (product.reviewsCount && product.reviewsCount > 0 && product.rating && product.rating > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return schema
}

/**
 * FAQPage Schema
 */
export function getFaqPageSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  }
}

/**
 * VideoObject Schema for Tutorials
 */
export function getVideoObjectSchema(video: {
  title: string
  description: string
  thumbnailUrl: string
  contentUrl: string
  uploadDate?: string
  duration?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnailUrl],
    contentUrl: video.contentUrl,
    uploadDate: video.uploadDate || "2026-01-01T00:00:00+05:30",
    duration: video.duration || "PT5M",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/anu-logo-clean.png`,
      },
    },
  }
}

/**
 * Course / Workshop Schema
 */
export function getWorkshopCourseSchema(workshop: {
  title: string
  description: string
  image: string
  mode: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: workshop.title,
    description: workshop.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    image: workshop.image,
    courseMode: "online",
    inLanguage: "en-IN",
    offers: {
      "@type": "Offer",
      category: "Online Workshop Kit & Tutorial Access",
      priceCurrency: "INR",
      price: 0,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  }
}
