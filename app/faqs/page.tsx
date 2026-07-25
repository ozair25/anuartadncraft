"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "How long does shipping take across India?",
    a: "Orders are processed within 24 hours. Delivery takes 2-4 business days for major metro cities and 4-7 days for remaining regions.",
  },
  {
    q: "Are all products guaranteed 100% authentic?",
    a: "Yes! We source directly from authorized manufacturers including Camel, Brustro, Fevicryl, and Mont Marte.",
  },
  {
    q: "What is your return & exchange policy?",
    a: "We offer a 7-day return policy for unopened, undamaged items. If you receive a damaged product during transit, we replace it free of cost instantly.",
  },
  {
    q: "Do you offer cash on delivery (COD)?",
    a: "Yes, COD is available for most pin codes across India for orders up to ₹5,000.",
  },
  {
    q: "How can I track my order status?",
    a: "Simply visit our Track Order page and enter your order reference number (e.g. ANU-123456).",
  },
]

export default function FAQsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="text-center mb-10">
            <RibbonLabel>Common Questions</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
              Frequently Asked <span className="italic text-primary">Questions</span>
            </h1>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx
              return (
                <div key={idx} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-serif text-base font-bold text-foreground"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
