import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { TrustFeatures } from "@/components/trust-features"
import { Community } from "@/components/community"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <RibbonLabel>Our Story</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
              Fueling Creativity for <span className="italic text-primary">Every Artist</span>
            </h1>
            <p className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
              Founded with a passion for fine craftsmanship and creative expression, Anu Arts brings together premium paints, archival paper, craft tools, and DIY kits to art lovers across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div className="rounded-2xl border border-border overflow-hidden shadow-sm aspect-video bg-card">
              <img
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop"
                alt="Anu Arts Studio"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4">
              <RibbonLabel>Our Mission</RibbonLabel>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Empowering Masterpieces One Stroke at a Time
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Whether you are a student making your first charcoal sketch, a hobbyist creating resin coasters, or a professional oil painter, Anu Arts provides authentic, high-grade art supplies delivered safely to your doorstep.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-foreground">
                <li className="flex items-center gap-2">✓ 100% Authentic Brand Partnerships (Camel, Brustro, Fevicryl)</li>
                <li className="flex items-center gap-2">✓ Strict Quality Inspections Before Packaging</li>
                <li className="flex items-center gap-2">✓ Eco-Friendly Protective Packaging</li>
              </ul>
            </div>
          </div>

          <TrustFeatures />
          <div className="mt-12">
            <Community />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
