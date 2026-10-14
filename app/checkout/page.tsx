"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/lib/context/cart-context"
import { isSafeShopifyCheckoutUrl } from "@/lib/security/schemas"
import { ShoppingBag, ArrowRight, ShieldCheck, Loader2, ExternalLink } from "lucide-react"

export default function CheckoutPage() {
  const { items, checkoutUrl, isLoadingCart, redirectToCheckout, cartError } = useCart()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (items.length > 0 && !redirecting) {
      if (checkoutUrl && isSafeShopifyCheckoutUrl(checkoutUrl)) {
        setRedirecting(true)
        window.location.href = checkoutUrl
      } else if (!isLoadingCart) {
        redirectToCheckout()
      }
    }
  }, [items.length, checkoutUrl, redirecting, isLoadingCart, redirectToCheckout])

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-20 text-center">
          <div className="max-w-md mx-auto p-8 bg-card rounded-2xl border border-border shadow-sm">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/60" />
            <h2 className="mt-4 font-serif text-2xl font-bold text-foreground">No Items in Checkout</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Your shopping bag is empty. Please add items to your cart before proceeding to checkout.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow hover:opacity-90 transition-opacity"
            >
              Browse All Supplies <ArrowRight className="h-4 w-4" />
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
      <main className="flex-1 py-20">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm space-y-6">
            <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              {isLoadingCart || redirecting ? (
                <Loader2 className="h-7 w-7 animate-spin" />
              ) : (
                <ShieldCheck className="h-7 w-7" />
              )}
            </div>

            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">
                {redirecting
                  ? "Redirecting to Shopify Checkout..."
                  : "Proceeding to Secure Checkout"}
              </h1>
              <p className="mt-2 text-xs text-muted-foreground">
                Orders and payments are securely processed by Shopify. You will be redirected to complete your purchase.
              </p>
            </div>

            {cartError && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive text-left">
                <p className="font-semibold">Checkout Notice:</p>
                <p className="mt-1">{cartError}</p>
              </div>
            )}

            <div className="pt-2 space-y-3">
              {checkoutUrl && isSafeShopifyCheckoutUrl(checkoutUrl) ? (
                <a
                  href={checkoutUrl}
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 px-6 text-xs font-bold text-primary-foreground shadow hover:opacity-90 transition-opacity"
                >
                  Continue to Shopify Checkout <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled={isLoadingCart}
                  onClick={() => redirectToCheckout()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 px-6 text-xs font-bold text-primary-foreground shadow hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                  {isLoadingCart ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Preparing Checkout...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}

              <div>
                <Link
                  href="/cart"
                  className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors inline-block"
                >
                  Return to Shopping Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
