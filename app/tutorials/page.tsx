"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { BookClassModal } from "@/components/book-class-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { StudioPromoVideo } from "@/components/studio-promo-video"
import { TutorialCardVideo } from "@/components/tutorial-card-video"
import {
  TUTORIALS_DATA,
  TUTORIAL_CATEGORIES,
  TutorialItem,
} from "@/lib/data/tutorials-data"
import {
  Search,
  Sparkles,
  Clock,
  Palette,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  X,
  MessageCircle,
  ShoppingBag,
  Star,
  Play,
  Check,
  Printer,
  Compass,
  Lightbulb,
  ShieldAlert,
  Flame,
  Volume2,
} from "lucide-react"

export default function TutorialsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Tutorials")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All Levels")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTutorial, setActiveTutorial] = useState<TutorialItem | null>(null)
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"video" | "steps" | "materials">("video")
  const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>({})

  // Filtered tutorials
  const filteredTutorials = useMemo(() => {
    return TUTORIALS_DATA.filter((tut) => {
      const matchesCategory =
        selectedCategory === "All Tutorials" ||
        selectedCategory === "All Crafts" ||
        tut.category === selectedCategory
      const matchesDifficulty =
        selectedDifficulty === "All Levels" || tut.difficulty === selectedDifficulty
      const matchesSearch =
        searchQuery.trim() === "" ||
        tut.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tut.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tut.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tut.materials.some((m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      return matchesCategory && matchesDifficulty && matchesSearch
    })
  }, [selectedCategory, selectedDifficulty, searchQuery])

  // Toggle material checkbox
  const toggleMaterial = (matName: string) => {
    setCheckedMaterials((prev) => ({
      ...prev,
      [matName]: !prev[matName],
    }))
  }

  // Handle opening tutorial
  const openTutorial = (tut: TutorialItem) => {
    setActiveTutorial(tut)
    setActiveTab("video")
    setCheckedMaterials({})
  }

  return (
    <div className="min-h-screen bg-[#fffaff] flex flex-col selection:bg-pink-200 selection:text-purple-900">
      <SiteHeader onOpenCart={() => setIsCartOpen(true)} onOpenBookClass={() => setIsBookModalOpen(true)} />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* 1. HERO SECTION                                          */}
        {/* ========================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-100/50 via-pink-50/30 to-[#fffaff] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-pink-100/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-6">
              <Link href="/" className="hover:text-[#7c2d8a] transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-stone-400" />
              <span className="text-[#7c2d8a] font-bold">Tutorials &amp; Guides</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <RibbonLabel>Free Masterclass Guides</RibbonLabel>
                <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
                  Taught by Master Artist Yashaswee Sanghavi
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Step-by-Step Art &amp; Craft <span className="text-[#7c2d8a] italic">Tutorials</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-medium">
                Master professional studio techniques from the comfort of your home. Explore complete step-by-step guides for Resin Ocean Art, traditional Kutch Lippan Mud &amp; Mirror craft, vintage Decoupage, and fluid Alcohol Inks with curated material checklists and artist secrets.
              </p>

              {/* Quick Highlight Metrics (Unboxed text with typographic separators) */}
              <div className="mt-6 flex flex-wrap items-center gap-y-2 text-xs font-semibold text-stone-600">
                <div className="flex items-center gap-1.5 text-[#7c2d8a]">
                  <CheckCircle2 className="h-4 w-4 text-[#7c2d8a]" />
                  <span>6+ Video Masterclasses</span>
                </div>
                <span className="mx-3 text-stone-300" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5 text-stone-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Interactive Materials Checklist</span>
                </div>
                <span className="mx-3 text-stone-300" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5 text-stone-700">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" />
                  <span>Studio-Tested by Yashaswee Sanghavi</span>
                </div>
                <span className="mx-3 text-stone-300" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5 text-stone-700">
                  <Sparkles className="h-4 w-4 text-[#d92672]" />
                  <span>100% Free Access</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. STUDIO IN ACTION SPOTLIGHT (PROMO SHOWCASE)             */}
        {/* ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-6 sm:-mt-8 mb-12">
          <div className="rounded-3xl bg-gradient-to-br from-purple-900 via-[#7c2d8a] via-[#5b1f68] to-stone-950 p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Promo Video Reel (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <StudioPromoVideo
                  compact
                  videoUrl="https://res.cloudinary.com/dtrvyelcg/video/upload/v1791472117/anuarts.vid2_1_qw8cpb.mp4"
                  posterUrl="https://res.cloudinary.com/dtrvyelcg/video/upload/v1791472117/anuarts.vid2_1_qw8cpb.jpg"
                  title="Behind the Craft at Anu Arts"
                  subtitle="Live workshop vibes, masterclass demonstrations & authentic supplies in Indore"
                />
              </div>

              {/* Narrative & Highlights (7 cols) */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold tracking-widest uppercase border border-white/20">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>STUDIO IN ACTION • WATCH PROMO</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Watch the Magic of <br />
                  <span className="text-amber-300 italic">Anu Arts &amp; Craft Studio</span>
                </h2>

                <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                  Step inside Central India&apos;s most beloved art destination! Whether you want to master Resin Art ocean ripples, sculpt traditional Lippan mirror motifs, or pick up premium DIY kits and craft supplies, experience firsthand the inspiring energy nurtured by master artist Yashaswee Sanghavi.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-3.5">
                    <p className="text-amber-300 font-bold text-xs uppercase">Interactive Classes</p>
                    <p className="text-purple-150 text-[11px] mt-1">Beginner-friendly offline &amp; online sessions.</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-3.5">
                    <p className="text-pink-300 font-bold text-xs uppercase">All Materials Included</p>
                    <p className="text-purple-150 text-[11px] mt-1">Top-grade resin, mirrors, paints &amp; tools.</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-3.5">
                    <p className="text-amber-200 font-bold text-xs uppercase">Central Indore Location</p>
                    <p className="text-purple-150 text-[11px] mt-1">30, Chandralok Colony, Indore (MP).</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(true)}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    Book a Workshop Seat
                  </button>

                  <a
                    href="https://wa.me/919425356009?text=Hi%20Anu%20Arts%2C%20I%20watched%20the%20studio%20promo%20video%20on%20the%20Tutorials%20page%20and%20want%20to%20know%20more%20about%20your%20classes%20and%20supplies!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. SEARCH & CATEGORY FILTERS                               */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-pink-100 shadow-2xs space-y-4">
            {/* Search Input and Difficulty dropdown */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search tutorials, techniques, supplies (e.g., Ocean Waves, Lippan Mirrors, Decoupage, Inks)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-pink-200 bg-[#fffaff] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#7c2d8a] focus:ring-2 focus:ring-purple-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Difficulty Segmented Selector */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl shrink-0 self-start sm:self-auto overflow-x-auto">
                {["All Levels", "Beginner", "Intermediate"].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedDifficulty(lvl)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      selectedDifficulty === lvl
                        ? "bg-white text-[#7c2d8a] shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
              {TUTORIAL_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-[#7c2d8a] text-white shadow-2xs"
                        : "bg-purple-50/80 hover:bg-purple-100 text-stone-700 hover:text-[#7c2d8a] border border-purple-100/60"
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. TUTORIALS GRID                                         */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {selectedCategory === "All Crafts" ? "All Masterclass Tutorials" : `${selectedCategory} Guides`}
              </h2>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                Showing {filteredTutorials.length} {filteredTutorials.length === 1 ? "tutorial" : "tutorials"}
                {selectedDifficulty !== "All Levels" ? ` · Level: ${selectedDifficulty}` : ""}
              </p>
            </div>
          </div>

          {filteredTutorials.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-pink-100 p-8">
              <BookOpen className="h-10 w-10 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-800">No tutorials match your filter</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try clearing your search term or selecting &quot;All Crafts&quot; to discover our full range of guides.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All Crafts")
                  setSelectedDifficulty("All Levels")
                  setSearchQuery("")
                }}
                className="mt-4 text-xs font-bold text-[#7c2d8a] hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredTutorials.map((tut) => (
                <TutorialCardVideo
                  key={tut.id}
                  tutorial={tut}
                  onOpenTutorial={openTutorial}
                />
              ))}
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* 5. STUDIO SUPPLY KITS SECTION                              */}
        {/* ========================================================= */}
        <section className="bg-gradient-to-r from-purple-900 via-[#7c2d8a] to-[#d92672] text-white py-14 sm:py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                Authentic Studio Materials
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">
                Get the Exact Supplies Used in Our Guides
              </h2>
              <p className="text-purple-150 text-xs sm:text-sm mt-2 leading-relaxed">
                Skip the guesswork! Anu Arts &amp; Craft Studio curates professional-grade pigments, epoxy resins, genuine glass mirrors, and premium MDF cutouts so your DIY creations match studio standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "2:1 Ultra-Clear Epoxy Resin Kit",
                  subtitle: "High-gloss, bubble-free formula with ocean pigments",
                  price: "₹649",
                  link: "/shop",
                  tag: "Best for Ocean Art",
                },
                {
                  title: "Traditional Lippan Art Kit",
                  subtitle: "Ceramic dough, 500+ glass mirrors & MDF base",
                  price: "₹799",
                  link: "/shop",
                  tag: "Bestseller in Indore",
                },
                {
                  title: "Botanical Decoupage Bundle",
                  subtitle: "Rice papers, Mod Podge adhesive & crackle glaze",
                  price: "₹499",
                  link: "/shop",
                  tag: "Beginner Friendly",
                },
                {
                  title: "Fluid Alcohol Inks & Yupo Pack",
                  subtitle: "High-saturation dyes, metallic brass & blower",
                  price: "₹599",
                  link: "/shop",
                  tag: "Vibrant Blooms",
                },
              ].map((kit) => (
                <div
                  key={kit.title}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-amber-300">
                      {kit.tag}
                    </span>
                    <h3 className="font-serif text-base font-bold text-white mt-1 leading-snug">
                      {kit.title}
                    </h3>
                    <p className="text-purple-150 text-xs mt-1.5 leading-relaxed">
                      {kit.subtitle}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-base font-extrabold text-white">{kit.price}</span>
                    <Link
                      href={kit.link}
                      className="bg-white hover:bg-stone-100 text-[#7c2d8a] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <ShoppingBag className="h-3 w-3" />
                      <span>Order Kit</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. IN-PERSON MENTORSHIP CALLOUT (INDORE STUDIO)            */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white rounded-3xl border border-pink-200 p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7c2d8a] mb-2">
                <Compass className="h-4 w-4" />
                <span>Hands-On Studio Learning</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Want 1-on-1 Guidance with Yashaswee Sanghavi?
              </h2>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed font-medium">
                Visit our physical studio at <strong>30, Chandralok Colony, Indore</strong> or join our live weekend interactive batches. All tools and take-home craft kits are provided!
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-stone-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Small Batches (Max 8 Artists)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Personalised Feedback
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Certification of Completion
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/919425356009?text=Hello%20Yashaswee%2C%20I%20saw%20your%20tutorials%20and%20would%20like%20to%20learn%20more%20about%20studio%20workshops!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>WhatsApp the Studio</span>
              </a>
              <Link
                href="/workshops"
                className="w-full sm:w-auto text-center bg-[#7c2d8a] hover:bg-purple-900 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>View Workshop Schedule</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* ========================================================= */}
      {/* 7. INTERACTIVE TUTORIAL READER MODAL                       */}
      {/* ========================================================= */}
      {activeTutorial && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveTutorial(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-pink-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-pink-100 flex items-start justify-between bg-gradient-to-r from-purple-50/60 to-pink-50/40">
              <div className="pr-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
                  <span className="text-[#7c2d8a] font-bold">{activeTutorial.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeTutorial.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeTutorial.duration}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {activeTutorial.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 font-medium">
                  Instructor: <strong>{activeTutorial.instructor}</strong> · Indore Studio
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTutorial(null)}
                className="p-2 rounded-full bg-white text-stone-500 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 shadow-2xs cursor-pointer transition-colors shrink-0"
                aria-label="Close tutorial modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center px-6 border-b border-pink-100 bg-white gap-2 overflow-x-auto text-xs font-bold">
              {activeTutorial.videoUrl && (
                <button
                  type="button"
                  onClick={() => setActiveTab("video")}
                  className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "video"
                      ? "border-[#7c2d8a] text-[#7c2d8a]"
                      : "border-transparent text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Video Masterclass</span>
                </button>
              )}

              {/* Steps Tab - ONLY for Tutorials 4, 5, 6 (Hidden completely for Tutorials 1, 2, 3) */}
              {!activeTutorial.hideSteps && activeTutorial.steps.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("steps")}
                  className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "steps"
                      ? "border-[#7c2d8a] text-[#7c2d8a]"
                      : "border-transparent text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Step-by-Step Instructions ({activeTutorial.steps.length})</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab("materials")}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "materials"
                    ? "border-[#7c2d8a] text-[#7c2d8a]"
                    : "border-transparent text-stone-600 hover:text-stone-900"
                }`}
              >
                <Palette className="h-3.5 w-3.5" />
                <span>
                  Materials Checklist {activeTutorial.materials.length > 0 ? `(${activeTutorial.materials.length})` : "(Pending)"}
                </span>
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* TAB 1: STEPS (Displayed only for Tutorials 4, 5, 6) */}
              {activeTab === "steps" && !activeTutorial.hideSteps && activeTutorial.steps.length > 0 && (
                <div className="space-y-6">
                  {/* Safety Note if present */}
                  {activeTutorial.safetyNotes && (
                    <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-amber-900 text-xs">
                      <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Studio Safety Note: </strong>
                        <span>{activeTutorial.safetyNotes}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-5">
                    {activeTutorial.steps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="bg-stone-50/70 rounded-2xl p-5 border border-stone-200/70"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-6 h-6 rounded-full bg-[#7c2d8a] text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {step.stepNumber}
                          </span>
                          <h4 className="font-serif text-base font-bold text-stone-900">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium pl-9">
                          {step.instruction}
                        </p>

                        {/* Pro Tip Box */}
                        {step.proTip && (
                          <div className="mt-3 ml-9 bg-purple-50/80 border border-purple-200/70 rounded-xl p-3 flex items-start gap-2.5 text-xs text-purple-950">
                            <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold text-[#7c2d8a]">Yashaswee&apos;s Pro Tip: </strong>
                              <span>{step.proTip}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: MATERIALS CHECKLIST */}
              {activeTab === "materials" && (
                <div className="space-y-5">
                  <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#7c2d8a] uppercase tracking-wider">
                        Interactive Supply Checklist
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {activeTutorial.materials.length > 0
                          ? "Tick the items you have at home or click directly to view and shop supplies."
                          : "Material checklist and product links are configurable and will be updated upon supply."}
                      </p>
                    </div>
                    <Link
                      href="/shop"
                      className="bg-[#7c2d8a] hover:bg-purple-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-2xs shrink-0 ml-3"
                    >
                      <ShoppingBag className="h-3 w-3" />
                      <span>Browse Shop</span>
                    </Link>
                  </div>

                  {activeTutorial.materials.length === 0 ? (
                    <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200">
                      <Palette className="h-8 w-8 text-[#7c2d8a] mx-auto mb-2 opacity-60" />
                      <h5 className="text-sm font-bold text-stone-800">Material Checklist Pending Client Supply</h5>
                      <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                        The specific material list and product links for <strong>{activeTutorial.title}</strong> will be added as soon as they are provided. Follow along with the video and step instructions!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {activeTutorial.materials.map((mat) => {
                        const isChecked = !!checkedMaterials[mat.name]
                        const hasLink = Boolean(mat.shopLink)
                        const isExternal = Boolean(mat.shopLink?.startsWith("http"))

                        return (
                          <div
                            key={mat.name}
                            onClick={() => toggleMaterial(mat.name)}
                            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              isChecked
                                ? "bg-emerald-50/60 border-emerald-200 text-stone-500"
                                : "bg-white border-pink-100 text-stone-900 hover:border-purple-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                                  isChecked
                                    ? "bg-emerald-600 border-emerald-600 text-white"
                                    : "border-stone-300 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                              </div>
                              <div>
                                {hasLink ? (
                                  isExternal ? (
                                    <a
                                      href={mat.shopLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className={`text-xs sm:text-sm font-bold text-[#7c2d8a] hover:underline ${
                                        isChecked ? "line-through text-stone-400" : ""
                                      }`}
                                    >
                                      {mat.name}
                                    </a>
                                  ) : (
                                    <Link
                                      href={mat.shopLink!}
                                      onClick={(e) => e.stopPropagation()}
                                      className={`text-xs sm:text-sm font-bold text-[#7c2d8a] hover:underline ${
                                        isChecked ? "line-through text-stone-400" : ""
                                      }`}
                                    >
                                      {mat.name}
                                    </Link>
                                  )
                                ) : (
                                  <div
                                    className={`text-xs sm:text-sm font-semibold ${
                                      isChecked ? "line-through text-stone-400" : ""
                                    }`}
                                  >
                                    {mat.name}
                                  </div>
                                )}
                                {mat.amount && (
                                  <div className="text-[11px] text-stone-500 font-medium">
                                    Quantity: {mat.amount}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              {hasLink ? (
                                isExternal ? (
                                  <a
                                    href={mat.shopLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-xs font-bold text-white bg-[#7c2d8a] hover:bg-purple-900 px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs transition-colors shrink-0"
                                  >
                                    <ShoppingBag className="h-3 w-3" />
                                    <span>Shop Product</span>
                                  </a>
                                ) : (
                                  <Link
                                    href={mat.shopLink!}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-xs font-bold text-white bg-[#7c2d8a] hover:bg-purple-900 px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs transition-colors shrink-0"
                                  >
                                    <ShoppingBag className="h-3 w-3" />
                                    <span>Shop Product</span>
                                  </Link>
                                )
                              ) : (
                                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                                  Shopify Link Pending
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 1: VIDEO MASTERCLASS (Native 9:16 Aspect Ratio, No Cropping) */}
              {activeTab === "video" && activeTutorial.videoUrl && (
                <div className="space-y-4">
                  <div className="relative rounded-3xl overflow-hidden bg-black aspect-[9/16] max-w-[320px] sm:max-w-[380px] mx-auto shadow-2xl border-2 sm:border-4 border-stone-800">
                    <video
                      src={activeTutorial.videoUrl}
                      poster={activeTutorial.posterUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain bg-black"
                    />
                  </div>
                  <p className="text-center text-xs text-stone-500 font-medium">
                    Masterclass demonstration filmed at Anu Arts &amp; Craft Studio, 30, Chandralok Colony, Indore.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-pink-100 bg-stone-50/80 flex flex-wrap items-center justify-between gap-3">
              <a
                href={`https://wa.me/919425356009?text=Hello%20Yashaswee%2C%20I%20have%20a%20question%20about%20the%20${encodeURIComponent(activeTutorial.title)}%20tutorial.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 transition-colors"
              >
                <MessageCircle className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                <span>Ask Yashaswee on WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Guide</span>
                </button>
                <Link
                  href="/workshops"
                  className="bg-[#7c2d8a] hover:bg-purple-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
                >
                  Book Live Masterclass
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart & Booking Modals */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <BookClassModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />
    </div>
  )
}
