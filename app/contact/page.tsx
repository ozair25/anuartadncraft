"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { CartDrawer } from "@/components/cart-drawer"
import { BookClassModal } from "@/components/book-class-modal"
import { addEnquiry } from "@/lib/services/db-service"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageCircle,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Art Supplies & Workshop Inquiry",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [bookModalOpen, setBookModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && (formData.email || formData.phone) && formData.message) {
      addEnquiry(formData)
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Art Supplies & Workshop Inquiry",
        message: "",
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaff] flex flex-col font-sans text-stone-800">
      <SiteHeader
        onOpenCart={() => setCartOpen(true)}
        onOpenBookClass={() => setBookModalOpen(true)}
      />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-[#7c2d8a] via-[#d92672] to-amber-500 py-16 px-4 text-white text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold tracking-widest uppercase">
              <MessageCircle className="h-3.5 w-3.5" />
              We Are Always Here For You
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Get In Touch With <span className="text-amber-300 italic">Anu Arts</span>
            </h1>
            <p className="text-sm sm:text-base text-purple-100 max-w-2xl mx-auto font-medium">
              Have questions about upcoming workshops, private art parties, custom commissions, or studio bulk art supplies? Reach out to us directly!
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details & WhatsApp Direct Box */}
            <div className="space-y-6">
              {/* WhatsApp Quick Connect Card */}
              <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg">Instant WhatsApp Help</h3>
                    <p className="text-xs text-emerald-150">Available 10 AM - 8 PM IST</p>
                  </div>
                </div>
                <p className="text-xs text-emerald-50 leading-relaxed">
                  Chat directly with Anu Jain and our studio coordinators for fast seat bookings, supply recommendations, and dispatch queries.
                </p>
                <a
                  href="https://wa.me/919425356009?text=Hello%20Anu%20Arts%2C%20I%20have%20an%20inquiry%20regarding%20workshops%20and%20supplies!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white text-emerald-800 font-bold py-3 rounded-xl text-xs shadow-md hover:bg-emerald-50 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 fill-emerald-600" />
                  <span>Start WhatsApp Chat (+91 94253 56009)</span>
                </a>
              </div>

              {/* Info Cards */}
              <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#7c2d8a] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Direct Studio Helpline</h4>
                    <a href="tel:+919425356009" className="text-xs text-[#7c2d8a] font-bold block mt-0.5 hover:underline">
                      +91 94253 56009
                    </a>
                    <p className="text-[11px] text-stone-500">Mon - Sat: 10:00 AM - 7:30 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-pink-50">
                  <Mail className="h-5 w-5 text-[#d92672] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Email Inquiries</h4>
                    <a href="mailto:anuarts.indore@gmail.com" className="text-xs text-[#d92672] font-semibold block mt-0.5 hover:underline break-all">
                      anuarts.indore@gmail.com
                    </a>
                    <p className="text-[11px] text-stone-500">Response within 24 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-pink-50">
                  <MapPin className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Studio &amp; Gallery Location</h4>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      30, Chandralok Colony, Khajrana Main Road, Indore, Madhya Pradesh – 452001
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="inline-block text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                        Pan-India Express Shipping
                      </span>
                      <a
                        href="/contact-information"
                        className="text-[10px] font-bold text-[#7c2d8a] hover:underline"
                      >
                        Legal Info &rarr;
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-pink-50">
                  <Clock className="h-5 w-5 text-stone-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Studio Visiting Hours</h4>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Monday to Saturday: 10:00 AM – 7:30 PM<br />
                      Sunday: 10:30 AM – 2:00 PM (Batch Sessions)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 rounded-3xl border border-pink-100 bg-white p-6 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <RibbonLabel>Send a Message</RibbonLabel>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-3 mb-2">
                  How Can We Help Your Creative Journey?
                </h2>
                <p className="text-xs text-stone-500 mb-6">
                  Fill in your details below and our team will get back to you with custom workshop schedules or art supply catalog details.
                </p>

                {submitted ? (
                  <div className="py-12 text-center space-y-4 bg-purple-50/50 rounded-2xl p-6 border border-purple-100">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Thank You! Your Inquiry Has Been Received.
                    </h3>
                    <p className="text-xs text-stone-600 max-w-md mx-auto">
                      We have logged your request and our studio coordinator will reach out to you via WhatsApp or Email within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 rounded-full bg-[#7c2d8a] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-purple-800 transition-colors"
                    >
                      Send Another Note
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-stone-800">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priya Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-pink-200 bg-[#fffaff] p-3 text-xs text-stone-800 focus:outline-none focus:border-[#7c2d8a] focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-800">Phone / WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 94253 56009"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-pink-200 bg-[#fffaff] p-3 text-xs text-stone-800 focus:outline-none focus:border-[#7c2d8a] focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-stone-800">Email Address (Optional)</label>
                        <input
                          type="email"
                          placeholder="e.g. priya@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-pink-200 bg-[#fffaff] p-3 text-xs text-stone-800 focus:outline-none focus:border-[#7c2d8a] focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-800">Inquiry Subject</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-pink-200 bg-[#fffaff] p-3 text-xs text-stone-800 focus:outline-none focus:border-[#7c2d8a] focus:ring-2 focus:ring-purple-200 transition-all"
                        >
                          <option value="Workshop Seat Booking">Workshop Seat Booking</option>
                          <option value="Art Supplies & Materials Order">Art Supplies &amp; Materials Order</option>
                          <option value="Private Art Party / Corporate Event">Private Art Party / Corporate Event</option>
                          <option value="Custom Artwork Commission">Custom Artwork Commission</option>
                          <option value="Other Question">Other Question</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-800">Your Message / Workshop Interest *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about the workshop you'd like to join or the art supplies you need..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-pink-200 bg-[#fffaff] p-3 text-xs text-stone-800 focus:outline-none focus:border-[#7c2d8a] focus:ring-2 focus:ring-purple-200 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-[#7c2d8a] hover:bg-[#682274] px-8 py-3.5 text-xs font-bold text-white shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      {bookModalOpen && (
        <BookClassModal isOpen={bookModalOpen} onClose={() => setBookModalOpen(false)} />
      )}
      <SiteFooter />
    </div>
  )
}
