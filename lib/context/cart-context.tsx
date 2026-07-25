"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { CartItem, Product } from "@/types/ecommerce"

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, selectedOptions?: Record<string, string>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  appliedCoupon: string | null
  discountAmount: number
  applyCoupon: (code: string, discountPercent: number) => void
  removeCoupon: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "anu_arts_cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch (e) {
      console.error("Failed to load cart", e)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (product: Product, quantity = 1, selectedOptions?: Record<string, string>) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id)
      if (existingIdx > -1) {
        const updated = [...prev]
        updated[existingIdx].quantity += quantity
        return updated
      }
      return [...prev, { product, quantity, selectedOptions }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
    setAppliedCoupon(null)
    setCouponDiscountPercent(0)
  }

  const applyCoupon = (code: string, discountPercent: number) => {
    setAppliedCoupon(code)
    setCouponDiscountPercent(discountPercent)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponDiscountPercent(0)
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
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
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
