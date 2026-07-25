"use client"

import React from "react"
import { CartProvider } from "@/lib/context/cart-context"
import { WishlistProvider } from "@/lib/context/wishlist-context"
import { AuthProvider } from "@/lib/context/auth-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
