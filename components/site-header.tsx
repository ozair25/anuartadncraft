"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Star,
  Camera,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Shield,
  PackageCheck,
  LogIn,
  UserPlus,
  MoreVertical,
  Home,
  Info,
  Palette,
  Image as ImageIcon,
  Calendar,
  Phone,
  Compass,
} from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { useAuth } from "@/lib/context/auth-context"
import { BrandLogo } from "@/components/brand-logo"

interface SiteHeaderProps {
  onOpenCart?: () => void
  onOpenBookClass?: () => void
  onOpenStores?: () => void
  onOpenNightMarket?: () => void
}

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Workshops", href: "/workshops", icon: Palette },
  { label: "Gallery", href: "/gallery", icon: ImageIcon },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Contact", href: "/contact", icon: Phone },
]

export function SiteHeader({
  onOpenCart,
  onOpenBookClass,
  onOpenStores,
  onOpenNightMarket,
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const { totalItems } = useCart()
  const { totalWishlist } = useWishlist()
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const headerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const moreMenuRef = useRef<HTMLDivElement>(null)

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
    setMoreMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setSearchOpen(false)
      setMobileOpen(false)
    }
  }

  const handleCartClick = () => {
    if (onOpenCart) {
      onOpenCart()
    } else {
      router.push("/cart")
    }
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-[#fffaff]/95 backdrop-blur-md border-b border-pink-100/80 shadow-xs text-stone-900 transition-all"
    >
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-900 via-[#7c2d8a] via-[#d92672] via-pink-500 to-amber-500 text-white px-4 py-1.5 text-center text-xs font-semibold tracking-wide flex items-center justify-between md:justify-center gap-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mx-auto">
          <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300 shrink-0" />
          <span className="hidden sm:inline">
            ✨ Free Craft Kit on Workshop Registrations this week! Call +91 94253 56009
          </span>
          <span className="sm:hidden text-[11px] font-bold">
            ✨ Free Delivery above ₹999 across India!
          </span>
        </div>
        <a
          href="https://wa.me/919425356009?text=Hello%20Anu%20Arts%2C%20I%20would%20like%20to%20inquire%20about%20workshops%20and%20art%20supplies!"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all"
        >
          <MessageCircle className="h-3 w-3 text-emerald-300 fill-emerald-300" />
          WhatsApp: +91 94253 56009
        </a>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 py-2 sm:px-6 md:px-8 md:py-2.5">
        {/* Brand Logo (Left) */}
        <div className="flex items-center gap-2 shrink-0 py-1">
          <BrandLogo size="lg" showTagline={false} />
        </div>

        {/* Desktop Navigation Links (Center) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[14px] font-semibold text-stone-700">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-1.5 transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#7c2d8a] font-bold"
                    : "text-stone-700 hover:text-[#7c2d8a]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#7c2d8a] rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right Section: Socials + Search + Cart + Account + 3-Dots + Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Social: Instagram (Desktop/Tablet) */}
          <a
            href="https://instagram.com/ANUARTANDCRAFTSTUDIO"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center text-stone-700 hover:text-[#7c2d8a] hover:bg-purple-50 transition-colors"
            title="Follow us on Instagram (@ANUARTANDCRAFTSTUDIO)"
            aria-label="Instagram"
          >
            <Camera className="h-4 w-4" />
          </a>

          {/* Social: WhatsApp (Desktop/Tablet) */}
          <a
            href="https://wa.me/919425356009?text=Hello%20Anu%20Arts%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20workshops%20and%20art%20supplies!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center text-stone-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            title="Chat on WhatsApp (+91 94253 56009)"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
          </a>

          {/* Search Trigger Icon (Functional on Mobile & Desktop) */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className={`min-w-[40px] min-h-[40px] sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              searchOpen
                ? "bg-[#7c2d8a] text-white shadow-xs"
                : "text-stone-700 hover:text-[#7c2d8a] hover:bg-purple-50 active:bg-purple-100"
            }`}
            title="Search Products & Workshops"
            aria-label="Search"
          >
            <Search className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </button>

          {/* Wishlist Icon */}
          <Link
            href="/wishlist"
            className="relative hidden md:flex min-w-[40px] min-h-[40px] sm:w-10 sm:h-10 rounded-full items-center justify-center text-stone-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            {totalWishlist > 0 && (
              <span className="absolute 1.5 top-1.5 -right-0.5 bg-pink-600 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-xs">
                {totalWishlist}
              </span>
            )}
          </Link>

          {/* Cart Icon / Clickable on Mobile & Desktop */}
          <button
            type="button"
            onClick={handleCartClick}
            className="relative min-w-[42px] min-h-[42px] sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-stone-700 hover:text-[#7c2d8a] hover:bg-purple-50 active:bg-purple-100 transition-all cursor-pointer"
            title="Shopping Cart"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            {totalItems > 0 && (
              <span className="absolute top-1 -right-0.5 bg-[#d92672] text-white text-[10px] font-black h-4 w-4 sm:h-4.5 sm:w-4.5 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </button>

          {/* 3-Dots More Options Menu (Clickable on Mobile & Desktop) */}
          <div ref={moreMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className={`min-w-[40px] min-h-[40px] sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                moreMenuOpen
                  ? "bg-[#7c2d8a] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#7c2d8a] hover:bg-purple-50 active:bg-purple-100"
              }`}
              title="More Options & Pages"
              aria-label="More options"
            >
              <MoreVertical className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </button>

            {/* 3-Dots Dropdown Menu */}
            {moreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-pink-100 bg-white p-2.5 shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-pink-50 flex items-center justify-between">
                  <span className="font-bold text-stone-900 uppercase tracking-wider text-[10px] text-[#7c2d8a]">
                    Quick Navigation
                  </span>
                  <span className="text-[10px] text-stone-400">Anu Arts</span>
                </div>

                <div className="py-1.5 space-y-1">
                  {navLinks.map((item) => {
                    const Icon = item.icon
                    const isCurrent = pathname === item.href
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMoreMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isCurrent
                            ? "bg-purple-100 text-[#7c2d8a] font-bold"
                            : "text-stone-700 hover:bg-purple-50 hover:text-[#7c2d8a]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="h-3.5 w-3.5 text-[#7c2d8a]" />
                          <span>{item.label} Page</span>
                        </div>
                        <ChevronRight className="h-3 w-3 text-stone-400" />
                      </Link>
                    )
                  })}
                </div>

                <div className="pt-1.5 border-t border-pink-50 space-y-1">
                  <Link
                    href="/wishlist"
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-pink-50 hover:text-pink-600"
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className="h-3.5 w-3.5 text-pink-500" />
                      <span>My Wishlist ({totalWishlist})</span>
                    </div>
                  </Link>

                  <Link
                    href="/track-order"
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-purple-50 hover:text-[#7c2d8a]"
                  >
                    <div className="flex items-center gap-2.5">
                      <PackageCheck className="h-3.5 w-3.5 text-purple-600" />
                      <span>Track Orders &amp; Shipments</span>
                    </div>
                  </Link>

                  <a
                    href="https://wa.me/919425356009?text=Hello%20Anu%20Arts%20Studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                      <span>WhatsApp Live Help</span>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User Account Dropdown / Redirect */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`min-w-[40px] min-h-[40px] sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                userMenuOpen
                  ? "bg-[#7c2d8a] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#7c2d8a] hover:bg-purple-50 active:bg-purple-100"
              }`}
              title="My Account"
              aria-label="Account"
            >
              <User className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </button>

            {/* Account Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-pink-100 bg-white p-2 shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95">
                {user ? (
                  <>
                    <div className="px-3 py-2 border-b border-pink-50">
                      <p className="font-bold text-stone-900 text-sm">
                        {user.displayName || "Artist Account"}
                      </p>
                      <p className="text-[10px] text-stone-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1 space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-purple-50 text-stone-700 font-medium"
                      >
                        <User className="h-3.5 w-3.5 text-[#7c2d8a]" />
                        <span>My Profile &amp; Orders</span>
                      </Link>
                      <Link
                        href="/track-order"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-purple-50 text-stone-700 font-medium"
                      >
                        <PackageCheck className="h-3.5 w-3.5 text-stone-500" />
                        <span>Track Shipments</span>
                      </Link>
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-purple-50 text-purple-700 font-bold"
                      >
                        <Shield className="h-3.5 w-3.5 text-purple-700" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </div>
                    <div className="pt-1 border-t border-pink-50">
                      <button
                        onClick={() => {
                          logout()
                          setUserMenuOpen(false)
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-bold text-left cursor-pointer"
                      >
                        <LogIn className="h-3.5 w-3.5 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-2 border-b border-pink-50">
                      <p className="font-bold text-stone-900">Artist Portal</p>
                      <p className="text-[10px] text-stone-500">Sign in to manage orders &amp; bookings</p>
                    </div>
                    <div className="py-1 space-y-0.5">
                      <Link
                        href="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl bg-purple-50 text-[#7c2d8a] font-bold hover:bg-purple-100"
                      >
                        <LogIn className="h-3.5 w-3.5 text-[#7c2d8a]" />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-purple-50 text-stone-700 font-medium"
                      >
                        <UserPlus className="h-3.5 w-3.5 text-stone-500" />
                        <span>Create Account</span>
                      </Link>
                      <Link
                        href="/track-order"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-purple-50 text-stone-700 font-medium"
                      >
                        <PackageCheck className="h-3.5 w-3.5 text-stone-500" />
                        <span>Track Order</span>
                      </Link>
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-purple-50 text-stone-700 font-bold border-t border-pink-50"
                      >
                        <Shield className="h-3.5 w-3.5 text-stone-700" />
                        <span>Admin Console</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* "Book a Class ★" Primary Action Button (Desktop) */}
          <button
            type="button"
            onClick={onOpenBookClass || (() => router.push("/workshops"))}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs md:text-[13px] font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-md hover:shadow-purple-400/30 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <span>Book a Class</span>
            <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center text-stone-800 hover:text-[#7c2d8a] lg:hidden cursor-pointer rounded-full hover:bg-purple-50 active:bg-purple-100"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Navigation Header Bar (Shows all website pages horizontally in mobile view) */}
      <div className="lg:hidden border-t border-pink-100/70 bg-[#fffaff] px-2 py-1.5 overflow-x-auto no-scrollbar scrollbar-none flex items-center gap-1.5">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
          const Icon = link.icon

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-[#7c2d8a] text-white shadow-xs"
                  : "bg-white/80 text-stone-700 hover:bg-purple-50 hover:text-[#7c2d8a] border border-pink-100/80 shadow-2xs"
              }`}
            >
              <Icon className={`h-3 w-3 ${isActive ? "text-amber-300" : "text-[#7c2d8a]"}`} />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="border-t border-pink-100 bg-white/95 px-4 py-3 shadow-sm animate-in fade-in slide-in-from-top-2">
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto max-w-2xl relative flex items-center"
          >
            <input
              type="text"
              placeholder="Search acrylic paints, resin kits, lippan supplies, workshops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full rounded-full border border-pink-200 bg-[#fffaff] py-2.5 pl-4 pr-12 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#7c2d8a] focus:ring-2 focus:ring-purple-200"
            />
            <button
              type="submit"
              className="absolute right-1.5 p-2 rounded-full bg-[#7c2d8a] text-white hover:bg-purple-800 transition-colors cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </form>
          <div className="mx-auto max-w-2xl mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500">
            <span className="font-semibold text-stone-700">Popular:</span>
            {["Acrylic Paints", "Resin Kit", "Lippan Mirrors", "Watercolors", "DIY Kits", "Workshops"].map(
              (term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(term)}`)
                    setSearchOpen(false)
                  }}
                  className="bg-purple-50 hover:bg-purple-100 text-[#7c2d8a] px-2.5 py-0.5 rounded-full font-medium transition-colors cursor-pointer"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[115px] bottom-0 z-50 bg-white/98 backdrop-blur-md border-t border-pink-100 shadow-2xl overflow-y-auto p-4 lg:hidden">
          <div className="space-y-4 pb-20">
            {/* Search Input for Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search art supplies, DIY kits, workshops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-pink-200 bg-purple-50/40 py-2.5 pl-4 pr-10 text-xs text-stone-800 focus:outline-none focus:border-[#7c2d8a]"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2 rounded-full bg-[#7c2d8a] text-white cursor-pointer"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Mobile Book Class CTA */}
            <button
              onClick={() => {
                setMobileOpen(false)
                if (onOpenBookClass) onOpenBookClass()
                else router.push("/workshops")
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#7c2d8a] text-white py-3 rounded-full text-xs font-bold shadow-md cursor-pointer"
            >
              <span>Book a Creative Class</span>
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            </button>

            {/* Nav Links with Redirection */}
            <div className="space-y-1 border-y border-pink-100 py-3">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#7c2d8a] px-3 pb-1">
                Explore Website Pages
              </div>
              {navLinks.map((link) => {
                const Icon = link.icon
                const isCurrent = pathname === link.href
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center justify-between text-sm transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-purple-100 text-[#7c2d8a]"
                        : "text-stone-800 hover:bg-purple-50 hover:text-[#7c2d8a]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#7c2d8a]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-stone-400" />
                  </Link>
                )
              })}
            </div>

            {/* Account & Quick Actions */}
            <div className="space-y-2 pt-1">
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-purple-50 text-[#7c2d8a] border border-purple-200 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Visit Online Store (1500+ Items)</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full border border-pink-200 text-pink-700 bg-pink-50/50 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Heart className="h-4 w-4" />
                <span>My Wishlist ({totalWishlist})</span>
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full border border-pink-200 text-stone-800 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                <User className="h-4 w-4" />
                <span>My Account &amp; Orders</span>
              </Link>
              <Link
                href="/track-order"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full border border-stone-200 text-stone-700 py-2.5 rounded-xl text-xs font-medium cursor-pointer"
              >
                <PackageCheck className="h-4 w-4" />
                <span>Track Order &amp; Shipments</span>
              </Link>
              <a
                href="https://wa.me/919425356009?text=Hello%20Anu%20Arts%20Studio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp (+91 94253 56009)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

