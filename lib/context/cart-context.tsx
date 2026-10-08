"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { CartItem, Product } from "@/types/ecommerce"

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, selectedOptions?: Record<string, string>) => Promise<boolean>
  addToCart: (product: Product, quantity?: number, selectedOptions?: Record<string, string>) => Promise<boolean>
  removeItem: (productId: string) => Promise<boolean>
  updateQuantity: (productId: string, quantity: number) => Promise<boolean>
  clearCart: () => void
  totalItems: number
  totalPrice: number
  appliedCoupon: string | null
  discountAmount: number
  applyCoupon: (code: string, discountPercent: number) => void
  removeCoupon: () => void
  // Shopify integration
  shopifyCartId: string | null
  checkoutUrl: string | null
  isLoadingCart: boolean
  redirectToCheckout: () => void
  // Drawer & UI feedback
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  setIsCartOpen: (open: boolean) => void
  cartError: string | null
  clearCartError: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "anu_arts_cart"
const SHOPIFY_CART_ID_KEY = "anu_arts_shopify_cart_id"
const SHOPIFY_CHECKOUT_URL_KEY = "anu_arts_shopify_checkout_url"

/**
 * Helper to ensure a variant ID is formatted as a full Shopify ProductVariant GID.
 */
function formatShopifyVariantGid(id: string | number): string {
  const str = String(id).trim()
  if (str.startsWith("gid://shopify/ProductVariant/")) {
    return str
  }
  // If numeric ID e.g. 43885824344108
  if (/^\d+$/.test(str)) {
    return `gid://shopify/ProductVariant/${str}`
  }
  // If contains ProductVariant without full gid
  if (str.includes("ProductVariant/")) {
    const num = str.split("ProductVariant/").pop()
    if (num && /^\d+$/.test(num)) {
      return `gid://shopify/ProductVariant/${num}`
    }
  }
  return str
}

/**
 * Checks if an ID represents a valid Shopify ProductVariant GID.
 * Strictly guards AGAINST sending a Product ID (gid://shopify/Product/...).
 */
function isShopifyVariantGid(id: string | undefined | null): boolean {
  if (!id) return false
  const str = String(id).trim()
  // Must NOT be a pure Product GID
  if (str.includes("gid://shopify/Product/") && !str.includes("ProductVariant")) {
    return false
  }
  return str.includes("gid://shopify/ProductVariant/") || /^\d{10,}$/.test(str)
}

/**
 * Resolves the genuine Shopify ProductVariant GID.
 * Strictly guarantees a Product ID is never sent.
 * 
 * Rules:
 * 1. For a product with multiple variants:
 *    - If selectedOptions match a variant, use that variant's GID.
 *    - If product.variantId matches one of the variants, use that variant's GID.
 *    - Fallback to the first available variant.
 * 2. For a product with one variant:
 *    - Automatically use that variant's actual Shopify ProductVariant GID.
 * 3. If product.variantId is already a valid ProductVariant GID, use it.
 * 4. Never return a Product ID (gid://shopify/Product/...).
 */
export function resolveShopifyVariantId(
  product: Product,
  selectedOptions?: Record<string, string>
): string | null {
  if (!product) return null

  const variants = product.variants || []

  // Case 1: Multiple variants
  if (variants.length > 1) {
    // 1a. Match selectedOptions if provided
    if (selectedOptions && Object.keys(selectedOptions).length > 0) {
      const match = variants.find((v) => {
        if (!v.selectedOptions || v.selectedOptions.length === 0) return false
        return v.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value)
      })
      if (match?.id && isShopifyVariantGid(match.id)) {
        return formatShopifyVariantGid(match.id)
      }
    }

    // 1b. If product.variantId was set to a specific variant (e.g. from activeVariant)
    if (product.variantId && isShopifyVariantGid(product.variantId)) {
      const matchingVariant = variants.find((v) => v.id === product.variantId)
      if (matchingVariant) {
        return formatShopifyVariantGid(matchingVariant.id)
      }
      return formatShopifyVariantGid(product.variantId)
    }

    // 1c. Fallback to first available variant
    const firstAvailable = variants.find((v) => v.available !== false && isShopifyVariantGid(v.id))
    if (firstAvailable?.id) {
      return formatShopifyVariantGid(firstAvailable.id)
    }

    const first = variants[0]
    if (first?.id && isShopifyVariantGid(first.id)) {
      return formatShopifyVariantGid(first.id)
    }
  }

  // Case 2: Product with one variant
  if (variants.length === 1) {
    const single = variants[0]
    if (single?.id && isShopifyVariantGid(single.id)) {
      return formatShopifyVariantGid(single.id)
    }
  }

  // Case 3: Direct variantId property on product
  if (product.variantId && isShopifyVariantGid(product.variantId)) {
    return formatShopifyVariantGid(product.variantId)
  }

  // Case 4: Product ID itself is a variant GID (not a Product GID)
  if (product.id && isShopifyVariantGid(product.id)) {
    return formatShopifyVariantGid(product.id)
  }

  return null
}

/**
 * Maps real Shopify Cart GraphQL payload to our application's CartItem format.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapShopifyCartToCartItems(cart: any): CartItem[] {
  if (!cart?.lines?.edges) return []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return cart.lines.edges.map((edge: any) => {
    const line = edge.node
    const m = line.merchandise
    const selectedOptionsMap: Record<string, string> = {}
    if (m?.selectedOptions) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const opt of m.selectedOptions) {
        if (opt.name && opt.value && opt.value !== "Default Title") {
          selectedOptionsMap[opt.name] = opt.value
        }
      }
    }
    const priceNum = Math.round(parseFloat(m?.price?.amount || "0"))
    const parsedOriginal = m?.compareAtPrice?.amount
      ? Math.round(parseFloat(m.compareAtPrice.amount))
      : undefined
    const originalPriceNum =
      parsedOriginal && parsedOriginal > priceNum ? parsedOriginal : undefined

    const product: Product = {
      id: m?.product?.id || m?.id || line.id,
      name: m?.product?.title || m?.title || "Art Supply",
      slug: m?.product?.handle || "",
      sku: m?.sku || "",
      description: "",
      shortDescription: "",
      price: priceNum,
      originalPrice: originalPriceNum,
      images: m?.image?.url ? [m.image.url] : [],
      thumbnail: m?.image?.url || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
      image: m?.image?.url || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
      stock: 50,
      category: m?.product?.productType || "Art Supplies",
      tags: [],
      brand: m?.product?.vendor || "Anu Arts",
      rating: 4.9,
      reviewsCount: 24,
      variantId: m?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return {
      product,
      quantity: line.quantity,
      lineId: line.id,
      variantId: m?.id,
      selectedOptions: Object.keys(selectedOptionsMap).length > 0 ? selectedOptionsMap : undefined,
    }
  })
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0)
  const [shopifyCartId, setShopifyCartId] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [isLoadingCart, setIsLoadingCart] = useState<boolean>(false)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [cartError, setCartError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])
  const clearCartError = useCallback(() => setCartError(null), [])

  // Initialize from localStorage and revalidate with live Shopify Cart
  useEffect(() => {
    setMounted(true)
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY)
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }

      const savedCartId = localStorage.getItem(SHOPIFY_CART_ID_KEY)
      const savedCheckoutUrl = localStorage.getItem(SHOPIFY_CHECKOUT_URL_KEY)
      if (savedCartId) {
        setShopifyCartId(savedCartId)
        if (savedCheckoutUrl) {
          setCheckoutUrl(savedCheckoutUrl)
        }

        // Validate cart with Shopify
        fetch("/api/shopify/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get", cartId: savedCartId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.cart) {
              setItems(mapShopifyCartToCartItems(data.cart))
              if (data.cart.checkoutUrl) {
                setCheckoutUrl(data.cart.checkoutUrl)
              }
            } else {
              // Stale or expired cart ID - clean up
              console.warn("[Cart] Saved Shopify cart expired or not found. Clearing stale cart.")
              setShopifyCartId(null)
              setCheckoutUrl(null)
              localStorage.removeItem(SHOPIFY_CART_ID_KEY)
              localStorage.removeItem(SHOPIFY_CHECKOUT_URL_KEY)
            }
          })
          .catch((err) => {
            console.error("[Cart] Failed to validate saved Shopify cart:", err)
          })
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e)
    }
  }, [])

  // Persist items to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, mounted])

  // Persist Shopify cart info
  useEffect(() => {
    if (mounted) {
      if (shopifyCartId) {
        localStorage.setItem(SHOPIFY_CART_ID_KEY, shopifyCartId)
      } else {
        localStorage.removeItem(SHOPIFY_CART_ID_KEY)
      }

      if (checkoutUrl) {
        localStorage.setItem(SHOPIFY_CHECKOUT_URL_KEY, checkoutUrl)
      } else {
        localStorage.removeItem(SHOPIFY_CHECKOUT_URL_KEY)
      }
    }
  }, [shopifyCartId, checkoutUrl, mounted])

  /**
   * Adds a Shopify product variant to the Shopify Cart using the Storefront Cart API.
   * Strictly verifies VARIANT ID, does not fallback to fake local cart on errors.
   */
  const addItem = async (
    product: Product,
    quantity = 1,
    selectedOptions?: Record<string, string>
  ): Promise<boolean> => {
    setIsLoadingCart(true)
    setCartError(null)

    const variantId = resolveShopifyVariantId(product, selectedOptions)

    // Temporary diagnostic logging (Requirement 10)
    console.log("[Shopify Cart AddItem Diagnostic]", {
      shopifyProductId: product.id,
      selectedShopifyVariantId: variantId,
      quantity: Math.max(1, quantity),
      cartId: shopifyCartId || "(new cart)",
    })

    if (!variantId) {
      const err = `Cannot add "${product.name}" to cart: Missing Shopify ProductVariant ID. The Shopify Cart API requires a ProductVariant ID, not a Product ID.`
      console.error("[Shopify Cart Error]:", err, { product })
      setCartError(err)
      setIsLoadingCart(false)
      return false
    }

    try {
      const res = await fetch("/api/shopify/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: shopifyCartId ? "add" : "create",
          cartId: shopifyCartId,
          lines: [
            {
              merchandiseId: variantId,
              quantity: Math.max(1, quantity),
            },
          ],
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error || !data.cart) {
        const errorMsg = data.error || "Failed to add item to Shopify cart."
        console.error("[Shopify Cart cartLinesAdd error]:", errorMsg, data.userErrors)
        setCartError(errorMsg)
        setIsLoadingCart(false)
        return false
      }

      const updatedCart = data.cart
      setShopifyCartId(updatedCart.id)
      if (updatedCart.checkoutUrl) {
        setCheckoutUrl(updatedCart.checkoutUrl)
      }

      // Synchronize cart state directly from Shopify
      const mappedItems = mapShopifyCartToCartItems(updatedCart)
      setItems(mappedItems)
      setIsCartOpen(true)
      setIsLoadingCart(false)
      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Network error adding item to Shopify cart."
      console.error("[Shopify Cart Add Exception]:", err)
      setCartError(errorMsg)
      setIsLoadingCart(false)
      return false
    }
  }

  /**
   * Updates line quantity in Shopify cart using cartLinesUpdate.
   */
  const updateQuantity = async (productId: string, quantity: number): Promise<boolean> => {
    const item = items.find(
      (i) => i.product.id === productId || i.variantId === productId || i.lineId === productId
    )

    if (!item?.lineId) {
      const err = `Cannot update quantity: Shopify lineId not found for item "${productId}".`
      console.error("[Shopify Cart Error]:", err)
      setCartError(err)
      return false
    }

    if (quantity <= 0) {
      return removeItem(productId)
    }

    setIsLoadingCart(true)
    setCartError(null)

    try {
      const res = await fetch("/api/shopify/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          cartId: shopifyCartId,
          lines: [
            {
              id: item.lineId,
              quantity,
            },
          ],
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error || !data.cart) {
        const errorMsg = data.error || "Failed to update item quantity in Shopify cart."
        console.error("[Shopify Cart cartLinesUpdate error]:", errorMsg, data.userErrors)
        setCartError(errorMsg)
        setIsLoadingCart(false)
        return false
      }

      const updatedCart = data.cart
      if (updatedCart.checkoutUrl) {
        setCheckoutUrl(updatedCart.checkoutUrl)
      }
      setItems(mapShopifyCartToCartItems(updatedCart))
      setIsLoadingCart(false)
      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Network error updating Shopify cart quantity."
      console.error("[Shopify Cart Update Exception]:", err)
      setCartError(errorMsg)
      setIsLoadingCart(false)
      return false
    }
  }

  /**
   * Removes item from Shopify cart using cartLinesRemove.
   */
  const removeItem = async (productId: string): Promise<boolean> => {
    const item = items.find(
      (i) => i.product.id === productId || i.variantId === productId || i.lineId === productId
    )

    if (!item?.lineId) {
      const err = `Cannot remove item: Shopify lineId not found for item "${productId}".`
      console.error("[Shopify Cart Error]:", err)
      setCartError(err)
      return false
    }

    setIsLoadingCart(true)
    setCartError(null)

    try {
      const res = await fetch("/api/shopify/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "remove",
          cartId: shopifyCartId,
          lineIds: [item.lineId],
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error || !data.cart) {
        const errorMsg = data.error || "Failed to remove item from Shopify cart."
        console.error("[Shopify Cart cartLinesRemove error]:", errorMsg, data.userErrors)
        setCartError(errorMsg)
        setIsLoadingCart(false)
        return false
      }

      const updatedCart = data.cart
      if (updatedCart.checkoutUrl) {
        setCheckoutUrl(updatedCart.checkoutUrl)
      }
      setItems(mapShopifyCartToCartItems(updatedCart))
      setIsLoadingCart(false)
      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Network error removing item from Shopify cart."
      console.error("[Shopify Cart Remove Exception]:", err)
      setCartError(errorMsg)
      setIsLoadingCart(false)
      return false
    }
  }

  const clearCart = () => {
    setItems([])
    setAppliedCoupon(null)
    setCouponDiscountPercent(0)
    setShopifyCartId(null)
    setCheckoutUrl(null)
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
      localStorage.removeItem(SHOPIFY_CART_ID_KEY)
      localStorage.removeItem(SHOPIFY_CHECKOUT_URL_KEY)
    } catch {}
  }

  const applyCoupon = (code: string, discountPercent: number) => {
    setAppliedCoupon(code)
    setCouponDiscountPercent(discountPercent)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponDiscountPercent(0)
  }

  const redirectToCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl
    } else {
      window.location.href = "/cart"
    }
  }

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const discountAmount = Math.round((subtotal * couponDiscountPercent) / 100)
  const totalPrice = Math.max(0, subtotal - discountAmount)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addToCart: addItem, // Alias for backward compatibility
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
        shopifyCartId,
        checkoutUrl,
        isLoadingCart,
        redirectToCheckout,
        isCartOpen,
        openCart,
        closeCart,
        setIsCartOpen,
        cartError,
        clearCartError,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
