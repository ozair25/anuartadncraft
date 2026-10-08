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
import { StudioPromoVideo } from "@/components/studio-promo-video"
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
  Play,
  ArrowRight,
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
              Led by proprietor and master artist Yashaswee Sanghawi, Anu Arts &amp; Craft Studio is Central India&apos;s sanctuary for fine art education, curated premium materials, and heartfelt craftsmanship.
            </p>
          </div>
        </section>

        {/* Founder & Studio Story */}
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Studio Photo */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-[460px] rounded-2xl overflow-hidden shadow-lg bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1790512023/anu_studio_ppg0ne.jpg"
                  alt="Anu Arts Studio"
                  className="w-full h-auto block object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = "/images/anu-studio.jpg"
                  }}
                />
              </div>

              {/* Stat Badge placed cleanly below without overlapping the image */}
              <div className="mt-4 w-full max-w-[460px] bg-white rounded-2xl p-3.5 sm:p-4 shadow-md border border-pink-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#7c2d8a] flex items-center justify-center font-serif font-black text-xl shrink-0">
                  10+
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Years of Mentorship</p>
                  <p className="text-[10px] text-stone-500">Over 10,000+ happy students</p>
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-6">
              <RibbonLabel>About Anu Arts</RibbonLabel>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Creativity Belongs to <span className="text-[#7c2d8a]">Everyone</span>
              </h2>
              <p className="text-sm text-stone-700 leading-relaxed font-medium">
                At Anu Arts, we believe creativity belongs to everyone. We’re committed to bringing you quality art materials, thoughtfully curated DIY kits, and engaging workshops that make exploring art easy and enjoyable.
              </p>
              <div className="rounded-2xl bg-purple-50/70 border border-purple-100 p-4 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7c2d8a]">Our Mission</span>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  Our mission is to build a vibrant community that celebrates creativity in every form. From beginners discovering a new hobby to experienced artists exploring new techniques, our workshops and expert guidance are designed to inspire, learn and create.
                </p>
              </div>

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
                  <h3 className="font-serif font-bold text-xs text-stone-900">Curated DIY Kits</h3>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Complete all-in-one kits for kids, beginners &amp; hobby artists.
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
                  href="/shop"
                  className="border border-[#7c2d8a] text-[#7c2d8a] hover:bg-purple-50 text-xs font-bold px-6 py-3 rounded-full transition-all"
                >
                  Browse Art Supplies &amp; Kits
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Experience & Promotional Reel Showcase */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-purple-900 via-[#7c2d8a] via-[#5b1f68] to-stone-950 p-6 sm:p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Promo Video Reel (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <StudioPromoVideo
                  videoUrl="https://res.cloudinary.com/dtrvyelcg/video/upload/v1791472095/anuarts.vid1_1_o3f0w5.mp4"
                  posterUrl="https://res.cloudinary.com/dtrvyelcg/video/upload/v1791472095/anuarts.vid1_1_o3f0w5.jpg"
                  title="Anu Arts Studio Experience"
                  subtitle="A glimpse of our creative workshops, art supplies & inspiring energy in Indore"
                  badgeText="Official Studio Reel"
                />
              </div>

              {/* Explanatory Text and Features (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold tracking-widest uppercase border border-white/20">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Experience The Studio In Action</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Step Inside Our <span className="text-amber-300 italic">Creative Haven</span>
                </h2>

                <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-normal">
                  Watch the magic unfold! Located at 30, Chandralok Colony in Indore, Anu Arts &amp; Craft Studio is a thriving community hub where curiosity turns into mastery. From masterclasses with Yashaswee Sanghawi to curated DIY kits and top-grade resin and decoupage essentials, every corner inspires your next masterpiece.
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                      <Star className="h-4 w-4 fill-amber-300" />
                      <span>Live Masterclasses</span>
                    </div>
                    <p className="text-xs text-purple-150 leading-relaxed">
                      Hands-on step-by-step guidance in Resin Art, Lippan Art, Acrylics, Knife Painting &amp; Mix-Media.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-pink-300 text-xs font-bold uppercase tracking-wider">
                      <Palette className="h-4 w-4" />
                      <span>2,500+ Curated Supplies</span>
                    </div>
                    <p className="text-xs text-purple-150 leading-relaxed">
                      Browse shelves packed with epoxy resins, precision MDF cutouts, textured cardstocks &amp; imported mediums.
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setBookModalOpen(true)}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    Book a Studio Workshop
                  </button>

                  <a
                    href="https://wa.me/919425356009?text=Hello%20Anu%20Arts%2C%20I%20watched%20the%20studio%20video%20and%20want%20to%20know%20more!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Yashaswee</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milestone Counters */}
        <section className="bg-gradient-to-r from-purple-900 via-[#7c2d8a] to-amber-600 py-12 px-4 text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-serif text-3xl sm:text-5xl font-black text-amber-300">10,000+</p>
              <p className="text-xs sm:text-sm text-purple-150 mt-1">Happy Students</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-5xl font-black text-amber-300">500+</p>
              <p className="text-xs sm:text-sm text-purple-150 mt-1">Workshops Conducted</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-5xl font-black text-amber-300">2500+</p>
              <p className="text-xs sm:text-sm text-purple-150 mt-1">Products Available</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-5xl font-black text-amber-300">10+</p>
              <p className="text-xs sm:text-sm text-purple-150 mt-1">Years of Creativity &amp; Trust</p>
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
