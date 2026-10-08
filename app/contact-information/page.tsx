"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { PolicyNav } from "@/components/policy-nav"
import { addEnquiry } from "@/lib/services/db-service"
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  Send,
  CheckCircle2,
  ExternalLink,
  User,
  HelpCircle,
} from "lucide-react"

export default function ContactInformationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Support & Store Inquiry",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name && (form.email || form.phone) && form.message) {
      addEnquiry(form)
      setSubmitted(true)
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "General Support & Store Inquiry",
        message: "",
      })
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans text-stone-800">
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[#7c2d8a] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-stone-700 font-semibold">Contact Information</span>
          </nav>

          <RibbonLabel>Official Business Details</RibbonLabel>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Contact Information
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            Legal identity, registered studio address, and customer care channels for Anu Art &amp; Craft Studio
          </p>

          {/* Quick Policy Switcher Bar */}
          <div className="my-8 border-y border-stone-200/80 py-2">
            <PolicyNav theme="light" />
          </div>

          {/* Main Legal Details Card */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xs space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Identification */}
              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7c2d8a] flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-base text-stone-900">Merchant Identification</h2>
                    <p className="text-[11px] text-stone-500">Official business registration</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700 divide-y divide-stone-200/80">
                  <div className="pt-1 flex justify-between gap-2">
                    <span className="text-stone-500 font-medium">Trade Name:</span>
                    <span className="font-bold text-stone-900 text-right">Anu Art &amp; Craft Studio</span>
                  </div>
                  <div className="pt-2 flex justify-between gap-2">
                    <span className="text-stone-500 font-medium">Brand Entity:</span>
                    <span className="font-semibold text-stone-900 text-right">Anu Arts</span>
                  </div>
                  <div className="pt-2 flex justify-between gap-2">
                    <span className="text-stone-500 font-medium">Proprietor:</span>
                    <span className="font-semibold text-stone-900 text-right">YASHASWEE SANGHAWI</span>
                  </div>
                  <div className="pt-2 flex justify-between gap-2">
                    <span className="text-stone-500 font-medium">Jurisdiction:</span>
                    <span className="font-semibold text-stone-900 text-right">Indore, Madhya Pradesh, India</span>
                  </div>
                </div>
              </div>

              {/* Physical Studio Address */}
              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#d92672] flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-base text-stone-900">Registered Studio Address</h2>
                    <p className="text-[11px] text-stone-500">Visit or dispatch returns here</p>
                  </div>
                </div>

                <div className="text-xs text-stone-700 space-y-1 leading-relaxed">
                  <p className="font-bold text-stone-900">Anu Art &amp; Craft Studio</p>
                  <p>30, Chandralok Colony, Khajrana Main Road</p>
                  <p>Indore, Madhya Pradesh – 452001</p>
                  <p className="text-stone-500 font-medium">India</p>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=30+Chandralok+Colony+Indore+MP+452001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7c2d8a] hover:underline"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-stone-200 p-4 bg-white space-y-2">
                <div className="flex items-center gap-2 text-amber-700">
                  <Phone className="h-4 w-4" />
                  <span className="font-bold text-xs">Direct Telephone</span>
                </div>
                <p className="text-xs text-stone-600">Available Mon–Sat, 10 AM–7 PM</p>
                <a href="tel:+919425356009" className="text-xs font-bold text-stone-900 hover:text-[#7c2d8a] block transition-colors">
                  +91 94253 56009
                </a>
              </div>

              <div className="rounded-xl border border-stone-200 p-4 bg-white space-y-2">
                <div className="flex items-center gap-2 text-[#7c2d8a]">
                  <Mail className="h-4 w-4" />
                  <span className="font-bold text-xs">Official Email</span>
                </div>
                <p className="text-xs text-stone-600">Order &amp; workshop queries</p>
                <a href="mailto:anuarts005@gmail.com" className="text-xs font-bold text-stone-900 hover:text-[#7c2d8a] block transition-colors break-all">
                  anuarts005@gmail.com
                </a>
              </div>

              <div className="rounded-xl border border-stone-200 p-4 bg-white space-y-2">
                <div className="flex items-center gap-2 text-emerald-700">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-bold text-xs">Instant WhatsApp</span>
                </div>
                <p className="text-xs text-stone-600">Fast replies in under 15 mins</p>
                <a
                  href="https://wa.me/919425356009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:underline block"
                >
                  +91 94253 56009
                </a>
              </div>
            </div>

            {/* Studio Hours & Grievance Officer */}
            <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-5 space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Clock className="h-4 w-4 text-[#7c2d8a]" />
                <span>Operating Hours &amp; Customer Support</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our art studio, gallery display, and customer desk are open <strong>Monday through Saturday from 10:00 AM to 7:00 PM IST</strong>. We are closed on Sundays and gazetted national holidays, though automated orders placed through our Shopify storefront are processed 24/7.
              </p>
              
              <div className="pt-2 border-t border-stone-200 text-xs text-stone-600">
                <span className="font-bold text-stone-900">Grievance &amp; Escalation Officer: </span>
                YASHASWEE SANGHAWI, 30, Chandralok Colony, Indore, MP 452001. Email: <a href="mailto:anuarts005@gmail.com" className="text-[#7c2d8a] font-semibold underline">anuarts005@gmail.com</a>. Grievances are acknowledged within 24 hours and redressed within 15 business days.
              </div>
            </div>

            {/* Direct Message Form */}
            <div id="enquiry-form-section" className="pt-4 space-y-4">
              <div className="border-t border-stone-200 pt-6">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Fill in your details below and our studio team will respond via WhatsApp or Email within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 text-base">Message Sent Successfully!</h4>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    Thank you for reaching out to Anu Art &amp; Craft Studio. YASHASWEE SANGHAWI and our team will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-xs font-bold text-[#7c2d8a] underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="text-xs font-bold text-stone-700">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Priyanshi Sharma"
                        className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:border-[#7c2d8a] focus:ring-1 focus:ring-[#7c2d8a] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-phone" className="text-xs font-bold text-stone-700">
                        Phone / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:border-[#7c2d8a] focus:ring-1 focus:ring-[#7c2d8a] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="text-xs font-bold text-stone-700">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:border-[#7c2d8a] focus:ring-1 focus:ring-[#7c2d8a] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-subject" className="text-xs font-bold text-stone-700">
                        Inquiry Topic
                      </label>
                      <select
                        id="contact-subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-xs text-stone-900 focus:border-[#7c2d8a] focus:ring-1 focus:ring-[#7c2d8a] outline-none bg-white"
                      >
                        <option value="General Support & Store Inquiry">General Store &amp; Order Inquiry</option>
                        <option value="Workshop & Masterclass Enrollment">Workshop &amp; Masterclass Registration</option>
                        <option value="Bulk Art Supplies & Institutional Orders">Bulk School / College Art Supplies</option>
                        <option value="Custom Artwork Commission">Custom Artwork Commission</option>
                        <option value="Returns & Replacements">Returns or Replacements</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="text-xs font-bold text-stone-700">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share your question or art supply requirement here..."
                      className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:border-[#7c2d8a] focus:ring-1 focus:ring-[#7c2d8a] outline-none resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-contact-enquiry-btn"
                    className="inline-flex items-center gap-2 rounded-full bg-[#7c2d8a] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#682474] transition-colors cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
