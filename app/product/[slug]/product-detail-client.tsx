"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { useShopifyProduct, useShopifyProducts } from "@/lib/shopify/hooks"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { Product } from "@/types/ecommerce"
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowLeft,
  Check,
} from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"

interface ProductDetailClientProps {
  initialProduct?: Product
  slug: string
}

export function ProductDetailClient({
  initialProduct,
  slug,
}: ProductDetailClientProps) {
  const router = useRouter()

  const {
    product: shopifyProduct,
    loading: isProductLoading,
    error: productError,
  } = useShopifyProduct(slug, initialProduct)
  const { products: allProducts } = useShopifyProducts({
    initialProducts: initialProduct ? [initialProduct] : [],
  })

  const product = shopifyProduct || initialProduct

  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">(
    "description"
  )
  const [added, setAdded] = useState(false)

  const {
    addItem,
    isCartOpen,
    closeCart,
    isLoadingCart,
    redirectToCheckout,
  } = useCart()
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

  const currentPrice = activeVariant ? activeVariant.price : product?.price || 0
  const currentOriginalPrice = activeVariant
    ? activeVariant.originalPrice
    : product?.originalPrice

  const handleAddToCart = async () => {
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

  const relatedProducts = allProducts
    .filter((p) => p.id !== product?.id)
    .slice(0, 4)

  if (isProductLoading && !product) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-10">
          <div className="mx-auto max-w-7xl px-4 md:px-6 animate-pulse space-y-6">
            <div className="h-6 bg-purple-100/60 rounded w-24" />
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="aspect-square bg-purple-50/50 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-8 bg-purple-100/70 rounded w-3/4" />
                <div className="h-6 bg-purple-50/50 rounded w-1/3" />
                <div className="h-24 bg-purple-50/40 rounded w-full" />
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
          <div className="max-w-md mx-auto p-6 bg-white rounded-2xl border border-pink-100 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Product Not Found
            </h2>
            <p className="mt-2 text-xs text-stone-500">
              We couldn&apos;t find the product you are looking for.
            </p>
            {productError && (
              <p className="mt-2 text-xs font-mono text-amber-600">
                {productError}
              </p>
            )}
            <Link
              href="/shop"
              className="mt-6 inline-block bg-[#7c2d8a] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#682274] transition-colors"
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
              className="inline-flex items-center gap-1.5 rounded-full border border-pink-100 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-800 hover:border-[#7c2d8a] hover:text-[#7c2d8a] transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-[#7c2d8a]" /> Back
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Link href="/" className="hover:text-[#7c2d8a]">
                Home
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-[#7c2d8a]">
                Shop
              </Link>
              <span>/</span>
              <Link
                href={`/shop/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="capitalize hover:text-[#7c2d8a]"
              >
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-stone-900 font-semibold line-clamp-1">
                {product.name}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
                <img
                  src={
                    activeImage ||
                    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={product.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop"
                  }}
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all cursor-pointer ${
                    inWishlist
                      ? "bg-[#d92672] text-white"
                      : "bg-white/95 text-stone-700 hover:bg-[#d92672] hover:text-white"
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart
                    className={`h-5 w-5 ${inWishlist ? "fill-white" : ""}`}
                  />
                </button>
              </div>

              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                        selectedImage === img || (!selectedImage && idx === 0)
                          ? "border-[#7c2d8a] ring-2 ring-[#7c2d8a]/20"
                          : "border-pink-100 hover:border-[#7c2d8a]"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Actions */}
            <div className="flex flex-col">
              <RibbonLabel>{product.brand || "Anu Arts Studio"}</RibbonLabel>
              <h1 className="mt-4 font-serif text-2xl font-black text-stone-900 md:text-3xl lg:text-4xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-800">
                  {product.rating}
                </span>
                <span className="text-xs text-stone-400">
                  ({product.reviewsCount} customer reviews)
                </span>
                <span className="text-xs text-stone-300">|</span>
                <span className="text-xs font-semibold text-emerald-600">
                  In Stock ({product.stock} units)
                </span>
              </div>

              {/* Pricing */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-black text-[#7c2d8a]">
                  ₹{currentPrice}
                </span>
                {currentOriginalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    ₹{currentOriginalPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="rounded-full bg-[#d92672] px-2.5 py-0.5 text-xs font-black text-white shadow-2xs">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Variant Selector if available */}
              {product.variants && product.variants.length > 1 && (
                <div className="mt-6">
                  <span className="text-xs font-bold text-stone-800">
                    Select Option / Size:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variants.map((v, vIdx) => (
                      <button
                        key={v.id || vIdx}
                        type="button"
                        onClick={() => setSelectedVariantIndex(vIdx)}
                        className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                          selectedVariantIndex === vIdx
                            ? "border-[#7c2d8a] bg-[#7c2d8a] text-white shadow-xs"
                            : "border-pink-100 bg-white text-stone-700 hover:bg-purple-50"
                        }`}
                      >
                        {v.title} - ₹{v.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Quantity Selector & Add To Cart */}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-b border-pink-100 py-6">
                <div className="flex items-center rounded-xl border border-pink-200 bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2.5 text-sm font-bold hover:bg-purple-50 text-stone-700 cursor-pointer rounded-l-xl transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2.5 text-xs font-bold text-stone-900 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    className="px-3.5 py-2.5 text-sm font-bold hover:bg-purple-50 text-stone-700 cursor-pointer rounded-r-xl transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  disabled={isLoadingCart}
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[180px] flex items-center justify-center gap-2 rounded-full bg-[#7c2d8a] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#682274] active:scale-95 transition-all disabled:opacity-70 cursor-pointer"
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
                  className="rounded-full border-2 border-[#7c2d8a] bg-white px-6 py-3 text-xs sm:text-sm font-bold text-[#7c2d8a] hover:bg-purple-50 active:scale-95 transition-all disabled:opacity-70 cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              {/* Value Badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center rounded-xl border border-pink-100 bg-white p-3 text-center shadow-2xs">
                  <Truck className="h-5 w-5 text-[#7c2d8a] mb-1" />
                  <span className="text-[11px] font-bold text-stone-800">
                    Fast Delivery
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Dispatch in 24h
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border border-pink-100 bg-white p-3 text-center shadow-2xs">
                  <ShieldCheck className="h-5 w-5 text-[#7c2d8a] mb-1" />
                  <span className="text-[11px] font-bold text-stone-800">
                    100% Genuine
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Studio Certified
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border border-pink-100 bg-white p-3 text-center shadow-2xs">
                  <RotateCcw className="h-5 w-5 text-[#7c2d8a] mb-1" />
                  <span className="text-[11px] font-bold text-stone-800">
                    Safe Shipping
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Bubble Packed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16 rounded-2xl border border-pink-100 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex border-b border-pink-100 gap-6">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                  activeTab === "description"
                    ? "border-[#7c2d8a] text-[#7c2d8a]"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                  activeTab === "specs"
                    ? "border-[#7c2d8a] text-[#7c2d8a]"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                  activeTab === "reviews"
                    ? "border-[#7c2d8a] text-[#7c2d8a]"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                Reviews ({product.reviewsCount})
              </button>
            </div>

            <div className="mt-6 text-xs text-stone-700 leading-relaxed">
              {activeTab === "description" && (
                <div className="space-y-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    className="prose prose-sm max-w-none text-stone-700"
                  />
                  <p className="text-stone-500 italic pt-2">
                    All items undergo strict quality checking before dispatch to
                    ensure your art studio receives untouched, pristine art
                    supplies.
                  </p>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specs ? (
                    Object.entries(product.specs).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between border-b border-pink-50 py-2"
                      >
                        <span className="font-semibold text-stone-500">
                          {k}:
                        </span>
                        <span className="font-bold text-stone-900">{v}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-stone-400">
                      Standard manufacturer specifications apply.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                    <div className="text-center">
                      <span className="font-serif text-3xl font-black text-[#7c2d8a]">
                        {product.rating}
                      </span>
                      <p className="text-[10px] text-stone-500">out of 5</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Based on verified customer reviews
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-b border-pink-50 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900">
                          Aarav Sharma
                        </span>
                        <span className="text-[10px] text-stone-400">
                          2 weeks ago
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 my-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="text-stone-600">
                        Very satisfied with the purchase! Consistency is super
                        smooth and vivid.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-black text-stone-900 md:text-3xl">
              You Might Also <span className="italic text-[#7c2d8a]">Love</span>
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="group rounded-2xl border border-pink-100 bg-white p-3 shadow-2xs hover:-translate-y-1 transition-all block cursor-pointer"
                >
                  <img
                    src={p.thumbnail}
                    alt={p.name}
                    className="aspect-square w-full rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="mt-2 text-xs font-bold line-clamp-2 text-stone-900 group-hover:text-[#7c2d8a]">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-serif text-sm font-black text-[#7c2d8a]">
                    ₹{p.price}
                  </p>
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
