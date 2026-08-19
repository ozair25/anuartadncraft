"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BrandLogo } from "@/components/brand-logo"
import { Product, Blog, Order } from "@/types/ecommerce"
import {
  getProducts,
  saveProduct,
  deleteProduct,
  getBlogs,
  saveBlog,
  deleteBlog,
  getOrders,
  updateOrderStatus,
} from "@/lib/services/db-service"
import {
  ShieldCheck,
  Package,
  Plus,
  Trash2,
  Edit,
  Upload,
  FileSpreadsheet,
  BookOpen,
  MessageCircle,
  Video,
  Star,
  ShoppingBag,
  Search,
  CheckCircle,
  RefreshCw,
  LogOut,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Eye,
  Settings,
  Image as ImageIcon,
  ListPlus,
  Lightbulb,
  Gift,
  FileText,
  Check,
  X,
  Layers,
} from "lucide-react"

// Preset Craft Images for Quick Selection
const PRESET_CRAFT_IMAGES = [
  { label: "Lippan Art Kit", url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop" },
  { label: "Resin & Pigments", url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop" },
  { label: "Acrylic Paints", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop" },
  { label: "MDF Board Cutouts", url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop" },
  { label: "Chalk Paints", url: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop" },
  { label: "Varnish & Gloss", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop" },
  { label: "Embroidery Threads", url: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop" },
  { label: "Brushes & Tools", url: "https://images.unsplash.com/photo-1619234653718-a61637e78b22?w=800&auto=format&fit=crop" },
]

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState("")
  const [loginError, setLoginError] = useState("")

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "products" | "shopify" | "blogs" | "reels" | "testimonials" | "whatsapp" | "orders"
  >("products")

  // Data State
  const [products, setProducts] = useState<Product[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Product Modal State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [showImagePicker, setShowImagePicker] = useState(false)

  // Blog Modal State
  const [editingBlog, setEditingBlog] = useState<Partial<Blog> | null>(null)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false)

  // Shopify CSV Import State
  const [csvText, setCsvText] = useState("")
  const [importStatus, setImportStatus] = useState("")
  const [isImporting, setIsImporting] = useState(false)

  // WhatsApp Config
  const [whatsappNumber, setWhatsappNumber] = useState("+91 90000 00000")
  const [whatsappSuccessMsg, setWhatsappSuccessMsg] = useState("")

  // Instagram Reels State
  const [reels, setReels] = useState([
    {
      id: "reel-1",
      title: "DIY Lippan Art Masterclass",
      views: "124K",
      thumbnail: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop",
      url: "https://instagram.com",
    },
    {
      id: "reel-2",
      title: "Resin Tray Crafting Process",
      views: "89K",
      thumbnail: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop",
      url: "https://instagram.com",
    },
    {
      id: "reel-3",
      title: "Acrylic Pour Painting Tutorial",
      views: "210K",
      thumbnail: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop",
      url: "https://instagram.com",
    },
  ])
  const [newReelTitle, setNewReelTitle] = useState("")
  const [newReelThumbnail, setNewReelThumbnail] = useState("")

  // Testimonials State
  const [testimonials, setTestimonials] = useState([
    { id: "1", author: "Mohit Mahajan", content: "Best collection of art supplies! Fast delivery.", rating: 5 },
    { id: "2", author: "Aditi Jayakar", content: "Anu Arts has transformed my crafting business.", rating: 5 },
    { id: "3", author: "Rajan Kara", content: "Great quality scrapbook materials and MDF boards.", rating: 5 },
  ])
  const [newAuthor, setNewAuthor] = useState("")
  const [newContent, setNewContent] = useState("")

  useEffect(() => {
    // Check local auth
    const authFlag = localStorage.getItem("anu_admin_authed")
    if (authFlag === "true") {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const loadData = () => {
    setProducts(getProducts())
    setBlogs(getBlogs())
    setOrders(getOrders())
    const savedPhone = localStorage.getItem("anu_arts_whatsapp_phone")
    if (savedPhone) setWhatsappNumber(savedPhone)
  }

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (passcode.trim() === "admin123" || passcode.trim() === "anuarts") {
      localStorage.setItem("anu_admin_authed", "true")
      setIsAuthenticated(true)
      setLoginError("")
      loadData()
    } else {
      setLoginError("Invalid Passcode. Default is admin123")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("anu_admin_authed")
    setIsAuthenticated(false)
  }

  // File Upload Helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size is larger than 5MB. Please choose a smaller image.")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          callback(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Plus (+) Button Helpers for Description Editing
  const insertIntoDescription = (textToAppend: string) => {
    setEditingProduct((prev) => ({
      ...prev,
      description: prev?.description ? `${prev.description}\n\n${textToAppend}` : textToAppend,
    }))
  }

  // Plus (+) Button Helpers for Blog Content Editing
  const insertIntoBlogContent = (textToAppend: string) => {
    setEditingBlog((prev) => ({
      ...prev,
      content: prev?.content ? `${prev.content}\n\n${textToAppend}` : textToAppend,
    }))
  }

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct?.name || !editingProduct?.price) return

    const productToSave: Product = {
      id: editingProduct.id || "prod-" + Date.now(),
      name: editingProduct.name,
      slug: editingProduct.slug || editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: Number(editingProduct.price),
      originalPrice: editingProduct.originalPrice ? Number(editingProduct.originalPrice) : undefined,
      category: editingProduct.category || "General Craft",
      description: editingProduct.description || "High quality art & craft item from Anu Arts & Craft.",
      image: editingProduct.image || PRESET_CRAFT_IMAGES[0].url,
      rating: editingProduct.rating || 5,
      reviewCount: editingProduct.reviewCount || 10,
      inStock: editingProduct.inStock ?? true,
      isBestseller: editingProduct.isBestseller ?? false,
      isNew: editingProduct.isNew ?? true,
    }

    saveProduct(productToSave)
    setProducts(getProducts())
    setIsProductModalOpen(false)
    setEditingProduct(null)
  }

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
      setProducts(getProducts())
    }
  }

  // Toggle Stock directly
  const handleToggleStock = (product: Product) => {
    const updated = { ...product, inStock: !product.inStock }
    saveProduct(updated)
    setProducts(getProducts())
  }

  // Toggle Bestseller directly
  const handleToggleBestseller = (product: Product) => {
    const updated = { ...product, isBestseller: !product.isBestseller }
    saveProduct(updated)
    setProducts(getProducts())
  }

  // 1-Click Shopify 2,000 Demo Importer
  const handleLoadSampleShopify2000 = () => {
    setIsImporting(true)
    setImportStatus("Generating 2,000 Shopify product records...")

    setTimeout(() => {
      const categories = [
        "DIY Kits",
        "Acrylic Paints",
        "MDF Cutouts",
        "Chalk Paints",
        "Resin Art",
        "Varnish Range",
        "Paper Crafting",
        "Embroidery",
        "Crochet",
        "Brushes & Tools",
      ]

      const sampleImages = PRESET_CRAFT_IMAGES.map((img) => img.url)

      const generated: Product[] = []
      for (let i = 1; i <= 2000; i++) {
        const cat = categories[i % categories.length]
        const img = sampleImages[i % sampleImages.length]
        const price = Math.floor(199 + (i % 30) * 50)
        const originalPrice = Math.floor(price * 1.3)

        generated.push({
          id: `shopify-${i}`,
          name: `Anu Arts & Craft ${cat} Item #${i}`,
          slug: `anu-arts-${cat.toLowerCase().replace(/[^a-z0-9]/g, "")}-${i}`,
          price,
          originalPrice,
          category: cat,
          description: `Premium grade ${cat} supply imported directly from store catalog. Crafted with non-toxic, eco-friendly materials.\n\n• Key Feature 1: Highly durable & eco-safe\n• Key Feature 2: Perfect for artists and hobbyists\n\n💡 Craft Tip: Clean surface thoroughly before application.`,
          image: img,
          rating: 5,
          reviewCount: Math.floor(5 + (i % 80)),
          inStock: true,
          isBestseller: i % 15 === 0,
          isNew: i % 20 === 0,
        })
      }

      // Save to storage
      localStorage.setItem("anu_arts_products", JSON.stringify(generated))
      setProducts(generated)
      setIsImporting(false)
      setImportStatus("Successfully imported 2,000 products into Anu Arts catalog!")
    }, 1200)
  }

  // Parse Custom Shopify CSV Text
  const handleParseCsv = () => {
    if (!csvText.trim()) {
      alert("Please paste your Shopify CSV content into the box.")
      return
    }

    setIsImporting(true)
    setImportStatus("Parsing Shopify CSV lines...")

    try {
      const lines = csvText.split("\n")
      if (lines.length < 2) {
        alert("CSV content seems too short or invalid.")
        setIsImporting(false)
        return
      }

      const importedProds: Product[] = []
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue
        const cols = line.split(",")

        const title = cols[1]?.replace(/"/g, "") || `Imported Product #${i}`
        const priceStr = cols[19] || cols[13] || "299"
        const price = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 299
        const category = cols[4]?.replace(/"/g, "") || "DIY Crafts"
        const image = cols[24]?.replace(/"/g, "") || PRESET_CRAFT_IMAGES[0].url

        importedProds.push({
          id: `csv-${Date.now()}-${i}`,
          name: title,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          price,
          originalPrice: price * 1.25,
          category,
          description: "Imported product item from Shopify export.",
          image: image.startsWith("http") ? image : PRESET_CRAFT_IMAGES[0].url,
          rating: 5,
          reviewCount: 12,
          inStock: true,
        })
      }

      const existing = getProducts()
      const combined = [...importedProds, ...existing]
      localStorage.setItem("anu_arts_products", JSON.stringify(combined))
      setProducts(combined)
      setIsImporting(false)
      setImportStatus(`Successfully parsed and imported ${importedProds.length} products!`)
      setCsvText("")
    } catch (err) {
      console.error(err)
      setIsImporting(false)
      setImportStatus("Failed to parse CSV file. Ensure valid Shopify product export format.")
    }
  }

  // Save Blog
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBlog?.title || !editingBlog?.content) return

    const blogToSave: Blog = {
      id: editingBlog.id || "blog-" + Date.now(),
      title: editingBlog.title,
      slug: editingBlog.slug || editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      excerpt: editingBlog.excerpt || editingBlog.title,
      content: editingBlog.content,
      coverImage: editingBlog.coverImage || PRESET_CRAFT_IMAGES[0].url,
      author: editingBlog.author || "Anu Arts Team",
      publishedAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      tags: editingBlog.tags || ["Crafting", "Tutorial"],
    }

    saveBlog(blogToSave)
    setBlogs(getBlogs())
    setIsBlogModalOpen(false)
    setEditingBlog(null)
  }

  // Delete Blog
  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteBlog(id)
      setBlogs(getBlogs())
    }
  }

  // Save WhatsApp Phone
  const handleSaveWhatsappPhone = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("anu_arts_whatsapp_phone", whatsappNumber)
    setWhatsappSuccessMsg("WhatsApp phone number updated successfully!")
    setTimeout(() => setWhatsappSuccessMsg(""), 3000)
  }

  // Add Reel
  const handleAddReel = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReelTitle) return
    const newR = {
      id: "reel-" + Date.now(),
      title: newReelTitle,
      views: "10K",
      thumbnail: newReelThumbnail || PRESET_CRAFT_IMAGES[2].url,
      url: "https://instagram.com",
    }
    setReels([...reels, newR])
    setNewReelTitle("")
    setNewReelThumbnail("")
  }

  // Add Testimonial
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAuthor || !newContent) return
    setTestimonials([...testimonials, { id: Date.now().toString(), author: newAuthor, content: newContent, rating: 5 }])
    setNewAuthor("")
    setNewContent("")
  }

  // Filtered categories
  const categoriesList = ["All", ...Array.from(new Set(products.map((p) => p.category)))]

  // Filtered products for pagination
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8 max-w-md w-full space-y-6">
            <div className="text-center space-y-3">
              <div className="flex justify-center pb-2">
                <BrandLogo size="lg" showTagline={false} />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-extrabold border border-purple-200">
                <ShieldCheck className="h-4 w-4 text-purple-600" />
                <span>Admin Management Console</span>
              </div>
              <p className="text-xs text-gray-500">Sign in to manage products, images, descriptions, blogs &amp; orders.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Admin Passcode</label>
                <input
                  type="password"
                  placeholder="Enter Passcode (e.g. admin123)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              {loginError && <p className="text-xs font-bold text-red-500">{loginError}</p>}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-extrabold py-3 rounded-lg text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Access Admin Dashboard
              </button>

              <button
                type="button"
                onClick={() => {
                  setPasscode("admin123")
                  setTimeout(() => handleLogin(), 100)
                }}
                className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer"
              >
                ⚡ 1-Click Quick Demo Admin Login
              </button>
            </form>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" variant="light" showTagline={false} />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded shadow-xs">
              ADMIN CONTROL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors"
            >
              <Eye className="h-3.5 w-3.5 text-amber-300" /> View Live Store
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-purple-100">
          {[
            { id: "products", label: `Products (${products.length})`, icon: Package },
            { id: "shopify", label: "Shopify 2000 Migration", icon: FileSpreadsheet },
            { id: "blogs", label: `Blogs (${blogs.length})`, icon: BookOpen },
            { id: "orders", label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: "whatsapp", label: "WhatsApp Setup", icon: MessageCircle },
            { id: "reels", label: "Instagram Reels", icon: Video },
            { id: "testimonials", label: "Testimonials", icon: Star },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-purple-100 shadow-xs">
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by product title or category..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-purple-500 bg-white"
                >
                  {categoriesList.slice(0, 15).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingProduct({
                    name: "",
                    price: 299,
                    originalPrice: 399,
                    category: "DIY Kits",
                    description: "Handcrafted high-quality art & craft item from Anu Arts & Craft.",
                    image: PRESET_CRAFT_IMAGES[0].url,
                    inStock: true,
                    isBestseller: false,
                  })
                  setShowImagePicker(false)
                  setIsProductModalOpen(true)
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap transition-transform hover:scale-105"
              >
                <Plus className="h-4 w-4" /> Add New Product
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-purple-50/60 text-purple-950 font-extrabold border-b border-purple-100 uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Product &amp; Image</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock &amp; Tag</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {displayedProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500 font-medium">
                          No products found matching your search.
                        </td>
                      </tr>
                    ) : (
                      displayedProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-purple-50/30 transition-colors">
                          <td className="p-3 flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="h-14 w-14 rounded-lg object-cover border border-gray-200 shrink-0 shadow-xs" />
                            <div>
                              <p className="font-bold text-gray-900 line-clamp-1 text-xs">{p.name}</p>
                              <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{p.description || "No description set"}</p>
                              <p className="text-[9px] text-gray-400 mt-0.5">ID: {p.id}</p>
                            </div>
                          </td>
                          <td className="p-3 font-semibold text-gray-700 whitespace-nowrap">{p.category}</td>
                          <td className="p-3 font-black text-purple-700 whitespace-nowrap">
                            ₹{p.price}{" "}
                            {p.originalPrice && <span className="text-gray-400 font-normal line-through text-[10px]">₹{p.originalPrice}</span>}
                          </td>
                          <td className="p-3 whitespace-nowrap space-y-1">
                            <div>
                              <button
                                onClick={() => handleToggleStock(p)}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                                  p.inStock ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                                }`}
                                title="Click to toggle stock"
                              >
                                {p.inStock ? "✓ In Stock" : "✕ Out of Stock"}
                              </button>
                            </div>
                            {p.isBestseller && (
                              <span className="inline-block bg-amber-100 text-amber-800 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                                ★ Bestseller
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right whitespace-nowrap space-x-2">
                            <button
                              onClick={() => {
                                setEditingProduct(p)
                                setShowImagePicker(false)
                                setIsProductModalOpen(true)
                              }}
                              className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1 border border-purple-200"
                              title="Edit Image, Description & Details"
                            >
                              <Edit className="h-3.5 w-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
                  <span>
                    Showing {displayedProducts.length} of {filteredProducts.length} items (Page {currentPage} of {totalPages})
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                    >
                      Prev
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SHOPIFY MIGRATION */}
        {activeTab === "shopify" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase">
                <FileSpreadsheet className="h-5 w-5" />
                <span>Shopify Product Importer (2,000+ Items)</span>
              </div>
              <p className="text-xs text-gray-600">
                Migrate all products directly from Shopify without manual entry. Upload your exported Shopify CSV or run the 1-click 2,000 Bulk Importer.
              </p>
            </div>

            {/* 1-Click Demo Importer Card */}
            <div className="p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-purple-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-extrabold text-sm text-gray-900">⚡ 1-Click Bulk Demo Importer</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Instantly populate 2,000 complete products with prices, images, categories, and inventory tags.
                </p>
              </div>
              <button
                onClick={handleLoadSampleShopify2000}
                disabled={isImporting}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider shadow-md cursor-pointer transition-transform hover:scale-105 shrink-0"
              >
                {isImporting ? "Importing 2000 Products..." : "⚡ LOAD 2,000 SHOPIFY PRODUCTS"}
              </button>
            </div>

            {/* CSV Paste / Upload */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-800 block">Or Paste Exported Shopify CSV Data:</label>
              <textarea
                rows={6}
                placeholder="Paste your Shopify CSV text here (Title, Vendor, Type, Variant Price, Image Src...)"
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-xs font-mono focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleParseCsv}
                disabled={isImporting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                Parse &amp; Import CSV
              </button>
            </div>

            {importStatus && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs font-bold text-purple-900 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                {importStatus}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BLOGS MANAGEMENT */}
        {activeTab === "blogs" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
              <h2 className="font-extrabold text-sm text-gray-900">Manage Craft Guides &amp; Blog Posts</h2>
              <button
                onClick={() => {
                  setEditingBlog({
                    title: "",
                    excerpt: "",
                    content: "",
                    coverImage: PRESET_CRAFT_IMAGES[0].url,
                    author: "Anu Arts Team",
                  })
                  setIsBlogModalOpen(true)
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase cursor-pointer shadow-sm"
              >
                + Add Blog Post
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogs.map((b) => (
                <div key={b.id} className="bg-white p-4 rounded-xl border border-gray-200 flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={b.coverImage} alt={b.title} className="h-20 w-20 rounded-lg object-cover border border-gray-200 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xs text-gray-900 line-clamp-1">{b.title}</h3>
                      <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">{b.excerpt}</p>
                      <p className="text-[10px] text-purple-600 font-bold mt-2">Published: {b.publishedAt}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingBlog(b)
                        setIsBlogModalOpen(true)
                      }}
                      className="p-1.5 text-purple-600 hover:bg-purple-50 rounded cursor-pointer"
                      title="Edit Blog"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                      title="Delete Blog"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-extrabold text-sm text-gray-900">Customer Orders</h2>
            {orders.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">No orders placed yet. Place a test order from the checkout!</p>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.id} className="border border-gray-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50">
                    <div>
                      <p className="font-bold text-xs text-gray-900">Order #{ord.orderNumber} &middot; <span className="text-purple-600 font-extrabold">₹{ord.total}</span></p>
                      <p className="text-[11px] text-gray-500">{ord.userName} ({ord.userEmail}) &middot; {ord.paymentMethod}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{ord.shippingAddress.street}, {ord.shippingAddress.city} - {ord.shippingAddress.pincode}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => {
                          updateOrderStatus(ord.id, e.target.value as any)
                          setOrders(getOrders())
                        }}
                        className="border border-gray-300 rounded text-xs p-1 bg-white font-bold cursor-pointer focus:border-purple-500"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: WHATSAPP SETUP */}
        {activeTab === "whatsapp" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 max-w-2xl">
            <h2 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-emerald-600" />
              WhatsApp Store Notifications Setup
            </h2>
            <p className="text-xs text-gray-600">
              When customers place an order, an automated pre-filled WhatsApp order notification is prepared and sent directly to your store's WhatsApp number.
            </p>

            <form onSubmit={handleSaveWhatsappPhone} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Store WhatsApp Phone Number (with Country Code):</label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+91 90000 00000"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              {whatsappSuccessMsg && <p className="text-xs font-bold text-emerald-600">{whatsappSuccessMsg}</p>}

              <button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase cursor-pointer shadow-sm">
                Save WhatsApp Number
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: INSTAGRAM REELS */}
        {activeTab === "reels" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
              <Video className="h-5 w-5 text-purple-600" />
              Instagram Reels &amp; Craft Videos
            </h2>

            <form onSubmit={handleAddReel} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Reel Title"
                value={newReelTitle}
                onChange={(e) => setNewReelTitle(e.target.value)}
                className="flex-1 border border-gray-300 rounded p-2 text-xs focus:border-purple-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Thumbnail Image URL"
                value={newReelThumbnail}
                onChange={(e) => setNewReelThumbnail(e.target.value)}
                className="flex-1 border border-gray-300 rounded p-2 text-xs focus:border-purple-500 focus:outline-none"
              />
              <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded text-xs font-bold uppercase cursor-pointer">
                Add Reel
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {reels.map((r) => (
                <div key={r.id} className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <img src={r.thumbnail} alt={r.title} className="h-36 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-bold text-xs text-gray-900">{r.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{r.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: TESTIMONIALS */}
        {activeTab === "testimonials" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-extrabold text-sm text-gray-900">Manage Testimonials</h2>

            <form onSubmit={handleAddTestimonial} className="space-y-3">
              <input
                type="text"
                placeholder="Customer Name"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-xs focus:border-purple-500 focus:outline-none"
              />
              <textarea
                placeholder="Review Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-xs focus:border-purple-500 focus:outline-none"
              />
              <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded text-xs font-bold uppercase cursor-pointer">
                Add Testimonial
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {testimonials.map((t) => (
                <div key={t.id} className="p-3 border rounded-lg bg-gray-50 text-xs">
                  <p className="font-bold text-gray-900">"{t.content}"</p>
                  <p className="text-gray-500 font-semibold mt-2">&mdash; {t.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* EDIT/CREATE PRODUCT MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 relative shadow-2xl space-y-4 my-2 sm:my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <Package className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-black text-gray-900">
                    {editingProduct.id ? "Edit Product Details & Image" : "Add New Product"}
                  </h2>
                  <p className="text-[11px] text-gray-500">Update product image, title, price, category &amp; rich description.</p>
                </div>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Product Title */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Handmade Lippan Art MDF Board Kit"
                  value={editingProduct.name || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DIY Kits, Resin, Paints"
                    value={editingProduct.category || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* PRODUCT IMAGE SECTION (UPLOADER / LINK / GALLERY) */}
              <div className="bg-purple-50/40 border border-purple-100 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-gray-900 flex items-center gap-1.5">
                    <ImageIcon className="h-4 w-4 text-purple-600" />
                    Product Image (Upload File, Paste URL, or Select Preset)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowImagePicker(!showImagePicker)}
                    className="text-[11px] font-bold text-purple-700 hover:underline cursor-pointer"
                  >
                    {showImagePicker ? "Hide Preset Gallery" : "🎨 Choose Craft Image"}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {/* Current Image Preview */}
                  <div className="relative h-20 w-20 bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                    {editingProduct.image ? (
                      <img src={editingProduct.image} alt="Product Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-300" />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    {/* File Upload Input */}
                    <div className="flex items-center gap-2">
                      <label className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer inline-flex items-center gap-1 shadow-xs">
                        <Upload className="h-3.5 w-3.5" /> Upload Photo from Computer / Phone
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => setEditingProduct({ ...editingProduct, image: url }))
                          }
                        />
                      </label>
                    </div>

                    {/* Image URL text input */}
                    <input
                      type="text"
                      placeholder="Or paste image URL (https://...)"
                      value={editingProduct.image || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full border border-gray-300 bg-white rounded-lg p-2 text-[11px] focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Preset Craft Image Picker */}
                {showImagePicker && (
                  <div className="pt-2 border-t border-purple-100">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Click any sample image below to select:
                    </p>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {PRESET_CRAFT_IMAGES.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setEditingProduct({ ...editingProduct, image: item.url })
                            setShowImagePicker(false)
                          }}
                          className={`relative rounded-lg overflow-hidden border-2 h-14 w-full cursor-pointer transition-transform hover:scale-105 ${
                            editingProduct.image === item.url ? "border-purple-600 ring-2 ring-purple-600/30" : "border-gray-200"
                          }`}
                        >
                          <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RICH DESCRIPTION EDITOR WITH PLUS (+) HELPER */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <label className="font-bold text-gray-800">
                    Product Description &amp; Highlights
                  </label>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 bg-purple-50/70 border border-purple-100 px-2 py-1 rounded">
                    <span>⚡ Quick Insert:</span>
                    <button
                      type="button"
                      onClick={() => insertIntoDescription("• Eco-friendly non-toxic material\n• Handcrafted by rural artisans\n• Smooth finish for easy painting")}
                      className="bg-white hover:bg-gray-100 px-1.5 py-0.5 rounded border border-purple-200 font-bold text-purple-700 cursor-pointer"
                    >
                      + Bullet List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertIntoDescription("Material: Premium Grade MDF | Weight: 350g | Size: 10x10 inches")}
                      className="bg-white hover:bg-gray-100 px-1.5 py-0.5 rounded border border-purple-200 font-bold text-purple-700 cursor-pointer"
                    >
                      + Specs
                    </button>
                    <button
                      type="button"
                      onClick={() => insertIntoDescription("💡 Craft Tip: Wipe clean with a dry cloth before applying acrylic paint or varnish.")}
                      className="bg-white hover:bg-gray-100 px-1.5 py-0.5 rounded border border-amber-200 font-bold text-amber-600 cursor-pointer"
                    >
                      + Craft Tip
                    </button>
                  </div>
                </div>

                <textarea
                  rows={4}
                  placeholder="Describe product materials, crafting usage, specifications..."
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-xs leading-relaxed focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* STOCK & BESTSELLER FLAGS */}
              <div className="flex items-center gap-6 pt-1 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <label className="flex items-center gap-2 font-bold text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  Product in Stock
                </label>

                <label className="flex items-center gap-2 font-bold text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isBestseller ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isBestseller: e.target.checked })}
                    className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  Mark as Bestseller
                </label>
              </div>

              {/* MODAL ACTIONS */}
              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white rounded-lg text-xs font-extrabold uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Save Product Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT/CREATE BLOG MODAL */}
      {isBlogModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 relative shadow-2xl space-y-4 my-2 sm:my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-black text-gray-900">
                    {editingBlog.id ? "Edit Blog Post" : "Create New Craft Blog Post"}
                  </h2>
                  <p className="text-[11px] text-gray-500">Publish guides, DIY tutorials, and art tips for your customers.</p>
                </div>
              </div>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Blog Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Lippan Art at Home in 5 Easy Steps"
                  value={editingBlog.title || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Short Excerpt *</label>
                <input
                  type="text"
                  required
                  placeholder="A quick summary that shows on blog preview cards..."
                  value={editingBlog.excerpt || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* BLOG COVER IMAGE */}
              <div className="bg-purple-50/40 border border-purple-100 rounded-xl p-3 space-y-2">
                <label className="font-bold text-gray-800 block">Cover Image</label>
                <div className="flex gap-3 items-center">
                  <img
                    src={editingBlog.coverImage || PRESET_CRAFT_IMAGES[0].url}
                    alt="Cover Preview"
                    className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1 space-y-1.5">
                    <label className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer inline-flex items-center gap-1 shadow-xs">
                      <Upload className="h-3.5 w-3.5" /> Upload Cover Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => setEditingBlog({ ...editingBlog, coverImage: url }))
                        }
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Or paste cover image URL..."
                      value={editingBlog.coverImage || ""}
                      onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                      className="w-full border border-gray-300 bg-white rounded-lg p-2 text-[11px] focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* RICH BLOG CONTENT EDITOR */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <label className="font-bold text-gray-800">Blog Content</label>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600 bg-purple-50/70 border border-purple-100 px-2 py-1 rounded">
                    <span>⚡ Quick Blocks:</span>
                    <button
                      type="button"
                      onClick={() => insertIntoBlogContent("Step 1: Prepare your MDF board by lightly sanding the surface.\nStep 2: Apply clay paste or Lippan cone lines.\nStep 3: Fix small mirrors into the wet clay pattern.\nStep 4: Let dry for 24 hours, then seal with varnish.")}
                      className="bg-white px-1.5 py-0.5 rounded border border-purple-200 text-purple-700 cursor-pointer hover:bg-purple-50"
                    >
                      + Step-by-Step Guide
                    </button>
                    <button
                      type="button"
                      onClick={() => insertIntoBlogContent("Materials Required:\n- Anu Arts MDF Board\n- Shilpkar Clay / Lippan Paste\n- Craft Mirrors & Glue\n- Acrylic Paints & Varnish")}
                      className="bg-white px-1.5 py-0.5 rounded border border-pink-200 text-pink-600 cursor-pointer hover:bg-pink-50"
                    >
                      + Materials List
                    </button>
                  </div>
                </div>

                <textarea
                  rows={6}
                  required
                  placeholder="Write full tutorial article content..."
                  value={editingBlog.content || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-xs leading-relaxed focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white rounded-lg text-xs font-bold uppercase cursor-pointer shadow-md"
                >
                  Save Blog Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  )
}
