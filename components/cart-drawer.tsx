"use client"

import { useCart } from "@/lib/context/cart-context"
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    checkoutUrl,
    isLoadingCart,
    cartError,
    clearCartError,
  } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponMsg, setCouponMsg] = useState("")
  const router = useRouter()

  if (!isOpen) return null

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (couponCode.trim().toUpperCase() === "ANU10" || couponCode.trim().toUpperCase() === "ANUARTS10") {
      applyCoupon(couponCode.trim().toUpperCase(), 10)
      setCouponMsg("10% Discount Applied!")
    } else {
      setCouponMsg("Invalid coupon. Try ANU10 or ANUARTS10")
    }
  }

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white text-[#1c1d1d] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 border-b border-purple-100 flex items-center justify-between bg-purple-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-purple-700" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800">Your Shopping Bag ({items.length})</h2>
              {isLoadingCart && (
                <span className="text-[11px] text-purple-600 animate-pulse font-medium">Syncing...</span>
              )}
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-stone-500 hover:bg-purple-100 cursor-pointer">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Error Banner */}
          {cartError && (
            <div className="p-3 mx-4 mt-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start justify-between gap-2 shadow-xs">
              <div className="flex-1">
                <p className="font-bold">Cart Notification</p>
                <p className="mt-0.5">{cartError}</p>
              </div>
              <button onClick={clearCartError} className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <p className="text-sm font-bold text-stone-700">Your bag is empty!</p>
                <p className="text-xs text-stone-500">Explore our art and craft supplies to add items.</p>
                <button
                  onClick={onClose}
                  className="mt-2 inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase shadow-sm hover:opacity-90 cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-purple-50/30 rounded-xl border border-purple-100 relative group">
                  <img
                    src={item.product.image || item.product.thumbnail}
                    alt={item.product.name}
                    className="h-16 w-16 object-cover rounded-lg border border-purple-100 shrink-0"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
                    }}
                  />
                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="text-xs font-bold text-stone-800 line-clamp-2">{item.product.name}</h3>
                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Object.entries(item.selectedOptions).map(([key, val]) => (
                          <span key={key} className="text-[10px] text-stone-500 bg-purple-100/60 px-1.5 py-0.5 rounded">
                            {key}: {val}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs font-extrabold text-purple-700 mt-1">₹{item.product.price.toLocaleString("en-IN")}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-purple-200 rounded-lg bg-white">
                        <button
                          disabled={isLoadingCart}
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-purple-50 text-xs disabled:opacity-50 cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button
                          disabled={isLoadingCart}
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-purple-50 text-xs disabled:opacity-50 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={isLoadingCart}
                    onClick={() => removeItem(item.product.id)}
                    className="absolute top-2 right-2 text-stone-400 hover:text-rose-500 p-1 cursor-pointer disabled:opacity-50"
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 border-t border-purple-100 bg-purple-50/40 space-y-3">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. ANU10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 rounded-xl border border-purple-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 uppercase"
                />
                <button type="submit" className="bg-stone-900 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-stone-800 cursor-pointer">
                  Apply
                </button>
              </form>
              {couponMsg && <p className="text-[11px] font-bold text-emerald-600">{couponMsg}</p>}

              {/* Order Summary */}
              <div className="space-y-1 text-xs text-stone-600 border-t border-purple-100 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold">{subtotal > 999 ? "FREE" : "₹99"}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-stone-900 border-t border-purple-200 pt-2">
                  <span>Total</span>
                  <span className="text-purple-700 font-black">₹{(totalPrice + (subtotal > 999 ? 0 : 99)).toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose()
                  if (checkoutUrl) {
                    window.location.href = checkoutUrl
                  } else {
                    router.push("/cart")
                  }
                }}
                className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                Proceed To Checkout
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
