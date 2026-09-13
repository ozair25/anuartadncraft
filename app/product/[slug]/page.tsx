"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { useShopifyProduct, useShopifyProducts } from "@/lib/shopify/hooks"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { Heart, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, ArrowLeft, Check } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const productSlug = resolvedParams.slug

  const { product: shopifyProduct, loading: isProductLoading, error: productError } = useShopifyProduct(productSlug)
  const { products: allProducts } = useShopifyProducts()

  const product = shopifyProduct

  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description")
  const [added, setAdded] = useState(false)

  const { addItem, checkoutUrl, isCartOpen, closeCart, isLoadingCart, redirectToCheckout } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const inWishlist = product ? isInWishlist(product.id) : false

  const activeImage =
    selectedImage ||
    product?.images?.[0] ||
    product?.thumbnail ||
    product?.image ||
    ""

  const activeVariant =
    product?.variants && product.variants.length > selectedVariantIndex
      ? product.variants[selectedVariantIndex]
      : undefined

  const currentPrice = activeVariant ? activeVariant.price : (product?.price || 0)
  const currentOriginalPrice = activeVariant
    ? activeVariant.originalPrice
    : product?.originalPrice

  const handleAddToCart = async () => {
    if (!product) return

    // Requirement 6 & 7: For product with multiple variants use selected variant; for 1 variant use that variant
    const selectedVariantGid = activeVariant?.id || product.variantId
    const productToAdd: Product = {
      ...product,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      ...(selectedVariantGid ? { variantId: selectedVariantGid } : {}),
    }

    const selectedOptionsMap: Record<string, string> = {}
    if (activeVariant?.selectedOptions) {
      for (const opt of activeVariant.selectedOptions) {
        selectedOptionsMap[opt.name] = opt.value
      }
    }

    const success = await addItem(productToAdd, quantity, selectedOptionsMap)
    if (success) {
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  const handleBuyNow = async () => {
    if (!product) return

    const selectedVariantGid = activeVariant?.id || product.variantId
    const productToAdd: Product = {
      ...product,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      ...(selectedVariantGid ? { variantId: selectedVariantGid } : {}),
    }

    const selectedOptionsMap: Record<string, string> = {}
    if (activeVariant?.selectedOptions) {
      for (const opt of activeVariant.selectedOptions) {
        selectedOptionsMap[opt.name] = opt.value
      }
    }

    const success = await addItem(productToAdd, quantity, selectedOptionsMap)
    if (success) {
      redirectToCheckout()
    }
  }

  const relatedProducts = allProducts.filter((p) => p.id !== product?.id).slice(0, 4)

  if (isProductLoading && !product) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-10">
          <div className="mx-auto max-w-7xl px-4 md:px-6 animate-pulse space-y-6">
            <div className="h-6 bg-muted/60 rounded w-24" />
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="aspect-square bg-muted/50 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-8 bg-muted/70 rounded w-3/4" />
                <div className="h-6 bg-muted/50 rounded w-1/3" />
                <div className="h-24 bg-muted/40 rounded w-full" />
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-20 text-center">
          <div className="max-w-md mx-auto p-6 bg-card rounded-2xl border border-border">
            <h2 className="font-serif text-2xl font-bold">Product Not Found</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              We couldn&apos;t find the product you are looking for.
            </p>
            {productError && (
              <p className="mt-2 text-xs font-mono text-amber-600">{productError}</p>
            )}
            <Link
              href="/shop"
              className="mt-6 inline-block bg-primary text-primary-foreground text-xs font-bold px-6 py-2.5 rounded-full"
            >
              Browse All Supplies
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Top Bar with Back button and Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-3.5 py-1.5 text-xs font-bold text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-primary" /> Back
            </button>
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-primary">Shop</Link>
              <span>/</span>
              <Link href={`/shop/${product.category}`} className="capitalize hover:text-primary">{product.category}</Link>
              <span>/</span>
              <span className="text-foreground font-semibold line-clamp-1">{product.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <img
                  src={activeImage || "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop"
                  }}
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow transition-colors ${
                    inWishlist ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? "fill-primary-foreground" : ""}`} />
                </button>
              </div>

              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === img ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-foreground"
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Actions */}
            <div className="flex flex-col">
              <RibbonLabel>{product.brand}</RibbonLabel>
              <h1 className="mt-4 font-serif text-2xl font-black text-foreground md:text-4xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-foreground">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviewsCount} customer reviews)</span>
                <span className="text-xs text-muted-foreground">|</span>
                <span className="text-xs font-semibold text-emerald-600">In Stock ({product.stock} units)</span>
              </div>

              {/* Pricing */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-black text-primary">₹{currentPrice}</span>
                {currentOriginalPrice && (
                  <span className="text-base text-muted-foreground line-through">₹{currentOriginalPrice}</span>
                )}
                {product.discount && (
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                    Save {product.discount}
                  </span>
                )}
              </div>

              {/* Variant Selector if available */}
              {product.variants && product.variants.length > 1 && (
                <div className="mt-6">
                  <span className="text-xs font-bold text-foreground">Select Option:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variants.map((v, vIdx) => (
                      <button
                        key={v.id || vIdx}
                        type="button"
                        onClick={() => setSelectedVariantIndex(vIdx)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          selectedVariantIndex === vIdx
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-foreground hover:bg-secondary"
                        }`}
                      >
                        {v.title} - ₹{v.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Quantity Selector & Add To Cart */}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-b border-border/60 py-6">
                <div className="flex items-center rounded-lg border border-border bg-card">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm font-bold hover:bg-secondary rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-2 text-sm font-bold hover:bg-secondary rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  disabled={isLoadingCart}
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-md transition-opacity hover:opacity-90 disabled:opacity-70 cursor-pointer"
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" /> Added to Cart!
                    </>
                  ) : isLoadingCart ? (
                    <span>Adding to Cart...</span>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" /> Add To Cart
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isLoadingCart}
                  onClick={handleBuyNow}
                  className="rounded-lg border-2 border-primary bg-card px-6 py-3 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-70 cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              {/* Value Badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-3 text-center">
                  <Truck className="h-5 w-5 text-primary mb-1" />
                  <span className="text-[11px] font-bold text-foreground">Fast Delivery</span>
                  <span className="text-[10px] text-muted-foreground">Dispatch in 24h</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-3 text-center">
                  <ShieldCheck className="h-5 w-5 text-primary mb-1" />
                  <span className="text-[11px] font-bold text-foreground">100% Genuine</span>
                  <span className="text-[10px] text-muted-foreground">Authentic Brand</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-3 text-center">
                  <RotateCcw className="h-5 w-5 text-primary mb-1" />
                  <span className="text-[11px] font-bold text-foreground">7 Days Return</span>
                  <span className="text-[10px] text-muted-foreground">Hassle Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <div className="flex border-b border-border gap-6">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === "description" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === "specs" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Reviews ({product.reviewsCount})
              </button>
            </div>

            <div className="mt-6 text-xs text-foreground leading-relaxed">
              {activeTab === "description" && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <p>
                    All items undergo strict quality checking before dispatch to ensure your art studio receives untouched, pristine art supplies.
                  </p>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specs ? (
                    Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-border/60 py-2">
                        <span className="font-semibold text-muted-foreground">{k}:</span>
                        <span className="font-bold text-foreground">{v}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Standard manufacturer specifications apply.</p>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-secondary/40 p-4 rounded-xl">
                    <div className="text-center">
                      <span className="font-serif text-3xl font-black text-primary">{product.rating}</span>
                      <p className="text-[10px] text-muted-foreground">out of 5</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Based on verified customer reviews</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-b border-border/60 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Aarav Sharma</span>
                        <span className="text-[10px] text-muted-foreground">2 weeks ago</span>
                      </div>
                      <div className="flex items-center gap-0.5 my-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground">Very satisfied with the purchase! Paint consistency is super smooth and vivid.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-black text-foreground md:text-3xl">
              You Might Also <span className="italic text-primary">Love</span>
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group rounded-lg border border-border bg-card p-3 shadow-sm hover:-translate-y-1 transition-transform">
                  <img src={p.thumbnail} alt={p.name} className="aspect-square w-full rounded object-cover" referrerPolicy="no-referrer" />
                  <h3 className="mt-2 text-xs font-bold line-clamp-2 text-foreground group-hover:text-primary">{p.name}</h3>
                  <p className="mt-1 font-serif text-sm font-black text-primary">₹{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  )
}
