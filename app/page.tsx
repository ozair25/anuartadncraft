import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FeatureBar } from "@/components/feature-bar"
import { ShopByCategory } from "@/components/shop-by-category"
import { CuratedCollections } from "@/components/curated-collections"
import { Inspiration } from "@/components/inspiration"
import { TrustFeatures } from "@/components/trust-features"
import { Community } from "@/components/community"
import { Newsletter } from "@/components/newsletter"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <main>
        <Hero />
        <FeatureBar />
        <ShopByCategory />
        <CuratedCollections />
        <Inspiration />
        <TrustFeatures />
        <Community />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  )
}
