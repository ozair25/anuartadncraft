"use client"

import React from "react"
import Link from "next/link"

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "light" | "dark" | "full"
  showTagline?: boolean
  className?: string
}

// Clean, high-resolution transparent logo without border lines or card backgrounds
const LOGO_SRC = "/images/anu-arts-logo.png"
const FALLBACK_LOGO_SRC = "/images/anu-logo.png"

export function BrandLogo({
  size = "md",
  variant = "dark",
  showTagline = false,
  className = "",
}: BrandLogoProps) {
  const isLight = variant === "light"

  // Sizing configurations - balanced to fit header and footer naturally
  const heightStyle =
    size === "sm"
      ? { height: "38px", maxHeight: "40px", maxWidth: "150px" }
      : size === "lg"
      ? { height: "56px", maxHeight: "64px", maxWidth: "260px" }
      : size === "xl"
      ? { height: "76px", maxHeight: "84px", maxWidth: "320px" }
      : { height: "48px", maxHeight: "54px", maxWidth: "210px" }

  const containerClasses =
    size === "sm"
      ? "h-8 sm:h-9 md:h-10 w-auto"
      : size === "lg"
      ? "h-10 sm:h-14 md:h-16 w-auto"
      : size === "xl"
      ? "h-14 sm:h-18 md:h-20 w-auto"
      : "h-9 sm:h-12 md:h-13 w-auto"

  return (
    <Link
      href="/"
      prefetch={true}
      className={`group inline-flex items-center select-none transition-transform hover:scale-[1.02] duration-200 ${className}`}
      aria-label="Anu Arts & Craft Home"
    >
      <div
        className={`relative flex items-center justify-center ${containerClasses} bg-transparent border-0 shadow-none outline-none`}
      >
        {/* Seamless transparent Logo Image - No borders, no lines, no drop-shadow box */}
        <div className="relative flex items-center h-full w-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt="Anu Arts & Craft"
            className="h-full w-auto max-w-[135px] xs:max-w-[160px] sm:max-w-[240px] md:max-w-[260px] object-contain transition-all duration-300 border-0 shadow-none"
            style={{
              maxHeight: heightStyle.maxHeight,
            }}
            loading="eager"
            onError={(e) => {
              const target = e.currentTarget
              if (target.src !== FALLBACK_LOGO_SRC) {
                target.src = FALLBACK_LOGO_SRC
              }
            }}
          />
        </div>
      </div>

      {showTagline && (
        <span
          className={`font-semibold uppercase tracking-[0.16em] ${
            size === "sm" ? "text-[8px]" : size === "lg" ? "text-[11px]" : "text-[9px]"
          } ${
            isLight ? "text-purple-200" : "text-stone-500"
          } pl-1 mt-0.5`}
        >
          Art Supplies &amp; Craft Studio
        </span>
      )}
    </Link>
  )
}

