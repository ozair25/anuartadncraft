"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { TrustFeatures } from "@/components/trust-features"
import { Community } from "@/components/community"
import { CartDrawer } from "@/components/cart-drawer"
import { BookClassModal } from "@/components/book-class-modal"
import {
  Palette,
  Sparkles,
  Award,
  Heart,
  Users,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Camera,
  MessageCircle,
  Clock,
  Star,
} from "lucide-react"

export default function AboutPage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [bookModalOpen, setBookModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fffaff] flex flex-col font-sans text-stone-800">
      <SiteHeader
        onOpenCart={() => setCartOpen(true)}
        onOpenBookClass={() => setBookModalOpen(true)}
      />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-[#7c2d8a] via-[#d92672] to-amber-500 py-16 px-4 text-white text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Our Story, Philosophy &amp; Vision
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Fueling Creativity for <span className="text-amber-300 italic">Every Artist</span>
            </h1>
            <p className="text-sm sm:text-base text-purple-100 max-w-2xl mx-auto font-medium">
              Founded by master artist Anu Jain, Anu Arts &amp; Craft Studio is a sanctuary for fine art education, curated premium materials, and heartfelt craftsmanship.
            </p>
          </div>
        </section>

        {/* Founder & Studio Story */}
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Studio Photo Collage */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop"
                  alt="Anu Arts Studio Painting Session"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-2xl p-4 shadow-xl border border-pink-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#7c2d8a] flex items-center justify-center font-serif font-black text-xl">
                  12+
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Years of Mentorship</p>
                  <p className="text-[10px] text-stone-500">Over 5,000+ happy students</p>
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-6">
              <RibbonLabel>Founder&apos;s Journey</RibbonLabel>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Where Passion Meets <span className="text-[#7c2d8a]">Fine Craftsmanship</span>
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                What began as an intimate weekend gathering around a watercolor palette in Jabalpur has blossomed into one of Central India&apos;s most beloved art academies and trusted specialty art supply destinations.
              </p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Under the visionary guidance of <strong>Anu Jain</strong>, the studio champions a tactile, mindful approach to creative learning. We believe art is not reserved for the few—it is a deeply restorative practice accessible to curious children, busy professionals, and seasoned masters alike.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-2xs">
                  <Palette className="h-5 w-5 text-[#d92672] mb-1.5" />
                  <h3 className="font-serif font-bold text-xs text-stone-900">Archival Materials</h3>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Every pigment, canvas, and brush tested personally in our studio.
                  </p>
                </div>
                <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-2xs">
                  <Users className="h-5 w-5 text-[#7c2d8a] mb-1.5" />
                  <h3 className="font-serif font-bold text-xs text-stone-900">Intimate Batches</h3>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Strict batch caps (10-15 students) to ensure dedicated 1-on-1 feedback.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/workshops"
                  className="bg-[#7c2d8a] hover:bg-purple-800 text-white text-xs font-bold px-6 py-3 rounded-full shadow-md transition-all hover:scale-105"
                >
                  Explore Studio Workshops
                </Link>
                <Link
                  href="/gallery"
                  className="border border-[#7c2d8a] text-[#7c2d8a] hover:bg-purple-50 text-xs font-bold px-6 py-3 rounded-full transition-all"
                >
                  View Student Gallery
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Milestone Counters */}
        <section className="bg-gradient-to-r from-purple-900 via-[#7c2d8a] to-amber-600 py-12 px-4 text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-serif text-3xl sm:text-5xl font-black text-amber-300">5,000+</p>
              <p className="text-xs sm:text-sm text-purple-150 mt-1">Students Mentored</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-5xl font-black text-amber-300">450+</p>
              <p className="text-xs sm:text-sm text-purple-150 mt-1">Workshops Conducted</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-5xl font-black text-amber-300">100%</p>
              <p className="text-xs sm:text-sm text-purple-150 mt-1">Authentic Art Supplies</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-5xl font-black text-amber-300">4.9 ★</p>
              <p className="text-xs sm:text-sm text-purple-150 mt-1">Google &amp; Social Rating</p>
            </div>
          </div>
        </section>

        {/* Values & Trust */}
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <TrustFeatures />
          <div className="mt-16">
            <Community />
          </div>
        </section>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      {bookModalOpen && (
        <BookClassModal isOpen={bookModalOpen} onClose={() => setBookModalOpen(false)} />
      )}
      <SiteFooter />
    </div>
  )
}
