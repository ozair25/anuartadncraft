"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { useAuth } from "@/lib/context/auth-context"
import { getOrders } from "@/lib/services/db-service"
import { User, Package, MapPin, Heart, LogOut } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "account">("orders")

  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-20 text-center">
          <User className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <h2 className="mt-4 font-serif text-2xl font-bold">Please Sign In</h2>
          <p className="mt-2 text-xs text-muted-foreground">Log in to view your orders and address book.</p>
          <Link href="/login" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow">
            Sign In Now
          </Link>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const userOrders = getOrders().filter((o) => o.userEmail.toLowerCase() === user.email.toLowerCase() || o.userId === user.id)

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center font-serif text-2xl font-black text-primary border-2 border-primary/40">
                {user.displayName.charAt(0)}
              </div>
              <div>
                <RibbonLabel>Verified Customer</RibbonLabel>
                <h1 className="mt-1 font-serif text-2xl font-bold text-foreground">{user.displayName}</h1>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  logout()
                  router.push("/")
                }}
                className="flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-bold text-destructive hover:bg-muted"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === "orders" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border border-border text-foreground hover:bg-secondary"
                }`}
              >
                <Package className="h-4 w-4" /> My Orders ({userOrders.length})
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === "addresses" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border border-border text-foreground hover:bg-secondary"
                }`}
              >
                <MapPin className="h-4 w-4" /> Address Book
              </button>

              <Link
                href="/wishlist"
                className="w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold bg-card border border-border text-foreground hover:bg-secondary"
              >
                <Heart className="h-4 w-4 text-primary" /> Saved Wishlist
              </Link>
            </div>

            {/* Tab Contents */}
            <div className="md:col-span-3 space-y-6">
              {activeTab === "orders" && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                  <h2 className="font-serif text-xl font-bold text-foreground">Order History</h2>
                  {userOrders.length === 0 ? (
                    <div className="py-12 text-center text-xs text-muted-foreground">
                      No orders placed yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userOrders.map((ord) => (
                        <div key={ord.id} className="rounded-xl border border-border bg-background p-4 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                            <div>
                              <span className="font-serif text-sm font-bold text-primary">{ord.orderNumber}</span>
                              <p className="text-[10px] text-muted-foreground">
                                {new Date(ord.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <span className="rounded bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                              {ord.status}
                            </span>
                          </div>

                          <div className="space-y-2">
                            {ord.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-xs">
                                <span className="text-foreground">{item.name} x {item.quantity}</span>
                                <span className="font-bold">₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-baseline border-t border-border/60 pt-2 text-xs">
                            <span className="font-bold">Total Paid:</span>
                            <span className="font-serif font-black text-primary">₹{ord.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                  <h2 className="font-serif text-xl font-bold text-foreground">Saved Addresses</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.addresses.map((addr) => (
                      <div key={addr.id} className="rounded-xl border border-border bg-background p-4 relative">
                        {addr.isDefault && (
                          <span className="absolute right-3 top-3 rounded bg-primary/20 px-2 py-0.5 text-[9px] font-bold text-primary">
                            Default
                          </span>
                        )}
                        <h3 className="font-bold text-xs text-foreground">{addr.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{addr.street}</p>
                        <p className="text-xs text-muted-foreground">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-[10px] text-muted-foreground mt-2">Phone: {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
