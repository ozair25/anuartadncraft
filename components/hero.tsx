"use client"

import Link from "next/link"
import { ArrowRight, Store } from "lucide-react"

interface HeroProps {
  onExploreWorkshops?: () => void
  onVisitStore?: () => void
  onContact?: () => void
}

export function Hero({ onExploreWorkshops, onVisitStore, onContact }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden border-b border-pink-100/60 bg-[#fffbf5]">
      {/* Full Hero Banner at 100% Maximum Opacity */}
      <Link
        href="/shop"
        onClick={onVisitStore}
        className="block relative w-full focus:outline-hidden transition-opacity hover:opacity-98"
        title="Explore Anu Arts Studio & Art Supplies"
      >
        <picture className="w-full block">
          {/* Mobile View Hero Banner (<640px) */}
          <source
            media="(max-width: 639px)"
            srcSet="https://res.cloudinary.com/dtrvyelcg/image/upload/v1790519719/ChatGPT_Image_Sep_27_2026_08_04_51_PM_zvud1o.png"
          />
          {/* Desktop & Tablet Hero Banner (>=640px) */}
          <source
            media="(min-width: 640px)"
            srcSet="https://res.cloudinary.com/dtrvyelcg/image/upload/v1790518333/ChatGPT_Image_Sep_27_2026_07_34_44_PM_o155pl.png"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1790518333/ChatGPT_Image_Sep_27_2026_07_34_44_PM_o155pl.png"
            alt="Anu Arts & Craft Studio Hero Banner"
            className="w-full h-auto max-h-[85vh] sm:max-h-[720px] object-cover object-center block"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = "/images/hero-banner-bg.png"
            }}
          />
        </picture>
      </Link>

      {/* Hero CTA Buttons - placed between Hero Background and Special Welcome Offer */}
      <div className="relative z-10 w-full pt-5 pb-6 sm:pt-7 sm:pb-8 lg:pt-9 lg:pb-12 px-4 bg-gradient-to-b from-[#fffbf5] via-[#fff8fc] to-[#fffaff]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 md:gap-6">
          <Link
            href="/workshops"
            onClick={onExploreWorkshops}
            className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#2c0e35] via-[#481757] to-[#250a2e] hover:from-[#351240] hover:via-[#521b63] hover:to-[#2c0e35] text-[#f5e2b3] font-serif font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] px-7 sm:px-9 py-3.5 sm:py-4 rounded-full border-[1.5px] border-[#dfb76c] hover:border-[#ebd59b] shadow-[0_4px_16px_rgba(44,14,53,0.25)] hover:shadow-[0_6px_24px_rgba(223,183,108,0.25)] hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer group whitespace-nowrap"
          >
            <span>EXPLORE WORKSHOPS</span>
            <ArrowRight className="h-4 w-4 text-[#f5e2b3] group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/shop"
            onClick={onVisitStore}
            className="inline-flex items-center justify-center gap-2.5 bg-[#fcf5eb] hover:bg-white text-[#3b1548] font-serif font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] px-7 sm:px-9 py-3.5 sm:py-4 rounded-full border border-[#eddcc4] hover:border-[#dfc8a7] shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer group whitespace-nowrap"
          >
            <span>VISIT OUR STORE</span>
            <Store className="h-4 w-4 stroke-[1.8] text-[#3b1548] group-hover:scale-105 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

