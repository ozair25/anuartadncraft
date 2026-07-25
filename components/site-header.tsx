"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ChevronDown,
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  PackageCheck,
  Sparkles,
  Paintbrush,
  Palette,
  Scissors,
  Gift,
  BookOpen,
  Frame,
  HelpCircle,
  MoreVertical,
  ArrowRight,
  ArrowLeft,
  Compass,
} from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { useAuth } from "@/lib/context/auth-context"

const shopCategories = [
  { label: "Painting Supplies", href: "/shop/painting", icon: Palette, desc: "Acrylics, oils, watercolors & brushes" },
  { label: "Drawing & Sketching", href: "/shop/drawing", icon: Paintbrush, desc: "Pencils, markers, charcoal & sketchbooks" },
  { label: "Crafting & DIY", href: "/shop/crafting", icon: Scissors, desc: "Clay, resin, adhesives & craft tools" },
  { label: "DIY Art Kits", href: "/shop/diy-kits", icon: Gift, desc: "All-in-one starter kits for all ages" },
  { label: "Stationery & Journals", href: "/shop/stationery", icon: BookOpen, desc: "Fine paper, notebooks & calligraphy" },
  { label: "Decor & Framing", href: "/shop/decor-and-more", icon: Frame, desc: "Frames, canvases & wall decor" },
]

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop", hasDropdown: true },
  { label: "KITS", href: "/shop/diy-kits" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT", href: "/contact" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)
  const [mobileShopExpand, setMobileShopExpand] = useState(true)
  const [allPagesExpand, setAllPagesExpand] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)

  const { totalItems, totalPrice } = useCart()
  const { totalWishlist } = useWishlist()
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Automatically close all menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setShopDropdownOpen(false)
    setUserMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  // Close menus on outside click/tap
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false)
        setUserMenuOpen(false)
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [])

  // Programmatic navigation to guarantee reliable transitions on mobile
  const handleNavigate = (href: string) => {
    setMobileOpen(false)
    setShopDropdownOpen(false)
    setUserMenuOpen(false)
    setSearchOpen(false)
    router.push(href)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      handleNavigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border/60 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 md:px-6 md:py-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          {pathname !== "/" && (
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer shrink-0 shadow-sm"
              title="Go Back to Previous Page"
              aria-label="Go Back to Previous Page"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => handleNavigate("/")}
            className="flex flex-col text-left leading-none group cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-2xl font-black tracking-tight text-primary transition-colors group-hover:text-primary/80 md:text-3xl">
              ANU ARTS
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground md:text-[10px]">
              Art &amp; Craft Supplies
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary Navigation">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setShopDropdownOpen(true)}
                  onMouseLeave={() => setShopDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setShopDropdownOpen((prev) => !prev)}
                    className={`flex items-center gap-1 text-xs font-bold tracking-wider transition-colors py-2 cursor-pointer ${
                      shopDropdownOpen || pathname.startsWith("/shop")
                        ? "text-primary border-b-2 border-primary"
                        : "text-foreground/85 hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${shopDropdownOpen ? "rotate-180 text-primary" : ""}`} />
                  </button>

                  {/* Shop Mega Dropdown */}
                  {shopDropdownOpen && (
                    <div className="absolute left-0 top-full mt-1 w-[500px] rounded-xl border border-border bg-card p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-3">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-primary" /> Browse Categories
                        </span>
                        <button
                          type="button"
                          onClick={() => handleNavigate("/shop")}
                          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          All Products <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {shopCategories.map((cat) => {
                          const IconComp = cat.icon
                          return (
                            <button
                              key={cat.label}
                              type="button"
                              onClick={() => handleNavigate(cat.href)}
                              className="flex items-start gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-secondary group/item cursor-pointer"
                            >
                              <div className="rounded-md bg-cream p-2 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors shrink-0">
                                <IconComp className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors">
                                  {cat.label}
                                </p>
                                <p className="text-[10px] text-muted-foreground line-clamp-1">
                                  {cat.desc}
                                </p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            const isActive = pathname === link.href
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavigate(link.href)}
                className={`text-xs font-bold tracking-wider transition-colors py-2 cursor-pointer ${
                  isActive ? "text-primary border-b-2 border-primary" : "text-foreground/85 hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            )
          })}
        </nav>

        {/* Header Right Action Buttons */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Quick Shop CTA button on Desktop */}
          <button
            type="button"
            onClick={() => handleNavigate("/shop")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer mr-1"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Shop Supplies</span>
          </button>

          {/* Search Button */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => {
              setSearchOpen((v) => !v)
              setShopDropdownOpen(false)
              setUserMenuOpen(false)
            }}
            className={`rounded-full p-2 transition-colors cursor-pointer ${
              searchOpen ? "bg-primary text-primary-foreground" : "text-foreground/85 hover:bg-secondary hover:text-primary"
            }`}
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Account Menu Button */}
          <div className="relative">
            <button
              type="button"
              aria-label="Account Options"
              onClick={() => {
                setUserMenuOpen((v) => !v)
                setShopDropdownOpen(false)
                setSearchOpen(false)
              }}
              className={`flex items-center gap-1 rounded-full p-2 transition-colors cursor-pointer ${
                userMenuOpen ? "bg-primary text-primary-foreground" : "text-foreground/85 hover:bg-secondary hover:text-primary"
              }`}
            >
              <User className="h-5 w-5" />
            </button>

            {/* Account Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {user ? (
                  <>
                    <div className="border-b border-border/60 pb-2 px-3 pt-2">
                      <p className="text-xs font-extrabold text-foreground">{user.displayName || "Valued Artist"}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="py-1 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => handleNavigate("/profile")}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary text-left cursor-pointer"
                      >
                        <User className="h-4 w-4 text-primary" />
                        <span>My Account &amp; Orders</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigate("/track-order")}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary text-left cursor-pointer"
                      >
                        <PackageCheck className="h-4 w-4 text-primary" />
                        <span>Track Order</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigate("/wishlist")}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary text-left cursor-pointer"
                      >
                        <Heart className="h-4 w-4 text-primary" />
                        <span>My Wishlist ({totalWishlist})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          logout()
                          setUserMenuOpen(false)
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10 text-left cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-2 space-y-2">
                    <p className="text-[11px] font-bold text-muted-foreground text-center">Welcome to Anu Arts!</p>
                    <button
                      type="button"
                      onClick={() => handleNavigate("/login")}
                      className="block w-full rounded-lg bg-primary py-2 text-center text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigate("/register")}
                      className="block w-full rounded-lg border border-border bg-secondary/50 py-2 text-center text-xs font-semibold text-foreground hover:bg-secondary transition-colors cursor-pointer"
                    >
                      Create Account
                    </button>
                    <div className="pt-2 border-t border-border/60 space-y-1">
                      <button
                        type="button"
                        onClick={() => handleNavigate("/track-order")}
                        className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-[11px] font-medium text-foreground hover:bg-secondary text-left cursor-pointer"
                      >
                        <PackageCheck className="h-3.5 w-3.5 text-primary" />
                        <span>Track Order</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigate("/faqs")}
                        className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-[11px] font-medium text-foreground hover:bg-secondary text-left cursor-pointer"
                      >
                        <HelpCircle className="h-3.5 w-3.5 text-primary" />
                        <span>Help &amp; FAQs</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            aria-label="Wishlist"
            onClick={() => handleNavigate("/wishlist")}
            className="relative rounded-full p-2 text-foreground/85 transition-colors hover:bg-secondary hover:text-primary cursor-pointer"
          >
            <Heart className="h-5 w-5" />
            {totalWishlist > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                {totalWishlist}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            type="button"
            aria-label="Shopping Cart"
            onClick={() => handleNavigate("/cart")}
            className="relative flex items-center gap-1.5 rounded-full p-2 text-foreground/85 transition-colors hover:bg-secondary hover:text-primary cursor-pointer"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            aria-label="Toggle Mobile Navigation Menu"
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((prev) => !prev)
              setUserMenuOpen(false)
              setSearchOpen(false)
              setShopDropdownOpen(false)
            }}
            className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all lg:hidden cursor-pointer touch-manipulation z-50 ml-1"
          >
            {mobileOpen ? (
              <>
                <X className="h-5 w-5 text-primary" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Menu className="h-5 w-5" />
                <span>Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="border-t border-border/60 bg-card px-4 py-3 shadow-inner z-50">
          <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-2xl items-center gap-2">
            <input
              type="text"
              placeholder="Search art supplies, sketchbooks, paints, craft tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer shrink-0"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Full Mobile Navigation Overlay Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[56px] bottom-0 z-50 bg-cream/98 backdrop-blur-md border-t border-border/80 shadow-2xl overflow-y-auto lg:hidden animate-in slide-in-from-top-2 duration-200 pb-20">
          <div className="p-4 space-y-5 max-w-md mx-auto">
            
            {/* Search Bar inside Drawer */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-card p-1.5 rounded-xl border border-border/80 shadow-sm">
              <input
                type="text"
                placeholder="Search products, kits, supplies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 rounded-lg bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground cursor-pointer shrink-0"
              >
                Search
              </button>
            </form>

            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-primary/20 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-primary" />
                All Available Pages &amp; Sections
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Scroll to view
              </span>
            </div>

            {/* 1. Main Navigation */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
                Main Pages
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleNavigate("/")}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${
                    pathname === "/" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border/70 text-foreground hover:border-primary"
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/shop")}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${
                    pathname === "/shop" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border/70 text-foreground hover:border-primary"
                  }`}
                >
                  <span>Shop All</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/shop/diy-kits")}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${
                    pathname === "/shop/diy-kits" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border/70 text-foreground hover:border-primary"
                  }`}
                >
                  <span>DIY Kits</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/collections")}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${
                    pathname === "/collections" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border/70 text-foreground hover:border-primary"
                  }`}
                >
                  <span>Collections</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/blog")}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${
                    pathname === "/blog" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border/70 text-foreground hover:border-primary"
                  }`}
                >
                  <span>Blog</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/about")}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${
                    pathname === "/about" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border/70 text-foreground hover:border-primary"
                  }`}
                >
                  <span>About Us</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/contact")}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer col-span-2 ${
                    pathname === "/contact" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border/70 text-foreground hover:border-primary"
                  }`}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </button>
              </div>
            </div>

            {/* 2. Shop Categories (From Footer) */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
                Shop Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {shopCategories.map((cat) => {
                  const IconComp = cat.icon
                  return (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => handleNavigate(cat.href)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/70 text-xs font-bold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                    >
                      <IconComp className="h-4 w-4 text-primary shrink-0" />
                      <span className="truncate">{cat.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. Help & Policies (Exact Footer Links) */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
                Help &amp; Policies (Footer)
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleNavigate("/faqs")}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <span>FAQs</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/shipping-policy")}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <span className="truncate">Shipping &amp; Delivery</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/refund-policy")}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <span className="truncate">Returns &amp; Refunds</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/terms-conditions")}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <span className="truncate">Terms &amp; Conditions</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/privacy-policy")}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <span className="truncate">Privacy Policy</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/track-order")}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <span className="truncate">Track Your Order</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* 4. About & Company Links (Exact Footer Links) */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
                Company &amp; Info (Footer)
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleNavigate("/about")}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <span>Our Story</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/blog")}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <span>Blog &amp; Articles</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/contact")}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <span className="truncate">Wholesale Enquiry</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/about")}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <span>Careers</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* 5. Account & Shopping */}
            <div className="space-y-1.5 pt-2 border-t border-border/60">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
                User Account &amp; Cart
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleNavigate("/profile")}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/80 border border-border/70 text-xs font-bold text-foreground hover:border-primary transition-colors text-left cursor-pointer"
                >
                  <User className="h-4 w-4 text-primary shrink-0" />
                  <span>My Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/cart")}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/80 border border-border/70 text-xs font-bold text-foreground hover:border-primary transition-colors text-left cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4 text-primary shrink-0" />
                  <span>Cart ({totalItems})</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/wishlist")}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/80 border border-border/70 text-xs font-bold text-foreground hover:border-primary transition-colors text-left cursor-pointer"
                >
                  <Heart className="h-4 w-4 text-primary shrink-0" />
                  <span>Wishlist ({totalWishlist})</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/track-order")}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/80 border border-border/70 text-xs font-bold text-foreground hover:border-primary transition-colors text-left cursor-pointer"
                >
                  <PackageCheck className="h-4 w-4 text-primary shrink-0" />
                  <span>Track Order</span>
                </button>
              </div>
            </div>

            {/* Close Drawer CTA Button */}
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity cursor-pointer"
              >
                Close Menu
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  )
}
