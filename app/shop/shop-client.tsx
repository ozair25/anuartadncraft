"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { Product, Collection } from "@/types/ecommerce"
import { useShopifyProducts, useShopifyCollections } from "@/lib/shopify/hooks"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import {
  Heart,
  ShoppingBag,
  Star,
  SlidersHorizontal,
  Search,
  ArrowLeft,
  Sparkles,
  Layers,
  ChevronRight,
  ChevronDown,
  Filter,
  X,
  Flame,
  FolderTree,
  Gem,
  Paintbrush,
  FileText,
  LayoutGrid,
  BookOpen,
  Flower2,
  Palette,
  Box,
  Droplets,
  Scissors,
  Compass,
  Package,
  PartyPopper,
  Check,
  LayoutList,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react"
import { createPortal } from "react-dom"
import { CartDrawer } from "@/components/cart-drawer"
import { ShopCategoryDrawer } from "@/components/shop-category-drawer"
import {
  buildShopifyCategoryHierarchy,
  filterProductsByDynamicCategory,
  DynamicShopCategory,
} from "@/lib/shopify/category-hierarchy"

// Helper to resolve an icon for each official category
function getCategoryIcon(slug: string) {
  const s = slug.toLowerCase()
  if (s.includes("new-arrivals")) return Sparkles
  if (s.includes("accessories")) return Gem
  if (s.includes("brushes") || s.includes("tool")) return Paintbrush
  if (s.includes("decoupage")) return Layers
  if (s.includes("paper") || s.includes("cardstock")) return FileText
  if (s.includes("stencil") || s.includes("template")) return LayoutGrid
  if (s.includes("scrapbook") || s.includes("journal")) return BookOpen
  if (s.includes("flower")) return Flower2
  if (s.includes("paint") || s.includes("medium")) return Palette
  if (s.includes("mdf") || s.includes("acrylic-base")) return Box
  if (s.includes("resin")) return Droplets
  if (s.includes("diy-kit")) return Scissors
  if (s.includes("candle")) return Flame
  if (s.includes("lippan")) return Compass
  if (s.includes("value-pack")) return Package
  if (s.includes("festive")) return PartyPopper
  return Sparkles
}

export interface ShopClientProps {
  initialProducts?: Product[]
  initialCollections?: Collection[]
  initialCategory?: string
  initialSubcategory?: string
}

export function ShopClient({
  initialProducts = [],
  initialCollections = [],
  initialCategory,
  initialSubcategory,
}: ShopClientProps) {
  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory && initialCategory !== "all" ? initialCategory.toLowerCase() : "all"
  )
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    initialSubcategory ? initialSubcategory.toLowerCase() : null
  )
  const [selectedChildSubcategory, setSelectedChildSubcategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [priceRange, setPriceRange] = useState<number>(2000)
  const [mobileCategoryMenuOpen, setMobileCategoryMenuOpen] = useState<boolean>(false)
  const [mobileCategorySearch, setMobileCategorySearch] = useState<string>("")
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null)
  const [mounted, setMounted] = useState<boolean>(false)

  // Track hydration mount for react portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock background scroll when mobile category drawer is open
  useEffect(() => {
    if (mobileCategoryMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileCategoryMenuOpen])

  // Synchronize expanded mobile category when category changes
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "all") {
      setExpandedMobileCategory(selectedCategory)
    }
  }, [selectedCategory])

  const { addItem, isCartOpen, closeCart, isLoadingCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  // Live Shopify products and live Shopify collections
  const {
    products: allProducts,
    loading: isLoadingProducts,
    error: shopifyError,
  } = useShopifyProducts({ initialProducts })

  const {
    collections: shopifyCollections,
    loading: isLoadingCollections,
  } = useShopifyCollections({ initialCollections })

  // Dynamically construct Category Hierarchy driven by Shopify Collections as single source of truth
  const categoriesHierarchy = useMemo(() => {
    return buildShopifyCategoryHierarchy(shopifyCollections, allProducts)
  }, [shopifyCollections, allProducts])

  // Active Category object
  const activeCategory = useMemo(() => {
    if (selectedCategory === "all") return null
    return (
      categoriesHierarchy.find(
        (c) =>
          c.slug === selectedCategory ||
          c.handle === selectedCategory ||
          c.id === selectedCategory
      ) || null
    )
  }, [categoriesHierarchy, selectedCategory])

  // Synchronize when initialCategory prop changes
  useEffect(() => {
    if (initialCategory && initialCategory !== "all") {
      setSelectedCategory(initialCategory.toLowerCase())
    }
  }, [initialCategory])

  // Synchronize when initialSubcategory prop changes
  useEffect(() => {
    if (initialSubcategory) {
      setSelectedSubcategory(initialSubcategory.toLowerCase())
    }
  }, [initialSubcategory])

  // Reset subcategory if category changes
  useEffect(() => {
    setSelectedSubcategory(null)
    setSelectedChildSubcategory(null)
  }, [selectedCategory])

  // Filtered categories for mobile search
  const filteredCategories = useMemo(() => {
    if (!mobileCategorySearch.trim()) return categoriesHierarchy
    const q = mobileCategorySearch.toLowerCase().trim()
    return categoriesHierarchy.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.subcategories.some((s) => s.name.toLowerCase().includes(q))
    )
  }, [categoriesHierarchy, mobileCategorySearch])

  // Handle category switching and clean URL updating
  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug)
    setSelectedSubcategory(null)
    setSelectedChildSubcategory(null)
    setMobileCategoryMenuOpen(false)

    const targetUrl = slug === "all" ? "/shop" : `/shop/${slug}`
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", targetUrl)
    }
  }

  // Filter products by category, subcategory, child subcategory, search, price, and sort
  const filteredProducts = useMemo(() => {
    const byCategory = filterProductsByDynamicCategory(
      allProducts,
      selectedCategory,
      selectedSubcategory,
      categoriesHierarchy,
      selectedChildSubcategory
    )

    return byCategory
      .filter((p) => {
        const matchSearch =
          !searchQuery.trim() ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchPrice = p.price <= priceRange

        return matchSearch && matchPrice
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price
        if (sortBy === "price-high") return b.price - a.price
        if (sortBy === "rating") return b.rating - a.rating
        return 0
      })
  }, [
    allProducts,
    selectedCategory,
    selectedSubcategory,
    categoriesHierarchy,
    searchQuery,
    priceRange,
    sortBy,
  ])

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Breadcrumb / Back button */}
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Previous Page
            </button>

            {selectedCategory !== "all" && (
              <button
                type="button"
                onClick={() => handleSelectCategory("all")}
                className="text-xs font-bold text-[#7c2d8a] hover:underline cursor-pointer"
              >
                Clear Category Filter
              </button>
            )}
          </div>

          {/* Category Banner */}
          <div className="mb-8 rounded-2xl border border-pink-100/90 bg-gradient-to-r from-white via-purple-50/30 to-pink-50/20 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <RibbonLabel>
                  {activeCategory
                    ? activeCategory.type === "merchandising"
                      ? "Special Merchandising Collection"
                      : activeCategory.type === "seasonal"
                      ? "Seasonal Collection"
                      : "Shopify Managed Collection"
                    : "All Art & Craft Supplies"}
                </RibbonLabel>

                <h1 className="mt-3 font-serif text-3xl font-black text-foreground md:text-4xl lg:text-5xl">
                  {activeCategory ? (
                    <>
                      {activeCategory.name}{" "}
                      <span className="italic text-[#7c2d8a] font-normal">
                        {activeCategory.type === "merchandising" ? "Collection" : "Supplies"}
                      </span>
                    </>
                  ) : (
                    <>
                      All Art &amp; Craft{" "}
                      <span className="italic text-[#7c2d8a] font-normal">Supplies</span>
                    </>
                  )}
                </h1>

                <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  {activeCategory
                    ? activeCategory.description
                    : "Browse our complete catalog of curated craft materials, bases, artist tools, and DIY kits."}
                </p>
              </div>

              {/* Total Count Badge */}
              <div className="shrink-0 flex items-center gap-2 self-start md:self-auto bg-white px-4 py-2 rounded-full border border-pink-100 shadow-2xs">
                <Layers className="h-4 w-4 text-[#7c2d8a]" />
                <span className="text-xs font-bold text-stone-800">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "Product" : "Products"}
                </span>
              </div>
            </div>

            {/* Dynamic Subcategories Managed from Shopify Admin */}
            {activeCategory && activeCategory.subcategories.length > 0 && (
              <div className="mt-5 pt-4 border-t border-pink-100/60 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#7c2d8a] mr-2">
                    <FolderTree className="h-3.5 w-3.5 text-[#d92672]" />
                    <span>Subcategories:</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSubcategory(null)
                      setSelectedChildSubcategory(null)
                    }}
                    className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                      selectedSubcategory === null
                        ? "bg-[#7c2d8a] text-white shadow-2xs"
                        : "bg-white text-stone-700 hover:bg-purple-50 border border-pink-100"
                    }`}
                  >
                    All {activeCategory.name} ({activeCategory.productCount})
                  </button>

                  {activeCategory.subcategories.map((sub) => {
                    const isSubActive = selectedSubcategory === sub.slug
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          if (isSubActive) {
                            setSelectedSubcategory(null)
                            setSelectedChildSubcategory(null)
                          } else {
                            setSelectedSubcategory(sub.slug)
                            setSelectedChildSubcategory(null)
                          }
                        }}
                        className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSubActive
                            ? "bg-[#7c2d8a] text-white shadow-2xs"
                            : "bg-white text-stone-700 hover:bg-purple-50 border border-pink-100"
                        }`}
                      >
                        <span>{sub.name}</span>
                        {sub.productCount > 0 && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                              isSubActive
                                ? "bg-white/20 text-white"
                                : "bg-purple-100 text-[#7c2d8a]"
                            }`}
                          >
                            {sub.productCount}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* 3rd Tier Child Subcategories (e.g. 10x15 inch, 7x10 inch, Metallic, Mini transfer) */}
                {(() => {
                  const currentSub = activeCategory.subcategories.find(
                    (s) => s.slug === selectedSubcategory
                  )
                  if (!currentSub || !currentSub.children || currentSub.children.length === 0) {
                    return null
                  }
                  return (
                    <div className="pt-2 border-t border-pink-100/50 flex flex-wrap items-center gap-2 animate-fadeIn">
                      <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[#d92672] mr-2">
                        <ChevronRight className="h-3 w-3" />
                        <span>{currentSub.name} Options:</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedChildSubcategory(null)}
                        className={`rounded-full px-3 py-0.5 text-[11px] font-bold transition-all cursor-pointer ${
                          selectedChildSubcategory === null
                            ? "bg-[#d92672] text-white shadow-2xs"
                            : "bg-white text-stone-700 hover:bg-pink-50 border border-pink-200"
                        }`}
                      >
                        All {currentSub.name} ({currentSub.productCount})
                      </button>

                      {currentSub.children.map((child) => {
                        const isChildActive = selectedChildSubcategory === child.slug
                        return (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() =>
                              setSelectedChildSubcategory(isChildActive ? null : child.slug)
                            }
                            className={`rounded-full px-3 py-0.5 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                              isChildActive
                                ? "bg-[#d92672] text-white shadow-2xs"
                                : "bg-white text-stone-700 hover:bg-pink-50 border border-pink-200"
                            }`}
                          >
                            <span>{child.name}</span>
                            {child.productCount > 0 && (
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                                  isChildActive
                                    ? "bg-white/20 text-white"
                                    : "bg-pink-100 text-[#d92672]"
                                }`}
                              >
                                {child.productCount}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            )}
          </div>

          {/* Mobile Category Navigation Hub (Replaces horizontal swipe strip with menu-style browsing) */}
          <div className="lg:hidden mb-6 space-y-2.5">
            {/* Main Category Selector Card */}
            <div className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div
                  onClick={() => {
                    setMobileCategoryMenuOpen(true)
                    setExpandedMobileCategory(selectedCategory !== "all" ? selectedCategory : null)
                  }}
                  className="flex items-center gap-3 min-w-0 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7c2d8a] flex items-center justify-center shrink-0 border border-purple-100/70">
                    {(() => {
                      const Icon = activeCategory ? getCategoryIcon(activeCategory.slug) : ShoppingBag
                      return <Icon className="h-5 w-5" />
                    })()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                      Category
                    </div>
                    <div className="text-sm font-bold text-stone-900 truncate flex items-center gap-2">
                      <span className="truncate">
                        {activeCategory ? activeCategory.name : "All Art Supplies"}
                      </span>
                      <span className="shrink-0 bg-purple-100 text-[#7c2d8a] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {filteredProducts.length}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileCategoryMenuOpen(true)
                    setExpandedMobileCategory(selectedCategory !== "all" ? selectedCategory : null)
                  }}
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold bg-[#7c2d8a] text-white hover:bg-[#682274] px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer touch-manipulation active:scale-95"
                >
                  <LayoutList className="h-4 w-4" />
                  <span>Browse All</span>
                </button>
              </div>

              {/* Active Filter Chips & Reset */}
              {(selectedCategory !== "all" || selectedSubcategory || selectedChildSubcategory) && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-pink-100/60 text-xs">
                  <button
                    type="button"
                    onClick={() => handleSelectCategory("all")}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    <span>Reset Filter</span>
                  </button>

                  {selectedCategory !== "all" && activeCategory && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7c2d8a] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                      {activeCategory.name}
                    </span>
                  )}

                  {selectedSubcategory && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7c2d8a] bg-purple-100/80 px-2.5 py-1 rounded-full border border-purple-200">
                      <span>{selectedSubcategory}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSubcategory(null)
                          setSelectedChildSubcategory(null)
                        }}
                        className="hover:text-rose-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {selectedChildSubcategory && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#d92672] bg-pink-100 px-2.5 py-1 rounded-full border border-pink-200">
                      <span>{selectedChildSubcategory}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedChildSubcategory(null)}
                        className="hover:text-rose-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Quick Subcategories Wrap Row (No horizontal swiping needed) */}
              {activeCategory && activeCategory.subcategories.length > 0 && (
                <div className="pt-2 border-t border-pink-100/60 space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#7c2d8a]">
                    Subcategories in {activeCategory.name}:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubcategory(null)
                        setSelectedChildSubcategory(null)
                      }}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        selectedSubcategory === null
                          ? "bg-[#7c2d8a] text-white shadow-2xs"
                          : "bg-purple-50/70 text-stone-700 hover:bg-purple-100 border border-purple-100"
                      }`}
                    >
                      All ({activeCategory.productCount})
                    </button>
                    {activeCategory.subcategories.map((sub) => {
                      const isSubActive = selectedSubcategory === sub.slug
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => {
                            if (isSubActive) {
                              setSelectedSubcategory(null)
                              setSelectedChildSubcategory(null)
                            } else {
                              setSelectedSubcategory(sub.slug)
                              setSelectedChildSubcategory(null)
                            }
                          }}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSubActive
                              ? "bg-[#7c2d8a] text-white shadow-2xs"
                              : "bg-white text-stone-700 hover:bg-purple-50 border border-pink-100"
                          }`}
                        >
                          <span>{sub.name}</span>
                          {sub.productCount > 0 && (
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                                isSubActive
                                  ? "bg-white/20 text-white"
                                  : "bg-purple-100 text-[#7c2d8a]"
                              }`}
                            >
                              {sub.productCount}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clean Full-Height Mobile Category Drawer */}
          <ShopCategoryDrawer
            isOpen={mobileCategoryMenuOpen}
            onClose={() => setMobileCategoryMenuOpen(false)}
            activeCategorySlug={selectedCategory}
            activeSubcategorySlug={selectedSubcategory || undefined}
            onSelectCategory={(catSlug, subSlug) => {
              handleSelectCategory(catSlug)
              if (subSlug) {
                setSelectedSubcategory(subSlug)
              }
            }}
          />

          {/* Main Grid: Left Category Sidebar + Right Product Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Left Category Sidebar (CMS Driven from Shopify Collections) */}
            <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 sticky top-24">
              <div className="rounded-2xl border border-pink-100/90 bg-white p-4 shadow-sm space-y-4">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between pb-3 border-b border-pink-100/80">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#7c2d8a]">
                    <Layers className="h-4 w-4" />
                    <span>Shopify Collections</span>
                  </div>
                  <span className="text-[10px] font-bold text-stone-400">
                    {categoriesHierarchy.length} Main
                  </span>
                </div>

                {/* All Supplies Button */}
                <button
                  type="button"
                  onClick={() => handleSelectCategory("all")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-[#7c2d8a] text-white shadow-sm"
                      : "text-stone-700 hover:bg-purple-50 hover:text-[#7c2d8a]"
                  }`}
                >
                  <span className="truncate">All Supplies</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      selectedCategory === "all"
                        ? "bg-white/25 text-white"
                        : "bg-purple-50 text-[#7c2d8a]"
                    }`}
                  >
                    {allProducts.length}
                  </span>
                </button>

                {/* Dynamic Category List with Subcategory Expansion */}
                <nav
                  aria-label="Shop collections navigation"
                  className="space-y-1 max-h-[65vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-purple-200"
                >
                  {categoriesHierarchy.map((cat) => {
                    const isSelected = selectedCategory === cat.slug

                    return (
                      <div key={cat.id} className="space-y-1">
                        <button
                          type="button"
                          onClick={() => handleSelectCategory(cat.slug)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer group ${
                            isSelected
                              ? "bg-[#7c2d8a] text-white font-bold shadow-xs"
                              : "text-stone-700 hover:bg-purple-50/80 hover:text-[#7c2d8a]"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            {cat.type === "merchandising" && (
                              <Sparkles
                                className={`h-3 w-3 shrink-0 ${
                                  isSelected ? "text-amber-300" : "text-amber-500"
                                }`}
                              />
                            )}
                            {cat.type === "seasonal" && (
                              <Flame
                                className={`h-3 w-3 shrink-0 ${
                                  isSelected ? "text-orange-300" : "text-orange-500"
                                }`}
                              />
                            )}
                            <span className="truncate">{cat.name}</span>
                          </div>

                          <span
                            className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-purple-50 text-[#7c2d8a] group-hover:bg-purple-100"
                            }`}
                          >
                            {cat.productCount}
                          </span>
                        </button>

                        {/* Nested Subcategories from Shopify Collections */}
                        {isSelected && cat.subcategories.length > 0 && (
                          <div className="ml-3 pl-3 border-l-2 border-purple-200 space-y-1 py-1 animate-fadeIn">
                            {cat.subcategories.map((sub) => {
                              const isSubActive = selectedSubcategory === sub.slug
                              const hasChildren = sub.children && sub.children.length > 0
                              return (
                                <div key={sub.id} className="space-y-0.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (isSubActive) {
                                        setSelectedSubcategory(null)
                                        setSelectedChildSubcategory(null)
                                      } else {
                                        setSelectedSubcategory(sub.slug)
                                        setSelectedChildSubcategory(null)
                                      }
                                    }}
                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-left transition-colors cursor-pointer ${
                                      isSubActive
                                        ? "text-[#7c2d8a] font-bold bg-purple-50"
                                        : "text-stone-600 hover:text-[#7c2d8a] hover:bg-purple-50/50"
                                    }`}
                                  >
                                    <span className="truncate">{sub.name}</span>
                                    {sub.productCount > 0 && (
                                      <span className="text-[9px] text-stone-400">
                                        {sub.productCount}
                                      </span>
                                    )}
                                  </button>

                                  {/* 3rd Tier Child Subcategories (e.g. 10x15 inch, 7x10 inch, Metallic, Mini transfer) */}
                                  {isSubActive && hasChildren && (
                                    <div className="ml-2 pl-2.5 border-l border-pink-300 space-y-0.5 py-0.5 animate-fadeIn">
                                      {sub.children!.map((child) => {
                                        const isChildActive =
                                          selectedChildSubcategory === child.slug
                                        return (
                                          <button
                                            key={child.id}
                                            type="button"
                                            onClick={() =>
                                              setSelectedChildSubcategory(
                                                isChildActive ? null : child.slug
                                              )
                                            }
                                            className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-[10px] font-medium text-left transition-colors cursor-pointer ${
                                              isChildActive
                                                ? "text-[#d92672] font-bold bg-pink-50"
                                                : "text-stone-500 hover:text-[#d92672] hover:bg-pink-50/40"
                                            }`}
                                          >
                                            <span className="truncate">{child.name}</span>
                                            {child.productCount > 0 && (
                                              <span className="text-[8px] text-stone-400">
                                                {child.productCount}
                                              </span>
                                            )}
                                          </button>
                                        )
                                      })}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Product Section */}
            <div className="lg:col-span-9 xl:col-span-9 space-y-6">
              {/* Search, Sort & Price Filter Bar */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl border border-pink-100/90 bg-white p-4 shadow-sm">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search in this collection..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-pink-100 bg-[#fffaff] pl-9 pr-4 py-2 text-xs text-foreground focus:outline-none focus:border-[#7c2d8a] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Sort & Price Filter Controls */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-700">Max Price:</span>
                    <input
                      type="range"
                      min={100}
                      max={2000}
                      step={50}
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="accent-[#7c2d8a] cursor-pointer w-24 sm:w-32"
                    />
                    <span className="text-xs font-bold text-[#7c2d8a]">₹{priceRange}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="rounded-lg border border-pink-100 bg-[#fffaff] px-3 py-1.5 text-xs font-bold text-foreground focus:outline-none focus:border-[#7c2d8a] cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Shopify Notice */}
              {shopifyError && (
                <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 text-amber-900 text-xs">
                  <div className="font-bold flex items-center gap-2 mb-1 text-amber-800">
                    <span>⚠️ Shopify Storefront API Notice:</span>
                  </div>
                  <p className="font-mono text-[11px] bg-white/70 p-2 rounded-lg border border-amber-200/60 mt-1">
                    {shopifyError}
                  </p>
                </div>
              )}

              {/* Loading Skeleton */}
              {isLoadingProducts && allProducts.length === 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {[...Array(8)].map((_, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col overflow-hidden rounded-2xl border border-pink-100 bg-white p-3 space-y-3 animate-pulse shadow-sm"
                    >
                      <div className="aspect-square bg-purple-50/70 rounded-xl" />
                      <div className="h-3 bg-purple-100/60 rounded w-3/4" />
                      <div className="h-3 bg-purple-50/50 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              )}

              {/* Product Grid or Empty State */}
              {!isLoadingProducts && filteredProducts.length === 0 ? (
                <div className="py-16 sm:py-20 text-center bg-white rounded-3xl border border-pink-100/90 p-8 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-purple-50 text-[#7c2d8a] flex items-center justify-center mx-auto mb-4 border border-purple-100">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                    {selectedSubcategory
                      ? `No products in ${selectedSubcategory} yet`
                      : activeCategory
                      ? `No products in ${activeCategory.name} yet`
                      : "No supplies found matching your criteria"}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                    {activeCategory
                      ? `Products can be assigned directly to this collection inside Shopify Admin. Please check back shortly or explore other categories.`
                      : "Try adjusting your search query, price filter, or choose a different category."}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        handleSelectCategory("all")
                        setSearchQuery("")
                        setPriceRange(2000)
                      }}
                      className="rounded-full bg-[#7c2d8a] hover:bg-[#682274] text-white px-6 py-2.5 text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      View All Supplies ({allProducts.length})
                    </button>
                    {activeCategory && (
                      <button
                        type="button"
                        onClick={() => handleSelectCategory("diy-kits")}
                        className="rounded-full bg-purple-50 hover:bg-purple-100 text-[#7c2d8a] border border-purple-200 px-6 py-2.5 text-xs font-bold transition-all cursor-pointer"
                      >
                        Explore DIY Kits
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3.5 sm:gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((p) => {
                    const inWishlist = isInWishlist(p.id)
                    const productUrl = `/product/${encodeURIComponent(p.slug)}`
                    return (
                      <div
                        key={p.id}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-pink-100/80 bg-white shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                      >
                        {/* Stretched Link for 100% reliable instant navigation on entire card */}
                        <Link
                          href={productUrl}
                          className="absolute inset-0 z-1 cursor-pointer"
                          aria-label={p.name}
                        />

                        {/* Image & Wishlist Container */}
                        <div className="relative aspect-square overflow-hidden bg-purple-50/30">
                          <img
                            src={
                              p.thumbnail ||
                              "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop"
                            }
                            alt={p.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.onerror = null
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop"
                            }}
                          />

                          {/* Wishlist Button - elevated above stretched link */}
                          <button
                            type="button"
                            aria-label="Add to wishlist"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              toggleWishlist(p.id)
                            }}
                            className={`relative z-10 absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-all cursor-pointer ${
                              inWishlist
                                ? "bg-[#d92672] text-white"
                                : "bg-white/90 text-stone-700 hover:bg-[#d92672] hover:text-white"
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                inWishlist ? "fill-white" : ""
                              }`}
                            />
                          </button>

                          {/* Category / Discount Badge */}
                          <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1 pointer-events-none">
                            {p.discount && (
                              <span className="rounded-full bg-[#d92672] px-2 py-0.5 text-[10px] font-black text-white shadow-2xs">
                                {p.discount}
                              </span>
                            )}
                            <span className="rounded-full bg-white/95 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold text-[#7c2d8a] shadow-2xs border border-purple-100">
                              {p.category}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-1 flex-col justify-between p-3.5 space-y-2.5">
                          <div className="space-y-1">
                            <h3 className="line-clamp-2 min-h-[2.5rem] text-xs font-bold leading-snug text-stone-900 group-hover:text-[#7c2d8a] transition-colors">
                              {p.name}
                            </h3>

                            <div className="flex items-center gap-1 text-[11px] text-amber-500">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="font-bold text-stone-800">
                                {p.rating}
                              </span>
                              <span className="text-stone-400 text-[10px]">
                                ({p.reviewsCount})
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2 pt-1 border-t border-pink-50">
                            <div className="flex items-baseline justify-between">
                              <span className="font-serif text-base sm:text-lg font-black text-[#7c2d8a]">
                                ₹{p.price}
                              </span>
                              {p.originalPrice && p.originalPrice > p.price && (
                                <span className="text-[11px] text-stone-400 line-through">
                                  ₹{p.originalPrice}
                                </span>
                              )}
                            </div>

                            {/* Add to Bag Button - elevated above stretched link */}
                            <button
                              type="button"
                              disabled={isLoadingCart}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                addItem(p)
                              }}
                              className="relative z-10 w-full flex items-center justify-center gap-2 rounded-full bg-[#7c2d8a] py-2 min-h-[36px] text-xs font-bold text-white transition-all hover:bg-[#682274] active:scale-95 cursor-pointer shadow-xs disabled:opacity-70"
                            >
                              <ShoppingBag className="h-3.5 w-3.5" />
                              <span>Add to Bag</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  )
}
