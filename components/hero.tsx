"use client"

import { useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"

const CLOUDINARY_MOBILE_VIDEO = "https://res.cloudinary.com/dtrvyelcg/video/upload/v1784972309/Animation_of_rays_emerging_from_202607251445_infb4s.mp4"
const CLOUDINARY_MOBILE = "https://res.cloudinary.com/dtrvyelcg/image/upload/v1784924133/ChatGPT_Image_Jul_25_2026_01_45_19_AM_nsizt2.png"
const CLOUDINARY_DESKTOP = "https://res.cloudinary.com/dtrvyelcg/image/upload/v1784845911/ChatGPT_Image_Jul_24_2026_04_01_21_AM_lymb7u.png"

export function Hero() {
  const [mobileImgSrc, setMobileImgSrc] = useState(CLOUDINARY_MOBILE)
  const [desktopImgSrc, setDesktopImgSrc] = useState(CLOUDINARY_DESKTOP)
  const [mobileFailed, setMobileFailed] = useState(false)
  const [desktopFailed, setDesktopFailed] = useState(false)

  const handleMobileError = () => {
    if (!mobileFailed) {
      setMobileFailed(true)
      setMobileImgSrc("/images/hero-mobile.png")
    }
  }

  const handleDesktopError = () => {
    if (!desktopFailed) {
      setDesktopFailed(true)
      setDesktopImgSrc("/images/hero-desktop.png")
    }
  }

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Full-bleed hero background (Mobile Video vs Desktop Image) */}
      <div className="absolute inset-0">
        {/* Mobile background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={mobileImgSrc}
          className="h-full w-full object-cover object-center opacity-100 sm:hidden"
        >
          <source src={CLOUDINARY_MOBILE_VIDEO} type="video/mp4" />
          {/* Fallback image if video is not supported */}
          <img
            src={mobileImgSrc}
            onError={handleMobileError}
            alt="Anu Arts Mobile Hero Banner"
            className="h-full w-full object-cover object-center"
          />
        </video>
        {/* Desktop background image */}
        <img
          src={desktopImgSrc}
          onError={handleDesktopError}
          alt="Anu Arts Hero Banner - Art, Craft & DIY Supplies"
          className="hidden h-full w-full object-cover object-center opacity-100 sm:block"
          referrerPolicy="no-referrer"
          decoding="async"
        />
      </div>

      <div className="relative mx-auto grid min-h-[420px] max-w-7xl items-center gap-8 -mt-[25px] sm:mt-0 md:-mt-[47px] -ml-[9px] sm:ml-0 md:ml-[77px] pt-[55px] pb-14 sm:py-14 md:py-20 px-4 md:px-6 md:min-h-[520px] lg:min-h-[560px] lg:grid-cols-2">
        {/* Copy shifted left with drop shadow for legibility over full bright background */}
        <div className="relative z-10 max-w-xl py-2 pl-0 sm:pl-2">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-cream/95 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            Art &middot; Craft &middot; DIY
          </span>
          <h1 className="font-serif text-[42px] leading-[46.4px] font-bold text-left text-[#000000] text-balance md:text-6xl lg:text-7xl md:font-black md:leading-[1.05] md:text-foreground drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
            Every <span className="italic text-[#ff0414]">Masterpiece</span> Starts With Imagination.
          </h1>
          <p
            className="mt-6 max-w-md leading-relaxed text-[#f2e9c8] font-bold text-left italic md:not-italic md:text-foreground md:font-semibold md:font-sans drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] md:drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)] no-underline"
            style={{ fontFamily: 'var(--font-mobile-tnr, "Times New Roman", Times, serif)' }}
          >
            Browse through an extensive collection of crafting tools, DIY kits, and seasonal items.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="/shop"
              className="group inline-flex items-center gap-3 rounded-md bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-[4px_4px_0_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(0,0,0,0.18)]"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/collections"
              className="text-sm font-bold sm:font-semibold uppercase tracking-wide text-[#ff0000] sm:text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
            >
              Explore Collections
            </a>
          </div>
        </div>

        {/* Creative floating note over the artwork */}
        <div className="relative hidden lg:block">
          <div className="absolute bottom-0 right-2 rotate-[-5deg]">
            {/* washi tape accents */}
            <span className="absolute -left-3 -top-3 h-6 w-16 rotate-[-12deg] bg-primary/70 shadow-sm" aria-hidden="true" />
            <span className="absolute -right-3 -top-2 h-6 w-14 rotate-[10deg] bg-foreground/20 shadow-sm" aria-hidden="true" />
            <div className="bg-cream-dark px-6 py-4 shadow-[6px_6px_0_rgba(0,0,0,0.15)]">
              <p className="font-serif text-2xl italic leading-tight text-foreground">
                Focus
                <br />
                Create
                <br />
                Inspire
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
