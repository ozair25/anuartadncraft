"use client"

import { ArrowRight, ShoppingBag, Palette, Users, GraduationCap } from "lucide-react"

interface HeroProps {
  onExploreWorkshops?: () => void
  onVisitStore?: () => void
}

export function Hero({ onExploreWorkshops, onVisitStore }: HeroProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#fffaff] text-stone-900 pt-6 pb-12 sm:py-14 lg:py-16">
      
      {/* 1. Hero Wallpaper Background Provided by User - 79% Opacity */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Mobile Background Image */}
        <img
          src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1787169984/ChatGPT_Image_Aug_20_2026_01_30_21_AM_zj2nzx.png"
          alt="Hero Wallpaper Mobile Background"
          className="block sm:hidden w-full h-full object-cover object-center opacity-[0.79]"
        />
        {/* Desktop / Tablet Background Image */}
        <img
          src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1787168731/ChatGPT_Image_Aug_20_2026_01_14_57_AM_rpgvwn.png"
          alt="Hero Wallpaper Background"
          className="hidden sm:block w-full h-full object-cover object-center opacity-[0.79]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-2xl flex flex-col items-start text-left space-y-6 sm:space-y-7">
          
          {/* Tagline / Eyebrow with Purple-to-Yellow-Orange gradient accent */}
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#7c2d8a] bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-pink-200/80 shadow-2xs">
            <span className="bg-gradient-to-r from-[#7c2d8a] via-[#d92672] to-[#f59e0b] bg-clip-text text-transparent">
              CREATE. LEARN. INSPIRE.
            </span>
            <span className="w-8 h-[2.5px] bg-gradient-to-r from-[#7c2d8a] via-[#d92672] via-pink-400 to-[#f59e0b] rounded-full" />
          </div>

          {/* Main Headline (Exact Layout & Typography) */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-black text-stone-900 leading-[1.12] tracking-tight drop-shadow-xs">
            Where Your
            <br />
            Ideas{" "}
            <span className="font-script text-[#fb8404] font-bold italic text-5xl sm:text-6xl lg:text-[76px] tracking-normal inline-block ml-1">
              Come to Life.
            </span>
          </h1>

          {/* Subheading / Description */}
          <p className="text-black text-sm sm:text-base max-w-xl font-medium leading-relaxed drop-shadow-xs">
            Anu Arts is your one-stop destination for art and craft materials,
            creative workshops and endless inspiration.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1 w-full sm:w-auto">
            {/* Primary Button */}
            <button
              type="button"
              onClick={onExploreWorkshops || (() => scrollToSection("workshops-section"))}
              className="inline-flex items-center justify-center gap-2 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 rounded-full shadow-lg shadow-purple-900/15 hover:shadow-purple-900/25 hover:scale-[1.02] transition-all cursor-pointer group"
            >
              <span>Explore Workshops</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Secondary Button */}
            <button
              type="button"
              onClick={onVisitStore || (() => scrollToSection("shop-section"))}
              className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-stone-800 border border-amber-200/90 hover:border-amber-300 text-xs sm:text-sm font-bold px-5 sm:px-6 py-3 rounded-full hover:scale-[1.02] transition-all cursor-pointer shadow-xs"
            >
              <span>Visit Our Store</span>
              <ShoppingBag className="h-4 w-4 text-[#d92672]" />
            </button>
          </div>

          {/* 3 Value Pillars / Feature Badges - Free-standing without glass box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-[43px] border-t border-pink-200/60 w-full">
            
            {/* 1. Quality Materials (Purple) */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100/90 text-[#7c2d8a] flex items-center justify-center shrink-0 shadow-2xs border border-purple-200/50">
                <Palette className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-stone-900">Quality Materials</h2>
                <p className="text-[11px] text-stone-600 font-medium">Premium art &amp; craft supplies</p>
              </div>
            </div>

            {/* 2. Creative Workshops (Pink / Rose) */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-100/90 text-[#d92672] flex items-center justify-center shrink-0 shadow-2xs border border-pink-200/50">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-stone-900">Creative Workshops</h2>
                <p className="text-[11px] text-stone-600 font-medium">For all age groups</p>
              </div>
            </div>

            {/* 3. Learn & Grow (Warm Yellow-Orange / Gold Accent) */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs border border-amber-200/60">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-stone-900">Learn &amp; Grow</h2>
                <p className="text-[11px] text-stone-600 font-medium">Explore. Create. Inspire.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
