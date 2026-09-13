import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { PolicyNav } from "@/components/policy-nav"
import Link from "next/link"
import {
  FileText,
  Shield,
  Scale,
  Palette,
  AlertCircle,
  HelpCircle,
  MessageCircle,
  Building,
  CheckCircle2,
  Mail,
} from "lucide-react"

export const metadata = {
  title: "Terms of Service | Anu Art & Craft Studio",
  description: "Terms of service, storefront usage rules, workshop participation guidelines, and intellectual property terms for Anu Arts.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans text-stone-800">
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[#7c2d8a] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-stone-700 font-semibold">Terms of Service</span>
          </nav>

          <RibbonLabel>Legal Agreement</RibbonLabel>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            Last updated: September 13, 2026 • Please read these terms carefully before browsing or placing an order
          </p>

          {/* Quick Policy Switcher Bar */}
          <div className="my-8 border-y border-stone-200/80 py-2">
            <PolicyNav theme="light" />
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-[#7c2d8a] flex items-center justify-center mb-2">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">Binding Contract</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Placing an order or booking an art class constitutes full acceptance of these terms.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-pink-100 text-[#d92672] flex items-center justify-center mb-2">
                <Palette className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">Artistic Copyright</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                All original artworks, workshop tutorials, and media are proprietary to Anu Arts.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-stone-900">Indore Jurisdiction</h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Governed by the laws of India with exclusive jurisdiction in the courts of Indore, MP.
              </p>
            </div>
          </div>

          {/* Terms Document Content */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xs space-y-8 text-stone-700 leading-relaxed text-xs sm:text-sm">
            
            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">1</span>
                Overview &amp; Acceptance of Terms
              </h2>
              <p>
                This website is operated by <strong>Anu Art &amp; Craft Studio</strong> (referred to as &quot;Anu Arts&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We offer this website, including all information, tools, art supplies, and workshop bookings available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
              </p>
              <p>
                By visiting our site, purchasing fine art materials, or enrolling in art masterclasses, you engage in our &quot;Service&quot; and agree to be bound by the following Terms of Service (&quot;Terms&quot;), including those additional policies referenced herein and/or available by hyperlink.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">2</span>
                Online Store Terms &amp; Age Eligibility
              </h2>
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority and you have given us your consent to allow any of your minor dependents to use this site or attend junior art workshops under your guidance.
              </p>
              <p>
                You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including copyright or consumer protection laws).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">3</span>
                Accuracy of Product Descriptions &amp; Handcrafted Variations
              </h2>
              <p>
                We have made every effort to display as accurately as possible the colors and images of our art materials, paints, sketchbooks, and handmade home decor pieces. However:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                <li>
                  Because computer monitors and mobile displays vary in color balance, brightness, and contrast calibrations, we cannot guarantee that your monitor&apos;s display of any color will be 100% identical to the real pigment swatch.
                </li>
                <li>
                  Many of our craft blanks, wooden easels, and resin pieces are handmade or finished by artisans. Minor texture variations, natural wood grain patterns, and hand-embellished details are natural characteristics of authentic craftsmanship, not defects.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">4</span>
                Modifications to Offerings &amp; Pricing
              </h2>
              <p>
                Prices for our products and masterclasses are subject to change without notice. We reserve the right at any time to modify or discontinue any product, supply bundle, or workshop offering without liability to you or any third party.
              </p>
              <p>
                All prices on the storefront are quoted in <strong>Indian Rupees (INR - ₹)</strong> and are inclusive of applicable Goods and Services Tax (GST) unless explicitly noted otherwise.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">5</span>
                Workshops, Masterclasses &amp; Studio Events
              </h2>
              <p>
                Enrollments for in-person workshops at 30, Chandralok Colony, Indore, as well as live virtual interactive masterclasses, are subject to the following rules:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                <li>
                  <strong>Seat Reservations:</strong> Workshop seats are strictly confirmed upon receipt of advance payment. Walk-in registrations are subject to material kit availability.
                </li>
                <li>
                  <strong>Recording &amp; Intellectual Property:</strong> Audio, video recording, or screen-capturing of instructor demonstrations and distributing course syllabus or tutorial handouts without express written consent is strictly prohibited.
                </li>
                <li>
                  <strong>Rescheduling:</strong> In the rare event of instructor illness or force majeure, Anu Arts reserves the right to reschedule the session or provide an equivalent credit voucher.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">6</span>
                Accuracy of Billing &amp; Account Information
              </h2>
              <p>
                We reserve the right to refuse any order you place with us. In the event that we make a change to or cancel an order, we will attempt to notify you by contacting the email and/or billing address/phone number provided at the time the order was made.
              </p>
              <p>
                You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and payment details, so that we can complete your transactions and contact you as needed.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">7</span>
                Intellectual Property &amp; Copyrights
              </h2>
              <p>
                All content published on this website, including but not limited to brand logos, trademarks, artwork photographs, instructional articles, workshop video teasers, design templates, and software code, is the exclusive intellectual property of <strong>Anu Art &amp; Craft Studio</strong> and protected under Indian and international copyright laws.
              </p>
              <p>
                No portion of this website or our creative curricula may be reproduced, duplicated, copied, sold, resold, or exploited for commercial purposes without express written permission from Anu Jain.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">8</span>
                Limitation of Liability &amp; Disclaimers
              </h2>
              <p>
                In no case shall Anu Art &amp; Craft Studio, our proprietor, artists, employees, affiliates, agents, contractors, or suppliers be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, or consequential damages of any kind, arising from your use of any of the service or any products procured using the service.
              </p>
              <p>
                Certain art materials (such as epoxy resins, varnishes, sharp palette knives, and linocut gouges) require adult supervision and proper protective equipment (masks, gloves). Anu Arts is not responsible for injuries or chemical sensitivities resulting from misuse or negligence.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs flex items-center justify-center">9</span>
                Governing Law &amp; Dispute Resolution
              </h2>
              <p>
                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes, claims, or controversies arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Indore, Madhya Pradesh, India</strong>.
              </p>
            </section>

            {/* Support Desk Box */}
            <div className="mt-8 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-serif font-bold text-stone-900 text-base">Questions Regarding These Terms?</h3>
                <p className="text-xs text-stone-600">
                  Contact our administrative desk for clarifications, institutional licensing, or custom workshop contracts.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href="mailto:anuarts.indore@gmail.com"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7c2d8a] text-white text-xs font-bold hover:bg-[#682474] transition-colors shadow-xs"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email Legal Desk
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
