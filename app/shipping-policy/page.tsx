import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { PolicyNav } from "@/components/policy-nav"
import Link from "next/link"
import {
  Truck,
  Package,
  MapPin,
  Clock,
  ShieldCheck,
  Building,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export const metadata = {
  title: "Shipping Policy | Anu Art & Craft Studio",
  description: "Pan-India delivery guidelines, free shipping criteria, safe fragile packaging, and transit timelines for Anu Arts supplies.",
}

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans text-stone-800">
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[#7c2d8a] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-stone-700 font-semibold">Shipping Policy</span>
          </nav>

          <RibbonLabel>Pan-India Delivery</RibbonLabel>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            Last updated: September 13, 2026 • Fast, secure art supply delivery across 19,000+ PIN codes
          </p>

          {/* Quick Policy Switcher Bar */}
          <div className="my-8 border-y border-stone-200/80 py-2">
            <PolicyNav theme="light" />
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-pink-100 text-[#d92672] flex items-center justify-center mb-2">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">FREE Over ₹499</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Enjoy 100% free standard shipping on all qualifying orders over ₹499 across India.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-[#7c2d8a] flex items-center justify-center mb-2">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">24-Hour Dispatch</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Orders are safely packed and handed over to premier couriers within 24 to 48 hours.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">Art-Safe Packaging</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Corner protectors, bubble wrap, and moisture seals for fragile canvas and liquid resins.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                <Building className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">Indore Studio Pickup</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Local artists can pick up ready packages directly at our Chandralok Colony studio.
              </p>
            </div>
          </div>

          {/* Detailed Policy Document Content */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xs space-y-8 text-stone-700 leading-relaxed text-xs sm:text-sm">
            
            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">1</span>
                Delivery Network &amp; Courier Partners
              </h2>
              <p>
                <strong>Anu Art &amp; Craft Studio</strong> proudly ships art supplies, drawing materials, DIY craft kits, and custom commissions to creative enthusiasts across <strong>19,000+ PIN codes</strong> throughout India.
              </p>
              <p>
                To ensure fast and dependable delivery, we partner with top-tier logistics providers including <strong>Blue Dart, Delhivery, DTDC, XpressBees, and India Post Speed Post</strong> for remote rural pin codes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">2</span>
                Shipping Rates &amp; Free Shipping Tiers
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-stone-200 text-xs">
                  <thead>
                    <tr className="bg-stone-50 text-stone-900 font-bold border-b border-stone-200">
                      <th className="p-3 border-r border-stone-200">Order Subtotal</th>
                      <th className="p-3 border-r border-stone-200">Shipping Mode</th>
                      <th className="p-3 border-r border-stone-200">Delivery Fee</th>
                      <th className="p-3">Estimated Transit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-600">
                    <tr>
                      <td className="p-3 font-semibold text-stone-900 border-r border-stone-200">₹499 &amp; Above</td>
                      <td className="p-3 border-r border-stone-200">Standard Express Ground</td>
                      <td className="p-3 text-emerald-700 font-bold border-r border-stone-200">FREE</td>
                      <td className="p-3">2 – 6 Business Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-stone-900 border-r border-stone-200">Below ₹499</td>
                      <td className="p-3 border-r border-stone-200">Standard Surface</td>
                      <td className="p-3 border-r border-stone-200">Flat ₹50</td>
                      <td className="p-3">3 – 7 Business Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-stone-900 border-r border-stone-200">Local Indore Pickup</td>
                      <td className="p-3 border-r border-stone-200">Studio Walk-in</td>
                      <td className="p-3 text-emerald-700 font-bold border-r border-stone-200">FREE</td>
                      <td className="p-3">Ready in 2 Hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">3</span>
                Estimated Delivery Timelines by Region
              </h2>
              <p>
                Delivery duration is calculated from the time of courier handover. Our general transit benchmarks are:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 space-y-1">
                  <p className="font-bold text-stone-900 text-xs">Indore &amp; Madhya Pradesh Central</p>
                  <p className="text-emerald-700 font-bold text-xs">1 – 2 Business Days</p>
                  <p className="text-[11px] text-stone-500">Same-day pickup available at our Chandralok Colony studio.</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 space-y-1">
                  <p className="font-bold text-stone-900 text-xs">Metro Hubs (Mumbai, Delhi NCR, Bangalore, Pune)</p>
                  <p className="text-emerald-700 font-bold text-xs">2 – 4 Business Days</p>
                  <p className="text-[11px] text-stone-500">Express air courier routing through direct airport corridors.</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 space-y-1">
                  <p className="font-bold text-stone-900 text-xs">Rest of India (Tier 2 &amp; Tier 3 Cities)</p>
                  <p className="text-emerald-700 font-bold text-xs">4 – 6 Business Days</p>
                  <p className="text-[11px] text-stone-500">Dispatched via reliable surface express logistics.</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 space-y-1">
                  <p className="font-bold text-stone-900 text-xs">North-East, J&amp;K, Islands &amp; Special Zones</p>
                  <p className="text-emerald-700 font-bold text-xs">6 – 9 Business Days</p>
                  <p className="text-[11px] text-stone-500">Served securely via India Post Speed Post network.</p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">4</span>
                Safe &amp; Specialized Packaging for Art Supplies
              </h2>
              <p>
                Fine-art materials are vulnerable to transit stress. We adopt rigorous studio packaging methods:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-600">
                <li>
                  <strong>Canvases &amp; Easels:</strong> Stretched cotton canvas boards feature reinforced rigid corner protectors and corrugated sandwich sheets to prevent surface puncture or wooden warping.
                </li>
                <li>
                  <strong>Liquid Mediums &amp; Resins:</strong> Paint bottles, pouring acrylics, and epoxy resin hardeners are sealed with vacuum shrink bands and secondary leak-proof polybags before boxing.
                </li>
                <li>
                  <strong>Ceramic &amp; Clay Tools:</strong> Cushioned in biodegradable bubble wrap and shredded craft paper padding.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">5</span>
                Live Order Tracking &amp; Notifications
              </h2>
              <p>
                As soon as your shipment is manifest with the courier partner:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                <li>
                  You will receive an instant <strong>SMS and Email notification</strong> containing the Airway Bill (AWB) number and live tracking URL.
                </li>
                <li>
                  You can also track your shipment status anytime using our <Link href="/track-order" className="text-[#7c2d8a] font-bold underline">Order Tracking Page</Link> with your Order ID or tracking number.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">6</span>
                Address Accuracy &amp; Delivery Attempts
              </h2>
              <p>
                Please ensure you provide an accurate street address, relevant landmark, and functional mobile contact number. Our courier partners attempt delivery up to <strong>3 times</strong> before returning an undelivered shipment to our Indore warehouse.
              </p>
              <p>
                If a package is returned to origin due to incorrect address information or refusal to accept, re-shipping fees will apply for re-dispatch.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">7</span>
                International Shipping
              </h2>
              <p>
                While our online storefront natively handles pan-India shipments, we cater to international collectors and artists on special request. For international orders (paintings, handmade Indian folk arts, or bulk craft supplies), please contact us directly on WhatsApp at <a href="https://wa.me/919425356009" className="text-[#7c2d8a] font-bold underline">+91 94253 56009</a> to obtain a customized DHL/FedEx freight quote.
              </p>
            </section>

            {/* Support Desk Box */}
            <div className="mt-8 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-serif font-bold text-stone-900 text-base">Need Priority or Bulk Dispatch?</h3>
                <p className="text-xs text-stone-600">
                  Planning an upcoming art workshop or school event? Message our Indore dispatch coordinator for expedited bulk shipping.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href="https://wa.me/919425356009?text=Hi%20Anu%20Arts%2C%20I%20have%20a%20shipping%20query%20regarding%20my%20order!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/track-order"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50 transition-colors"
                >
                  Track Package <ArrowRight className="h-3.5 w-3.5" />
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
