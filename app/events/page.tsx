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

const EVENTS_LIST: StudioEvent[] = [
  {
    id: "ev-annual-exhibit",
    title: "Annual Student & Master Art Exhibition 2026",
    type: "Exhibition",
    date: "12 - 14 September 2026",
    time: "11:00 AM - 8:00 PM IST",
    location: "Anu Arts & Craft Studio Main Gallery, Jabalpur",
    price: "Free Entry",
    status: "Free Entry",
    description: "An open grand showcase of over 150 original canvas paintings, resin sculptures, Lippan murals, and craft projects by our students and guest artists.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    features: [
      "Live portrait painting by Yashaswee Sanghavi",
      "Interactive DIY greeting card booth",
      "Exclusive 25% discount on all art supplies",
      "Art collector networking evening",
    ],
  },
  {
    id: "ev-resin-demo",
    title: "Live Masterclass: 3D Geode Wave & Resin Art Demo",
    type: "Live Demo",
    date: "Sunday, 30 August 2026",
    time: "5:00 PM - 7:30 PM IST",
    location: "Studio Hall & Live Zoom Broadcast",
    price: "₹499 (Includes ₹300 Supply Voucher)",
    status: "Limited Seats",
    description: "Watch master resin artist Yashaswee Sanghavi demonstrate crystal geode embedding, lacing resin ocean waves, and high-gloss heat torching techniques live.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    features: [
      "Live interactive Q&A session",
      "Digital Resin Guidebook PDF included",
      "Store discount coupon worth ₹300",
    ],
  },
  {
    id: "ev-kids-carnival",
    title: "Junior Creative Art & Clay Carnival",
    type: "Craft Fair",
    date: "Saturday, 06 September 2026",
    time: "3:30 PM - 7:00 PM IST",
    location: "Anu Arts Courtyard, Jabalpur",
    price: "₹299 per Child (All activities included)",
    status: "Selling Fast",
    description: "A fun weekend carnival featuring face painting, pottery wheel basics, DIY slime making, and canvas finger-painting stations for children aged 4-14.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop",
    features: [
      "5 interactive craft activity counters",
      "Goodie bag with child-safe crayons & clay",
      "Juice boxes and snack vouchers",
    ],
  },
  {
    id: "ev-lippan-intensive",
    title: "Heritage Craft Camp: Lippan & Tanjore Weekend",
    type: "Masterclass",
    date: "19 - 20 September 2026",
    time: "2:00 PM - 6:00 PM IST",
    location: "Studio Heritage Room",
    price: "₹2,499 (All 2-Day Kits Provided)",
    status: "Limited Seats",
    description: "Two-day immersive bootcamp exploring ancient Indian folk craft traditions with real clay dough formulation, mirror precision, and 22K gold foil Tanjore work.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
    features: [
      "Two finished heritage art projects to take home",
      "Certificate signed by master instructors",
      "Traditional masala chai and snacks provided",
    ],
  },
]

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

        {/* Events List */}
        <section className="pb-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
          {filteredEvents.map((event) => (
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
          ))}
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
