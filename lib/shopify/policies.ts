export interface ShopifyPolicy {
  title: string
  body: string
  url?: string
}

export interface ShopPolicies {
  refundPolicy: ShopifyPolicy
  shippingPolicy: ShopifyPolicy
  privacyPolicy?: ShopifyPolicy
  termsOfService?: ShopifyPolicy
}

/**
 * Exact official policies from Anu Arts Shopify Store
 * Source of truth: Shopify Storefront API (shop.refundPolicy, shop.shippingPolicy)
 * Store domain: e08d97-2b.myshopify.com
 */
export const DEFAULT_SHOPIFY_REFUND_POLICY: ShopifyPolicy = {
  title: "Refund Policy",
  body: "Our policy at Anu Arts is focused on ensuring customer satisfaction with every purchase. We offer refunds or replacements only for goods considered damaged upon receipt, provided they are claimed within a specified period. It's essential that customers follow the opening video instructions as labeled on the package; failure to do so will result in the inability to claim refunds or replacements under any circumstances. Please note that once goods are sold, exchanges or returns are not accepted. Our commitment is to uphold these guidelines to maintain fairness and quality in our service.",
  url: "https://checkout.shopify.com/62993727532/policies/27265826860.html?locale=en",
}

export const DEFAULT_SHOPIFY_SHIPPING_POLICY: ShopifyPolicy = {
  title: "Shipping Policy",
  body: "Our processing time at Anu Arts ranges from 0 to 2 days, and delivery typically takes 6 to 8 working days. Please note that any delays beyond our control, once the parcel is shipped, are the responsibility of the shipping partner. For express shipping options or specific inquiries, please contact our team via WhatsApp at 9425356009. Kindly note that shipping charges are additional and based on actuals. We strive to provide efficient service and are committed to addressing any queries or concerns promptly.",
  url: "https://checkout.shopify.com/62993727532/policies/27265859628.html?locale=en",
}

export function extractCleanPolicyText(rawHtmlOrText: string): string {
  if (!rawHtmlOrText) return ""

  const paragraphs: string[] = []
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi
  let match: RegExpExecArray | null
  while ((match = pRegex.exec(rawHtmlOrText)) !== null) {
    const text = match[1]
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim()
    if (text) paragraphs.push(text)
  }

  if (paragraphs.length > 0) {
    return paragraphs.join("\n\n")
  }

  return rawHtmlOrText
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function getShopPolicies(): {
  refundPolicy: ShopifyPolicy
  shippingPolicy: ShopifyPolicy
} {
  return {
    refundPolicy: DEFAULT_SHOPIFY_REFUND_POLICY,
    shippingPolicy: DEFAULT_SHOPIFY_SHIPPING_POLICY,
  }
}
