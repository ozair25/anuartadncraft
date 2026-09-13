"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { useWishlist } from "@/lib/context/wishlist-context"
import { useCart } from "@/lib/context/cart-context"
import { useShopifyProducts } from "@/lib/shopify/hooks"
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react"

export default function WishlistPage() {
  const { wishlistIds, toggleWishlist, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const { products: allProducts } = useShopifyProducts()

  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id) || wishlistIds.includes(p.slug))

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <RibbonLabel>Saved Favorites</RibbonLabel>
              <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
                My <span className="italic text-primary">Wishlist</span> ({wishlistProducts.length})
              </h1>
            </div>
            {wishlistProducts.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-xs font-bold text-destructive hover:underline"
              >
                Clear All Wishlist Items
              </button>
            )}
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center bg-card rounded-2xl border border-border p-8 shadow-sm max-w-md mx-auto">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 font-serif text-xl font-bold text-foreground">Your Wishlist is Empty</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Save items you love by tapping the heart icon on any product card.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow"
              >
                Explore Art Supplies <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {wishlistProducts.map((p) => (
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
                      aria-label="Remove from wishlist"
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-3">
                    <Link href={`/product/${p.slug}`}>
                      <h3 className="line-clamp-2 min-h-[2.5rem] text-xs font-semibold leading-snug text-foreground hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="font-serif text-lg font-black text-primary">₹{p.price}</p>
                    <button
                      onClick={() => addItem(p)}
                      className="mt-2 flex items-center justify-center gap-2 rounded bg-primary py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
