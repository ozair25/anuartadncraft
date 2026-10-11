"use client"

import { useState } from "react"
import { X, Calendar, Clock, MapPin, CheckCircle, Sparkles, Star, Users, Phone, MessageCircle } from "lucide-react"

interface BookClassModalProps {
  isOpen: boolean
  onClose: () => void
  initialCategory?: string
  initialWorkshopId?: string
}

const workshopOptions = [
  {
    id: "koi-pond",
    name: "Koi Fish and Resin Lotus Pond — Online Workshop",
    category: "Online Workshop",
    instructor: "Anu Arts & Craft Studio",
    duration: "Lifetime Access",
    fee: "Inquire for details",
    kitIncluded: true,
    dates: ["Private Facebook Secret Group (Lifetime Access)"],
    highlights: ["Lotus pond from scratch", "Clay embellishments & painting", "Resin pour & workshop kit guidance"],
  },
]

export function BookClassModal({ isOpen, onClose, initialCategory, initialWorkshopId }: BookClassModalProps) {
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(
    initialWorkshopId || "koi-pond"
  )
  const [selectedSlot, setSelectedSlot] = useState(0)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [studentAge, setStudentAge] = useState("Adult (16+)")
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const selectedWorkshop =
    workshopOptions.find((w) => w.id === selectedWorkshopId) || workshopOptions[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !phone) return

    // Format WhatsApp message link
    const msg = encodeURIComponent(
      `Hello Anu Arts! I would like to book a seat for the workshop:\n\n*Workshop:* ${selectedWorkshop.name}\n*Slot:* ${selectedWorkshop.dates[selectedSlot]}\n*Name:* ${fullName}\n*Phone:* ${phone}\n*Age Group:* ${studentAge}\n*Fee:* ${selectedWorkshop.fee}`
    )
    window.open(`https://wa.me/919425356009?text=${msg}`, "_blank")
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-800 via-fuchsia-700 to-pink-600 text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-amber-200 text-xs font-bold mb-2">
            <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            <span>Interactive Art Sessions • Offline &amp; Online</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Book an Art &amp; Craft Workshop
          </h3>
          <p className="text-pink-100 text-xs sm:text-sm mt-1">
            Join Anu Arts Studio at Chandralok Colony, Indore or attend live on Zoom.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="h-9 w-9" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-stone-900">
                Booking Request Sent!
              </h4>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Thank you, <strong>{fullName}</strong>! Our studio coordinator will confirm your seat for{" "}
                <strong>{selectedWorkshop.name}</strong> ({selectedWorkshop.dates[selectedSlot]}) via WhatsApp/Call at{" "}
                <strong>{phone}</strong>.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false)
                    onClose()
                  }}
                  className="bg-[#7c2d8a] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-purple-800"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* 1. Workshop Category Selector (when multiple options exist) */}
              {workshopOptions.length > 1 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                    Select Workshop Topic
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {workshopOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedWorkshopId(opt.id)
                          setSelectedSlot(0)
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedWorkshopId === opt.id
                            ? "border-[#7c2d8a] bg-purple-50/80 text-[#7c2d8a] ring-2 ring-purple-300/40 shadow-xs font-bold"
                            : "border-stone-200 bg-stone-50/50 hover:bg-stone-50 text-stone-700 text-xs font-medium"
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.category}</div>
                        <div className="text-[11px] text-stone-500 truncate mt-0.5">{opt.fee}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Selected Workshop Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/60 to-pink-50/60 border border-pink-200/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-stone-900 text-base">
                    {selectedWorkshop.name}
                  </h4>
                  <span className="text-base font-black text-[#7c2d8a]">
                    {selectedWorkshop.fee}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-purple-600" />
                    {selectedWorkshop.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Complete Kit Included
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-pink-600" />
                    Indore Studio &amp; Zoom Live
                  </span>
                </div>
                <ul className="text-xs text-stone-600 space-y-1 pt-1 border-t border-pink-200/40">
                  {selectedWorkshop.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7c2d8a]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Slot Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Choose Batch Date &amp; Time
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedWorkshop.dates.map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSlot(idx)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                        selectedSlot === idx
                          ? "border-[#7c2d8a] bg-[#7c2d8a] text-white shadow-xs"
                          : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Student Contact Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Participant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-[#fffaff] px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#7c2d8a] focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 94253 56009"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-[#fffaff] px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#7c2d8a] focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              </div>

              {/* 5. Age Group */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Age Category
                </label>
                <div className="flex gap-4 text-xs font-medium text-stone-700">
                  {["Kids (5-11)", "Teens (12-17)", "Adults (18+)"].map((cat) => (
                    <label key={cat} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="ageGroup"
                        checked={studentAge === cat}
                        onChange={() => setStudentAge(cat)}
                        className="text-[#7c2d8a] focus:ring-purple-400"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 via-fuchsia-700 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-purple-400/30 transition-all cursor-pointer text-sm"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-300 fill-emerald-300" />
                  <span>Reserve Seat &amp; Confirm on WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-stone-500 mt-2">
                  No advance payment needed. Pay online or at studio counter on workshop day.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  )
}
