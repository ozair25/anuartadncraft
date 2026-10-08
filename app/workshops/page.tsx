"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { BookClassModal } from "@/components/book-class-modal"
import { CartDrawer } from "@/components/cart-drawer"
import {
  Palette,
  Scissors,
  Smile,
  PenTool,
  Gift,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Star,
  Users,
  CheckCircle2,
  Filter,
  MessageCircle,
  Award,
  BookOpen,
} from "lucide-react"

interface WorkshopItem {
  id: string
  title: string
  category: "painting" | "crafting" | "kids" | "calligraphy" | "specialty"
  categoryLabel: string
  ageGroup: string
  duration: string
  level: "Beginner" | "Intermediate" | "All Levels"
  date: string
  time: string
  mode: "Studio (In-Person)" | "Online (Live Zoom)" | "Hybrid"
  price: number
  originalPrice?: number
  seatsLeft: number
  totalSeats: number
  instructor: string
  image: string
  description: string
  highlights: string[]
  includesKit: boolean
}

const ALL_WORKSHOPS: WorkshopItem[] = [
  {
    id: "ws-lippan-art",
    title: "Traditional Kutch Lippan Mud & Mirror Masterclass",
    category: "specialty",
    categoryLabel: "Specialty Art",
    ageGroup: "12+ Years & Adults",
    duration: "3 Hours (Weekend Intensive)",
    level: "All Levels",
    date: "This Saturday, 23 Aug 2026",
    time: "4:00 PM - 7:00 PM IST",
    mode: "Studio (In-Person)",
    price: 1499,
    originalPrice: 1999,
    seatsLeft: 4,
    totalSeats: 12,
    instructor: "Yashaswee Sanghavi (Proprietor & Master Artist)",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
    description: "Learn the authentic Gujarati mud-relief clay craft with convex mirrors, relief paste cones, and acrylic varnishes to take home your own 12x12 wall panel.",
    highlights: ["Complete 12x12 MDF board & craft kit included", "Step-by-step dough preparation & piping", "Mirror placement patterns & sealing"],
    includesKit: true,
  },
  {
    id: "ws-resin-ocean",
    title: "Ocean Wave Resin Geode & Clock Workshop",
    category: "specialty",
    categoryLabel: "Resin Craft",
    ageGroup: "16+ Years & Adults",
    duration: "2.5 Hours",
    level: "Beginner",
    date: "Sunday, 24 Aug 2026",
    time: "11:00 AM - 1:30 PM IST",
    mode: "Studio (In-Person)",
    price: 1899,
    originalPrice: 2499,
    seatsLeft: 3,
    totalSeats: 10,
    instructor: "Yashaswee Sanghavi & Guest Specialist",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    description: "Master 2:1 epoxy resin pouring, cellular lacing wave effects, crystal quartz embedding, and golden pigment powder blending on a luxury wooden base.",
    highlights: ["Safety masks, gloves, and heat-gun guidance", "Crystal embellishments & gold mica pigments", "Take home a finished 14\" resin clock/tray"],
    includesKit: true,
  },
  {
    id: "ws-watercolor-botanicals",
    title: "Loose Floral Watercolors & Botanical Illustration",
    category: "painting",
    categoryLabel: "Painting",
    ageGroup: "10+ Years & Adults",
    duration: "2 Hours",
    level: "Beginner",
    date: "Wednesday, 27 Aug 2026",
    time: "5:00 PM - 7:00 PM IST",
    mode: "Studio & Online (Live Zoom)",
    price: 999,
    originalPrice: 1299,
    seatsLeft: 6,
    totalSeats: 15,
    instructor: "Yashaswee Sanghavi",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    description: "Discover wet-on-wet watercolor washes, color bleeding, leaf stroke controls, and expressive rose & peony floral compositions on 300 GSM cold-pressed paper.",
    highlights: ["300 GSM 100% cotton paper practice sheets", "Brush pressure & water control fundamentals", "Framed keepsake floral art piece"],
    includesKit: true,
  },
  {
    id: "ws-acrylic-landscape",
    title: "Textured Acrylic Impasto Landscape on Canvas",
    category: "painting",
    categoryLabel: "Painting",
    ageGroup: "12+ Years & Adults",
    duration: "3 Hours",
    level: "All Levels",
    date: "Saturday, 30 Aug 2026",
    time: "3:00 PM - 6:00 PM IST",
    mode: "Studio (In-Person)",
    price: 1299,
    originalPrice: 1699,
    seatsLeft: 5,
    totalSeats: 14,
    instructor: "Yashaswee Sanghavi",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
    description: "Create dramatic mountain vistas and twilight skies using heavy-body acrylic paints, modeling paste textures, and palette knife layering techniques.",
    highlights: ["10x12 stretched cotton canvas included", "Palette knife blending & impasto modeling", "Studio easel & acrylic tools provided"],
    includesKit: true,
  },
  {
    id: "ws-kids-fun-craft",
    title: "Junior Artists: Magic Clay & Acrylic Canvas Fun",
    category: "kids",
    categoryLabel: "Kids Art",
    ageGroup: "5 to 12 Years",
    duration: "2 Hours",
    level: "Beginner",
    date: "Every Sunday Morning",
    time: "10:30 AM - 12:30 PM IST",
    mode: "Studio (In-Person)",
    price: 699,
    originalPrice: 899,
    seatsLeft: 8,
    totalSeats: 16,
    instructor: "Senior Studio Mentor",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop",
    description: "A joyful creative sensory session where kids explore air-dry sculpting clay, vibrant non-toxic finger and acrylic paints, and cartoon character creation.",
    highlights: ["100% non-toxic, child-safe art supplies", "Juice & healthy snack break included", "Certificate of Creative Achievement & craft toy"],
    includesKit: true,
  },
  {
    id: "ws-calligraphy-lettering",
    title: "Brush Calligraphy & Flourished Hand-Lettering",
    category: "calligraphy",
    categoryLabel: "Calligraphy",
    ageGroup: "12+ Years & Adults",
    duration: "2.5 Hours",
    level: "Beginner",
    date: "Friday, 29 Aug 2026",
    time: "4:30 PM - 7:00 PM IST",
    mode: "Studio & Online",
    price: 1199,
    originalPrice: 1499,
    seatsLeft: 5,
    totalSeats: 12,
    instructor: "Guest Calligraphy Artist",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop",
    description: "Learn stroke weight control, thin upstrokes, thick downstrokes, alphabet anatomy, bouncy modern lettering, and greeting card design.",
    highlights: ["Tombow/Brustro brush pen starter set", "40-page guided calligraphy workbook", "Custom bookmark & quotes project"],
    includesKit: true,
  },
  {
    id: "ws-mandala-therapy",
    title: "Sacred Geometry Mandala & Dot Art Therapy",
    category: "crafting",
    categoryLabel: "Crafting & Meditation",
    ageGroup: "All Ages (10+)",
    duration: "2.5 Hours",
    level: "All Levels",
    date: "Next Sunday, 31 Aug 2026",
    time: "4:00 PM - 6:30 PM IST",
    mode: "Studio (In-Person)",
    price: 999,
    originalPrice: 1299,
    seatsLeft: 7,
    totalSeats: 15,
    instructor: "Yashaswee Sanghavi",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop",
    description: "Experience deep relaxation and mindfulness through precision geometric grids, dotting tools, gradient acrylic layers, and mandala symmetry.",
    highlights: ["Dotting tool stylus set + grid guide", "Black wooden display plate included", "Mindful tea & soothing studio ambient music"],
    includesKit: true,
  },
]

export default function WorkshopsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [activeWorkshop, setActiveWorkshop] = useState<WorkshopItem | null>(null)
  const [cartOpen, setCartOpen] = useState(false)

  const filteredWorkshops =
    selectedCategory === "all"
      ? ALL_WORKSHOPS
      : ALL_WORKSHOPS.filter((w) => w.category === selectedCategory)

  const handleBookClick = (ws: WorkshopItem) => {
    setActiveWorkshop(ws)
    setBookingModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#fffaff] flex flex-col font-sans text-stone-800">
      <SiteHeader
        onOpenCart={() => setCartOpen(true)}
        onOpenBookClass={() => {
          setActiveWorkshop(ALL_WORKSHOPS[0])
          setBookingModalOpen(true)
        }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-[#7c2d8a] via-[#d92672] to-amber-500 py-16 px-4 sm:px-6 text-white text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative mx-auto max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5 fill-amber-300" />
              Creative Studio Masterclasses &amp; Batches
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Learn Art &amp; Craft from <span className="text-amber-300 italic">Master Mentors</span>
            </h1>
            <p className="text-sm sm:text-base text-purple-100 max-w-2xl mx-auto font-medium">
              Hands-on creative workshops for adults, teens, and young artists. Every session includes professional grade material kits, personal 1-on-1 guidance, and take-home masterpieces.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-purple-100">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" /> 100% Materials Provided
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Small Batches (Max 12-15)
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Certificate of Participation
              </span>
            </div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: "all", label: "All Workshops" },
              { id: "painting", label: "🎨 Painting & Watercolor" },
              { id: "specialty", label: "✨ Resin & Lippan Art" },
              { id: "crafting", label: "✂️ Craft & Mandala" },
              { id: "kids", label: "👶 Kids Art (5-12 Yrs)" },
              { id: "calligraphy", label: "✒️ Calligraphy & Lettering" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? "bg-[#7c2d8a] text-white shadow-md shadow-purple-300/50 scale-105"
                    : "bg-white text-stone-700 border border-pink-100 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Workshop Cards Grid */}
        <section className="pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredWorkshops.map((ws) => (
              <div
                key={ws.id}
                className="group relative rounded-3xl bg-white border border-pink-100/80 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image & Badge */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/90 backdrop-blur-md text-[#7c2d8a] shadow-xs">
                    {ws.categoryLabel}
                  </span>

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                    {ws.seatsLeft} Seats Left
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-purple-200">
                      <Calendar className="h-3.5 w-3.5 text-amber-300" />
                      <span>{ws.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#7c2d8a] transition-colors leading-snug">
                      {ws.title}
                    </h3>
                    <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {ws.description}
                    </p>

                    {/* Metadata Badges */}
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-stone-500 font-medium">
                      <span className="flex items-center gap-1 bg-purple-50 text-[#7c2d8a] px-2.5 py-0.5 rounded-md font-semibold">
                        <Clock className="h-3 w-3" /> {ws.duration}
                      </span>
                      <span className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-md font-semibold">
                        <Users className="h-3 w-3" /> {ws.ageGroup}
                      </span>
                      <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md font-semibold">
                        <MapPin className="h-3 w-3" /> {ws.mode}
                      </span>
                    </div>

                    {/* Key Highlights */}
                    <ul className="mt-3 space-y-1.5 border-t border-pink-50 pt-3">
                      {ws.highlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-stone-600">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="border-t border-pink-100 pt-4 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-xl font-black text-[#7c2d8a]">
                          ₹{ws.price}
                        </span>
                        {Boolean(ws.originalPrice && ws.originalPrice > ws.price) && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{ws.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium block">
                        Includes Art Kit &amp; Certificate
                      </span>
                    </div>

                    <button
                      onClick={() => handleBookClick(ws)}
                      className="inline-flex items-center gap-1.5 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>Book Seat</span>
                      <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Studio WhatsApp & Custom Batch Banner */}
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-purple-900 via-[#7c2d8a] to-pink-600 p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                Private Parties • Birthday Art Sessions • Corporate Groups
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Looking for a Custom Date or Private Group Workshop?
              </h2>
              <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
                We organize personalized painting parties, resin art masterclasses, and kids creative birthdays at our studio or your venue with custom themes.
              </p>
            </div>
            <a
              href="https://wa.me/919425356009?text=Hello%20Anu%20Arts%2C%20I%20would%20like%20to%20book%20a%20private%20custom%20art%20workshop!"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>Chat on WhatsApp (+91 94253 56009)</span>
            </a>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookClassModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          defaultCategory={activeWorkshop?.category || "painting"}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <SiteFooter />
    </div>
  )
}
