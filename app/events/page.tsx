"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartDrawer } from "@/components/cart-drawer"
import { BookClassModal } from "@/components/book-class-modal"
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  Star,
  CheckCircle2,
  Ticket,
  ChevronRight,
  MessageCircle,
  Award,
} from "lucide-react"

interface StudioEvent {
  id: string
  title: string
  type: "Exhibition" | "Live Demo" | "Masterclass" | "Craft Fair" | "Community Meet"
  date: string
  time: string
  location: string
  price: string
  status: "Open for RSVP" | "Limited Seats" | "Selling Fast" | "Free Entry"
  description: string
  image: string
  features: string[]
}

const EVENTS_LIST: StudioEvent[] = []

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [cartOpen, setCartOpen] = useState(false)
  const [bookModalOpen, setBookModalOpen] = useState(false)
  const [rsvpSuccess, setRsvpSuccess] = useState<string | null>(null)

  const filteredEvents =
    selectedType === "all"
      ? EVENTS_LIST
      : EVENTS_LIST.filter((e) => e.type === selectedType)

  const handleRSVP = (eventTitle: string) => {
    setRsvpSuccess(eventTitle)
    setTimeout(() => {
      setRsvpSuccess(null)
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-[#fffaff] flex flex-col font-sans text-stone-800">
      <SiteHeader
        onOpenCart={() => setCartOpen(true)}
        onOpenBookClass={() => setBookModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-[#7c2d8a] via-[#d92672] to-amber-500 py-16 px-4 text-white text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold tracking-widest uppercase">
              <Calendar className="h-3.5 w-3.5" />
              Exhibitions, Workshops &amp; Community Gatherings
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Upcoming Studio <span className="text-amber-300 italic">Events &amp; Fairs</span>
            </h1>
            <p className="text-sm sm:text-base text-purple-100 max-w-2xl mx-auto font-medium">
              Join us for live art exhibitions, interactive masterclass demos, student showcases, and craft carnivals at Anu Arts &amp; Craft Studio.
            </p>
          </div>
        </section>

        {/* RSVP Toast */}
        {rsvpSuccess && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500 animate-in fade-in slide-in-from-bottom-5">
            <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            <div>
              <p className="text-xs font-bold">RSVP Confirmed!</p>
              <p className="text-[11px] text-emerald-100">
                You are registered for: <strong>{rsvpSuccess}</strong>. We will WhatsApp you the entry details.
              </p>
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: "all", label: "All Events" },
              { id: "Exhibition", label: "🏛️ Art Exhibitions" },
              { id: "Live Demo", label: "🎨 Live Master Demos" },
              { id: "Craft Fair", label: "🎪 Craft Fairs & Carnivals" },
              { id: "Masterclass", label: "🏆 Intensive Bootcamps" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedType === tab.id
                    ? "bg-[#7c2d8a] text-white shadow-md shadow-purple-300/50 scale-105"
                    : "bg-white text-stone-700 border border-pink-100 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Events List / Empty State */}
        <section className="pb-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 px-6 rounded-3xl bg-white border border-pink-100 shadow-sm max-w-2xl mx-auto space-y-5">
              <div className="w-16 h-16 rounded-full bg-purple-50 text-[#7c2d8a] flex items-center justify-center mx-auto border border-purple-200 shadow-inner">
                <Calendar className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  No Events Scheduled Right Now
                </h2>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  We currently have no public exhibitions or carnivals scheduled. Interested in hosting a private art party, corporate workshop, or school event with us?
                </p>
              </div>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://wa.me/919425356009?text=Hello%20Anu%20Arts%2C%20I%20would%20like%20to%20inquire%20about%20upcoming%20events%20and%20private%20studio%20bookings!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-full shadow-md transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Inquire on WhatsApp</span>
                </a>
                <button
                  onClick={() => setBookModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs font-bold px-5 py-3 rounded-full shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Book Private Workshop</span>
                </button>
              </div>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group rounded-3xl bg-white border border-pink-100 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
              >
                {/* Event Image */}
                <div className="md:w-2/5 relative aspect-video md:aspect-auto overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#7c2d8a] text-white shadow-xs">
                    {event.type}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                    {event.status}
                  </span>
                </div>

                {/* Event Info */}
                <div className="md:w-3/5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 font-medium">
                      <span className="flex items-center gap-1 text-[#7c2d8a] font-bold bg-purple-50 px-2.5 py-1 rounded-lg">
                        <Calendar className="h-3.5 w-3.5" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1 text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg">
                        <Clock className="h-3.5 w-3.5" />
                        {event.time}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug group-hover:text-[#7c2d8a] transition-colors">
                      {event.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-[#d92672] shrink-0" />
                      <span>{event.location}</span>
                    </div>

                    {/* Highlights */}
                    <div className="pt-2 border-t border-pink-50">
                      <p className="text-[11px] font-bold text-stone-800 mb-1.5">What to expect:</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-stone-600">
                        {event.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Event Pricing & Action */}
                  <div className="pt-4 border-t border-pink-100 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                        Fee / Registration
                      </span>
                      <span className="font-serif text-lg font-black text-[#7c2d8a]">
                        {event.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/919425356009?text=Hello%20Anu%20Arts%2C%20I%20would%20like%20to%20register%20for%20the%20event%3A%20${encodeURIComponent(
                          event.title
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-xs transition-all"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>WhatsApp RSVP</span>
                      </a>

                      <button
                        onClick={() => handleRSVP(event.title)}
                        className="inline-flex items-center gap-1.5 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
                      >
                        <Ticket className="h-3.5 w-3.5" />
                        <span>Quick RSVP</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
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
