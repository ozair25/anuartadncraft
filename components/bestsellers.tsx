"use client"

import Link from "next/link"
import { Heart, Star, ArrowRight, ShoppingBag } from "lucide-react"
import { RibbonLabel } from "@/components/ribbon-label"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { useShopifyProducts } from "@/lib/shopify/hooks"

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
      ))}
    </div>
  )
}

export function Bestsellers() {
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { products: allProducts, loading } = useShopifyProducts()

  const bestsellerProducts = (() => {
    const tagged = allProducts.filter(
      (p) =>
        p.isBestSeller ||
        p.tags.some((t) => t.toLowerCase().includes("bestseller") || t.toLowerCase() === "hot")
    )
    if (tagged.length >= 3) return tagged.slice(0, 10)
    return allProducts.slice(0, 10)
  })()

  const displayProducts = bestsellerProducts

  if (!loading && displayProducts.length === 0) {
    return null
  }

  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <RibbonLabel>Bestsellers</RibbonLabel>
            <h2 className="mt-4 font-serif text-3xl font-black tracking-tight text-foreground text-balance md:text-4xl">
              Loved By <span className="italic text-primary">Artists</span> Like You.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground hover:text-primary"
            >
              View All Bestsellers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {loading && displayProducts.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-border/60 bg-card p-3 space-y-3">
                  <div className="aspect-square bg-muted/60 rounded-md" />
                  <div className="h-3 bg-muted/70 rounded w-3/4" />
                  <div className="h-3 bg-muted/50 rounded w-1/2" />
                </div>
              ))
            : displayProducts.map((p) => {
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
                  <div className="flex items-center gap-1.5">
                    <Stars />
                    <span className="text-[11px] text-muted-foreground">({p.reviewsCount})</span>
                  </div>
                  <button
                    onClick={() => addItem(p)}
                    className="mt-2 flex items-center justify-center gap-2 rounded bg-primary py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Add to Cart
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
