import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <RibbonLabel>Legal</RibbonLabel>
          <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">Last updated: July 2026</p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6 text-xs text-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-base font-bold text-foreground">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                Anu Arts collects personal information necessary to fulfill your online orders including full name, email address, contact phone number, and delivery street address.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-base font-bold text-foreground">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use your details strictly to process orders, communicate shipment tracking statuses, respond to customer service enquiries, and issue invoices.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-base font-bold text-foreground">3. Data Protection &amp; Security</h2>
              <p className="text-muted-foreground">
                We implement industry standard encryption and security precautions. We never sell or share your personal address or financial records to unauthorized third parties.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
