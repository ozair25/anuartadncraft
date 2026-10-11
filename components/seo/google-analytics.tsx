"use client"

import Script from "next/script"

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Safe client-side event tracking utility for GA4
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    ;(window as any).gtag("event", eventName, eventParams)
  }
}

/**
 * Standard GA4 E-Commerce events
 */
export function trackViewItem(product: {
  id: string
  name: string
  price: number
  category?: string
}) {
  trackEvent("view_item", {
    currency: "INR",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category || "Art Supplies",
      },
    ],
  })
}

export function trackAddToCart(product: {
  id: string
  name: string
  price: number
  category?: string
  quantity?: number
}) {
  trackEvent("add_to_cart", {
    currency: "INR",
    value: product.price * (product.quantity || 1),
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category || "Art Supplies",
        quantity: product.quantity || 1,
      },
    ],
  })
}

export function trackBeginCheckout(value: number, itemsCount: number) {
  trackEvent("begin_checkout", {
    currency: "INR",
    value,
    items_count: itemsCount,
  })
}

export function trackSearch(searchTerm: string) {
  trackEvent("search", {
    search_term: searchTerm,
  })
}
