import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <RibbonLabel>Returns</RibbonLabel>
          <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-4xl">
            Refund &amp; Return Policy
          </h1>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6 text-xs text-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-base font-bold text-foreground">1. 7-Day Replacement Guarantee</h2>
              <p className="text-muted-foreground">
                If your item arrives damaged, dried, or missing components during shipping transit, notify our care team within 7 days for an instant free replacement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-base font-bold text-foreground">2. Refund Process</h2>
              <p className="text-muted-foreground">
                Approved refunds are processed back to your original payment source (UPI / Card / NetBanking) within 3-5 business days.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
