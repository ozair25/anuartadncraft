"use client"

import React from "react"
import Link from "next/link"

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "light" | "dark" | "full"
  showTagline?: boolean
  className?: string
}

const CLOUDINARY_LOGO_URL =
  "https://res.cloudinary.com/dtrvyelcg/image/upload/v1787091041/anu_logo_cszhou.jpg"

export function BrandLogo({
  size = "md",
  variant = "dark",
  showTagline = false,
  className = "",
}: BrandLogoProps) {
  const isLight = variant === "light"

  // Sizing configurations - enlarged to fill header appropriately
  const heightStyle =
    size === "sm"
      ? { height: "42px", maxHeight: "42px", maxWidth: "160px" }
      : size === "lg"
      ? { height: "68px", maxHeight: "72px", maxWidth: "280px" }
      : size === "xl"
      ? { height: "82px", maxHeight: "88px", maxWidth: "340px" }
      : { height: "58px", maxHeight: "64px", maxWidth: "240px" }

  const containerClasses =
    size === "sm"
      ? "h-10 sm:h-11 w-auto"
      : size === "lg"
      ? "h-16 sm:h-18 md:h-20 w-auto"
      : size === "xl"
      ? "h-20 sm:h-22 md:h-24 w-auto"
      : "h-14 sm:h-16 w-auto"

  return (
    <Link
      href="/"
      className={`group inline-flex items-center select-none transition-transform hover:scale-[1.02] duration-200 ${className}`}
      aria-label="Anu Arts & Craft Home"
    >
      <div
        className={`relative flex items-center justify-center ${containerClasses} ${
          isLight
            ? "bg-white/95 rounded-2xl px-3 py-1.5 shadow-xs border border-purple-200/50 backdrop-blur-xs"
            : ""
        }`}
      >
        {/* Logo Image with Cloudinary URL & Local Fallback */}
        <div className="relative flex items-center h-full w-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CLOUDINARY_LOGO_URL}
            alt="Anu Arts & Craft Logo"
            className={`h-full w-auto object-contain transition-all duration-300 drop-shadow-xs ${
              isLight ? "brightness-100" : "mix-blend-multiply"
            }`}
            style={{
              maxHeight: heightStyle.maxHeight,
              maxWidth: heightStyle.maxWidth,
            }}
            loading="eager"
            onError={(e) => {
              // Fallback to locally downloaded copy
              const target = e.currentTarget
              if (target.src !== "/images/anu-logo.jpg") {
                target.src = "/images/anu-logo.jpg"
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
