"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { ArrowRight, ShoppingBag, Palette, Users, GraduationCap, Sparkles } from "lucide-react"

interface HeroProps {
  onExploreWorkshops?: () => void
  onVisitStore?: () => void
  onContact?: () => void
}

export function Hero({ onExploreWorkshops, onVisitStore, onContact }: HeroProps) {
  const router = useRouter()


  return (
    <section className="relative overflow-hidden -mt-[80px] ml-0 pt-[20px] pr-[5px] pb-16 sm:pb-24 lg:pb-28 min-h-[600px] sm:min-h-[720px] md:min-h-[780px] lg:min-h-[860px] flex flex-col justify-between text-stone-900">
      
      {/* 1. Hero Wallpaper Background - Full Complete Artwork (Lower Butterfly Visible & Uncropped) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Mobile Background Image - Positioned to preserve full butterfly artwork */}
        <img
          src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1787510776/ChatGPT_Image_Aug_24_2026_12_15_53_AM_wnv7yt.png"
          alt="Hero Wallpaper Mobile Background"
          className="block sm:hidden w-full h-full object-cover object-bottom opacity-90"
        />

        {/* Desktop / Tablet Background Image - Positioned to display complete artwork as original */}
        <img
          src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1787510688/ChatGPT_Image_Aug_24_2026_12_14_23_AM_v94ea4.png"
          alt="Hero Wallpaper Background"
          className="hidden sm:block w-full h-full object-cover object-center lg:object-[80%_0%] opacity-95"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-2xl lg:max-w-4xl flex flex-col items-start text-left space-y-6 sm:space-y-7 lg:-translate-x-[6%] xl:-translate-x-[8%]">
          
          {/* Tagline / Eyebrow with Purple-to-Yellow-Orange gradient accent */}
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#7c2d8a] bg-white/95 sm:bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-pink-300/90 sm:border-pink-200/90 shadow-xs">
            <span className="bg-gradient-to-r from-[#7c2d8a] via-[#d92672] to-[#f59e0b] bg-clip-text text-transparent">
              CREATE. LEARN. INSPIRE.
            </span>
            <span className="w-8 h-[2.5px] bg-gradient-to-r from-[#7c2d8a] via-[#d92672] via-pink-400 to-[#f59e0b] rounded-full" />
          </div>

          {/* Main Headline (Exact Layout & Typography with clean dark text shadow for mobile) */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-black text-black sm:text-stone-950 leading-[1.12] tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.3)] sm:[text-shadow:none] ml-0 mt-[51px] sm:mt-[56px] w-[339.45px] h-[96.9125px] sm:w-auto sm:h-auto max-w-full">
            Where Your
            <br />
            Ideas{" "}
            <span className="font-script text-red-700 sm:text-red-600 font-extrabold sm:font-bold italic text-5xl sm:text-6xl lg:text-[76px] tracking-normal inline-block ml-1 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)] sm:[text-shadow:none]">
              Come to Life.
            </span>
          </h1>

          {/* Subheading / Description - White Only */}
          <p
            id="hero-subheading-description"
            className="text-white text-sm sm:text-[20px] max-w-xl sm:max-w-2xl lg:max-w-3xl font-semibold leading-relaxed sm:leading-[1.55] [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]"
          >
            Anu Arts is your one-stop destination for art and craft materials,
            creative workshops and endless inspiration.
          </p>

          {/* Action Buttons - Styled exactly to match reference pill design */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1 w-full sm:w-auto">
            {/* Primary Button: EXPLORE WORKSHOPS with Gold Border & Deep Royal Plum Gradient */}
            <Link
              href="/workshops"
              onClick={onExploreWorkshops}
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#2c0e35] via-[#481757] to-[#250a2e] hover:from-[#351240] hover:via-[#521b63] hover:to-[#2c0e35] text-[#f5e2b3] font-serif font-semibold text-[12px] sm:text-[13.5px] uppercase tracking-[0.2em] px-7 sm:px-8 py-3 sm:py-3.5 rounded-full border-[1.5px] border-[#dfb76c] hover:border-[#ebd59b] shadow-[0_4px_16px_rgba(44,14,53,0.35)] hover:shadow-[0_6px_24px_rgba(223,183,108,0.28)] hover:scale-[1.02] transition-all duration-300 cursor-pointer group whitespace-nowrap"
            >
              <span>EXPLORE WORKSHOPS</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[1.6] text-[#f5e2b3] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary Button: VISIT OUR STORE with Cream Background & Plum Serif Typography */}
            <Link
              href="/shop"
              onClick={onVisitStore}
              className="inline-flex items-center justify-center gap-2.5 bg-[#fcf5eb] hover:bg-white text-[#3b1548] font-serif font-semibold text-[12px] sm:text-[13.5px] uppercase tracking-[0.2em] px-7 sm:px-8 py-3 sm:py-3.5 rounded-full border border-[#eddcc4] hover:border-[#dfc8a7] shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all duration-300 cursor-pointer group whitespace-nowrap"
            >
              <span>VISIT OUR STORE</span>
              <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[1.8] text-[#3b1548] group-hover:scale-105 transition-transform" />
            </Link>
          </div>

          {/* 3 Value Pillars / Feature Badges - 25% larger on desktop & bolder text in desktop view */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-[43px] sm:pt-9 -ml-[2px] sm:ml-0 -mt-[27px] sm:mt-1 border-t border-pink-200/60 w-full">
            
            {/* 1. Quality Materials (Purple) */}
            <div className="flex items-start gap-2.5 sm:gap-3.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-purple-100/95 text-[#7c2d8a] flex items-center justify-center shrink-0 shadow-2xs border border-purple-200/60">
                <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h2 id="hero-pillar-quality-materials" className="text-xs sm:text-[15px] font-black sm:font-extrabold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] sm:leading-tight">Quality Materials</h2>
                <p className="text-[11px] sm:text-[13.5px] text-stone-900 sm:text-stone-800 font-bold sm:font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] sm:[text-shadow:none] sm:leading-snug sm:mt-0.5">Premium art &amp; craft supplies</p>
              </div>
            </div>

            {/* 2. Creative Workshops (Pink / Rose) */}
            <div className="flex items-start gap-2.5 sm:gap-3.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-pink-100/95 text-[#d92672] flex items-center justify-center shrink-0 shadow-2xs border border-pink-200/60">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h2 id="hero-pillar-creative-workshops" className="text-xs sm:text-[15px] font-black sm:font-extrabold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] sm:leading-tight">Creative Workshops</h2>
                <p className="text-[11px] sm:text-[13.5px] text-stone-900 sm:text-stone-800 font-bold sm:font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] sm:[text-shadow:none] sm:leading-snug sm:mt-0.5">For all age groups</p>
              </div>
            </div>

            {/* 3. Learn & Grow (Warm Yellow-Orange / Gold Accent) */}
            <div className="flex items-start gap-2.5 sm:gap-3.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-800 flex items-center justify-center shrink-0 shadow-2xs border border-amber-200/70">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h2 id="hero-pillar-learn-and-grow" className="text-xs sm:text-[15px] font-black sm:font-extrabold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] sm:leading-tight">Learn &amp; Grow</h2>
                <p className="text-[11px] sm:text-[13.5px] text-stone-900 sm:text-stone-800 font-bold sm:font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] sm:[text-shadow:none] sm:leading-snug sm:mt-0.5">Explore. Create. Inspire.</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Desktop View: Fancy Animated Contact Button floating over the sunset water vista */}
      <div className="hidden sm:flex justify-center items-center w-full z-10 pt-5 pb-3">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative group"
        >
          {/* Radiant animated sunset glow / ambient aurora */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 opacity-55 blur-md group-hover:opacity-90 group-hover:blur-xl transition-all duration-500 animate-pulse" />

          {/* Shimmering gradient border ring */}
          <div className="absolute -inset-[1.5px] rounded-full bg-gradient-to-r from-amber-300 via-pink-400 via-fuchsia-400 to-amber-300 opacity-80 group-hover:opacity-100 transition-opacity" />

          <Link
            href="/contact"
            onClick={onContact}
            className="relative flex items-center gap-3.5 bg-white/95 hover:bg-white text-stone-900 px-6 py-3 rounded-full backdrop-blur-md shadow-[0_12px_32px_rgba(124,45,138,0.22),0_4px_12px_rgba(245,158,11,0.2),inset_0_1px_1px_rgba(255,255,255,1)] hover:scale-[1.03] transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Animated continuous light sheen / shimmer wave */}
            <motion.span
              animate={{ x: ["-120%", "240%"] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", repeatDelay: 2 }}
              className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 pointer-events-none"
            />

            {/* Glowing Icon Badge with status pulse */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-[#7c2d8a] via-[#d92672] to-[#f59e0b] text-white shadow-sm shrink-0">
              <Sparkles className="h-4 w-4 animate-spin [animation-duration:8s]" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 border border-white" />
              </span>
            </div>

            {/* Label and Eyebrow Text */}
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] bg-gradient-to-r from-[#7c2d8a] via-[#d92672] to-[#ea580c] bg-clip-text text-transparent">
                Questions or Custom Art?
              </span>
              <span className="text-sm font-black text-stone-950 tracking-tight flex items-center gap-1.5">
                <span>Contact Us</span>
                <span className="text-xs font-semibold text-stone-500">• We&apos;d love to connect</span>
              </span>
            </div>

            {/* Circular hover interactive arrow */}
            <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-[#7c2d8a] text-stone-700 group-hover:text-white flex items-center justify-center transition-colors duration-200 shrink-0 ml-1">
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
