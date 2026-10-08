import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { PolicyNav } from "@/components/policy-nav"
import Link from "next/link"
import { getShopPolicies } from "@/lib/shopify/policies"
import { ShieldCheck, Video, HelpCircle, MessageCircle } from "lucide-react"

export const metadata = {
  title: "Refund Policy | Anu Art & Craft Studio",
  description: "Official Refund & Return Policy for Anu Art & Craft Studio.",
}

export default function RefundPolicyPage() {
  const { refundPolicy } = getShopPolicies()

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans text-stone-800">
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[#7c2d8a] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-stone-700 font-semibold">Refund Policy</span>
          </nav>

          <RibbonLabel>Store Policy</RibbonLabel>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            {refundPolicy.title || "Refund Policy"}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            Official policy for Anu Arts &amp; Craft Studio
          </p>

          {/* Policy Switcher Bar */}
          <div className="my-8 border-y border-stone-200/80 py-2">
            <PolicyNav theme="light" />
          </div>

          {/* Key Policy Highlights based strictly on the Shopify policy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7c2d8a] flex items-center justify-center mb-3">
                <Video className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-900">
                Package Opening Video Mandatory
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Customers must follow the opening video instructions labeled on the package to claim any refund or replacement.
              </p>
            </div>

            <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7c2d8a] flex items-center justify-center mb-3">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-900">
                Transit Damage Resolution
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Refunds or replacements are provided only for goods considered damaged upon receipt with verified opening video.
              </p>
            </div>
          </div>

          {/* Official Policy Text Box */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-10 shadow-xs space-y-6 text-stone-700 leading-relaxed text-sm">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7c2d8a]">
                Official Shopify Policy
              </span>
            </div>

            {/* Exact Shopify Content */}
            <div className="prose prose-sm max-w-none text-stone-800 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {refundPolicy.body}
            </div>

            {/* Support Contact */}
            <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <HelpCircle className="h-4 w-4 text-[#7c2d8a]" />
                <span>Questions regarding your order?</span>
              </div>
              <a
                href="https://wa.me/919425356009?text=Hello%20Anu%20Arts%2C%20I%20have%20an%20inquiry%20regarding%20my%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7c2d8a] hover:bg-[#682274] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp: +91 94253 56009</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
