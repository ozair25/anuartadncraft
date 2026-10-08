"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { useCart } from "@/lib/context/cart-context"
import { getCouponByCode } from "@/lib/services/db-service"
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft, Tag } from "lucide-react"

export default function CartPage() {
  const router = useRouter()
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    checkoutUrl,
    redirectToCheckout,
  } = useCart()

  const [couponInput, setCouponInput] = useState("")
  const [couponError, setCouponError] = useState("")
  const [couponSuccess, setCouponSuccess] = useState("")

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shippingFee = 0

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    setCouponError("")
    setCouponSuccess("")

    const found = getCouponByCode(couponInput)
    if (!found) {
      setCouponError("Invalid or expired coupon code")
      return
    }

    if (subtotal < found.minOrderValue) {
      setCouponError(`Minimum order value for ${found.code} is ₹${found.minOrderValue}`)
      return
    }

    applyCoupon(found.code, found.discountPercent)
    setCouponSuccess(`Applied ${found.code} (${found.discountPercent}% OFF)`)
    setCouponInput("")
  }

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

          <div className="mb-8">
            <RibbonLabel>Your Shopping Bag</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
              Shopping <span className="italic text-primary">Cart</span>
            </h1>
          </div>

          {items.length === 0 ? (
            <div className="py-20 text-center bg-card rounded-2xl border border-border p-8 shadow-sm max-w-md mx-auto">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 font-serif text-xl font-bold text-foreground">Your cart is empty</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Looks like you haven&apos;t added any art supplies yet.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow"
              >
                Start Shopping <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Item List */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.name}
                        className="h-20 w-20 rounded-lg object-cover border border-border"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-xs font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 font-serif text-sm font-black text-primary">₹{item.product.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      <div className="flex items-center rounded-lg border border-border bg-background">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs font-bold text-foreground hover:bg-secondary rounded-l"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs font-bold text-foreground hover:bg-secondary rounded-r"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm font-black text-foreground">
                        ₹{item.product.price * item.quantity}
                      </span>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline mt-4"
                >
                  <ArrowLeft className="h-4 w-4" /> Continue Shopping
                </Link>
              </div>

              {/* Order Summary Box */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm h-fit space-y-6">
                <h2 className="font-serif text-xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-3 text-xs border-b border-border/60 pb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal:</span>
                    <span className="font-bold text-foreground">₹{subtotal}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount ({appliedCoupon}):</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping:</span>
                    <span className="font-semibold text-stone-700 text-xs">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-xs">
                      <span className="font-bold text-emerald-800">Coupon &quot;{appliedCoupon}&quot; Applied</span>
                      <button onClick={removeCoupon} className="text-xs text-red-600 font-bold hover:underline">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Coupon Code (e.g. ANUARTS10)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:outline-none focus:border-primary"
                        />
                        <button
                          type="submit"
                          className="rounded-lg bg-secondary border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:bg-muted"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && <p className="text-[10px] text-destructive font-semibold">{couponError}</p>}
                      {couponSuccess && <p className="text-[10px] text-emerald-600 font-semibold">{couponSuccess}</p>}
                    </form>
                  )}
                </div>

                <div className="flex justify-between items-baseline border-t border-border/60 pt-4">
                  <span className="font-bold text-foreground">Total Amount:</span>
                  <span className="font-serif text-2xl font-black text-primary">₹{totalPrice + shippingFee}</span>
                </div>

                <button
                  type="button"
                  onClick={redirectToCheckout}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-xs font-bold text-primary-foreground shadow transition-opacity hover:opacity-90 cursor-pointer"
                >
                  Proceed To Checkout <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
