"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/context/cart-context"
import { useWishlist } from "@/lib/context/wishlist-context"
import { useShopifyProducts } from "@/lib/shopify/hooks"
import { Product } from "@/types/ecommerce"
import { BookClassModal } from "@/components/book-class-modal"
import { StudioPromoVideo } from "@/components/studio-promo-video"
import { SHOP_CATEGORIES } from "@/lib/config/shop-categories"
import { SOCIAL_CONFIG } from "@/lib/config/social"
import {
  Palette,
  Scissors,
  Smile,
  Flame,
  Flower2,
  CircleDot,
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
  Play,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  RotateCw,
  QrCode,
  MessageCircle,
} from "lucide-react"

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

interface AnuArtsTemplateProps {
  onOpenCart?: () => void
  onOpenBookClass?: (category?: string) => void
  initialProducts?: Product[]
}

// 1. Data-Driven DIY Kit Categories: "DIY Kits for Everyone"
// Reusable and configurable to easily add or change DIY kit categories
export const diyKitCategories = [
  {
    id: "candle-making",
    title: "Candle Making Kits",
    desc: "Complete DIY kits with pure soy wax, soothing aromas, cotton wicks & aesthetic jars.",
    icon: Flame,
    iconBg: "bg-amber-100 text-amber-700 border border-amber-200/60",
    badgeBg: "from-amber-500/20 via-orange-400/10 to-transparent",
  },
  {
    id: "resin-art",
    title: "Resin Art Kits",
    desc: "Crystal epoxy ocean waves, glossy geode coasters, art trays & preservation materials.",
    icon: Sparkles,
    iconBg: "bg-purple-100 text-[#7c2d8a] border border-purple-200/60",
    badgeBg: "from-purple-500/20 via-purple-400/10 to-transparent",
  },
  {
    id: "mandala-art",
    title: "Mandala Art Kits",
    desc: "Dotting tools, pre-marked MDF boards, vibrant acrylic paints & practice sheets.",
    icon: CircleDot,
    iconBg: "bg-pink-100 text-[#d92672] border border-pink-200/60",
    badgeBg: "from-pink-500/20 via-pink-400/10 to-transparent",
  },
  {
    id: "flower-making",
    title: "Flower Making Kits",
    desc: "Fine Italian crepe papers, floral wire, shaping tools & templates for lifelike everlasting blooms.",
    icon: Flower2,
    iconBg: "bg-rose-100 text-rose-700 border border-rose-200/60",
    badgeBg: "from-rose-500/20 via-pink-400/10 to-transparent",
  },
  {
    id: "kids-paint-kits",
    title: "Kids Paint Kits",
    desc: "Exciting, non-toxic guided art kits with canvas boards, washable paints & creative brushes.",
    icon: Smile,
    iconBg: "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-800 border border-amber-200/60",
    badgeBg: "from-amber-500/20 via-orange-400/10 to-transparent",
  },
]

// Backwards-compatibility alias
export const workshopCategories = diyKitCategories

// 2. Real Google Reviews (Anu Art and Craft Studio)
const testimonials = [
  {
    quote:
      "“We had our 5 year old son’s bday party here. It was the most complimented and praised birthday ever. Really thankful to the team. They were so co-operative , so patient, so smooth and welcoming. All the team members of the studio were very accommodating I must say and everyone helped kids to complete their bday task. Thank you for your warm hospitality and support!!!!! Out of the box concept of parties ever!!!”",
    author: "Rutika Sahare",
    rating: 5,
    role: "11 reviews · 3 photos",
  },
  {
    quote:
      "“We had a lovely experience with an art party. The team was warm, well-coordinated and did a great job of guiding the children through making their moon lamps. The activity was fun, well organised, and the children were happy with what they created. A wonderful experience!”",
    author: "Fleur Samson",
    rating: 5,
    role: "Local Guide · 5 reviews",
  },
  {
    quote:
      "“Had a wonderful experience celebrating my son’s birthday at the anu art & craft studio! The arrangements were lovely, the activities were engaging, and the kids had a great time. The staff was friendly and helpful throughout. Highly recommended for a fun and creative birthday party!🥳”",
    author: "Priya Tiwari",
    rating: 5,
    role: "12 photos",
  },
  {
    quote:
      "“I am connected with Anu di since long time....I have purchased many art items, learned many techniques from her....she is best at everything....her teaching skills are simple for anyone to understand.....thanks Ma'am”",
    author: "rounak jain",
    rating: 5,
    role: "8 reviews",
  },
  {
    quote:
      "“Purchase many craft materials, they are of top quality. Loved them😍”",
    author: "Sheetal Jain",
    rating: 5,
    role: "3 reviews",
  },
  {
    quote:
      "“Very happy with my purchases from Anu art and craft. High quality MDF and diy kits. Prompt delivery and very good shopping experience. Highly recommend.”",
    author: "Sangeetha Banerjee",
    rating: 5,
    role: "Local Guide · 20 reviews · 17 photos",
  },
  {
    quote:
      "“Finest store with super quality multiple art n craft products under 1 roof. Yashaswee, an amazing creative owner with great team. Quick response n helpful team.”",
    author: "Avika's Art n Craft by Swati",
    rating: 5,
    role: "3 reviews",
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
    category: "Lippan Art Essentials",
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
    category: "Paints & Mediums",
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
    category: "Resin Art Essentials",
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
    category: "Papers & Cardstocks",
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
    category: "Brushes & Tools",
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
    category: "MDF & Acrylic Bases",
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
  const [aboutMediaType, setAboutMediaType] = useState<"video" | "photo">("video")

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

  const maxIdx = Math.max(0, testimonials.length - 3)
  const nextTestimonial = () => {
    setTestimonialIdx((prev) => (prev >= maxIdx ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setTestimonialIdx((prev) => (prev <= 0 ? maxIdx : prev - 1))
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

  const storeFilterCategories = useMemo(
    () => ["All Supplies", ...SHOP_CATEGORIES.map((c) => c.name)],
    []
  )

  const filteredStoreProducts = useMemo(() => {
    if (selectedStoreCategory === "All Supplies" || selectedStoreCategory === "All") {
      return activeProducts.slice(0, 6)
    }

    if (selectedStoreCategory === "New Arrivals") {
      const news = activeProducts.filter(
        (p) => p.isNewArrival || (p.tags || []).some((t) => t.toLowerCase() === "new")
      )
      return (news.length > 0 ? news : activeProducts).slice(0, 6)
    }

    const matchedConfig = SHOP_CATEGORIES.find(
      (c) => c.name === selectedStoreCategory || c.label === selectedStoreCategory
    )
    const keywords = matchedConfig ? matchedConfig.keywords : [selectedStoreCategory.toLowerCase()]

    return activeProducts
      .filter((p) => {
        if (p.category === selectedStoreCategory) return true
        const catLower = (p.category || "").toLowerCase()
        const colLower = (p.collection || "").toLowerCase()
        const nameLower = (p.name || "").toLowerCase()
        const tagsLower = (p.tags || []).map((t) => t.toLowerCase())

        return keywords.some(
          (kw) =>
            catLower.includes(kw) ||
            colLower.includes(kw) ||
            nameLower.includes(kw) ||
            tagsLower.some((t) => t.includes(kw))
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
      {/* SECTION 1: Store Catalog (ONLINE ART STORE & DIY KITS)    */}
      {/* ========================================================= */}
      <section id="shop-section" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4">
        
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

        {/* Concept Feature Card: "DIY Kits for Everyone" */}
        <div className="mb-10 rounded-3xl bg-gradient-to-br from-purple-50/90 via-pink-50/50 to-amber-50/70 border border-pink-200/70 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#7c2d8a] bg-white/90 px-3 py-1 rounded-full border border-purple-200/60 shadow-2xs">
                <Gift className="h-3.5 w-3.5 text-[#d92672]" />
                <span>POPULAR CREATIVE KITS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
                DIY Kits for Everyone
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm font-medium leading-relaxed">
                Everything you need to craft something extraordinary. Our thoughtfully curated kits include premium materials, specialized tools, and beginner-friendly instructions—tailored for every creative stage:
              </p>
              
              {/* Audience Badges: Kids, Beginners, Hobby Artists, Creative Enthusiasts */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold text-stone-800">
                <span className="bg-white/95 px-3 py-1 rounded-full border border-purple-200/70 text-[#7c2d8a] shadow-2xs">
                  👶 Kids
                </span>
                <span className="bg-white/95 px-3 py-1 rounded-full border border-pink-200/70 text-[#d92672] shadow-2xs">
                  🌱 Beginners
                </span>
                <span className="bg-white/95 px-3 py-1 rounded-full border border-amber-200/70 text-amber-800 shadow-2xs">
                  🎨 Hobby Artists
                </span>
                <span className="bg-white/95 px-3 py-1 rounded-full border border-purple-200/70 text-purple-900 shadow-2xs">
                  ✨ Creative Enthusiasts
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={() => setSelectedStoreCategory("DIY Kits")}
                className="inline-flex items-center justify-center gap-2 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Filter DIY Kits</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-purple-50 text-stone-800 text-xs sm:text-sm font-bold px-6 py-3 rounded-full border border-pink-200 shadow-2xs transition-all cursor-pointer"
              >
                <span>Browse Full Store</span>
                <ShoppingBag className="h-3.5 w-3.5 text-[#7c2d8a]" />
              </Link>
            </div>
          </div>
        </div>

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
            <span>Explore All Products</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Category Filter Pills - Fully Data-Driven from SHOP_CATEGORIES */}
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

            const productUrl = `/product/${encodeURIComponent(prod.slug || prod.id)}`
            return (
              <div
                key={prod.id}
                className="group relative bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Stretched Link covering card */}
                <Link
                  href={productUrl}
                  className="absolute inset-0 z-1 cursor-pointer"
                  aria-label={prod.name}
                />

                {/* Product Image */}
                <div className="relative aspect-[4/3] bg-pink-50/50 overflow-hidden">
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
                  <div className="absolute top-3 left-3 bg-[#7c2d8a] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider pointer-events-none">
                    {categoryBadge}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleWishlist(prod)
                    }}
                    className="relative z-10 absolute top-3 right-3 p-2 rounded-full bg-white/90 text-stone-600 hover:text-pink-600 hover:scale-110 transition-all shadow-xs cursor-pointer"
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
                    <h3 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-[#7c2d8a] transition-colors">
                      {prod.name}
                    </h3>
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
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleAddToCart(prod)
                      }}
                      className="relative z-10 inline-flex items-center justify-center gap-1.5 bg-[#7c2d8a] hover:bg-[#682274] active:scale-95 text-white text-xs font-bold px-4 py-2.5 min-h-[40px] rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
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

        {/* Option to Explore All Products and redirect to Shop Page */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center text-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2.5 bg-[#7c2d8a] hover:bg-[#682274] active:scale-[0.98] text-white text-sm sm:text-base font-bold px-8 sm:px-10 py-3.5 rounded-full shadow-md hover:shadow-lg shadow-purple-900/15 hover:shadow-purple-900/25 transition-all cursor-pointer group"
          >
            <span>Explore All Products</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-stone-500 font-medium">
            Explore our complete collection of handmade kits, paints, stencils &amp; supplies
          </p>
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 2: "DIY Kits for Everyone" (ALL-INCLUSIVE KITS)   */}
      {/* ========================================================= */}
      <section id="diy-kits-section" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Header with Purple to Amber gradient touch */}
        <div className="text-center space-y-2.5 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#7c2d8a] bg-white/80 px-3.5 py-1 rounded-full border border-pink-200/60 shadow-2xs">
            <span>ALL-INCLUSIVE ART &amp; CRAFT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            DIY Kits for Everyone
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto font-medium">
            Thoughtfully curated, all-inclusive DIY craft kits designed for kids, beginners, hobbyists and experienced creators alike. Everything you need to create straight out of the box.
          </p>
          
          {/* Butterfly & Watercolor Swirl Ornament */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="h-[1.5px] w-12 bg-gradient-to-r from-transparent via-purple-300 to-pink-400" />
            <span className="text-[#7c2d8a] text-base">🦋</span>
            <span className="h-[1.5px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-orange-400" />
          </div>
        </div>

        {/* 5 Card Grid with Enhanced Colors (Purple, Rose, Yellow-Orange) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {diyKitCategories.map((cat) => {
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
                <Link
                  href="/shop"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-xs group-hover:shadow-md transition-all cursor-pointer relative z-10"
                >
                  <span>Explore Kit</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )
          })}
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 3: "About Anu Arts" (ABOUT & STUDIO)              */}
      {/* ========================================================= */}
      <section id="about-section" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-gradient-to-br from-[#fff7fc] via-white via-pink-50/20 to-[#fff8ee] rounded-3xl border border-pink-100/80 p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden relative">
          
          {/* Ambient Glows: Top-Left Purple/Pink, Bottom-Right Yellow-Orange */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-amber-300/25 via-orange-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Left: Authentic Studio Reference & Promo Video Reel (6 Cols) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Toggle Between Studio Reel & Studio Photo */}
            <div className="flex items-center gap-2 mb-4 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-purple-200/80 shadow-xs z-10">
              <button
                type="button"
                onClick={() => setAboutMediaType("video")}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  aboutMediaType === "video"
                    ? "bg-[#7c2d8a] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-purple-50"
                }`}
              >
                <Play className="h-3 w-3 fill-current" />
                <span>Watch Studio Reel</span>
              </button>
              <button
                type="button"
                onClick={() => setAboutMediaType("photo")}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  aboutMediaType === "photo"
                    ? "bg-[#7c2d8a] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-purple-50"
                }`}
              >
                <Camera className="h-3 w-3" />
                <span>Studio Photo</span>
              </button>
            </div>

            {aboutMediaType === "video" ? (
              <StudioPromoVideo
                compact
                videoUrl="https://res.cloudinary.com/dtrvyelcg/video/upload/v1791472095/anuarts.vid1_1_o3f0w5.mp4"
                posterUrl="https://res.cloudinary.com/dtrvyelcg/video/upload/v1791472095/anuarts.vid1_1_o3f0w5.jpg"
                title="Inside Anu Arts & Craft Studio"
                subtitle="Workshops, craft supplies & creative energy in Indore"
              />
            ) : (
              <div className="relative w-full max-w-[460px] rounded-2xl overflow-hidden shadow-lg bg-white">
                <img
                  src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1790512023/anu_studio_ppg0ne.jpg"
                  alt="Anu Arts & Craft Studio Environment"
                  className="w-full h-auto block object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = "/images/anu-studio.jpg"
                  }}
                />
              </div>
            )}
          </div>

          {/* Right: Client-Specified Content & Mission (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 relative z-10">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#7c2d8a] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
                <Sparkles className="h-3 w-3 text-amber-500" />
                <span>ABOUT ANU ARTS</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                About{" "}
                <span className="font-script text-[#7c2d8a] font-normal italic text-4xl sm:text-5xl lg:text-6xl inline-block ml-1">
                  Anu Arts
                </span>
              </h2>
            </div>

            {/* Client-Provided Core Copy */}
            <p className="text-stone-700 text-sm sm:text-base font-medium leading-relaxed">
              At Anu Arts, we believe creativity belongs to everyone. We’re committed to bringing you quality art materials, thoughtfully curated DIY kits, and engaging workshops that make exploring art easy and enjoyable.
            </p>

            {/* Client-Provided Mission Direction */}
            <div className="rounded-2xl bg-white/90 border border-purple-100 p-4 sm:p-5 shadow-2xs space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7c2d8a]">
                Our Mission
              </div>
              <p className="text-stone-600 text-xs sm:text-sm font-medium leading-relaxed">
                Our mission is to build a vibrant community that celebrates creativity in every form. From beginners discovering a new hobby to experienced artists exploring new techniques, our workshops and expert guidance are designed to inspire, learn and create.
              </p>
            </div>

            {/* 3 Checked Bullet Points */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-[#7c2d8a] flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  Curated premium art &amp; craft supplies
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-pink-100 text-[#d92672] flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  Hands-on workshops for all skill levels
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  Supportive &amp; inspiring creative community
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md hover:shadow-purple-900/20 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Know More About Us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/workshops"
                className="inline-flex items-center gap-2 bg-white hover:bg-purple-50 text-stone-800 text-xs sm:text-sm font-bold px-6 py-3 rounded-full border border-pink-200 shadow-2xs transition-all cursor-pointer"
              >
                <span>Explore Workshops</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2.5: Crafted with Passion in Indore & Instagram   */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white border border-pink-100/90 shadow-xl overflow-hidden relative">
          
          {/* Subtle artistic watercolor background glow */}
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-100/35 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-100/35 rounded-full blur-3xl pointer-events-none" />

          <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left 7 Columns: Crafted with Passion in Indore + Butterfly Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#7c2d8a] bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200/60 shadow-2xs">
                  <span className="text-base">🦋</span>
                  <span>OUR CREATIVE PHILOSOPHY</span>
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                  Crafted with Passion in Indore
                </h3>
              </div>

              {/* Client's Butterfly Philosophy Copy */}
              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                <p className="text-stone-800 font-semibold text-base sm:text-lg leading-relaxed">
                  A butterfly represents transformation, freedom and endless possibilities—just like art.
                </p>
                <p className="text-stone-600 font-normal leading-relaxed">
                  Every blank canvas is a chance to experiment, explore and transform an idea into something beautiful. Our flying butterfly reflects our belief that creativity has no limits and that every artist has the freedom to spread their wings, discover their own style and create something uniquely theirs.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50/90 via-pink-50/70 to-amber-50/90 border-l-4 border-[#7c2d8a] text-stone-900 font-serif italic text-base sm:text-lg leading-relaxed shadow-2xs">
                  “At Anu Arts, we believe art isn’t just about creating—it’s about transforming the way you see the world.”
                </div>
              </div>

              {/* Studio Contact & Location Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="inline-flex items-center gap-2 bg-stone-50 border border-stone-200 px-3.5 py-2 rounded-full text-xs font-bold text-stone-800">
                  <MapPin className="h-3.5 w-3.5 text-[#d92672]" />
                  <span>30, Chandralok Colony, Indore</span>
                </div>

                <a
                  href="tel:+919425356009"
                  className="inline-flex items-center gap-2 bg-[#7c2d8a] text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs hover:bg-[#682274] transition-all"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>+91 94253 56009</span>
                </a>

                <a
                  href="https://wa.me/919425356009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs hover:bg-emerald-700 transition-all"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right 5 Columns: Instagram Page Scanner (Ombre box replaced!) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-[32px] bg-gradient-to-b from-stone-900 via-stone-950 to-black text-white p-6 sm:p-7 shadow-2xl border border-stone-800 relative overflow-hidden flex flex-col items-center text-center group">
                
                {/* Subtle top corner gradient accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/20 via-purple-500/10 to-transparent pointer-events-none rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-transparent pointer-events-none rounded-tr-full" />

                {/* Instagram Header with Logo */}
                <div className="flex items-center gap-2.5 mb-3 relative z-10">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-md text-white">
                    <InstagramIcon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-pink-300 uppercase tracking-widest block">
                      OFFICIAL INSTAGRAM
                    </span>
                    <span className="text-xs font-black tracking-tight text-white">
                      @anuartandcraftstudio
                    </span>
                  </div>
                </div>

                {/* Section Title */}
                <h4 className="font-serif text-xl sm:text-2xl font-black text-white tracking-tight mb-1 relative z-10">
                  Join Our Insta Family Now
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-300 font-medium mb-4 max-w-xs relative z-10">
                  Scan with your phone camera or tap below to follow our daily workshops, DIY kit tutorials &amp; studio creations!
                </p>

                {/* Scanner Frame with QR code */}
                <a
                  href={SOCIAL_CONFIG.instagram.mainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-3.5 bg-white rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer block border-2 border-pink-300/40 z-10"
                  title="Click or scan to visit @anuartandcraftstudio on Instagram"
                >
                  {/* Scanner Corner Brackets */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d92672]" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#d92672]" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#d92672]" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#d92672]" />

                  {/* QR Image */}
                  <div className="w-44 h-44 sm:w-48 sm:h-48 relative flex items-center justify-center">
                    <img
                      src="/images/instagram-qr.svg"
                      alt="Scan to follow Anu Arts on Instagram"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="mt-1 text-[9px] font-black text-stone-900 tracking-wider uppercase text-center flex items-center justify-center gap-1">
                    <span className="text-rose-600">●</span> SCAN WITH PHONE CAMERA
                  </div>
                </a>

                {/* Follow Button */}
                <a
                  href={SOCIAL_CONFIG.instagram.mainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:via-pink-500 hover:to-amber-400 text-white text-xs font-bold py-2.5 px-6 rounded-full shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer z-10"
                >
                  <InstagramIcon className="h-4 w-4" />
                  <span>Join Our Insta Family Now</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
                </a>

                <div className="mt-3 flex items-center gap-3 text-[10px] text-stone-400 relative z-10">
                  <span>10,000+ Students</span>
                  <span>•</span>
                  <span>Daily Inspirations</span>
                </div>

              </div>
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
            
            {/* Stat 1: 10,000+ Happy Students */}
            <div className="flex flex-col items-center justify-center p-2 space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-purple-200/80 text-[#7c2d8a] flex items-center justify-center mb-1 shadow-2xs">
                <Smile className="h-5 w-5" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                10,000+
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Happy Students
              </div>
            </div>

            {/* Stat 2: 500+ Workshops Conducted */}
            <div className="flex flex-col items-center justify-center p-2 space-y-1.5 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-purple-200/80 text-[#7c2d8a] flex items-center justify-center mb-1 shadow-2xs">
                <Users className="h-5 w-5" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                500+
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Workshops Conducted
              </div>
            </div>

            {/* Stat 3: 2500+ Products Available */}
            <div className="flex flex-col items-center justify-center p-2 space-y-1.5 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-pink-200/80 text-[#d92672] flex items-center justify-center mb-1 shadow-2xs">
                <Store className="h-5 w-5" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                2500+
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Products Available
              </div>
            </div>

            {/* Stat 4: 10+ Years of Creativity and Trust */}
            <div className="flex flex-col items-center justify-center p-2 space-y-1.5 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-amber-200/80 text-amber-700 flex items-center justify-center mb-1 shadow-2xs">
                <Heart className="h-5 w-5 fill-amber-600" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                10+
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Years of Creativity and Trust
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
                <div className="pt-3 border-t border-pink-100/80 space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-serif font-bold text-stone-900 text-sm">
                      {item.author}
                    </div>
                    {item.role && (
                      <span className="text-[10px] text-stone-400 font-medium shrink-0">
                        {item.role}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 inline-flex items-center gap-1">
                      <span>★</span> Google Review
                    </span>
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
      {/* SECTION 5: "Join Our Insta Family" (@anuarts_studio)      */}
      {/* ========================================================= */}
      <section id="instagram-section" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header & Scan-Style Card */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#7c2d8a] bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200/60 shadow-2xs">
            <Camera className="h-3.5 w-3.5 text-[#d92672]" />
            <span>INSTAGRAM COMMUNITY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Join Our Insta Family
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-medium leading-relaxed">
            Follow <strong className="text-[#7c2d8a]">{SOCIAL_CONFIG.instagram.handle}</strong> for daily studio moments, hands-on workshop reels, student spotlights, and fresh creative inspiration.
          </p>

          {/* Scan/Profile Feature Card */}
          <div className="pt-3 max-w-sm mx-auto">
            <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-[#d92672] to-amber-500 p-[1.5px] shadow-lg">
              <div className="bg-white rounded-[23px] p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7c2d8a] via-[#d92672] to-[#ea580c] text-white flex items-center justify-center shadow-md shrink-0">
                    <Camera className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-black text-stone-900 tracking-tight">
                      {SOCIAL_CONFIG.instagram.displayName}
                    </div>
                    <div className="text-xs font-bold text-[#7c2d8a]">
                      {SOCIAL_CONFIG.instagram.handle}
                    </div>
                  </div>
                </div>

                <a
                  href={SOCIAL_CONFIG.instagram.mainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#7c2d8a] hover:bg-[#682274] text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <span>Follow</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
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
