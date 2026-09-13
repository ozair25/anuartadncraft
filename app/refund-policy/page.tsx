import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { PolicyNav } from "@/components/policy-nav"
import Link from "next/link"
import {
  RotateCcw,
  ShieldCheck,
  Video,
  Clock,
  AlertCircle,
  HelpCircle,
  MessageCircle,
  Mail,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

export const metadata = {
  title: "Refund Policy | Anu Art & Craft Studio",
  description: "Comprehensive refund, return, and replacement policy for art supplies, hobby kits, and craft materials from Anu Arts Indore.",
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans text-stone-800">
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[#7c2d8a] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-stone-700 font-semibold">Refund Policy</span>
          </nav>

          <RibbonLabel>Buyer Protection</RibbonLabel>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Refund &amp; Return Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            Last updated: September 13, 2026 • Effective for all orders placed on Anu Arts Storefront
          </p>

          {/* Quick Policy Switcher Bar */}
          <div className="my-8 border-y border-stone-200/80 py-2">
            <PolicyNav theme="light" />
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-pink-100 text-[#d92672] flex items-center justify-center mb-2">
                <RotateCcw className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">7-Day Window</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Report damaged or incorrect supplies within 7 days of package delivery.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">100% Refund Guarantee</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Full reimbursement to original payment source for verified transit damages.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-[#7c2d8a] flex items-center justify-center mb-2">
                <Video className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">Unboxing Video</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Clear opening video helps expedite instant claims without courier disputes.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">3-5 Day Payout</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Approved refunds are disbursed to your original UPI/Card account in 3–5 working days.
              </p>
            </div>
          </div>

          {/* Policy Document Content */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xs space-y-8 text-stone-700 leading-relaxed text-xs sm:text-sm">
            
            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">1</span>
                Our Commitment to Artists &amp; Makers
              </h2>
              <p>
                At <strong>Anu Art &amp; Craft Studio</strong>, we take immense pride in inspecting and carefully packaging each bottle of acrylic paint, stretched canvas, DIY craft kit, and precision drawing tool. Because art supplies are sensitive instruments of creativity, we want you to be completely satisfied with every order you receive.
              </p>
              <p>
                Please inspect your package immediately upon arrival. If an item arrives damaged during transit, defective, or incorrect, our customer support team is committed to making it right through prompt replacements or full refunds.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">2</span>
                Eligibility for Returns &amp; Replacements
              </h2>
              <p>
                To qualify for a replacement or refund, the following criteria must be met:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-600">
                <li>
                  The return or damage request must be initiated within <strong>7 calendar days</strong> from the official delivery date marked by our logistics partner.
                </li>
                <li>
                  The item must be in its original condition: unused, unopened, with all manufacturer seals, cap safety wraps, barcodes, and tags intact.
                </li>
                <li>
                  All components, instructional booklets, bundled freebies, and accessories included in DIY kits or multi-piece art sets must be returned together.
                </li>
                <li>
                  You must present valid proof of purchase (such as your Shopify Order Confirmation email or invoice).
                </li>
              </ul>
            </section>

            {/* Unboxing Video Callout Box */}
            <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-4 sm:p-5 text-amber-950 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                <Video className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-sm text-amber-900">Recommended: Record a Continuous Unboxing Video</p>
                <p className="text-amber-800 leading-normal">
                  To protect both you and our studio against shipping courier transit mishandling or pilferage, we strongly encourage recording an uncut 360° video while opening the outer carton seal. In the rare event of crushed canvas frames or leaky mediums, this allows our team to issue an instant replacement without awaiting courier liability investigation.
                </p>
              </div>
            </div>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">3</span>
                Non-Returnable &amp; Exempt Items
              </h2>
              <p>
                Due to hygienic, health, safety, and operational considerations, certain items cannot be returned or refunded unless they arrived damaged or with a verified factory defect:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                  <p className="font-bold text-stone-900 text-xs">Opened Paints &amp; Liquid Mediums</p>
                  <p className="text-[11px] text-stone-600 mt-0.5">Acrylic tubes, varnish, resin epoxies, and liquid inks with broken seals cannot be restocked.</p>
                </div>
                <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                  <p className="font-bold text-stone-900 text-xs">Custom Art &amp; Commissioned Pieces</p>
                  <p className="text-[11px] text-stone-600 mt-0.5">Handmade custom paintings, personalized nameplates, and bespoke artworks made to customer specifications.</p>
                </div>
                <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                  <p className="font-bold text-stone-900 text-xs">Used Brushes &amp; Cut Paper / Fabrics</p>
                  <p className="text-[11px] text-stone-600 mt-0.5">Any sketchbook with used/torn pages, dipped brush bristles, or altered craft sheets.</p>
                </div>
                <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                  <p className="font-bold text-stone-900 text-xs">Clearance &amp; Final Sale Inventory</p>
                  <p className="text-[11px] text-stone-600 mt-0.5">Items marked with &quot;Final Sale&quot; or &quot;As-Is Studio Sample&quot; at deep promotional discounts.</p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">4</span>
                How to Initiate a Return or Replacement
              </h2>
              <ol className="space-y-3 list-decimal pl-5 text-stone-600">
                <li>
                  <strong>Contact Our Support Desk:</strong> Reach out within 7 days of delivery via WhatsApp at <a href="https://wa.me/919425356009" target="_blank" rel="noopener noreferrer" className="text-[#7c2d8a] font-bold underline">+91 94253 56009</a> or email <a href="mailto:anuarts.indore@gmail.com" className="text-[#7c2d8a] font-bold underline">anuarts.indore@gmail.com</a>.
                </li>
                <li>
                  <strong>Provide Order Details:</strong> Mention your <strong>Order Number</strong>, item name, specific reason for return, and attach 2-3 clear photographs (or unboxing video) showing the damage or issue.
                </li>
                <li>
                  <strong>Verification &amp; Pickup:</strong> Our studio team will review your ticket within 24 hours. Once authorized, we will schedule a reverse pickup from your address via our courier partner.
                </li>
                <li>
                  <strong>Resolution:</strong> If a replacement is requested, we dispatch the replacement within 24 hours of approval. If a refund is requested, payout is triggered upon pickup verification or warehouse receipt.
                </li>
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">5</span>
                Refund Methods &amp; Processing Timelines
              </h2>
              <p>
                Once your return is inspected and approved by our warehouse:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                <li>
                  <strong>Original Payment Mode:</strong> Funds will be credited directly back to the original source (UPI, Credit/Debit Card, Net Banking, or Wallet) used during checkout.
                </li>
                <li>
                  <strong>Settlement Duration:</strong> Most banking partners credit accounts within <strong>3 to 5 business days</strong> after initiation.
                </li>
                <li>
                  <strong>Store Credit Option:</strong> You may also opt for instant Studio Credit / Gift Coupon with an extra <strong>5% bonus value</strong>, valid indefinitely for any future art supply or workshop purchase.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">6</span>
                Order Cancellations
              </h2>
              <p>
                <strong>Before Dispatch:</strong> You may cancel your order at no charge before it has been handed over to the courier (typically within 12 hours of placing the order). A full instant refund will be initiated.
              </p>
              <p>
                <strong>After Dispatch:</strong> Once an AWB tracking number has been generated and dispatched, orders cannot be canceled in transit. You may accept the delivery and initiate a standard 7-day return.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">7</span>
                Workshop &amp; Masterclass Cancellation Terms
              </h2>
              <p>
                Physical and online art workshop registrations involve reservation of limited studio seats and pre-allocated art supply kits:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                <li>
                  <strong>Cancellation 72+ hours prior:</strong> Full refund or 100% transfer of seat to any upcoming workshop date.
                </li>
                <li>
                  <strong>Cancellation within 24 to 72 hours:</strong> 50% refund or seat credit, as workshop materials and kits have already been allocated.
                </li>
                <li>
                  <strong>No-Shows / Same-Day Cancellation:</strong> Non-refundable. However, any included art kit will be securely shipped to your residential address.
                </li>
              </ul>
            </section>

            {/* Support Desk Box */}
            <div className="mt-8 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-serif font-bold text-stone-900 text-base">Questions About Your Return?</h3>
                <p className="text-xs text-stone-600">
                  Our dedicated studio support team is here to assist you from Monday to Saturday, 10 AM to 7 PM IST.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href="https://wa.me/919425356009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp Us
                </a>
                <Link
                  href="/contact-information"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50 transition-colors"
                >
                  Contact Desk <ArrowRight className="h-3.5 w-3.5" />
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
