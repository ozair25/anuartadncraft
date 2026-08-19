"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AnuArtsTemplate } from "@/components/anu-arts-template"
import { SiteFooter } from "@/components/site-footer"
import { CartDrawer } from "@/components/cart-drawer"
import { BookClassModal } from "@/components/book-class-modal"

export default function Page() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isBookClassOpen, setIsBookClassOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fffaff] text-[#1c1917] font-sans antialiased selection:bg-pink-200 selection:text-purple-900">
      <SiteHeader
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBookClass={() => setIsBookClassOpen(true)}
      />
      <main>
        <Hero
          onExploreWorkshops={() => {
            const el = document.getElementById("workshops-section")
            if (el) el.scrollIntoView({ behavior: "smooth" })
          }}
          onVisitStore={() => {
            const el = document.getElementById("shop-section")
            if (el) el.scrollIntoView({ behavior: "smooth" })
          }}
        />
        <AnuArtsTemplate
          onOpenCart={() => setIsCartOpen(true)}
          onOpenBookClass={(cat) => setIsBookClassOpen(true)}
        />
      </main>
      <SiteFooter />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <BookClassModal
        isOpen={isBookClassOpen}
        onClose={() => setIsBookClassOpen(false)}
      />
    </div>
  )
}
