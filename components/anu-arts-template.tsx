"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { useShopifyProducts } from "@/lib/shopify/hooks"
import { Product } from "@/types/ecommerce"
import { BookClassModal } from "@/components/book-class-modal"
import {
  Palette,
  Scissors,
  Smile,
  PenTool,
  Gift,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Users,
  Store,
  Heart,
  ShoppingBag,
  Camera,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  RotateCw,
  QrCode,
  MessageCircle,
} from "lucide-react"

interface AnuArtsTemplateProps {
  onOpenCart?: () => void
  onOpenBookClass?: (category?: string) => void
  initialProducts?: Product[]
}

// 1. Five Core Workshop Cards - Infused with Purple, Pink, and the Lower-Right Yellow-Orange / Amber Hues
const workshopCategories = [
  {
    id: "painting",
    title: "Painting",
    desc: "Watercolor, Acrylic, Oil Painting & more.",
    icon: Palette,
    iconBg: "bg-pink-100/90 text-[#d92672] border border-pink-200/50",
    badgeBg: "from-pink-500/20 via-pink-400/10 to-transparent",
    pillBg: "bg-pink-50 text-[#d92672] border-pink-200",
  },
  {
    id: "crafting",
    title: "Crafting",
    desc: "Paper Craft, DIY, Mixed Media & more.",
    icon: Scissors,
    iconBg: "bg-purple-100/90 text-[#7c2d8a] border border-purple-200/50",
    badgeBg: "from-purple-500/20 via-purple-400/10 to-transparent",
    pillBg: "bg-purple-50 text-[#7c2d8a] border-purple-200",
  },
  {
    id: "kids-art",
    title: "Kids Art",
    desc: "Fun & Educational Art sessions for kids.",
    icon: Smile,
    iconBg: "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 border border-amber-200/60",
    badgeBg: "from-amber-500/20 via-orange-400/10 to-transparent",
    pillBg: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    id: "calligraphy",
    title: "Calligraphy",
    desc: "Modern Calligraphy, Lettering & more.",
    icon: PenTool,
    iconBg: "bg-purple-100/90 text-[#7c2d8a] border border-purple-200/50",
    badgeBg: "from-purple-500/20 via-purple-400/10 to-transparent",
    pillBg: "bg-purple-50 text-[#7c2d8a] border-purple-200",
  },
  {
    id: "specialty",
    title: "Specialty",
    desc: "Resin Art, Mandala, Lippan & Tanjore.",
    icon: Gift,
    iconBg: "bg-gradient-to-br from-orange-100 to-amber-100 text-orange-700 border border-orange-200/60",
    badgeBg: "from-orange-500/20 via-amber-400/10 to-transparent",
    pillBg: "bg-orange-50 text-orange-800 border-orange-200",
  },
]

// 2. Student Testimonials
const testimonials = [
  {
    quote:
      "“Anu Ma'am's classes are amazing! I learned so many new techniques and found my passion for painting.”",
    author: "Priya Sharma",
    rating: 5,
    role: "Watercolor Student",
  },
  {
    quote:
      "“The best place for art lovers! The materials are top quality and the workshops are so inspiring.”",
    author: "Neha Verma",
    rating: 5,
    role: "Resin Art Enthusiast",
  },
  {
    quote:
      "“My kids absolutely love the art sessions. It's creative, fun and so well managed.”",
    author: "Ritu Agarwal",
    rating: 5,
    role: "Parent of 2 Kids",
  },
  {
    quote:
      "“Attended the Lippan art workshop and made a gorgeous wall piece! The material kit was complete with everything.”",
    author: "Meera Joshi",
    rating: 5,
    role: "Crafting Workshop",
  },
]

// 3. Instagram Grid Photos
const instagramPhotos = [
  {
    id: 1,
    title: "Paint brushes & watercolor palette",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop",
    caption: "Morning studio brushwork 🎨",
  },
  {
    id: 2,
    title: "Calligraphy lettering 'create'",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop",
    caption: "Modern brush lettering in progress ✨",
  },
  {
    id: 3,
    title: "Watercolor palette and artist paints",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop",
    caption: "Vibrant hues blending together 🌸",
  },
  {
    id: 4,
    title: "Handmade floral clay / MDF craft",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    caption: "Handcrafted mosaic art pieces 💫",
  },
  {
    id: 5,
    title: "Hand-painted decorative glass bottles",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop",
    caption: "Upcycled glass bottle painting 🍾",
  },
  {
    id: 6,
    title: "Art journal with paints & floral sprigs",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop",
    caption: "Botanical illustration sketchbook 🌿",
  },
]

// 4. Products for In-Store Showcase
const storeProducts: Product[] = [
  {
    id: "prod-1",
    name: "DIY Lippan Art Heritage Mirror Kit 1 BOX",
    price: 699,
    originalPrice: 899,
    rating: 5,
    reviewCount: 28,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop",
    category: "DIY Kits",
    description: "Complete Lippan art kit with mirrors, modeling clay, MDF round board & acrylic paints.",
    inStock: true,
    variantId: "gid://shopify/ProductVariant/43659782914092",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43659782914092",
        title: "Default Title",
        price: 699,
        originalPrice: 899,
        available: true,
      },
    ],
  },
  {
    id: "prod-2",
    name: "Artist Grade Watercolor Paint Pan Set (24 Colors)",
    price: 849,
    originalPrice: 1099,
    rating: 5,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop",
    category: "Paints",
    description: "High pigment load watercolor pans with water brush pen and mixing palette.",
    inStock: true,
    variantId: "gid://shopify/ProductVariant/43659902287916",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43659902287916",
        title: "Default Title",
        price: 849,
        originalPrice: 1099,
        available: true,
      },
    ],
  },
  {
    id: "prod-3",
    name: "2:1 Ultra-Clear Crystal Epoxy Resin Kit (300g)",
    price: 549,
    originalPrice: 699,
    rating: 5,
    reviewCount: 35,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop",
    category: "Resin",
    description: "Non-yellowing, bubble-free glossy epoxy resin ideal for ocean art & coasters.",
    inStock: true,
    variantId: "gid://shopify/ProductVariant/43885824344108",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43885824344108",
        title: "Default Title",
        price: 549,
        originalPrice: 699,
        available: true,
      },
    ],
  },
  {
    id: "prod-4",
    name: "Pure Cotton Stretched Canvas Boards (Pack of 4)",
    price: 399,
    originalPrice: 520,
    rating: 5,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1579783901586-d8827248358f?w=500&auto=format&fit=crop",
    category: "Canvas",
    description: "Triple-primed acid-free cotton canvas boards ready for acrylic and oil painting.",
    inStock: true,
    variantId: "gid://shopify/ProductVariant/43660089131052",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43660089131052",
        title: "Default Title",
        price: 399,
        originalPrice: 520,
        available: true,
      },
    ],
  },
  {
    id: "prod-5",
    name: "Dual-Tip Brush Calligraphy Lettering Pens (12 Pcs)",
    price: 499,
    originalPrice: 650,
    rating: 5,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop",
    category: "Calligraphy",
    description: "Flexible nylon brush nib and fine tip pens for modern calligraphy and journaling.",
    inStock: true,
    variantId: "gid://shopify/ProductVariant/43660199559212",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43660199559212",
        title: "Default Title",
        price: 499,
        originalPrice: 650,
        available: true,
      },
    ],
  },
  {
    id: "prod-6",
    name: "Laser Cut MDF Mandir & Festive Cutouts (Set of 6)",
    price: 329,
    originalPrice: 450,
    rating: 5,
    reviewCount: 17,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop",
    category: "MDF",
    description: "Smooth 3.5mm thick MDF bases ready for decoupage, paint, and glitter work.",
    inStock: true,
    variantId: "gid://shopify/ProductVariant/43660200247340",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43660200247340",
        title: "Default Title",
        price: 329,
        originalPrice: 450,
        available: true,
      },
    ],
  },
]

export function AnuArtsTemplate({
  onOpenCart,
  onOpenBookClass,
  initialProducts = [],
}: AnuArtsTemplateProps) {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState("Painting")
  const [selectedStoreCategory, setSelectedStoreCategory] = useState("All")
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [addedToast, setAddedToast] = useState<string | null>(null)
  const [paletteSide, setPaletteSide] = useState<"front" | "back">("front")

  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const router = useRouter()

  const handleOpenWorkshopBooking = (categoryName: string) => {
    setSelectedCategoryForModal(categoryName)
    setIsBookModalOpen(true)
  }

  const handleAddToCart = async (product: Product) => {
    const success = await addToCart(product, 1)
    if (success) {
      setAddedToast(`Added ${product.name} to cart!`)
      setTimeout(() => setAddedToast(null), 3000)
      if (onOpenCart) onOpenCart()
    }
  }

  const nextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % (testimonials.length - 2))
  }

  const prevTestimonial = () => {
    setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1))
  }

  const {
    products: shopifyProducts,
    loading: shopifyLoading,
    error: shopifyError,
  } = useShopifyProducts({ initialProducts })
  
  // Real live Shopify products - prioritizing fetched/initial Shopify products
  const activeProducts =
    shopifyProducts.length > 0
      ? shopifyProducts
      : initialProducts.length > 0
      ? initialProducts
      : !shopifyLoading && !shopifyError
      ? storeProducts
      : []

  const storeFilterCategories = [
    "All",
    "DIY Kits",
    "Art Supplies",
    "Paints",
    "Stencils",
  ]

  const filteredStoreProducts = useMemo(() => {
    if (selectedStoreCategory === "All") {
      return activeProducts.slice(0, 6)
    }

    return activeProducts
      .filter((p) => {
        const catLower = (p.category || "").toLowerCase()
        const colLower = (p.collection || "").toLowerCase()
        const nameLower = (p.name || "").toLowerCase()
        const tagsLower = (p.tags || []).map((t) => t.toLowerCase())

        if (selectedStoreCategory === "DIY Kits") {
          return (
            catLower.includes("diy") ||
            catLower.includes("kit") ||
            colLower.includes("diy") ||
            colLower.includes("kit") ||
            tagsLower.some((t) => t.includes("diy") || t.includes("kit")) ||
            nameLower.includes("diy") ||
            nameLower.includes("kit")
          )
        }

        if (selectedStoreCategory === "Art Supplies") {
          return (
            catLower.includes("art supplies") ||
            colLower.includes("art-supplies") ||
            (!catLower.includes("stencil") &&
              !catLower.includes("paint") &&
              !colLower.includes("stencil") &&
              !colLower.includes("paint") &&
              (catLower === "art supplies" || colLower === ""))
          )
        }

        if (selectedStoreCategory === "Paints") {
          return (
            catLower.includes("paint") ||
            colLower.includes("paint") ||
            tagsLower.some((t) => t.includes("paint")) ||
            nameLower.includes("paint")
          )
        }

        if (selectedStoreCategory === "Stencils") {
          return (
            catLower.includes("stencil") ||
            colLower.includes("stencil") ||
            tagsLower.some((t) => t.includes("stencil")) ||
            nameLower.includes("stencil")
          )
        }

        return (
          catLower.includes(selectedStoreCategory.toLowerCase()) ||
          colLower.includes(selectedStoreCategory.toLowerCase()) ||
          tagsLower.some((t) => t.includes(selectedStoreCategory.toLowerCase()))
        )
      })
      .slice(0, 6)
  }, [activeProducts, selectedStoreCategory])

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#7c2d8a] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce border border-pink-200">
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 1: Store Catalog (ONLINE ART STORE - DIRECTLY UNDER HERO) */}
      {/* ========================================================= */}
      <section id="shop-section" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6">
        
        {/* Diagnostic Banner if Shopify API encounters an error */}
        {shopifyError && activeProducts.length === 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs shadow-xs">
            <div className="font-bold flex items-center gap-2 mb-1 text-amber-800">
              <span className="text-sm">⚠️</span>
              <span>Shopify Storefront API Diagnostic Notice:</span>
            </div>
            <p className="font-mono text-[11px] bg-white/70 p-2 rounded-lg border border-amber-200/60 mt-1">
              {shopifyError}
            </p>
            <p className="mt-1.5 text-[11px] text-amber-700">
              Connected store: <span className="font-bold">e08d97-2b.myshopify.com</span> (API 2026-04)
            </p>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-pink-100/80">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#7c2d8a] bg-purple-50/80 px-3 py-1 rounded-full border border-purple-200/60 mb-2">
              <span>ONLINE ART STORE</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
              Featured Art Supplies &amp; DIY Kits
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7c2d8a] hover:text-[#5c1c68] bg-white hover:bg-purple-50 px-4 py-2 rounded-full border border-purple-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer self-start md:self-auto"
          >
            <span>View All 100 Products</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Category Filter Pills for All Product Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 scrollbar-none no-scrollbar">
          {storeFilterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedStoreCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedStoreCategory === cat
                  ? "bg-[#7c2d8a] text-white shadow-sm scale-105"
                  : "bg-white text-stone-700 hover:bg-purple-50 hover:text-[#7c2d8a] border border-pink-100 shadow-2xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {shopifyLoading && activeProducts.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-pink-100/60 overflow-hidden p-4 space-y-4 animate-pulse"
              >
                <div className="aspect-[4/3] bg-purple-50/60 rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-purple-100/50 rounded-full w-3/4" />
                  <div className="h-3 bg-purple-50 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {filteredStoreProducts.map((prod) => {
            const inWish = isInWishlist(prod.id)
            const cleanDescription =
              prod.shortDescription ||
              prod.description?.replace(/<[^>]*>/g, "").trim() ||
              "Handcrafted quality art and craft supplies from Anu Arts & Craft Studio."
            const categoryBadge =
              prod.category && prod.category !== "Home Page"
                ? prod.category
                : prod.collection && prod.collection !== "frontpage"
                ? prod.collection.replace(/-/g, " ")
                : "Art & Craft"

            return (
              <div
                key={prod.id}
                className="group bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] bg-pink-50/50 overflow-hidden">
                  <Link href={`/product/${prod.slug || prod.id}`}>
                    <img
                      src={
                        prod.thumbnail ||
                        prod.image ||
                        (prod.images && prod.images[0]) ||
                        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop"
                      }
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop"
                      }}
                    />
                  </Link>
                  <div className="absolute top-3 left-3 bg-[#7c2d8a] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider pointer-events-none">
                    {categoryBadge}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(prod)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-stone-600 hover:text-pink-600 hover:scale-110 transition-all shadow-xs cursor-pointer"
                    title="Wishlist"
                  >
                    <Heart className={`h-4 w-4 ${inWish ? "fill-pink-500 text-pink-500" : ""}`} />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[11px] text-stone-500 font-medium ml-1">
                        ({prod.reviewsCount || (prod as { reviewCount?: number }).reviewCount || 24})
                      </span>
                    </div>
                    <Link href={`/product/${prod.slug || prod.id}`}>
                      <h3 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-[#7c2d8a] transition-colors">
                        {prod.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {cleanDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-pink-50 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-base font-black text-stone-900">
                        ₹{prod.price}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-stone-400 line-through ml-2">
                          ₹{prod.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(prod)}
                      className="inline-flex items-center justify-center gap-1.5 bg-[#7c2d8a] hover:bg-[#682274] active:scale-95 text-white text-xs font-bold px-4 py-2.5 min-h-[40px] rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer z-10"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Option to View All 100 Products and redirect to Shop Page */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center text-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2.5 bg-[#7c2d8a] hover:bg-[#682274] active:scale-[0.98] text-white text-sm sm:text-base font-bold px-8 sm:px-10 py-3.5 rounded-full shadow-md hover:shadow-lg shadow-purple-900/15 hover:shadow-purple-900/25 transition-all cursor-pointer group"
          >
            <span>View All 100 Products</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-stone-500 font-medium">
            Explore our complete collection of handmade kits, paints, stencils &amp; supplies
          </p>
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 2: "Workshops for Everyone" (EXPLORE & CREATE)    */}
      {/* ========================================================= */}
      <section id="workshops-section" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Header with Purple to Amber gradient touch */}
        <div className="text-center space-y-2.5 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#7c2d8a] bg-white/80 px-3.5 py-1 rounded-full border border-pink-200/60 shadow-2xs">
            <span>EXPLORE &amp; CREATE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Workshops for Everyone
          </h2>
          
          {/* Butterfly & Watercolor Swirl Ornament */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="h-[1.5px] w-12 bg-gradient-to-r from-transparent via-purple-300 to-pink-400" />
            <span className="text-[#7c2d8a] text-base">🦋</span>
            <span className="h-[1.5px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-orange-400" />
          </div>
        </div>

        {/* 5 Card Grid with Enhanced Colors (Purple, Rose, Yellow-Orange) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {workshopCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <div
                key={cat.id}
                className="group relative bg-white rounded-3xl p-6 text-center border border-pink-100/80 shadow-sm hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between overflow-hidden"
              >
                {/* Subtle Lower-Right Yellow-Orange Watercolor Glow on Card */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-tl from-amber-200/30 via-orange-200/15 to-transparent rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                {/* Top Watercolor Halo / Icon Badge */}
                <div className="relative mb-5 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-100/60 via-purple-100/50 to-amber-100/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className={`w-14 h-14 rounded-full ${cat.iconBg} flex items-center justify-center shadow-xs`}>
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                </div>

                {/* Card Title & Description */}
                <div className="space-y-2 mb-6 relative z-10">
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#7c2d8a] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium leading-relaxed px-1">
                    {cat.desc}
                  </p>
                </div>

                {/* Action CTA Button */}
                <button
                  type="button"
                  onClick={() => handleOpenWorkshopBooking(cat.title)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-xs group-hover:shadow-md transition-all cursor-pointer relative z-10"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )
          })}
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 2: "Nurturing Creativity In Every Heart" (ABOUT)  */}
      {/* ========================================================= */}
      <section id="about-section" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-gradient-to-br from-[#fff7fc] via-white via-pink-50/20 to-[#fff8ee] rounded-3xl border border-pink-100/80 p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden relative">
          
          {/* Ambient Glows: Top-Left Purple/Pink, Bottom-Right Yellow-Orange */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-amber-300/25 via-orange-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Left: Artwork Image Provided by User - Fully Visible Original Aspect Ratio (6 Cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white/50">
              <img
                src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1787169452/download_29_f0phzf.jpg"
                alt="Nurturing Creativity in Every Heart - Anu Arts"
                className="w-full h-auto object-contain block rounded-2xl"
              />
            </div>
          </div>

          {/* Right: Content & Bullet Points (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 relative z-10">
            
            <div className="space-y-2">
              <div className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#7c2d8a]">
                ABOUT ANU ARTS
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                Nurturing{" "}
                <span className="font-script text-[#d92672] font-normal italic text-4xl sm:text-5xl lg:text-6xl inline-block ml-1">
                  Creativity
                </span>
                <br />
                In Every Heart
              </h2>
            </div>

            <p className="text-stone-600 text-xs sm:text-sm font-medium leading-relaxed">
              At Anu Arts, we believe everyone is an artist. Our mission is to
              inspire creativity through quality materials, expert guidance and a
              community that celebrates art in every form.
            </p>

            {/* 3 Checked Bullet Points */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-[#7c2d8a] flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  Curated premium art &amp; craft supplies
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-pink-100 text-[#d92672] flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  Hands-on workshops by expert artists
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  Supportive &amp; inspiring creative community
                </span>
              </div>
            </div>

            {/* CTA Button & Studio Location Tag */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => router.push("/about")}
                className="inline-flex items-center gap-2 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md hover:shadow-purple-900/20 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Know More About Us</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Studio Location Pill with Amber Accent */}
              <div className="flex items-center gap-2 text-stone-800 bg-white/90 border border-amber-200/90 px-3.5 py-1.5 rounded-2xl shadow-2xs">
                <MapPin className="h-4 w-4 text-[#d92672]" />
                <span className="text-[11px] font-bold text-stone-700">30, Chandralok Colony, Indore</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2.5: Interactive Artist Palette Card Tag Display   */}
      {/* Inspired directly by Anu Arts Palette & QR Code Artifact   */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-900 via-[#7c2d8a] via-[#d92672] to-amber-500 p-1 shadow-xl">
          <div className="bg-white rounded-[22px] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Description */}
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#7c2d8a] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>OFFICIAL ARTIST STUDIO IDENTITY</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Crafted with Passion in Indore
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                Every workshop session and craft kit at Anu Arts is infused with our signature watercolor palette — blending vibrant lilac, rose fuchsia, and sunlit amber hues. Scan our Instagram channels or connect with our master instructors directly!
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="tel:+919425356009"
                  className="inline-flex items-center gap-2 bg-[#7c2d8a] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xs hover:bg-[#682274] transition-all"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call: +91 94253 56009</span>
                </a>
                <a
                  href="https://wa.me/919425356009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xs hover:bg-emerald-700 transition-all"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right: Interactive Palette Shape Flip Card (Front: Watercolor Palette with Yellow-Orange Lower Corner, Back: Black Palette with QRs) */}
            <div className="flex flex-col items-center gap-3">
              <div
                onClick={() => setPaletteSide(paletteSide === "front" ? "back" : "front")}
                className="cursor-pointer group relative w-72 sm:w-80 aspect-[16/10] rounded-[45px] shadow-2xl transition-transform duration-500 hover:scale-105 select-none overflow-hidden border-2 border-pink-200"
                title="Click to Flip Palette Tag"
              >
                {paletteSide === "front" ? (
                  /* FRONT: Watercolor Palette (Periwinkle left, Pink top, Yellow-Orange lower right) */
                  <div className="w-full h-full p-4 sm:p-5 flex flex-col justify-between relative bg-white">
                    
                    {/* Palette Background Watercolor Blooms */}
                    <div className="absolute inset-0 bg-radial-[at_15%_35%] from-indigo-200/50 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-radial-[at_50%_15%] from-pink-300/45 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-radial-[at_90%_85%] from-amber-300/60 via-orange-300/35 to-transparent pointer-events-none" />

                    {/* Palette Thumb Hole */}
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-purple-200 shadow-inner z-10" />

                    {/* Top Row: Logo & Brand */}
                    <div className="pl-6 flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl text-[#7c2d8a]">🦋</span>
                        <div>
                          <span className="font-serif text-lg font-black text-stone-900 tracking-tight">Anu Arts</span>
                          <span className="text-[9px] text-stone-400 font-bold ml-1">™</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-white/80 border border-amber-200 px-2 py-0.5 rounded-full text-amber-800 font-bold flex items-center gap-1 shadow-2xs">
                        <RotateCw className="h-2.5 w-2.5" /> Flip
                      </span>
                    </div>

                    {/* Center Tagline */}
                    <p className="pl-6 text-[10px] text-stone-600 font-medium leading-tight relative z-10 max-w-[200px]">
                      Your one-stop destination for art &amp; craft materials. Explore workshops &amp; classes.
                    </p>

                    {/* Bottom Address & Phone with Yellow-Orange Bloom Backdrop */}
                    <div className="pl-6 pt-1 text-[9px] font-bold text-stone-800 space-y-0.5 relative z-10">
                      <div className="flex items-center gap-1 text-stone-700">
                        <MapPin className="h-3 w-3 text-[#d92672]" />
                        <span>30, Chandralok Colony, Indore</span>
                      </div>
                      <div className="flex items-center gap-1 text-stone-700">
                        <Phone className="h-3 w-3 text-amber-600" />
                        <span>+91 94253 56009</span>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* BACK: Black Palette with QR Codes & Tagline */
                  <div className="w-full h-full p-4 sm:p-5 flex flex-col justify-between relative bg-stone-950 text-white">
                    {/* Thumb Hole */}
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-900 border-2 border-stone-700 shadow-inner z-10" />

                    <div className="text-center relative z-10">
                      <h4 className="text-xs font-bold tracking-wide text-stone-200">
                        Where your ideas come to life.
                      </h4>
                    </div>

                    {/* 2 Instagram QR Placeholders */}
                    <div className="grid grid-cols-2 gap-3 px-2 relative z-10">
                      <div className="bg-white p-1.5 rounded-xl text-center text-stone-950 shadow-xs">
                        <div className="w-full aspect-square bg-stone-100 rounded-lg flex items-center justify-center border border-stone-200">
                          <QrCode className="h-10 w-10 text-stone-900" />
                        </div>
                        <span className="text-[7px] font-extrabold uppercase tracking-tighter block mt-1">
                          ANUARTANDCRAFTSTUDIO
                        </span>
                      </div>

                      <div className="bg-white p-1.5 rounded-xl text-center text-stone-950 shadow-xs">
                        <div className="w-full aspect-square bg-stone-100 rounded-lg flex items-center justify-center border border-stone-200">
                          <QrCode className="h-10 w-10 text-stone-900" />
                        </div>
                        <span className="text-[7px] font-extrabold uppercase tracking-tighter block mt-1">
                          ANUARTS_CRAFTING_SUPPLIES
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="text-[9px] text-pink-300 font-bold flex items-center justify-center gap-1">
                        <RotateCw className="h-2.5 w-2.5" /> Tap to see watercolor palette
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[11px] text-stone-500 font-semibold flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Tap palette tag to flip between sides
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: Stats Ribbon / Counter Bar (Translucent Glass) */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-pink-100/70 via-purple-100/60 to-amber-100/70 border border-pink-200/60 backdrop-blur-md p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-pink-200/50">
            
            {/* Stat 1: 1000+ Happy Students */}
            <div className="flex flex-col items-center justify-center p-2 space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-purple-200/80 text-[#7c2d8a] flex items-center justify-center mb-1 shadow-2xs">
                <Smile className="h-5 w-5" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                1000+
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Happy Students
              </div>
            </div>

            {/* Stat 2: 200+ Workshops Conducted */}
            <div className="flex flex-col items-center justify-center p-2 space-y-1.5 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-purple-200/80 text-[#7c2d8a] flex items-center justify-center mb-1 shadow-2xs">
                <Users className="h-5 w-5" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                200+
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Workshops Conducted
              </div>
            </div>

            {/* Stat 3: 1500+ Products Available */}
            <div className="flex flex-col items-center justify-center p-2 space-y-1.5 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-pink-200/80 text-[#d92672] flex items-center justify-center mb-1 shadow-2xs">
                <Store className="h-5 w-5" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                1500+
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Products Available
              </div>
            </div>

            {/* Stat 4: 5+ Years of Creativity */}
            <div className="flex flex-col items-center justify-center p-2 space-y-1.5 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-amber-200/80 text-amber-700 flex items-center justify-center mb-1 shadow-2xs">
                <Heart className="h-5 w-5 fill-amber-600" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                5+
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Years of Creativity
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: "What Our Students Say" (TESTIMONIALS)         */}
      {/* ========================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-2.5 mb-10 sm:mb-12">
          <div className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#7c2d8a]">
            LOVE FROM OUR CREATIVE FAMILY
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            What Our Students Say
          </h2>
          
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-purple-300" />
            <span className="text-[#7c2d8a] text-sm">🦋</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-300" />
          </div>
        </div>

        {/* Carousel Container with Left/Right Buttons */}
        <div className="relative">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevTestimonial}
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-purple-200 shadow-md text-[#7c2d8a] hover:bg-purple-50 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextTestimonial}
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-purple-200 shadow-md text-[#7c2d8a] hover:bg-purple-50 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* 3 Visible Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(testimonialIdx, testimonialIdx + 3).map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-pink-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5 relative overflow-hidden"
              >
                {/* Subtle Amber Touch */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-100/40 to-transparent pointer-events-none rounded-bl-3xl" />

                {/* Quote Icon */}
                <div className="text-3xl text-purple-600 font-serif leading-none">
                  ““
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  {item.quote}
                </p>

                {/* Author & Star Rating */}
                <div className="pt-2 border-t border-pink-50 space-y-1.5">
                  <div className="font-serif font-bold text-stone-900 text-sm">
                    – {item.author}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 pt-8">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7c2d8a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 5: "Follow Our Journey" (@anuarts_studio)        */}
      {/* ========================================================= */}
      <section id="gallery-section" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-1.5 mb-8 sm:mb-10">
          <div className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#7c2d8a]">
            FOLLOW OUR JOURNEY
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7c2d8a] hover:underline cursor-pointer">
            <a href="https://instagram.com/ANUARTANDCRAFTSTUDIO" target="_blank" rel="noopener noreferrer">
              @anuarts_studio
            </a>
          </h2>
        </div>

        {/* 6 Photo Artistic Grid */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {instagramPhotos.map((photo) => (
              <a
                key={photo.id}
                href="https://instagram.com/ANUARTANDCRAFTSTUDIO"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-pink-100 block"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#7c2d8a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <p className="text-white text-[10px] font-bold truncate">
                    {photo.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Floating Center Overlay Button: "Follow Us on Instagram" */}
          <div className="absolute inset-x-0 bottom-[-20px] flex justify-center z-10">
            <a
              href="https://instagram.com/ANUARTANDCRAFTSTUDIO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-purple-50 text-stone-900 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg border border-pink-200 hover:scale-105 transition-all"
            >
              <Camera className="h-4 w-4 text-[#d92672]" />
              <span>Follow Us on Instagram</span>
            </a>
          </div>

        </div>

      </section>

      {/* Workshop Booking Modal */}
      <BookClassModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        initialCategory={selectedCategoryForModal}
      />

    </div>
  )
}
