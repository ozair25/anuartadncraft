"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
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
  ChevronDown,
  PackageCheck,
  LogIn,
  UserPlus,
  Home,
  Info,
  Palette,
  Image as ImageIcon,
  Calendar,
  Phone,
  BookOpen,
  HelpCircle,
  Layers,
  FileText,
  Clock,
  MapPin,
} from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { useAuth } from "@/lib/context/auth-context"
import { BrandLogo } from "@/components/brand-logo"
import { ShopCategoryDrawer } from "@/components/shop-category-drawer"
import { SHOP_CATEGORIES } from "@/lib/config/shop-categories"

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
  { label: "Tutorials", href: "/tutorials", icon: BookOpen },
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
  const [mounted, setMounted] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [shopCategoryDrawerOpen, setShopCategoryDrawerOpen] = useState(false)
  const [desktopShopMenuOpen, setDesktopShopMenuOpen] = useState(false)
  const shopMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const desktopShopMenuRef = useRef<HTMLDivElement>(null)

  const [isScrolled, setIsScrolled] = useState(false)

  const { totalItems, openCart } = useCart()
  const { totalWishlist } = useWishlist()
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const headerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const moreMenuRef = useRef<HTMLDivElement>(null)

  // Track hydration mount for react portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track scroll with requestAnimationFrame throttle to eliminate layout thrashing & scroll jank
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 15
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev))
          ticking = false
        })
        ticking = true
      }
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
    setMoreMenuOpen(false)
    setSearchOpen(false)
    setDesktopShopMenuOpen(false)
    setShopCategoryDrawerOpen(false)
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
      if (desktopShopMenuRef.current && !desktopShopMenuRef.current.contains(event.target as Node)) {
        setDesktopShopMenuOpen(false)
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
      openCart()
    }
  }

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-pink-200/80 shadow-md text-stone-900"
          : "bg-white backdrop-blur-sm border-b border-pink-100/60 shadow-2xs text-stone-900"
      }`}
    >
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-900 via-[#7c2d8a] via-[#d92672] via-pink-500 to-amber-500 text-white px-4 py-1.5 text-center text-xs font-semibold tracking-wide flex items-center justify-between md:justify-center gap-3 shadow-2xs">
        <div className="flex items-center gap-2 mx-auto">
          <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300 shrink-0" />
          <span className="font-bold">
            NEW HERE? GET 10% OFF 🎉
          </span>
          <span className="hidden sm:inline text-purple-100">
            Use code <strong className="text-white underline decoration-amber-300 underline-offset-2 tracking-wide">FIRSTORDER10</strong> on your first order
          </span>
          <span className="sm:hidden text-[11px] text-amber-200 font-bold">
            Code: FIRSTORDER10
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

            if (link.label === "Shop") {
              return (
                <div
                  key={link.label}
                  ref={desktopShopMenuRef}
                  className="relative"
                  onMouseEnter={() => {
                    if (shopMenuTimeoutRef.current) clearTimeout(shopMenuTimeoutRef.current)
                    setDesktopShopMenuOpen(true)
                  }}
                  onMouseLeave={() => {
                    shopMenuTimeoutRef.current = setTimeout(() => {
                      setDesktopShopMenuOpen(false)
                    }, 180)
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setDesktopShopMenuOpen(false)
                      setShopCategoryDrawerOpen(true)
                    }}
                    className={`relative py-1.5 flex items-center gap-1 transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#7c2d8a] font-bold"
                        : "text-stone-700 hover:text-[#7c2d8a]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-stone-400 transition-transform duration-200 ${
                        desktopShopMenuOpen ? "rotate-180 text-[#7c2d8a]" : ""
                      }`}
                    />
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#7c2d8a] rounded-full" />
                    )}
                  </button>

                  {/* Desktop Editorial Mega-Menu */}
                  {desktopShopMenuOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                      onMouseEnter={() => {
                        if (shopMenuTimeoutRef.current) clearTimeout(shopMenuTimeoutRef.current)
                        setDesktopShopMenuOpen(true)
                      }}
                      onMouseLeave={() => setDesktopShopMenuOpen(false)}
                    >
                      <div className="w-[840px] bg-white rounded-2xl shadow-2xl border border-stone-200/90 p-6 text-stone-900">
                        {/* Mega-menu Header */}
                        <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                              Shop All Categories
                            </span>
                            <p className="text-xs text-stone-400">
                              16 official art &amp; craft collections
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setDesktopShopMenuOpen(false)
                              setShopCategoryDrawerOpen(true)
                            }}
                            className="text-xs font-bold text-[#7c2d8a] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Open Category Drawer</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* 4 Clean Columns of 4 Categories Each */}
                        <div className="grid grid-cols-4 gap-6 pt-4 text-left">
                          {[0, 1, 2, 3].map((colIndex) => {
                            const colCats = SHOP_CATEGORIES.slice(colIndex * 4, colIndex * 4 + 4)
                            return (
                              <div key={colIndex} className="space-y-3">
                                {colCats.map((cat) => (
                                  <Link
                                    key={cat.id}
                                    href={`/shop/${cat.slug}`}
                                    onClick={() => setDesktopShopMenuOpen(false)}
                                    className="block group"
                                  >
                                    <div className="text-[13px] font-medium text-stone-800 group-hover:text-[#7c2d8a] group-hover:font-semibold transition-colors">
                                      {cat.name}
                                    </div>
                                    {cat.subcategories && cat.subcategories.length > 0 && (
                                      <div className="text-[10px] text-stone-400 group-hover:text-stone-500">
                                        {cat.subcategories.length} subcategories
                                      </div>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                prefetch={true}
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

        {/* Right Section: Shop Button, Cart Button & Mobile Menu Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Mobile Shop Categories Trigger */}
          <button
            type="button"
            onClick={() => setShopCategoryDrawerOpen(true)}
            className="lg:hidden min-h-[38px] px-3 flex items-center gap-1 text-stone-800 hover:text-[#7c2d8a] cursor-pointer rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors shadow-2xs touch-manipulation text-xs font-bold"
            aria-label="Open Shop categories menu"
            title="Browse Shop Categories"
          >
            <ShoppingBag className="h-3.5 w-3.5 text-[#7c2d8a]" />
            <span>Shop</span>
          </button>

          {/* Cart Button with Count Badge */}
          <button
            type="button"
            onClick={handleCartClick}
            className="relative min-w-[40px] min-h-[40px] flex items-center justify-center text-stone-700 hover:text-[#7c2d8a] cursor-pointer rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors shadow-2xs touch-manipulation"
            aria-label={`Shopping cart with ${totalItems} items`}
            title="View Shopping Cart"
          >
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-[#7c2d8a]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#d92672] text-[10px] font-bold text-white shadow-xs">
                {totalItems}
              </span>
            )}
          </button>

          {/* Primary Mobile Navigation Toggle Button */}
          <button
            type="button"
            id="mobile-hamburger-btn"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setMobileOpen((prev) => !prev)
            }}
            className="relative z-50 min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-900 hover:text-[#7c2d8a] lg:hidden cursor-pointer rounded-full bg-purple-50 hover:bg-purple-100 active:bg-purple-200 border border-purple-200 transition-colors shadow-2xs touch-manipulation"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-modal"
            title={mobileOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-[#7c2d8a]" />
            ) : (
              <Menu className="h-6 w-6 text-[#7c2d8a]" />
            )}
          </button>
        </div>
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

      {/* Mobile Navigation Drawer Modal rendered via Portal to escape Header's backdrop-filter/stacking context */}
      {mounted &&
        mobileOpen &&
        createPortal(
          <div
            id="mobile-nav-modal"
            className="fixed inset-0 z-[999999] lg:hidden"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 999999,
              display: "flex",
              justifyContent: "flex-end",
              backgroundColor: "rgba(15, 10, 20, 0.75)",
            }}
            onClick={() => setMobileOpen(false)}
          >
            {/* Drawer Sidebar Container */}
            <div
              style={{
                width: "100%",
                maxWidth: "380px",
                height: "100%",
                backgroundColor: "#fffaff",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "-4px 0 25px rgba(0,0,0,0.25)",
              }}
              className="text-stone-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 1. Header with Logo and Close X Button */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-pink-100 bg-white/95 backdrop-blur-md shrink-0 shadow-2xs">
                <div className="flex items-center gap-2">
                  <BrandLogo size="md" showTagline={false} />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-[#7c2d8a] transition-colors cursor-pointer border border-purple-100 touch-manipulation"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 2. Scrollable Menu Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 pb-20 overscroll-contain">
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search art supplies, DIY kits, workshops..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-pink-200 bg-white py-2.5 pl-3.5 pr-11 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#7c2d8a] focus:ring-2 focus:ring-purple-200 shadow-2xs"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 p-2 rounded-lg bg-[#7c2d8a] text-white hover:bg-purple-800 transition-colors cursor-pointer"
                    aria-label="Search"
                  >
                    <Search className="h-3.5 w-3.5" />
                  </button>
                </form>

                {/* Primary Call to Action: Book a Class */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    if (onOpenBookClass) onOpenBookClass()
                    else router.push("/workshops")
                  }}
                  className="w-full min-h-[48px] flex items-center justify-between bg-gradient-to-r from-[#7c2d8a] via-[#a82580] to-[#d92672] text-white px-4 py-3 rounded-2xl text-sm font-bold shadow-md hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer touch-manipulation"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-full bg-white/20">
                      <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                    </div>
                    <span>Book a Creative Workshop</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/80" />
                </button>

                {/* Main Navigation Pages */}
                <div className="space-y-1 bg-white rounded-2xl p-2.5 border border-pink-100 shadow-2xs">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#7c2d8a] px-3 py-1.5">
                    Explore Pages
                  </div>
                  {[
                    { label: "Home", href: "/", icon: Home },
                    { label: "About Us", href: "/about", icon: Info },
                    { label: "Workshop Classes", href: "/workshops", icon: Palette },
                    { label: "Tutorials & Guides", href: "/tutorials", icon: BookOpen },
                    { label: "Shop", href: "/shop", icon: ShoppingBag },
                    { label: "Events", href: "/events", icon: Calendar },
                    { label: "Contact Us", href: "/contact", icon: Phone },
                  ].map((item) => {
                    const Icon = item.icon
                    const isCurrent =
                      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

                    if (item.label === "Shop") {
                      return (
                        <div
                          key={item.label}
                          className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl font-bold flex items-center justify-between text-xs sm:text-sm transition-all ${
                            isCurrent
                              ? "bg-purple-100/90 text-[#7c2d8a] shadow-2xs"
                              : "text-stone-800 hover:bg-purple-50/80 hover:text-[#7c2d8a]"
                          }`}
                        >
                          <Link
                            href="/shop"
                            prefetch={true}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 flex-1 py-1"
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isCurrent
                                  ? "bg-white text-[#7c2d8a] shadow-2xs"
                                  : "bg-purple-50 text-[#7c2d8a]"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <span>{item.label}</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setMobileOpen(false)
                              setShopCategoryDrawerOpen(true)
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7c2d8a] bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-200 transition-colors cursor-pointer"
                          >
                            <span>Categories</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      )
                    }
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        prefetch={true}
                        onClick={() => setMobileOpen(false)}
                        className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-between text-xs sm:text-sm transition-all cursor-pointer touch-manipulation ${
                          isCurrent
                            ? "bg-purple-100/90 text-[#7c2d8a] shadow-2xs"
                            : "text-stone-800 hover:bg-purple-50/80 hover:text-[#7c2d8a]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isCurrent
                                ? "bg-white text-[#7c2d8a] shadow-2xs"
                                : "bg-purple-50 text-[#7c2d8a]"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 ${
                            isCurrent ? "text-[#7c2d8a]" : "text-stone-400"
                          }`}
                        />
                      </Link>
                    )
                  })}
                </div>

                {/* Shopping & Order Tools */}
                <div className="space-y-1.5 bg-purple-50/50 rounded-2xl p-2.5 border border-purple-100">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#7c2d8a] px-3 py-1">
                    Shopping &amp; Orders
                  </div>

                  {/* Cart with Live Count */}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false)
                      handleCartClick()
                    }}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-between text-xs sm:text-sm bg-white border border-pink-100 text-stone-800 hover:bg-purple-50 transition-all cursor-pointer shadow-2xs touch-manipulation"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#d92672] flex items-center justify-center">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <span>Shopping Cart</span>
                    </div>
                    <span className="bg-[#d92672] text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                      {totalItems} items
                    </span>
                  </button>

                  {/* Wishlist with Live Count */}
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileOpen(false)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-between text-xs sm:text-sm bg-white border border-pink-100 text-stone-800 hover:bg-purple-50 transition-all cursor-pointer shadow-2xs touch-manipulation"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                        <Heart className="h-4 w-4" />
                      </div>
                      <span>My Wishlist</span>
                    </div>
                    <span className="bg-pink-100 text-pink-700 text-[11px] font-black px-2 py-0.5 rounded-full border border-pink-200">
                      {totalWishlist} saved
                    </span>
                  </Link>

                  {/* Track Order */}
                  <Link
                    href="/track-order"
                    onClick={() => setMobileOpen(false)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-between text-xs sm:text-sm bg-white border border-purple-100 text-stone-800 hover:bg-purple-50 transition-all cursor-pointer shadow-2xs touch-manipulation"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7c2d8a] flex items-center justify-center">
                        <PackageCheck className="h-4 w-4" />
                      </div>
                      <span>Track Order &amp; Shipments</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-stone-400" />
                  </Link>
                </div>

                {/* Artist & Account Portal */}
                <div className="space-y-1.5 bg-white rounded-2xl p-2.5 border border-pink-100 shadow-2xs">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#7c2d8a] px-3 py-1">
                    Artist &amp; Account Portal
                  </div>
                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-between text-xs sm:text-sm bg-stone-50/70 border border-pink-100 text-stone-800 hover:bg-purple-50 transition-all cursor-pointer touch-manipulation"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7c2d8a] flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="leading-tight">{user.displayName || "My Profile"}</p>
                            <p className="text-[10px] text-stone-500 font-normal truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-stone-400" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          logout()
                          setMobileOpen(false)
                        }}
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer mt-1 touch-manipulation"
                      >
                        <LogIn className="h-3.5 w-3.5" />
                        <span>Sign Out of Account</span>
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="min-h-[44px] flex items-center justify-center gap-2 bg-[#7c2d8a] text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-xs hover:bg-[#682274] transition-all cursor-pointer touch-manipulation"
                      >
                        <LogIn className="h-3.5 w-3.5" />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileOpen(false)}
                        className="min-h-[44px] flex items-center justify-center gap-2 bg-white text-stone-800 border border-pink-200 py-2.5 px-3 rounded-xl text-xs font-bold hover:bg-purple-50 transition-all cursor-pointer touch-manipulation"
                      >
                        <UserPlus className="h-3.5 w-3.5 text-[#7c2d8a]" />
                        <span>Register</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Direct WhatsApp Support */}
                <div className="pt-1">
                  <a
                    href="https://wa.me/919425356009?text=Hello%20Anu%20Arts%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20workshops%20and%20art%20supplies!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] flex items-center justify-center gap-2.5 w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer touch-manipulation"
                  >
                    <MessageCircle className="h-4 w-4 fill-white text-emerald-600" />
                    <span>Chat on WhatsApp (+91 94253 56009)</span>
                  </a>
                </div>

                {/* Policy & Legal Links */}
                <div className="pt-2 border-t border-pink-100 text-center">
                  <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 text-[11px] text-stone-500 font-medium">
                    <Link
                      href="/refund-policy"
                      onClick={() => setMobileOpen(false)}
                      className="hover:text-[#7c2d8a] underline underline-offset-2"
                    >
                      Refund Policy
                    </Link>
                    <Link
                      href="/shipping-policy"
                      onClick={() => setMobileOpen(false)}
                      className="hover:text-[#7c2d8a] underline underline-offset-2"
                    >
                      Shipping Policy
                    </Link>
                    <Link
                      href="/contact-information"
                      onClick={() => setMobileOpen(false)}
                      className="hover:text-[#7c2d8a] underline underline-offset-2"
                    >
                      Contact Information
                    </Link>
                    <Link
                      href="/terms-of-service"
                      onClick={() => setMobileOpen(false)}
                      className="hover:text-[#7c2d8a] underline underline-offset-2"
                    >
                      Terms of Service
                    </Link>
                    <Link
                      href="/privacy-policy"
                      onClick={() => setMobileOpen(false)}
                      className="hover:text-[#7c2d8a] underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-2">
                    © {new Date().getFullYear()} Anu Art &amp; Craft Studio, Indore. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Clean Full-Height Shop Category Drawer */}
      <ShopCategoryDrawer
        isOpen={shopCategoryDrawerOpen}
        onClose={() => setShopCategoryDrawerOpen(false)}
      />
    </header>
  )
}

