"use client"

import { use } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { getOrderById } from "@/lib/services/db-service"
import { CheckCircle2, PackageCheck, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react"

export default function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
  const resolvedParams = use(params)
  const orderNumber = resolvedParams.orderId

  const order = getOrderById(orderNumber)

  const rawPhone = typeof window !== "undefined" ? localStorage.getItem("anu_arts_whatsapp_phone") : null
  const cleanPhone = (rawPhone ? rawPhone.replace(/[^0-9]/g, "") : "") || "919425356009"
  const messageText = encodeURIComponent(
    `Hello Anu Arts & Craft Store!\n\nI have placed order #${orderNumber} for ₹${order?.total || 0}.\nItems: ${order?.items?.map((i) => `${i.name} (x${i.quantity})`).join(", ")}\nCustomer: ${order?.userName || "Customer"}`
  )
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${messageText}`

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
            <RibbonLabel>Order Confirmed</RibbonLabel>

            <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-4xl">
              Thank You For Your <span className="italic text-primary">Order!</span>
            </h1>

            <p className="mt-2 text-xs text-muted-foreground">
              Order Reference Number: <span className="font-bold text-foreground">{orderNumber}</span>
            </p>

            <div className="mt-8 text-left rounded-xl border border-border bg-background p-4 md:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-bold text-foreground">Order Status</span>
                <span className="rounded bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  {order?.status || "Processing"}
                </span>
              </div>

              {order && (
                <>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-foreground">Items Ordered:</span>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">{item.name} x {item.quantity}</span>
                        <span className="font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-foreground">Total Paid:</span>
                    <span className="font-serif text-xl font-black text-primary">₹{order.total}</span>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-[11px] font-bold text-foreground">Shipping To:</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {order.shippingAddress.name}, {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} - {order.shippingAddress.pincode}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 text-xs font-bold shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" /> Confirm Order via WhatsApp
              </a>

              <Link
                href={`/track-order?id=${orderNumber}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-2.5 text-xs font-bold text-foreground hover:bg-muted"
              >
                <PackageCheck className="h-4 w-4 text-primary" /> Track Delivery
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow"
              >
                Continue Shopping <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
