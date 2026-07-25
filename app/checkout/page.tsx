"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { useCart } from "@/lib/context/cart-context"
import { useAuth } from "@/lib/context/auth-context"
import { createOrder } from "@/lib/services/db-service"
import { Order } from "@/types/ecommerce"
import { ShieldCheck, ArrowRight, CreditCard, Wallet, Truck, ArrowLeft } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, discountAmount, clearCart } = useCart()
  const { user } = useAuth()

  const defaultAddr = user?.addresses[0]

  const [formData, setFormData] = useState({
    name: defaultAddr?.name || user?.displayName || "",
    email: user?.email || "",
    phone: defaultAddr?.phone || user?.phone || "",
    street: defaultAddr?.street || "",
    city: defaultAddr?.city || "",
    state: defaultAddr?.state || "",
    pincode: defaultAddr?.pincode || "",
    paymentMethod: "UPI" as "UPI" | "Card" | "NetBanking" | "COD",
  })

  const [submitting, setSubmitting] = useState(false)

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shippingFee = subtotal > 499 ? 0 : 50
  const finalTotal = totalPrice + shippingFee

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const orderNumber = "ANU-" + Math.floor(100000 + Math.random() * 900000)
    const newOrder: Order = {
      id: "ord-" + Date.now(),
      orderNumber,
      userId: user?.id || "guest",
      userEmail: formData.email,
      userName: formData.name,
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.thumbnail,
      })),
      subtotal,
      discountAmount,
      shippingFee,
      total: finalTotal,
      status: "Processing",
      shippingAddress: {
        id: "addr-" + Date.now(),
        name: formData.name,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === "COD" ? "Pending" : "Paid",
      createdAt: new Date().toISOString(),
    }

    createOrder(newOrder)
    clearCart()

    setTimeout(() => {
      router.push(`/order-success/${newOrder.orderNumber}`)
    }, 800)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-20 text-center">
          <h2 className="font-serif text-2xl font-bold">No items in checkout</h2>
          <p className="mt-2 text-xs text-muted-foreground">Please add items to your shopping bag first.</p>
          <Link href="/shop" className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-xs font-bold text-primary-foreground">
            Browse Store
          </Link>
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
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Previous Page / Cart
          </button>

          <div className="mb-8">
            <RibbonLabel>Secure Checkout</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
              Complete Your <span className="italic text-primary">Order</span>
            </h1>
          </div>

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Delivery Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-serif text-lg font-bold text-foreground mb-4">1. Shipping Address</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-bold text-foreground">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-foreground">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-foreground">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-foreground">Street Address / House No. *</label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-foreground">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-foreground">State *</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-foreground">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-serif text-lg font-bold text-foreground mb-4">2. Select Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "UPI", label: "Instant UPI (GPay/PhonePe)", icon: Wallet },
                    { id: "Card", label: "Credit / Debit Card", icon: CreditCard },
                    { id: "NetBanking", label: "Net Banking", icon: ShieldCheck },
                    { id: "COD", label: "Cash On Delivery (COD)", icon: Truck },
                  ].map((pm) => {
                    const Icon = pm.icon
                    const isSelected = formData.paymentMethod === pm.id
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: pm.id as any })}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-xs font-bold transition-colors ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground hover:bg-secondary"
                        }`}
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        {pm.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Order Review & Pay */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm h-fit space-y-6">
              <h2 className="font-serif text-xl font-bold text-foreground">Order Items ({items.length})</h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((i) => (
                  <div key={i.product.id} className="flex items-center justify-between text-xs border-b border-border/60 pb-2">
                    <div className="flex items-center gap-2">
                      <img src={i.product.thumbnail} alt={i.product.name} className="h-10 w-10 rounded object-cover" />
                      <div>
                        <p className="font-bold line-clamp-1">{i.product.name}</p>
                        <p className="text-[10px] text-muted-foreground">Qty: {i.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold">₹{i.product.price * i.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs border-t border-border/60 pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-foreground border-t border-border/60 pt-2">
                  <span>Total To Pay</span>
                  <span className="text-primary font-serif font-black">₹{finalTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-xs font-bold text-primary-foreground shadow-md hover:opacity-90 transition-opacity"
              >
                {submitting ? "Processing Order..." : `Place Order (₹${finalTotal})`}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
