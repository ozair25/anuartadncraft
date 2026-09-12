"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AnuArtsTemplate } from "@/components/anu-arts-template"
import { SiteFooter } from "@/components/site-footer"
import { CartDrawer } from "@/components/cart-drawer"
import { BookClassModal } from "@/components/book-class-modal"
import { Product } from "@/types/ecommerce"
import { useCart } from "@/lib/context/cart-context"

export interface HomePageClientProps {
  initialProducts?: Product[]
}

export function HomePageClient({ initialProducts = [] }: HomePageClientProps) {
  const router = useRouter()
  const { isCartOpen, openCart, closeCart } = useCart()
  const [isBookClassOpen, setIsBookClassOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fffaff] text-[#1c1917] font-sans antialiased selection:bg-pink-200 selection:text-purple-900">
      <SiteHeader
        onOpenCart={openCart}
        onOpenBookClass={() => setIsBookClassOpen(true)}
      />
      <main>
        <Hero
          onExploreWorkshops={() => {
            router.push("/workshops")
          }}
          onVisitStore={() => {
            router.push("/shop")
          }}
          onContact={() => {
            router.push("/contact")
          }}
        />
        <AnuArtsTemplate
          initialProducts={initialProducts}
          onOpenCart={openCart}
          onOpenBookClass={() => setIsBookClassOpen(true)}
        />
      </main>
      <SiteFooter />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <BookClassModal
        isOpen={isBookClassOpen}
        onClose={() => setIsBookClassOpen(false)}
      />
    </div>
  )
}
