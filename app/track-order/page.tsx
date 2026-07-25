"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { getOrderById } from "@/lib/services/db-service"
import { Order } from "@/types/ecommerce"
import { Search, PackageCheck, Truck, CheckCircle2, Clock } from "lucide-react"

function TrackOrderContent() {
  const searchParams = useSearchParams()
  const initialId = searchParams.get("id") || ""

  const [orderIdInput, setOrderIdInput] = useState(initialId)
  const [searchedOrder, setSearchedOrder] = useState<Order | undefined>(undefined)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (initialId) {
      const found = getOrderById(initialId)
      setSearchedOrder(found)
      setSearched(true)
    }
  }, [initialId])

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderIdInput.trim()) {
      const found = getOrderById(orderIdInput.trim())
      setSearchedOrder(found)
      setSearched(true)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 py-10">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <RibbonLabel>Realtime Delivery Status</RibbonLabel>
        <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
          Track Your <span className="italic text-primary">Order</span>
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Enter your Order Number (e.g. ANU-123456) to check the live packing and shipment progress.
        </p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-2 max-w-md mx-auto mb-10">
        <input
          type="text"
          required
          placeholder="Enter Order Number (e.g. ANU-849201)"
          value={orderIdInput}
          onChange={(e) => setOrderIdInput(e.target.value)}
          className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Search className="h-4 w-4" /> Track
        </button>
      </form>

      {searched && (
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          {searchedOrder ? (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-4 gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Order ID</span>
                  <h3 className="font-serif text-2xl font-black text-primary">{searchedOrder.orderNumber}</h3>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Placed On</span>
                  <p className="text-xs font-bold text-foreground">
                    {new Date(searchedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-4 gap-2 text-center relative py-4">
                {[
                  { label: "Placed", icon: Clock, done: true },
                  { label: "Processing", icon: PackageCheck, done: true },
                  { label: "Shipped", icon: Truck, done: searchedOrder.status === "Shipped" || searchedOrder.status === "Delivered" },
                  { label: "Delivered", icon: CheckCircle2, done: searchedOrder.status === "Delivered" },
                ].map((s, idx) => {
                  const Icon = s.icon
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
                          s.done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-[11px] font-bold ${s.done ? "text-foreground" : "text-muted-foreground"}`}>
                        {s.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Order Item details */}
              <div className="rounded-xl border border-border/60 bg-background p-4 space-y-3">
                <h4 className="text-xs font-bold text-foreground border-b border-border/60 pb-2">Order Items</h4>
                {searchedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">{item.name} (x{item.quantity})</span>
                    <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between items-baseline border-t border-border/60 pt-2 text-xs">
                  <span className="font-bold">Total Amount:</span>
                  <span className="font-serif font-black text-lg text-primary">₹{searchedOrder.total}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <PackageCheck className="mx-auto h-10 w-10 text-muted-foreground/60" />
              <h3 className="mt-2 font-serif text-lg font-bold text-foreground">Order Not Found</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                We couldn&apos;t find an order matching &quot;{orderIdInput}&quot;. Please double check your order reference number.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<div className="py-20 text-center text-xs">Loading order tracker...</div>}>
          <TrackOrderContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
