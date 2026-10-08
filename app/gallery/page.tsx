"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartDrawer } from "@/components/cart-drawer"
import { BookClassModal } from "@/components/book-class-modal"
import {
  Sparkles,
  Camera,
  Heart,
  Eye,
  X,
  ExternalLink,
  ChevronRight,
  Filter,
  Palette,
  Star,
  Award,
} from "lucide-react"

interface GalleryItem {
  id: string
  title: string
  artist: string
  medium: string
  category: "canvas" | "lippan" | "resin" | "mandala" | "kids"
  categoryLabel: string
  image: string
  aspect: string
  likes: number
  description: string
  createdIn: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Golden Hour Bloom on Stretched Canvas",
    artist: "Yashaswee Sanghavi (Studio Master)",
    medium: "Heavy Body Acrylics & 24K Gold Leaf",
    category: "canvas",
    categoryLabel: "Acrylic Canvas",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-square",
    likes: 184,
    description: "Multi-layered impasto petals capturing the setting sun over floral meadows with gold leaf gilding.",
    createdIn: "Masterclass Demo 2026",
  },
  {
    id: "g2",
    title: "Kutch Lippan Mud-Relief Wall Medallion",
    artist: "Sunita Agarwal (Workshop Student)",
    medium: "Organic Clay, Convex Mirrors & Pearl White Acrylic",
    category: "lippan",
    categoryLabel: "Lippan Art",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-4/5",
    likes: 219,
    description: "Traditional Gujarati craft medallion created in the weekend 3-hour beginner intensive workshop.",
    createdIn: "Weekend Lippan Batch",
  },
  {
    id: "g3",
    title: "Bioluminescent Ocean Wave Resin Clock",
    artist: "Rohit & Megha Sharma",
    medium: "Epoxy Resin, Mica Powder & Quartz Crystals",
    category: "resin",
    categoryLabel: "Resin Art",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-square",
    likes: 312,
    description: "Triple-layered ocean waves with authentic cellular lacing technique and silent quartz clock mechanism.",
    createdIn: "Resin Art Studio Batch",
  },
  {
    id: "g4",
    title: "Cosmic Mandala Geometry in Turquoise & Gold",
    artist: "Pooja Trivedi (Student)",
    medium: "Acrylic Dotting & 3D Liner on Black Board",
    category: "mandala",
    categoryLabel: "Mandala & Dotting",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-4/5",
    likes: 145,
    description: "Over 2,400 precision concentric acrylic dots forming a sacred lotus healing mandala.",
    createdIn: "Art Therapy Session",
  },
  {
    id: "g5",
    title: "Magical Safari: Clay & Watercolor Play",
    artist: "Aarav Mehta (Age 8)",
    medium: "Air-Dry Clay & Non-toxic Gouache",
    category: "kids",
    categoryLabel: "Junior Artists",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-square",
    likes: 98,
    description: "Created by an 8-year-old artist during the Sunday morning Junior Craft Explorers session.",
    createdIn: "Kids Art Club",
  },
  {
    id: "g6",
    title: "Misty Mountain Twilight Impasto",
    artist: "Yashaswee Sanghavi",
    medium: "Palette Knife Oil & Heavy Acrylic on Linen",
    category: "canvas",
    categoryLabel: "Acrylic Canvas",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-4/5",
    likes: 276,
    description: "Sculpted ridge peaks using titanium white and ultramarine blue with heavy impasto strokes.",
    createdIn: "Studio Solo Exhibition",
  },
  {
    id: "g7",
    title: "Emerald Geode Tray with Crushed Quartz",
    artist: "Kavita Rao (Student)",
    medium: "Jewelry Grade Resin & Holographic Glitter",
    category: "resin",
    categoryLabel: "Resin Art",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-square",
    likes: 167,
    description: "Luxury serving tray with real agate geode patterns, golden brass handles, and glass crystal border.",
    createdIn: "Resin Workshop",
  },
  {
    id: "g8",
    title: "Peacock Elegance Lippan Art Plate",
    artist: "Divya Nambiar (Student)",
    medium: "Mirror Glass & Ceramic Clay Dough",
    category: "lippan",
    categoryLabel: "Lippan Art",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-4/5",
    likes: 204,
    description: "Intricate floral and feather patterns studded with hand-cut diamond mirrors.",
    createdIn: "Heritage Craft Batch",
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null)
  const [likesState, setLikesState] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [bookModalOpen, setBookModalOpen] = useState(false)

  const filteredItems =
    selectedCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory)

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
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
              <Camera className="h-3.5 w-3.5" />
              Studio Showcase &amp; Student Masterpieces
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              The Anu Arts <span className="text-amber-300 italic">Creative Gallery</span>
            </h1>
            <p className="text-sm sm:text-base text-purple-100 max-w-2xl mx-auto font-medium">
              Explore magnificent artworks handcrafted by Yashaswee Sanghavi and our passionate workshop students across India.
            </p>
          </div>
        </section>

        {/* Filter Pills */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: "all", label: "All Masterpieces" },
              { id: "canvas", label: "🎨 Acrylic & Oil Canvas" },
              { id: "lippan", label: "✨ Lippan Mud Art" },
              { id: "resin", label: "🌊 Resin Waves & Geodes" },
              { id: "mandala", label: "☸️ Mandala & Dot Art" },
              { id: "kids", label: "👶 Junior Creations" },
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

        {/* Gallery Masonry-style Grid */}
        <section className="pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const currentLikes = item.likes + (likesState[item.id] || 0)

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group relative rounded-3xl bg-white border border-pink-100 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
                >
                  <div className={`relative ${item.aspect} w-full overflow-hidden bg-stone-100`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                      <div className="flex justify-between items-center">
                        <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {item.categoryLabel}
                        </span>
                        <button
                          onClick={(e) => handleLike(item.id, e)}
                          className="flex items-center gap-1 bg-white/30 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold hover:bg-pink-600 transition-colors"
                        >
                          <Heart className="h-3 w-3 fill-pink-400 text-pink-400" />
                          <span>{currentLikes}</span>
                        </button>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-amber-300">{item.artist}</p>
                        <p className="text-[11px] text-stone-200 line-clamp-1">{item.medium}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-sm font-bold text-stone-900 group-hover:text-[#7c2d8a] transition-colors leading-snug line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1">{item.medium}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-pink-50 text-[10px] font-medium text-stone-400">
                      <span>By {item.artist}</span>
                      <span className="text-[#7c2d8a] font-bold flex items-center gap-0.5">
                        View Details <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Instagram Connect Banner */}
          <div className="mt-16 rounded-3xl bg-pink-50/60 border border-pink-200 p-8 text-center max-w-3xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-md">
              <Camera className="h-6 w-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Share Your Art with <span className="text-[#7c2d8a]">#AnuArtsStudio</span>
            </h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Tag us in your photos and reels on Instagram for a chance to be featured in our official gallery and win exclusive artist gift kits!
            </p>
            <a
              href="https://instagram.com/ANUARTANDCRAFTSTUDIO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md hover:scale-105 transition-all mt-2"
            >
              <span>Follow @ANUARTANDCRAFTSTUDIO</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-pink-100 flex flex-col md:flex-row">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="md:w-1/2 aspect-square bg-stone-900 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#7c2d8a]">
                  {activeModalItem.categoryLabel}
                </span>
                <h2 className="font-serif text-2xl font-bold text-stone-900 leading-tight">
                  {activeModalItem.title}
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeModalItem.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs border-t border-pink-100">
                  <p>
                    <span className="font-bold text-stone-800">Artist:</span>{" "}
                    <span className="text-stone-600">{activeModalItem.artist}</span>
                  </p>
                  <p>
                    <span className="font-bold text-stone-800">Medium:</span>{" "}
                    <span className="text-stone-600">{activeModalItem.medium}</span>
                  </p>
                  <p>
                    <span className="font-bold text-stone-800">Batch / Context:</span>{" "}
                    <span className="text-stone-600">{activeModalItem.createdIn}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-pink-100 flex items-center justify-between">
                <button
                  onClick={(e) => handleLike(activeModalItem.id, e)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-pink-200 text-xs font-bold text-pink-600 hover:bg-pink-50 transition-colors"
                >
                  <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
                  <span>{activeModalItem.likes + (likesState[activeModalItem.id] || 0)} Applauds</span>
                </button>

                <button
                  onClick={() => {
                    setActiveModalItem(null)
                    setBookModalOpen(true)
                  }}
                  className="bg-[#7c2d8a] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-purple-800 transition-colors"
                >
                  Learn This Technique
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      {bookModalOpen && (
        <BookClassModal isOpen={bookModalOpen} onClose={() => setBookModalOpen(false)} />
      )}
      <SiteFooter />
    </div>
  )
}
