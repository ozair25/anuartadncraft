import { shopifyFetch, getShopifyConfig } from "./client"
import {
  CREATE_CART_MUTATION,
  ADD_LINES_TO_CART_MUTATION,
  UPDATE_CART_LINES_MUTATION,
  REMOVE_CART_LINES_MUTATION,
  GET_CART_QUERY,
} from "./queries"

export interface ShopifyCartMerchandise {
  id: string
  title: string
  sku?: string
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice?: {
    amount: string
    currencyCode: string
  } | null
  image?: {
    url: string
    altText?: string | null
  }
  product: {
    id: string
    title: string
    handle: string
    vendor?: string
    productType?: string
  }
  selectedOptions?: Array<{
    name: string
    value: string
  }>
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
  merchandise: ShopifyCartMerchandise
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: {
      amount: string
      currencyCode: string
    }
    totalAmount: {
      amount: string
      currencyCode: string
    }
    totalTaxAmount?: {
      amount: string
      currencyCode: string
    }
  }
  lines: {
    edges: Array<{
      node: ShopifyCartLine
    }>
  }
}

export interface ShopifyCartOperationResult {
  cart: ShopifyCart | null
  userErrors?: Array<{ field: string[]; message: string }>
  error?: string
}

/**
 * Validates line items to ensure they contain Shopify VARIANT IDs, NOT Product IDs.
 */
function validateCartLines(lines?: Array<{ merchandiseId: string; quantity: number }>): string | null {
  if (!lines || lines.length === 0) return null
  for (const line of lines) {
    if (!line.merchandiseId) {
      return "Missing merchandiseId on cart line."
    }
    if (line.merchandiseId.includes("gid://shopify/Product/") && !line.merchandiseId.includes("ProductVariant")) {
      return `Invalid merchandiseId: "${line.merchandiseId}". Shopify Cart API requires a ProductVariant ID (gid://shopify/ProductVariant/...), not a Product ID.`
    }
  }
  return null
}

/**
 * Creates a new Cart in Shopify with optional line items.
 */
export async function createShopifyCart(
  lines?: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCartOperationResult> {
  const config = getShopifyConfig()
  if (!config.isConfigured) {
    return { cart: null, error: "Shopify Storefront API credentials are not configured." }
  }

  const validationError = validateCartLines(lines)
  if (validationError) {
    console.error("[Shopify cartCreate validation error]:", validationError)
    return { cart: null, error: validationError }
  }

  try {
    const response = await shopifyFetch<{
      cartCreate: {
        cart: ShopifyCart | null
        userErrors: Array<{ field: string[]; message: string }>
      }
    }>({
      query: CREATE_CART_MUTATION,
      variables: {
        input: lines && lines.length > 0 ? { lines } : {},
      },
    })

    if (response.errors && response.errors.length > 0) {
      const errorMsg = response.errors.map((e) => e.message).join("; ")
      console.error("[Shopify cartCreate GraphQL error]:", errorMsg)
      return { cart: null, error: errorMsg }
    }

    const userErrors = response.data?.cartCreate?.userErrors || []
    if (userErrors.length > 0) {
      const errorMsg = userErrors.map((e) => e.message).join("; ")
      console.error("[Shopify cartCreate userErrors]:", userErrors)
      return { cart: null, userErrors, error: errorMsg }
    }

    if (response.data?.cartCreate?.cart) {
      return { cart: response.data.cartCreate.cart }
    }

    return { cart: null, error: "No cart was returned from Shopify cartCreate." }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Failed to create Shopify cart."
    console.error("[Shopify cartCreate exception]:", error)
    return { cart: null, error: errorMsg }
  }
}

/**
 * Adds line items to an existing Shopify cart.
 */
export async function addLinesToShopifyCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCartOperationResult> {
  const config = getShopifyConfig()
  if (!config.isConfigured) {
    return { cart: null, error: "Shopify Storefront API credentials are not configured." }
  }

  const validationError = validateCartLines(lines)
  if (validationError) {
    console.error("[Shopify cartLinesAdd validation error]:", validationError)
    return { cart: null, error: validationError }
  }

  try {
    const response = await shopifyFetch<{
      cartLinesAdd: {
        cart: ShopifyCart | null
        userErrors: Array<{ field: string[]; message: string }>
      }
    }>({
      query: ADD_LINES_TO_CART_MUTATION,
      variables: {
        cartId,
        lines,
      },
    })

    if (response.errors && response.errors.length > 0) {
      const errorMsg = response.errors.map((e) => e.message).join("; ")
      console.error("[Shopify cartLinesAdd GraphQL error]:", errorMsg)
      return { cart: null, error: errorMsg }
    }

    const userErrors = response.data?.cartLinesAdd?.userErrors || []
    if (userErrors.length > 0) {
      const errorMsg = userErrors.map((e) => e.message).join("; ")
      console.error("[Shopify cartLinesAdd userErrors]:", userErrors)
      return { cart: null, userErrors, error: errorMsg }
    }

    if (response.data?.cartLinesAdd?.cart) {
      return { cart: response.data.cartLinesAdd.cart }
    }

    return { cart: null, error: "No cart was returned from Shopify cartLinesAdd." }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Failed to add lines to Shopify cart."
    console.error("[Shopify cartLinesAdd exception]:", error)
    return { cart: null, error: errorMsg }
  }
}

/**
 * Updates quantity of lines in an existing Shopify cart.
 */
export async function updateShopifyCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<ShopifyCartOperationResult> {
  const config = getShopifyConfig()
  if (!config.isConfigured) {
    return { cart: null, error: "Shopify Storefront API credentials are not configured." }
  }

  try {
    const response = await shopifyFetch<{
      cartLinesUpdate: {
        cart: ShopifyCart | null
        userErrors: Array<{ field: string[]; message: string }>
      }
    }>({
      query: UPDATE_CART_LINES_MUTATION,
      variables: {
        cartId,
        lines,
      },
    })

    if (response.errors && response.errors.length > 0) {
      const errorMsg = response.errors.map((e) => e.message).join("; ")
      console.error("[Shopify cartLinesUpdate GraphQL error]:", errorMsg)
      return { cart: null, error: errorMsg }
    }

    const userErrors = response.data?.cartLinesUpdate?.userErrors || []
    if (userErrors.length > 0) {
      const errorMsg = userErrors.map((e) => e.message).join("; ")
      console.error("[Shopify cartLinesUpdate userErrors]:", userErrors)
      return { cart: null, userErrors, error: errorMsg }
    }

    if (response.data?.cartLinesUpdate?.cart) {
      return { cart: response.data.cartLinesUpdate.cart }
    }

    return { cart: null, error: "No cart was returned from Shopify cartLinesUpdate." }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Failed to update Shopify cart lines."
    console.error("[Shopify cartLinesUpdate exception]:", error)
    return { cart: null, error: errorMsg }
  }
}

/**
 * Removes lines from a Shopify cart by line ID.
 */
export async function removeShopifyCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCartOperationResult> {
  const config = getShopifyConfig()
  if (!config.isConfigured) {
    return { cart: null, error: "Shopify Storefront API credentials are not configured." }
  }

  try {
    const response = await shopifyFetch<{
      cartLinesRemove: {
        cart: ShopifyCart | null
        userErrors: Array<{ field: string[]; message: string }>
      }
    }>({
      query: REMOVE_CART_LINES_MUTATION,
      variables: {
        cartId,
        lineIds,
      },
    })

    if (response.errors && response.errors.length > 0) {
      const errorMsg = response.errors.map((e) => e.message).join("; ")
      console.error("[Shopify cartLinesRemove GraphQL error]:", errorMsg)
      return { cart: null, error: errorMsg }
    }

    const userErrors = response.data?.cartLinesRemove?.userErrors || []
    if (userErrors.length > 0) {
      const errorMsg = userErrors.map((e) => e.message).join("; ")
      console.error("[Shopify cartLinesRemove userErrors]:", userErrors)
      return { cart: null, userErrors, error: errorMsg }
    }

    if (response.data?.cartLinesRemove?.cart) {
      return { cart: response.data.cartLinesRemove.cart }
    }

    return { cart: null, error: "No cart was returned from Shopify cartLinesRemove." }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Failed to remove Shopify cart lines."
    console.error("[Shopify cartLinesRemove exception]:", error)
    return { cart: null, error: errorMsg }
  }
}

/**
 * Retrieves an existing Shopify cart by ID.
 */
export async function getShopifyCart(cartId: string): Promise<ShopifyCartOperationResult> {
  const config = getShopifyConfig()
  if (!config.isConfigured) {
    return { cart: null, error: "Shopify Storefront API credentials are not configured." }
  }

  try {
    const response = await shopifyFetch<{
      cart: ShopifyCart | null
    }>({
      query: GET_CART_QUERY,
      variables: { id: cartId },
    })

    if (response.errors && response.errors.length > 0) {
      const errorMsg = response.errors.map((e) => e.message).join("; ")
      console.error("[Shopify getCart GraphQL error]:", errorMsg)
      return { cart: null, error: errorMsg }
    }

    return { cart: response.data?.cart || null }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Failed to get Shopify cart."
    console.error("[Shopify getCart exception]:", error)
    return { cart: null, error: errorMsg }
  }
}
