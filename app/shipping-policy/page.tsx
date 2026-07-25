import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <RibbonLabel>Delivery Info</RibbonLabel>
          <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-4xl">
            Shipping &amp; Delivery Policy
          </h1>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6 text-xs text-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-base font-bold text-foreground">1. Shipping Charges</h2>
              <p className="text-muted-foreground">
                We offer <strong>FREE Shipping</strong> on all orders over ₹499 across India. Standard shipping flat rate of ₹50 applies to orders below ₹499.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-base font-bold text-foreground">2. Delivery Timelines</h2>
              <p className="text-muted-foreground">
                Orders are packed and dispatched within 24 hours. Metro deliveries arrive in 2-4 business days. Regional pin codes take 4-7 business days.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
