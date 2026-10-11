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
  X,
  Eye,
  ChevronRight,
} from "lucide-react"

interface WorkshopItem {
  id: string
  title: string
  category: "painting" | "crafting" | "kids" | "calligraphy" | "specialty"
  categoryLabel: string
  ageGroup: string
  duration?: string
  level?: "Beginner" | "Intermediate" | "All Levels"
  date?: string
  time?: string
  mode: string
  price?: number
  originalPrice?: number
  seatsLeft?: number
  totalSeats?: number
  instructor?: string
  image: string
  secondaryImage?: string
  description: string
  highlights: string[]
  includesKit: boolean
  format?: string
  artworkSize?: string
  access?: string
  includes?: string
  tutorialAccess?: string
}

const ALL_WORKSHOPS: WorkshopItem[] = [
  {
    id: "ws-koi-fish-resin-lotus-pond",
    title: "Koi Fish and Resin Lotus Pond — Online Workshop",
    category: "specialty",
    categoryLabel: "Resin & Clay Art",
    ageGroup: "12+",
    format: "Online workshop",
    artworkSize: "12 inches",
    access: "Private Facebook secret group",
    includes: "Workshop kit and guidance",
    tutorialAccess: "Lifetime access to tutorials after enrollment",
    mode: "Online workshop",
    image: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1791665950/WhatsApp_Image_2026-10-11_at_12.01.10_AM_b7fcnh.jpg",
    secondaryImage: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1791665950/WhatsApp_Image_2026-10-11_at_12.01.10_AM_1_ftgwa9.jpg",
    description: "Learn the art of creating a lotus pond from scratch. Learn how to make clay embellishments, paint the elements, and complete the artwork with a resin pour.",
    highlights: [
      "Format: Online workshop",
      "Age group: 12+",
      "Artwork size: 12 inches",
      "Access: Private Facebook secret group",
      "Includes: Workshop kit and guidance",
      "Tutorial access: Lifetime access to tutorials after enrollment",
    ],
    includesKit: true,
  },
]

export default function WorkshopsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [activeWorkshop, setActiveWorkshop] = useState<WorkshopItem | null>(null)
  const [detailWorkshop, setDetailWorkshop] = useState<WorkshopItem | null>(null)
  const [activeDetailImage, setActiveDetailImage] = useState<string | null>(null)
  const [cardImageOverride, setCardImageOverride] = useState<Record<string, string>>({})
  const [cartOpen, setCartOpen] = useState(false)

  const filteredWorkshops = ALL_WORKSHOPS

  const handleBookClick = (ws: WorkshopItem) => {
    setActiveWorkshop(ws)
    setBookingModalOpen(true)
  }

  const handleOpenDetail = (ws: WorkshopItem) => {
    setDetailWorkshop(ws)
    setActiveDetailImage(ws.image)
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

        {/* Section Tag */}
        <section className="pt-8 pb-4 px-4 sm:px-6 max-w-7xl mx-auto flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-[#7c2d8a] text-xs font-bold shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#7c2d8a]" />
            <span>Featured Online Art Masterclass</span>
          </div>
        </section>

        {/* Workshop Cards Grid */}
        <section className="pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto">
            {filteredWorkshops.map((ws) => (
              <div
                key={ws.id}
                className="group relative rounded-3xl bg-white border border-pink-100/80 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image & Badge */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cardImageOverride[ws.id] || ws.image}
                    alt={ws.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/90 backdrop-blur-md text-[#7c2d8a] shadow-xs">
                    {ws.categoryLabel}
                  </span>

                  {ws.secondaryImage ? (
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white font-medium shadow-xs">
                      <span className="text-[10px]">2 Photos</span>
                      <div className="flex gap-1 ml-1 items-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCardImageOverride((prev) => ({ ...prev, [ws.id]: ws.image }))
                          }}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            (cardImageOverride[ws.id] || ws.image) === ws.image ? "bg-amber-400 scale-125" : "bg-white/60 hover:bg-white"
                          }`}
                          title="Primary Image"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCardImageOverride((prev) => ({ ...prev, [ws.id]: ws.secondaryImage! }))
                          }}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            cardImageOverride[ws.id] === ws.secondaryImage ? "bg-amber-400 scale-125" : "bg-white/60 hover:bg-white"
                          }`}
                          title="Additional Image"
                        />
                      </div>
                    </div>
                  ) : ws.seatsLeft !== undefined ? (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                      {ws.seatsLeft} Seats Left
                    </span>
                  ) : ws.format ? (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#7c2d8a] text-white shadow-xs">
                      {ws.format}
                    </span>
                  ) : null}

                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-purple-200">
                      {ws.date ? (
                        <>
                          <Calendar className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                          <span>{ws.date}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                          <span>{ws.tutorialAccess || ws.access || "Lifetime Access After Enrollment"}</span>
                        </>
                      )}
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
                      {ws.duration ? (
                        <span className="flex items-center gap-1 bg-purple-50 text-[#7c2d8a] px-2.5 py-0.5 rounded-md font-semibold">
                          <Clock className="h-3 w-3" /> {ws.duration}
                        </span>
                      ) : ws.artworkSize ? (
                        <span className="flex items-center gap-1 bg-purple-50 text-[#7c2d8a] px-2.5 py-0.5 rounded-md font-semibold">
                          <Palette className="h-3 w-3" /> Size: {ws.artworkSize}
                        </span>
                      ) : null}

                      <span className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-md font-semibold">
                        <Users className="h-3 w-3" /> Age: {ws.ageGroup}
                      </span>
                      <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md font-semibold">
                        <MapPin className="h-3 w-3" /> {ws.mode || ws.format}
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
                  <div className="border-t border-pink-100 pt-4 flex items-center justify-between gap-2">
                    <div>
                      {ws.price !== undefined ? (
                        <>
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
                        </>
                      ) : (
                        <div className="flex flex-col">
                          <span className="font-serif text-sm font-bold text-[#7c2d8a]">
                            Kit &amp; Guidance Included
                          </span>
                          <span className="text-[10px] text-stone-500 font-medium">
                            Inquire for enrollment
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(ws)}
                        className="inline-flex items-center gap-1 bg-purple-50 hover:bg-purple-100 text-[#7c2d8a] text-xs font-bold px-3 py-2 rounded-full border border-purple-200/80 transition-all cursor-pointer"
                        title="View details & photos"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBookClick(ws)}
                        className="inline-flex items-center gap-1 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
                      >
                        <span>{ws.price !== undefined ? "Book Seat" : "Enroll"}</span>
                        <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                      </button>
                    </div>
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

      {/* Workshop Detail Modal */}
      {detailWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-800 via-fuchsia-700 to-pink-600 text-white p-6 sm:p-7 relative">
              <button
                onClick={() => setDetailWorkshop(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full bg-white/20 text-amber-300 text-xs font-bold">
                  {detailWorkshop.categoryLabel}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold">
                  {detailWorkshop.mode || detailWorkshop.format}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                {detailWorkshop.title}
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Image Gallery */}
              <div className="space-y-3">
                <div className="relative aspect-16/10 sm:aspect-16/9 w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeDetailImage || detailWorkshop.image}
                    alt={detailWorkshop.title}
                    className="h-full w-full object-contain sm:object-cover"
                  />
                </div>

                {/* Thumbnail Switcher if Secondary Image exists */}
                {detailWorkshop.secondaryImage && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveDetailImage(detailWorkshop.image)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        (activeDetailImage || detailWorkshop.image) === detailWorkshop.image
                          ? "border-[#7c2d8a] bg-purple-50 text-[#7c2d8a] ring-2 ring-purple-300/50"
                          : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={detailWorkshop.image}
                        alt="Primary"
                        className="w-6 h-6 rounded-md object-cover"
                      />
                      <span>Primary Image</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDetailImage(detailWorkshop.secondaryImage!)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        activeDetailImage === detailWorkshop.secondaryImage
                          ? "border-[#7c2d8a] bg-purple-50 text-[#7c2d8a] ring-2 ring-purple-300/50"
                          : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={detailWorkshop.secondaryImage}
                        alt="Additional"
                        className="w-6 h-6 rounded-md object-cover"
                      />
                      <span>Additional Image</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  About This Workshop
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {detailWorkshop.description}
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="bg-stone-50/80 rounded-2xl p-5 border border-stone-200/80 space-y-3">
                <h4 className="text-xs font-bold text-[#7c2d8a] uppercase tracking-wider">
                  Workshop Details &amp; Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {detailWorkshop.format && (
                    <div className="flex items-start gap-2">
                      <strong className="text-stone-900 min-w-28">Format:</strong>
                      <span className="text-stone-700">{detailWorkshop.format}</span>
                    </div>
                  )}
                  {detailWorkshop.ageGroup && (
                    <div className="flex items-start gap-2">
                      <strong className="text-stone-900 min-w-28">Age group:</strong>
                      <span className="text-stone-700">{detailWorkshop.ageGroup}</span>
                    </div>
                  )}
                  {detailWorkshop.artworkSize && (
                    <div className="flex items-start gap-2">
                      <strong className="text-stone-900 min-w-28">Artwork size:</strong>
                      <span className="text-stone-700">{detailWorkshop.artworkSize}</span>
                    </div>
                  )}
                  {detailWorkshop.access && (
                    <div className="flex items-start gap-2">
                      <strong className="text-stone-900 min-w-28">Access:</strong>
                      <span className="text-stone-700">{detailWorkshop.access}</span>
                    </div>
                  )}
                  {detailWorkshop.includes && (
                    <div className="flex items-start gap-2">
                      <strong className="text-stone-900 min-w-28">Includes:</strong>
                      <span className="text-stone-700">{detailWorkshop.includes}</span>
                    </div>
                  )}
                  {detailWorkshop.tutorialAccess && (
                    <div className="flex items-start gap-2">
                      <strong className="text-stone-900 min-w-28">Tutorial access:</strong>
                      <span className="text-stone-700">{detailWorkshop.tutorialAccess}</span>
                    </div>
                  )}
                  {detailWorkshop.duration && (
                    <div className="flex items-start gap-2">
                      <strong className="text-stone-900 min-w-28">Duration:</strong>
                      <span className="text-stone-700">{detailWorkshop.duration}</span>
                    </div>
                  )}
                  {detailWorkshop.date && (
                    <div className="flex items-start gap-2">
                      <strong className="text-stone-900 min-w-28">Schedule:</strong>
                      <span className="text-stone-700">{detailWorkshop.date}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">
                  Highlights &amp; What You&apos;ll Learn
                </h4>
                <ul className="space-y-2">
                  {detailWorkshop.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="border-t border-pink-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {detailWorkshop.price !== undefined ? (
                    <div className="font-serif text-2xl font-black text-[#7c2d8a]">
                      ₹{detailWorkshop.price}
                    </div>
                  ) : (
                    <div>
                      <div className="font-serif text-base font-bold text-[#7c2d8a]">
                        Workshop Kit &amp; Guidance Included
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Inquire directly for enrollment details
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/919425356009?text=${encodeURIComponent(
                      `Hello Anu Arts! I would like to inquire and enroll in the ${detailWorkshop.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-full shadow-md transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <button
                    onClick={() => {
                      const ws = detailWorkshop
                      setDetailWorkshop(null)
                      handleBookClick(ws)
                    }}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs font-bold px-5 py-3 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Enroll Now</span>
                    <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookClassModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          initialCategory={activeWorkshop?.category || "painting"}
          initialWorkshopId={activeWorkshop?.id === "ws-koi-fish-resin-lotus-pond" ? "koi-pond" : undefined}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <SiteFooter />
    </div>
  )
}
