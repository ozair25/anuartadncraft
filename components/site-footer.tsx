"use client"

import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Camera,
  MessageCircle,
  Heart,
  Sparkles,
} from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#fffaff] via-[#fdf2f8] to-[#fff8ee] text-stone-700 border-t border-pink-200/70 pt-14 pb-8">
      
      {/* Decorative Botanical Blossom Floral Branches on the edges with Pink and Amber accents */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-60">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path
            d="M 200 0 Q 150 50 120 120 Q 90 170 0 200"
            stroke="#c084fc"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.4"
          />
          <circle cx="150" cy="40" r="10" fill="#f472b6" opacity="0.6" />
          <circle cx="120" cy="100" r="8" fill="#fbbf24" opacity="0.6" />
          <circle cx="60" cy="160" r="7" fill="#f97316" opacity="0.5" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-52 h-52 pointer-events-none opacity-50">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <circle cx="40" cy="160" r="14" fill="#f472b6" opacity="0.4" />
          <circle cx="80" cy="180" r="9" fill="#fbbf24" opacity="0.4" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-pink-200/70">
          
          {/* Column 1: Brand Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="md" variant="dark" showTagline={false} />
            <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-sm">
              Your one-stop destination for art and craft materials. Explore art
              classes and a variety of creative workshops.
            </p>
            <p className="text-xs text-stone-500 font-medium pt-2">
              © {currentYear} Anu Arts. All Rights Reserved.
            </p>
          </div>

          {/* Column 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-stone-600">
              <li>
                <Link href="/about" prefetch={true} className="hover:text-[#7c2d8a] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/workshops" prefetch={true} className="hover:text-[#7c2d8a] transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/tutorials" prefetch={true} className="hover:text-[#7c2d8a] transition-colors">
                  Tutorials &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/shop" prefetch={true} className="hover:text-[#7c2d8a] transition-colors">
                  DIY Kits &amp; Supplies
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={true} className="hover:text-[#7c2d8a] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900">
              Contact Us
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-stone-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#d92672] shrink-0 mt-0.5" />
                <span>30, Chandralok Colony, Indore</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-600 shrink-0" />
                <a href="tel:+919425356009" className="hover:text-[#7c2d8a] transition-colors">
                  +91 94253 56009
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#7c2d8a] shrink-0" />
                <a href="mailto:anuarts005@gmail.com" className="hover:text-[#7c2d8a] transition-colors">
                  anuarts005@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-[#7c2d8a] shrink-0" />
                <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Connected (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900">
              Stay Connected
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
              Follow us on Instagram for updates, reels &amp; creative inspiration!
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/ANUARTANDCRAFTSTUDIO"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-pink-200 text-stone-800 hover:text-[#d92672] hover:scale-110 flex items-center justify-center transition-all shadow-xs"
                title="Instagram: @anuarts_studio"
                aria-label="Instagram"
              >
                <Camera className="h-4 w-4" />
              </a>

              <a
                href="https://wa.me/919425356009"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-pink-200 text-stone-800 hover:text-emerald-600 hover:scale-110 flex items-center justify-center transition-all shadow-xs"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Shopify Standard Policy Bar - Exactly matching store legal policies */}
        <div className="mt-10 border-t border-stone-200/90 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2 text-xs sm:text-sm font-medium text-stone-700">
            <Link href="/refund-policy" className="hover:text-[#7c2d8a] transition-colors underline-offset-4 hover:underline">
              Refund policy
            </Link>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <Link href="/shipping-policy" className="hover:text-[#7c2d8a] transition-colors underline-offset-4 hover:underline">
              Shipping policy
            </Link>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <Link href="/contact-information" className="hover:text-[#7c2d8a] transition-colors underline-offset-4 hover:underline">
              Contact information
            </Link>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <Link href="/terms-of-service" className="hover:text-[#7c2d8a] transition-colors underline-offset-4 hover:underline">
              Terms of service
            </Link>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <Link href="/privacy-policy" className="hover:text-[#7c2d8a] transition-colors underline-offset-4 hover:underline">
              Privacy policy
            </Link>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-5 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-medium">
          <p>© {new Date().getFullYear()} Anu Art &amp; Craft Studio, Indore. All rights reserved.</p>

          <div className="flex items-center gap-1 text-stone-700 font-semibold">
            <span>Designed with</span>
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 inline" />
            <span>for Creativity</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
