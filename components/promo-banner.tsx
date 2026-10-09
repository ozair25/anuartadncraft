"use client"

import { useState } from "react"
import Link from "next/link"
import { Tag, Copy, Check, Sparkles, ArrowRight } from "lucide-react"

export function PromoBanner() {
  const [copied, setCopied] = useState(false)
  const couponCode = "FIRSTORDER10"

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(couponCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-2 sm:mt-5 lg:mt-8 mb-8 sm:mb-12 z-20">
      <div
        className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#2c0e35] via-[#481757] to-[#7c2d8a] text-white p-4 sm:p-5 lg:p-6 shadow-xl border border-pink-300/30 overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          {/* Offer Details */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center shrink-0 text-amber-300 shadow-inner">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-300">
                <Sparkles className="h-3 w-3" />
                <span>Special Welcome Offer</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white mt-0.5">
                NEW HERE? GET 10% OFF 🎉
              </h3>
              <p className="text-xs sm:text-sm text-purple-100/90 font-medium">
                Use code <span className="font-bold text-white tracking-wide">{couponCode}</span> on your first order.
              </p>
            </div>
          </div>

          {/* Copy Code & Shop CTA */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 text-white text-xs sm:text-sm font-mono font-bold px-4 py-2.5 rounded-full border border-white/30 transition-all cursor-pointer backdrop-blur-xs"
              title="Click to copy code"
              aria-label="Copy discount code"
            >
              <span className="tracking-widest">{couponCode}</span>
              {copied ? (
                <span className="flex items-center gap-1 text-emerald-300 text-xs font-sans font-bold">
                  <Check className="h-3.5 w-3.5" /> Copied!
                </span>
              ) : (
                <Copy className="h-3.5 w-3.5 text-amber-300" />
              )}
            </button>

            {/* Shop CTA */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 bg-[#dfb76c] hover:bg-[#ebd59b] active:scale-95 text-[#2c0e35] text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Shop Collection</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
