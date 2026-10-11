import { z } from "zod"

/**
 * Validates that an external URL points strictly to a trusted Shopify checkout domain.
 * Prevents open-redirect attacks and javascript: URI execution.
 */
export function isSafeShopifyCheckoutUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false
  const trimmed = url.trim()

  // Allow relative checkout paths if returned by Shopify
  if (
    trimmed.startsWith("/cart/c/") ||
    trimmed.startsWith("/checkouts/") ||
    trimmed.startsWith("/cart/")
  ) {
    return true
  }

  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol !== "https:") return false

    const host = parsed.hostname.toLowerCase()

    // Must be an official Shopify checkout or myshopify storefront domain
    const isShopifyDomain =
      host.endsWith(".myshopify.com") ||
      host === "shopify.com" ||
      host.endsWith(".shopify.com") ||
      host === "anuarts.in" ||
      host.endsWith(".anuarts.in")

    if (isShopifyDomain) return true

    // Also match against any store domain configured in environment
    if (typeof process !== "undefined" && process.env?.SHOPIFY_STORE_DOMAIN) {
      const configuredHost = process.env.SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase()
      if (configuredHost && (host === configuredHost || host.endsWith("." + configuredHost))) {
        return true
      }
    }

    return false
  } catch {
    return false
  }
}

/**
 * Sanitizes search input to prevent injection, control characters, or oversized payloads.
 */
export function sanitizeSearchQuery(input: string | null | undefined): string {
  if (!input || typeof input !== "string") return ""
  return input
    .slice(0, 100) // Bound length
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Strip control characters
    .replace(/[<>'"\\;`]/g, " ") // Strip potential injection delimiters
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Schema for Shopify Cart POST API requests
 */
export const CartActionSchema = z.enum(["create", "add", "update", "remove", "get"])

export const CartLineItemSchema = z.object({
  merchandiseId: z.string().min(1).max(250),
  quantity: z.number().int().min(1).max(99),
  productId: z.string().max(250).optional(),
})

export const CartUpdateLineItemSchema = z.object({
  id: z.string().min(1).max(250),
  quantity: z.number().int().min(0).max(99),
})

export const CartRequestBodySchema = z.object({
  action: CartActionSchema,
  cartId: z.string().max(250).optional().nullable(),
  lines: z.array(z.union([CartLineItemSchema, CartUpdateLineItemSchema])).max(50).optional(),
  lineIds: z.array(z.string().max(250)).max(50).optional(),
})

/**
 * Schema for Contact Enquiry Form
 */
export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(6, "Phone number must be at least 6 digits").max(25),
  email: z.string().email("Invalid email address").max(100).optional().or(z.literal("")),
  subject: z.string().max(120).optional(),
  message: z.string().min(3, "Message must be at least 3 characters").max(2000),
  website: z.string().max(0, "Anti-spam honeypot triggered").optional(), // Honeypot field
})
