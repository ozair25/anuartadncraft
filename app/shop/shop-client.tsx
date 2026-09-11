"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { Product } from "@/types/ecommerce"
import { useShopifyProducts } from "@/lib/shopify/hooks"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { Heart, ShoppingBag, Star, SlidersHorizontal, Search, ArrowLeft } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"

export interface ShopClientProps {
  initialProducts?: Product[]
}

export function ShopClient({ initialProducts = [] }: ShopClientProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [priceRange, setPriceRange] = useState<number>(2000)

  const { addItem, isCartOpen, closeCart, isLoadingCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const {
    products: allProducts,
    loading: isLoadingProducts,
    error: shopifyError,
  } = useShopifyProducts({ initialProducts })

  const categoriesList = useMemo(() => {
    const cats = new Map<string, { id: string; name: string; slug: string }>()
    allProducts.forEach((p) => {
      if (p.category && p.category.trim() && p.category !== "Home Page") {
        const slug = p.category
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
        if (slug && !cats.has(slug)) {
          cats.set(slug, { id: slug, name: p.category.trim(), slug })
        }
      }
    })
    return Array.from(cats.values())
  }, [allProducts])

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        const matchCategory =
          selectedCategory === "all" ||
          p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") === selectedCategory.toLowerCase() ||
          p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (p.collection && p.collection.toLowerCase().includes(selectedCategory.toLowerCase()))
        const matchSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchPrice = p.price <= priceRange
        return matchCategory && matchSearch && matchPrice
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price
        if (sortBy === "price-high") return b.price - a.price
        if (sortBy === "rating") return b.rating - a.rating
        return 0
      })
  }, [allProducts, selectedCategory, searchQuery, sortBy, priceRange])

  // Clear runtime console diagnostics
  useEffect(() => {
    console.log("[Shopify Diagnostics] Number of products returned:", allProducts.length)
    console.log("[Shopify Diagnostics] Number of products after filtering:", filteredProducts.length)
    console.log("[Shopify Diagnostics] Selected category:", selectedCategory)
    console.log("[Shopify Diagnostics] Search query:", searchQuery)
  }, [allProducts.length, filteredProducts.length, selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Previous Page
          </button>

          {/* Header section */}
          <div className="mb-8">
            <RibbonLabel>Shop Supplies</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
              All Art &amp; Craft <span className="italic text-primary">Supplies</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Browse our curated collection of professional paints, sketchbooks, crafting tools, and DIY kits.
            </p>
          </div>

          {/* Filter and Search Bar */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl border border-border bg-card p-4 shadow-sm">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-background pl-9 pr-4 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {/* Sort & Price Filter Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">Max Price:</span>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="accent-primary cursor-pointer"
                />
                <span className="text-xs font-semibold text-primary">₹{priceRange}</span>
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Shopify Connection Error Diagnostic Banner */}
          {shopifyError && (
            <div className="mb-8 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-amber-900 text-xs">
              <div className="font-bold flex items-center gap-2 mb-1 text-amber-800">
                <span>⚠️ Shopify Storefront API Diagnostic Notice:</span>
              </div>
              <p className="font-mono text-[11px] bg-white/70 p-2 rounded-lg border border-amber-200/60 mt-1">
                {shopifyError}
              </p>
              <p className="mt-1.5 text-[11px] text-amber-700">
                Connected store: <span className="font-bold">e08d97-2b.myshopify.com</span> (API 2026-04)
              </p>
            </div>
          )}

          {/* Category Chips */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              All Products ({allProducts.length})
            </button>
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-secondary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Loading Skeleton */}
          {isLoadingProducts && allProducts.length === 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {[...Array(10)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card p-3 space-y-3 animate-pulse"
                >
                  <div className="aspect-square bg-muted/60 rounded-md" />
                  <div className="h-3 bg-muted/80 rounded w-3/4" />
                  <div className="h-3 bg-muted/50 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {!isLoadingProducts && filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-card rounded-xl border border-border p-8">
              <h3 className="font-serif text-xl font-bold text-foreground">No supplies found</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Try adjusting your search query, price filter, or category selection.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all")
                  setSearchQuery("")
                  setPriceRange(2000)
                }}
                className="mt-4 rounded-full bg-primary px-6 py-2 text-xs font-bold text-primary-foreground"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredProducts.map((p) => {
                const inWishlist = isInWishlist(p.id)
                return (
                  <article
                    key={p.id}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card shadow-[3px_3px_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-square overflow-hidden bg-secondary/40">
                      <Link href={`/product/${p.slug}`}>
                        <img
                          src={p.thumbnail || "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop"}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop"
                          }}
                        />
                      </Link>
                      <button
                        aria-label="Add to wishlist"
                        onClick={() => toggleWishlist(p.id)}
                        className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full shadow transition-colors ${
                          inWishlist
                            ? "bg-primary text-primary-foreground"
                            : "bg-card/90 text-foreground hover:bg-primary hover:text-primary-foreground"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${inWishlist ? "fill-primary-foreground" : ""}`} />
                      </button>
                      {p.discount && (
                        <span className="absolute left-2 top-2 rounded bg-primary/90 px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                          {p.discount}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-3">
                      <Link href={`/product/${p.slug}`}>
                        <h3 className="line-clamp-2 min-h-[2.5rem] text-xs font-semibold leading-snug text-foreground hover:text-primary transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <p className="font-serif text-lg font-black text-primary">₹{p.price}</p>
                        {p.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">₹{p.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        <span className="text-xs font-bold text-foreground">{p.rating}</span>
                        <span className="text-[11px] text-muted-foreground">({p.reviewsCount})</span>
                      </div>
                      <button
                        disabled={isLoadingCart}
                        onClick={() => addItem(p)}
                        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#7c2d8a] py-2 min-h-[40px] text-xs font-bold text-white transition-all hover:bg-[#682274] active:scale-95 cursor-pointer shadow-xs disabled:opacity-70"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  )
}
