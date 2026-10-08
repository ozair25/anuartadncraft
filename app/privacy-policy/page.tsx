import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { PolicyNav } from "@/components/policy-nav"
import Link from "next/link"
import {
  Lock,
  ShieldCheck,
  Eye,
  Database,
  UserCheck,
  FileCheck2,
  Mail,
  HelpCircle,
  MessageCircle,
} from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Anu Art & Craft Studio",
  description: "Privacy policy, data protection safeguards, DPDP Act 2023 compliance, and customer information rights for Anu Arts.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans text-stone-800">
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[#7c2d8a] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-stone-700 font-semibold">Privacy Policy</span>
          </nav>

          <RibbonLabel>Data Security &amp; Trust</RibbonLabel>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            Last updated: September 13, 2026 • Compliant with Indian Information Technology Act &amp; DPDP Act 2023
          </p>

          {/* Quick Policy Switcher Bar */}
          <div className="my-8 border-y border-stone-200/80 py-2">
            <PolicyNav theme="light" />
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">Zero Data Selling</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                We never sell, rent, or trade your personal information to third-party brokers.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-[#7c2d8a] flex items-center justify-center mb-2">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">256-Bit Encryption</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                End-to-end SSL encryption secures all storefront checkouts and transactions.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-pink-100 text-[#d92672] flex items-center justify-center mb-2">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">Transparent Use</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Data is strictly used to fulfill orders, issue invoices, and deliver workshop updates.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                <UserCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">Your Data Rights</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Request data copy, address updates, or account deletion anytime via email.
              </p>
            </div>
          </div>

          {/* Privacy Document Content */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xs space-y-8 text-stone-700 leading-relaxed text-xs sm:text-sm">
            
            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">1</span>
                Our Commitment to Your Privacy
              </h2>
              <p>
                <strong>Anu Art &amp; Craft Studio</strong> (&quot;Anu Arts&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) values your trust and is dedicated to protecting your personal data. This Privacy Policy describes how we collect, handle, utilize, and safeguard your personal information when you visit our website, order art supplies, subscribe to our creative newsletters, or enroll in art workshops.
              </p>
              <p>
                We adhere strictly to applicable Indian data protection frameworks, including the <strong>Information Technology Act, 2000</strong>, the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>, and the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">2</span>
                Information We Collect
              </h2>
              <p>
                Depending on your interaction with our storefront, we collect information across these categories:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-1.5">
                  <p className="font-bold text-stone-900 text-xs">Customer Contact &amp; Shipping Data</p>
                  <p className="text-[11px] text-stone-600">
                    Full name, delivery street address, postal PIN code, telephone / WhatsApp contact number, and email address for order routing and invoice dispatch.
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-1.5">
                  <p className="font-bold text-stone-900 text-xs">Transactional Records</p>
                  <p className="text-[11px] text-stone-600">
                    Order history, itemized purchased goods, payment method reference, and AWB tracking numbers. <em>(Note: We never view or store full debit/credit card numbers or CVVs).</em>
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-1.5">
                  <p className="font-bold text-stone-900 text-xs">Workshop &amp; Event Details</p>
                  <p className="text-[11px] text-stone-600">
                    Participant name, preferred seat slot, experience level, and age group (for junior weekend art camps).
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-1.5">
                  <p className="font-bold text-stone-900 text-xs">Technical &amp; Session Diagnostics</p>
                  <p className="text-[11px] text-stone-600">
                    IP address, device browser type, referring URL, time zone, and session cookies ensuring shopping bag items persist across page navigation.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">3</span>
                How We Use Your Information
              </h2>
              <p>We process personal data solely for legitimate, transparent purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                <li><strong>Order Fulfillment:</strong> Picking, packing, invoicing, and dispatching physical art supplies to your chosen destination.</li>
                <li><strong>Customer Support:</strong> Responding to inquiries on WhatsApp, resolving delivery exceptions, and managing 7-day replacements.</li>
                <li><strong>Workshop Management:</strong> Sending workshop joining links, studio entry passes, and schedule notifications.</li>
                <li><strong>Security &amp; Fraud Prevention:</strong> Screening transactions to detect and avoid fraudulent payment attempts or unauthorized bots.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">4</span>
                Sharing with Trusted Service Partners
              </h2>
              <p>
                We only share minimal necessary information with reputable operational vendors:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-600">
                <li>
                  <strong>Shopify E-Commerce Platform:</strong> Provides cloud storefront infrastructure, secure database records, and encrypted checkout workflows.
                </li>
                <li>
                  <strong>Courier &amp; Logistics Partners:</strong> (Blue Dart, Delhivery, DTDC, India Post) We share your recipient name, delivery address, and contact number solely to complete parcel drop-off.
                </li>
                <li>
                  <strong>Payment Gateways:</strong> (RBI-licensed payment processors) Financial payment card transactions are encrypted and processed in compliance with PCI-DSS Level 1 standards.
                </li>
              </ul>
              <p className="font-semibold text-stone-900 pt-1">
                We strictly DO NOT sell, lease, or monetize your personal information to marketing aggregators.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">5</span>
                Cookies &amp; Tracking Technologies
              </h2>
              <p>
                Our website utilizes standard web cookies and browser local storage to deliver an optimal browsing experience:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                <li><strong>Essential Cookies:</strong> Required to keep your cart contents intact and enable checkout processing.</li>
                <li><strong>Preference Cookies:</strong> Remembers your wishlist selections and currency display preferences.</li>
                <li><strong>Analytics:</strong> Aggregated, non-personally identifiable traffic metrics to help us understand which art materials are most in demand.</li>
              </ul>
              <p>You can manage or disable cookies at any time through your individual browser settings.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">6</span>
                Your Data Protection Rights
              </h2>
              <p>Under Indian privacy regulations, you enjoy comprehensive rights over your personal data:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                <li><strong>Right to Access:</strong> Inquire about what personal data we hold about your past orders.</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate contact or shipping records.</li>
                <li><strong>Right to Erasure:</strong> Request the deletion of your customer account profile, subject to statutory tax and accounting retention requirements.</li>
                <li><strong>Right to Opt-Out:</strong> Unsubscribe from marketing communications at any time with a single click.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">7</span>
                Children&apos;s Privacy
              </h2>
              <p>
                Anu Art &amp; Craft Studio frequently organizes creative drawing, clay modeling, and painting workshops for children. In accordance with child data protection principles, registrations for minors must always be initiated by a parent or legal guardian. We never collect personal contact information directly from minors without verified parental consent.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">8</span>
                Data Security &amp; Retention
              </h2>
              <p>
                We implement technical and organizational security controls, including TLS/SSL encryption and restricted access controls. Personal data associated with orders is retained for the period mandated under Indian Goods and Services Tax (GST) and consumer protection record-keeping laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">9</span>
                Data Grievance Officer
              </h2>
              <p>
                In compliance with the Information Technology Act, 2000 and the DPDP Act, 2023, the details of our Data Grievance Officer are:
              </p>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs space-y-1">
                <p className="font-bold text-stone-900">YASHASWEE SANGHAWI (Proprietor &amp; Grievance Officer)</p>
                <p>Anu Art &amp; Craft Studio</p>
                <p>30, Chandralok Colony, Khajrana Main Road, Indore, Madhya Pradesh 452001, India</p>
                <p>Email: <a href="mailto:anuarts005@gmail.com" className="text-[#7c2d8a] font-bold underline">anuarts005@gmail.com</a></p>
                <p>Phone: +91 94253 56009</p>
              </div>
            </section>

            {/* Support Desk Box */}
            <div className="mt-8 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-serif font-bold text-stone-900 text-base">Privacy Questions or Data Requests?</h3>
                <p className="text-xs text-stone-600">
                  Feel free to contact our data desk for any privacy questions or data deletion requests.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href="mailto:anuarts005@gmail.com?subject=Privacy%20Data%20Request"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7c2d8a] text-white text-xs font-bold hover:bg-[#682474] transition-colors shadow-xs"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email Privacy Desk
                </a>
                <Link
                  href="/contact-information"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50 transition-colors"
                >
                  Contact Info
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
