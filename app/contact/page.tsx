"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { addEnquiry } from "@/lib/services/db-service"
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      addEnquiry(formData)
      setSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <RibbonLabel>Get In Touch</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
              We&apos;d Love To <span className="italic text-primary">Hear From You</span>
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">
              Have questions about products, bulk studio orders, or your delivery? Reach out anytime!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <Mail className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-serif font-bold text-sm text-foreground">Email Us</h3>
                <p className="text-xs text-muted-foreground mt-1">support@anuarts.com</p>
                <p className="text-xs text-muted-foreground">care@anuarts.com</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <Phone className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-serif font-bold text-sm text-foreground">Call &amp; WhatsApp</h3>
                <p className="text-xs text-muted-foreground mt-1">+91 98765 43210</p>
                <p className="text-[10px] text-muted-foreground">Mon-Sat: 10:00 AM - 7:00 PM IST</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <MapPin className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-serif font-bold text-sm text-foreground">Art Studio Head Office</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  102 Art Studio Enclave, Bandra West, Mumbai, Maharashtra - 400050
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">Send Us A Message</h2>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                  <h3 className="font-serif text-lg font-bold text-foreground">Message Sent Successfully!</h3>
                  <p className="text-xs text-muted-foreground">
                    Thank you for reaching out. Our support team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 rounded-full bg-primary px-6 py-2 text-xs font-bold text-primary-foreground"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-foreground">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-foreground">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-foreground">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-foreground">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow hover:opacity-90 transition-opacity"
                  >
                    <Send className="h-4 w-4" /> Send Message
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
