"use client"

import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { useShopifyProducts } from "@/lib/shopify/hooks"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { Heart, ShoppingBag, Star, Search } from "lucide-react"

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { products: shopifyResults, loading } = useShopifyProducts({ query })

  const results = useMemo(() => {
    if (!query.trim()) return []
    return shopifyResults || []
  }, [query, shopifyResults])

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <div className="mb-8">
        <RibbonLabel>Search Results</RibbonLabel>
        <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
          Search Results For <span className="italic text-primary">&quot;{query}&quot;</span>
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Found {results.length} matching art and craft supply items.
        </p>
      </div>

      {results.length === 0 ? (
        <div className="py-20 text-center bg-card rounded-2xl border border-border p-8 shadow-sm max-w-md mx-auto">
          <Search className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <h3 className="mt-4 font-serif text-xl font-bold text-foreground">No matching products</h3>
          <p className="mt-2 text-xs text-muted-foreground">
            Try searching for other terms like &quot;acrylic&quot;, &quot;sketchbook&quot;, &quot;pastels&quot;, or &quot;fabric&quot;.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow"
          >
            Browse All Supplies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {results.map((p) => {
            const inWishlist = isInWishlist(p.id)
            return (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card shadow-[3px_3px_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary/40">
                  <Link href={`/product/${p.slug}`}>
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
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
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-xs font-bold text-foreground">{p.rating}</span>
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
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<div className="py-20 text-center text-xs">Searching art supplies...</div>}>
          <SearchResultsContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
