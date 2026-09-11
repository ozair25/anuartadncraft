"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, ShoppingBag, Palette, Users, GraduationCap } from "lucide-react"

interface HeroProps {
  onExploreWorkshops?: () => void
  onVisitStore?: () => void
}

export function Hero({ onExploreWorkshops, onVisitStore }: HeroProps) {
  const router = useRouter()


  return (
    <section className="relative overflow-hidden -mt-[80px] ml-0 pt-[20px] pr-[5px] pb-16 sm:pb-24 lg:pb-32 min-h-[600px] sm:min-h-[680px] md:min-h-[740px] lg:min-h-[820px] flex flex-col justify-between text-stone-900">
      
      {/* 1. Hero Wallpaper Background - Full Complete Artwork (Lower Butterfly Visible & Uncropped) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Mobile Background Image - Positioned to preserve full butterfly artwork */}
        <img
          src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1787510776/ChatGPT_Image_Aug_24_2026_12_15_53_AM_wnv7yt.png"
          alt="Hero Wallpaper Mobile Background"
          className="block sm:hidden w-full h-full object-cover object-bottom opacity-85"
        />

        {/* Desktop / Tablet Background Image - Positioned to display complete artwork as original */}
        <img
          src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1787510688/ChatGPT_Image_Aug_24_2026_12_14_23_AM_v94ea4.png"
          alt="Hero Wallpaper Background"
          className="hidden sm:block w-full h-full object-cover object-center lg:object-[80%_0%] opacity-95"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-2xl flex flex-col items-start text-left space-y-6 sm:space-y-7 lg:-translate-x-[10%] xl:-translate-x-[12%]">
          
          {/* Tagline / Eyebrow with Purple-to-Yellow-Orange gradient accent */}
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#7c2d8a] bg-white/95 sm:bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-pink-300/90 sm:border-pink-200/90 shadow-xs">
            <span className="bg-gradient-to-r from-[#7c2d8a] via-[#d92672] to-[#f59e0b] bg-clip-text text-transparent">
              CREATE. LEARN. INSPIRE.
            </span>
            <span className="w-8 h-[2.5px] bg-gradient-to-r from-[#7c2d8a] via-[#d92672] via-pink-400 to-[#f59e0b] rounded-full" />
          </div>

          {/* Main Headline (Exact Layout & Typography with high-contrast text shadow for mobile) */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-black text-black sm:text-stone-950 leading-[1.12] tracking-tight [text-shadow:0_0_14px_rgba(255,255,255,1),0_1px_4px_rgba(255,255,255,1)] sm:[text-shadow:0_2px_16px_rgba(255,255,255,1),0_1px_4px_rgba(255,255,255,0.9)] ml-0 mt-[51px] sm:mt-[83px]">
            Where Your
            <br />
            Ideas{" "}
            <span className="font-script text-red-700 sm:text-red-600 font-extrabold sm:font-bold italic text-5xl sm:text-6xl lg:text-[76px] tracking-normal inline-block ml-1 [text-shadow:0_0_14px_rgba(255,255,255,1),0_1px_5px_rgba(255,255,255,1)] sm:[text-shadow:0_2px_16px_rgba(255,255,255,1),0_1px_5px_rgba(255,255,255,0.9)]">
              Come to Life.
            </span>
          </h1>

          {/* Subheading / Description */}
          <p className="text-black sm:text-stone-950 text-sm sm:text-base max-w-xl font-semibold sm:font-normal leading-relaxed [text-shadow:0_0_12px_rgba(255,255,255,1),0_1px_3px_rgba(255,255,255,1)] sm:[text-shadow:0_1px_12px_rgba(255,255,255,0.95)]">
            Anu Arts is your one-stop destination for art and craft materials,
            creative workshops and endless inspiration.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1 w-full sm:w-auto">
            {/* Primary Button */}
            <Link
              href="/workshops"
              onClick={onExploreWorkshops}
              className="inline-flex items-center justify-center gap-2 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 rounded-full shadow-lg shadow-purple-900/15 hover:shadow-purple-900/25 hover:scale-[1.02] transition-all cursor-pointer group"
            >
              <span>Explore Workshops</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Secondary Button */}
            <Link
              href="/shop"
              onClick={onVisitStore}
              className="inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-stone-800 border border-amber-200/90 hover:border-amber-300 text-xs sm:text-sm font-bold px-5 sm:px-6 py-3 rounded-full hover:scale-[1.02] transition-all cursor-pointer shadow-xs"
            >
              <span>Visit Our Store</span>
              <ShoppingBag className="h-4 w-4 text-[#d92672]" />
            </Link>
          </div>

          {/* 3 Value Pillars / Feature Badges - Free-standing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-[43px] -ml-[2px] -mt-[27px] border-t border-pink-200/60 w-full">
            
            {/* 1. Quality Materials (Purple) */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100/95 text-[#7c2d8a] flex items-center justify-center shrink-0 shadow-2xs border border-purple-200/60">
                <Palette className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs font-black sm:font-bold text-black sm:text-stone-950 [text-shadow:0_0_8px_rgba(255,255,255,1)] sm:[text-shadow:0_1px_8px_rgba(255,255,255,0.9)]">Quality Materials</h2>
                <p className="text-[11px] text-stone-900 sm:text-stone-800 font-bold sm:font-medium [text-shadow:0_0_8px_rgba(255,255,255,1)] sm:[text-shadow:0_1px_8px_rgba(255,255,255,0.9)]">Premium art &amp; craft supplies</p>
              </div>
            </div>

            {/* 2. Creative Workshops (Pink / Rose) */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-100/95 text-[#d92672] flex items-center justify-center shrink-0 shadow-2xs border border-pink-200/60">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs font-black sm:font-bold text-black sm:text-stone-950 [text-shadow:0_0_8px_rgba(255,255,255,1)] sm:[text-shadow:0_1px_8px_rgba(255,255,255,0.9)]">Creative Workshops</h2>
                <p className="text-[11px] text-stone-900 sm:text-stone-800 font-bold sm:font-medium [text-shadow:0_0_8px_rgba(255,255,255,1)] sm:[text-shadow:0_1px_8px_rgba(255,255,255,0.9)]">For all age groups</p>
              </div>
            </div>

            {/* 3. Learn & Grow (Warm Yellow-Orange / Gold Accent) */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-800 flex items-center justify-center shrink-0 shadow-2xs border border-amber-200/70">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs font-black sm:font-bold text-black sm:text-stone-950 [text-shadow:0_0_8px_rgba(255,255,255,1)] sm:[text-shadow:0_1px_8px_rgba(255,255,255,0.9)]">Learn &amp; Grow</h2>
                <p className="text-[11px] text-stone-900 sm:text-stone-800 font-bold sm:font-medium [text-shadow:0_0_8px_rgba(255,255,255,1)] sm:[text-shadow:0_1px_8px_rgba(255,255,255,0.9)]">Explore. Create. Inspire.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
