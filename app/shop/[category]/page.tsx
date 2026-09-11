"use client"

import { use, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { INITIAL_CATEGORIES } from "@/lib/data/mock-db"
import { useShopifyProducts } from "@/lib/shopify/hooks"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { Heart, ShoppingBag, Star, ArrowLeft } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const categorySlug = resolvedParams.category

  const { addItem, isCartOpen, closeCart, isLoadingCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { products: allProducts } = useShopifyProducts()

  const category = INITIAL_CATEGORIES.find(
    (c) => c.slug.toLowerCase() === categorySlug.toLowerCase() || c.id === categorySlug
  )

  const products = useMemo(() => {
    return allProducts.filter((p) => {
      const pCat = p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      const catSlug = categorySlug.toLowerCase()
      return (
        pCat === catSlug ||
        p.category.toLowerCase() === catSlug ||
        p.tags.some((t) => t.toLowerCase() === catSlug)
      )
    })
  }, [allProducts, categorySlug])

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

          <div className="mb-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <RibbonLabel>{category?.name || categorySlug}</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl capitalize">
              {category?.name || categorySlug} <span className="italic text-primary">Supplies</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              {category?.description || `Explore our handpicked range of ${categorySlug} tools and art materials.`}
            </p>
          </div>

          {products.length === 0 ? (
            <div className="py-20 text-center bg-card rounded-xl border border-border p-8">
              <h3 className="font-serif text-xl font-bold text-foreground">No products in this category yet</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Check back soon or explore our other art categories.
              </p>
              <Link
                href="/shop"
                className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-xs font-bold text-primary-foreground"
              >
                View All Supplies
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((p) => {
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
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        <span className="text-xs font-bold text-foreground">{p.rating}</span>
                        <span className="text-[11px] text-muted-foreground">({p.reviewsCount})</span>
                      </div>
                      <button
                        disabled={isLoadingCart}
                        onClick={() => addItem(p)}
                        className="mt-2 flex items-center justify-center gap-2 rounded bg-primary py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70 cursor-pointer"
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
      </main>
      <SiteFooter />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  )
}
