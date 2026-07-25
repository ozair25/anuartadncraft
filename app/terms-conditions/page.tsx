import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <RibbonLabel>Terms</RibbonLabel>
          <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">Last updated: July 2026</p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6 text-xs text-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-base font-bold text-foreground">1. General Terms</h2>
              <p className="text-muted-foreground">
                By browsing or placing an order on Anu Arts, you agree to comply with our store guidelines, pricing terms, and shipping procedures.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-base font-bold text-foreground">2. Product Accuracy &amp; Colors</h2>
              <p className="text-muted-foreground">
                We make every effort to display true product shades and physical specifications accurately. Slight color variations may occur depending on display screen calibrations.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
