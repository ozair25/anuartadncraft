/**
 * Centralized Shop Category Configuration
 * 
 * Official Main Shop Categories as defined by client.
 * IMPORTANT:
 * Do NOT invent, rename, merge, delete, or reorganize these main categories.
 * These are the official top-level categories and must be used exactly as written.
 * 
 * SHOP HIERARCHY:
 * Shop
 *  → Main Category (16 official categories)
 *    → Subcategory (Reserved architecture for future client-provided subcategories)
 *      → Product
 */

export interface ShopSubcategoryConfig {
  id: string
  name: string
  slug: string
  description?: string
}

export type CategoryType = "material" | "merchandising" | "seasonal"

export interface ShopCategoryConfig {
  id: string
  name: string
  label: string // Alias for backward compatibility
  slug: string
  description: string
  type: CategoryType
  keywords: string[]
  /**
   * Future Subcategory Support:
   * Architecture is in place so subcategories can be populated later
   * without rebuilding the Shop navigation or schema.
   */
  subcategories: ShopSubcategoryConfig[]
}

/**
 * 16 Official Main Categories - Exact client naming and order
 */
export const MAIN_SHOP_CATEGORIES: readonly string[] = [
  "New Arrivals",
  "Accessories",
  "Brushes & Tools",
  "Decoupage Material",
  "Papers & Cardstocks",
  "Stencils & Templates",
  "Scrapbooking & Journaling Supplies",
  "Flower Making",
  "Paints & Mediums",
  "MDF & Acrylic Bases",
  "Resin Art Essentials",
  "DIY Kits",
  "Candle Making Supplies",
  "Lippan Art Essentials",
  "Value Packs",
  "Festive Collection",
] as const

export type MainShopCategoryName = (typeof MAIN_SHOP_CATEGORIES)[number]

/**
 * Official Centralized Category Definitions with metadata and subcategory support
 */
export const SHOP_CATEGORIES: ShopCategoryConfig[] = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
    label: "New Arrivals",
    slug: "new-arrivals",
    description: "Discover the newest additions to our art, craft, and DIY studio catalog.",
    type: "merchandising",
    keywords: ["new", "latest", "arrival", "fresh", "recent"],
    subcategories: [], // Ready for future client-provided subcategories
  },
  {
    id: "accessories",
    name: "Accessories",
    label: "Accessories",
    slug: "accessories",
    description: "Essential crafting accessories, findings, embellishments, and craft hardware.",
    type: "material",
    keywords: ["accessory", "accessories", "finding", "hardware", "hook", "embellishment"],
    subcategories: [],
  },
  {
    id: "brushes-tools",
    name: "Brushes & Tools",
    label: "Brushes & Tools",
    slug: "brushes-tools",
    description: "Professional artist brushes, palette knives, pottery tools, and craft applicators.",
    type: "material",
    keywords: ["brush", "brushes", "tool", "tools", "palette knife", "spatula", "pen", "calligraphy"],
    subcategories: [],
  },
  {
    id: "decoupage-material",
    name: "Decoupage Material",
    label: "Decoupage Material",
    slug: "decoupage-material",
    description: "Decoupage napkins, specialty glues, mod podge, varnishes, and transfer mediums.",
    type: "material",
    keywords: ["decoupage", "mod podge", "tissue paper", "napkin", "transfer medium"],
    subcategories: [],
  },
  {
    id: "papers-cardstocks",
    name: "Papers & Cardstocks",
    label: "Papers & Cardstocks",
    slug: "papers-cardstocks",
    description: "Premium gilding foils, textured cardstocks, handmade sheets, and specialty papers.",
    type: "material",
    keywords: ["paper", "cardstock", "foil pack", "foil sheet", "gilding", "handmade paper", "sheet"],
    subcategories: [],
  },
  {
    id: "stencils-templates",
    name: "Stencils & Templates",
    label: "Stencils & Templates",
    slug: "stencils-templates",
    description: "Reusable laser-cut stencils, mandala designs, borders, and pattern templates.",
    type: "material",
    keywords: ["stencil", "stencils", "template", "templates", "mandala stencil", "jali", "border stencil"],
    subcategories: [],
  },
  {
    id: "scrapbooking-journaling-supplies",
    name: "Scrapbooking & Journaling Supplies",
    label: "Scrapbooking & Journaling Supplies",
    slug: "scrapbooking-journaling-supplies",
    description: "Art journals, washi tapes, vintage stamps, ephemera, and creative journaling tools.",
    type: "material",
    keywords: ["scrapbooking", "scrapbook", "journal", "journaling", "washi", "stickers", "ephemera"],
    subcategories: [],
  },
  {
    id: "flower-making",
    name: "Flower Making",
    label: "Flower Making",
    slug: "flower-making",
    description: "Materials, floral wire, pollen, duplex papers, and tools for handcrafted flowers.",
    type: "material",
    keywords: ["flower", "flower making", "floral", "pollen", "duplex", "petal"],
    subcategories: [],
  },
  {
    id: "paints-mediums",
    name: "Paints & Mediums",
    label: "Paints & Mediums",
    slug: "paints-mediums",
    description: "Artisanal chalk paints, acrylics, watercolours, gesso, and texturing mediums.",
    type: "material",
    keywords: ["paint", "paints", "chalk paint", "acrylic", "watercolor", "watercolour", "medium", "gesso", "varnish"],
    subcategories: [],
  },
  {
    id: "mdf-acrylic-bases",
    name: "MDF & Acrylic Bases",
    label: "MDF & Acrylic Bases",
    slug: "mdf-acrylic-bases",
    description: "Precision-cut MDF cutouts, plaques, mandir backdrops, and clear acrylic bases.",
    type: "material",
    keywords: ["mdf", "mdf base", "acrylic base", "cutout", "plaque", "wooden base", "board"],
    subcategories: [],
  },
  {
    id: "resin-art-essentials",
    name: "Resin Art Essentials",
    label: "Resin Art Essentials",
    slug: "resin-art-essentials",
    description: "Crystal-clear epoxy resins, hardeners, silicone molds, mica pigments, and cups.",
    type: "material",
    keywords: ["resin", "epoxy", "hardener", "silicone mold", "mica pigment", "resin art"],
    subcategories: [],
  },
  {
    id: "diy-kits",
    name: "DIY Kits",
    label: "DIY Kits",
    slug: "diy-kits",
    description: "Complete all-in-one craft kits with materials, pre-marked bases, and step-by-step guidance.",
    type: "material",
    keywords: ["diy kit", "diy kits", "diy", "activity kit", "decor kit", "dangler", "clock kit", "tote bag kit"],
    subcategories: [],
  },
  {
    id: "candle-making-supplies",
    name: "Candle Making Supplies",
    label: "Candle Making Supplies",
    slug: "candle-making-supplies",
    description: "Soy wax, paraffin flakes, candle wicks, dye chips, and artisanal fragrances.",
    type: "material",
    keywords: ["candle", "candle making", "wax", "soy wax", "wick", "candle fragrance"],
    subcategories: [],
  },
  {
    id: "lippan-art-essentials",
    name: "Lippan Art Essentials",
    label: "Lippan Art Essentials",
    slug: "lippan-art-essentials",
    description: "Authentic mud and mirror craft materials, Lippan clay cones, mirrors, and boards.",
    type: "material",
    keywords: ["lippan", "lippan art", "mud mirror", "mirror craft", "mudra clay", "lippan kit"],
    subcategories: [],
  },
  {
    id: "value-packs",
    name: "Value Packs",
    label: "Value Packs",
    slug: "value-packs",
    description: "Economical bundles, combo sets, and bulk craft supply assortments.",
    type: "merchandising",
    keywords: ["value pack", "value packs", "combo", "bundle", "pack of", "set of"],
    subcategories: [],
  },
  {
    id: "festive-collection",
    name: "Festive Collection",
    label: "Festive Collection",
    slug: "festive-collection",
    description: "Celebration craft supplies, Diwali, Rakhi, and seasonal celebration decor materials.",
    type: "seasonal",
    keywords: ["festive", "festive collection", "diwali", "rakhi", "navratri", "christmas", "celebration"],
    subcategories: [],
  },
]

/**
 * Legacy slug alias mapping to preserve existing bookmarks and routes
 */
const LEGACY_SLUG_MAP: Record<string, string> = {
  paints: "paints-mediums",
  stencils: "stencils-templates",
  resin: "resin-art-essentials",
  "art-supplies": "brushes-tools",
  mdf: "mdf-acrylic-bases",
  "chalk-paints-50-ml": "paints-mediums",
  "chalk-paint-100-ml": "paints-mediums",
  "12-inch-stencil-collection": "stencils-templates",
  "a4-size-stencil-collection": "stencils-templates",
  "a4-size-stencil-collection-1": "stencils-templates",
}

/**
 * Look up a category by its slug (or legacy slug alias)
 */
export function getCategoryBySlug(slug: string): ShopCategoryConfig | undefined {
  if (!slug) return undefined
  const normalized = slug.toLowerCase().trim()
  const targetSlug = LEGACY_SLUG_MAP[normalized] || normalized

  return SHOP_CATEGORIES.find(
    (c) => c.slug.toLowerCase() === targetSlug || c.id === targetSlug
  )
}

/**
 * Look up a category by its official name
 */
export function getCategoryByName(name: string): ShopCategoryConfig | undefined {
  if (!name) return undefined
  const normalized = name.toLowerCase().trim()

  return SHOP_CATEGORIES.find(
    (c) => c.name.toLowerCase() === normalized || c.label.toLowerCase() === normalized
  )
}

/**
 * Intelligent product-to-main-category mapper based on the client's explicit classification logic.
 * If a product cannot confidently be assigned, returns null (temporary/unassigned state).
 */
export function mapProductToMainCategory(product: {
  name?: string
  description?: string
  category?: string
  collection?: string
  tags?: string[]
  isNewArrival?: boolean
}): ShopCategoryConfig | null {
  const rawCat = (product.category || "").trim()
  const name = (product.name || "").toLowerCase()
  const desc = (product.description || "").toLowerCase()
  const coll = (product.collection || "").toLowerCase()
  const tags = (product.tags || []).map((t) => t.toLowerCase())

  // Direct match to official category name
  const directMatch = SHOP_CATEGORIES.find(
    (c) => c.name.toLowerCase() === rawCat.toLowerCase()
  )
  if (directMatch) return directMatch

  // 1. Merchandising: Value Packs (Bundled / combo products)
  if (
    name.includes("combo") ||
    name.includes("value pack") ||
    name.includes("bundle") ||
    rawCat.toLowerCase().includes("combo")
  ) {
    return getCategoryByName("Value Packs")!
  }

  // 2. Seasonal: Festive Collection (diwali, rakhi, seasonal products)
  if (
    tags.includes("festive") ||
    name.includes("diwali") ||
    name.includes("rakhi") ||
    name.includes("festive collection")
  ) {
    return getCategoryByName("Festive Collection")!
  }

  // 3. Stencils & Templates
  if (
    rawCat.toLowerCase().includes("stencil") ||
    coll.includes("stencil") ||
    name.includes("stencil") ||
    name.includes("template") ||
    name.includes("jali background") ||
    name.includes("mandala stencil") ||
    name.includes("border stencil")
  ) {
    return getCategoryByName("Stencils & Templates")!
  }

  // 4. Lippan Art Essentials
  if (
    name.includes("lippan") ||
    rawCat.toLowerCase().includes("lippan") ||
    tags.includes("lippan")
  ) {
    return getCategoryByName("Lippan Art Essentials")!
  }

  // 5. DIY Kits (Ready-made DIY projects/kits)
  if (
    rawCat.toLowerCase().includes("diy kit") ||
    coll.includes("diy-kit") ||
    name.includes("diy kit") ||
    name.includes("dangler") ||
    name.includes("activity kit") ||
    name.includes("decor kit") ||
    name.includes("clock kit") ||
    name.includes("tote bag")
  ) {
    return getCategoryByName("DIY Kits")!
  }

  // 6. Paints & Mediums
  if (
    rawCat.toLowerCase().includes("chalk paint") ||
    rawCat.toLowerCase() === "paint" ||
    coll.includes("paint") ||
    name.includes("paint") ||
    desc.includes("chalk paint") ||
    desc.includes("acrylic paint") ||
    desc.includes("watercolor") ||
    desc.includes("watercolour") ||
    name.includes("medium") ||
    name.includes("gesso") ||
    name.includes("varnish") ||
    tags.includes("paint")
  ) {
    return getCategoryByName("Paints & Mediums")!
  }

  // 7. Papers & Cardstocks
  if (
    name.includes("foil pack") ||
    name.includes("foil sheet") ||
    name.includes("cardstock") ||
    name.includes("handmade paper") ||
    name.includes("gilding") ||
    name.includes("canvas board")
  ) {
    return getCategoryByName("Papers & Cardstocks")!
  }

  // 8. Resin Art Essentials
  if (
    name.includes("resin") ||
    rawCat.toLowerCase().includes("resin") ||
    desc.includes("epoxy resin")
  ) {
    return getCategoryByName("Resin Art Essentials")!
  }

  // 9. MDF & Acrylic Bases
  if (
    name.includes("mdf") ||
    rawCat.toLowerCase().includes("mdf") ||
    name.includes("acrylic base") ||
    name.includes("cutout")
  ) {
    return getCategoryByName("MDF & Acrylic Bases")!
  }

  // 10. Brushes & Tools
  if (
    name.includes("brush") ||
    name.includes("palette knife") ||
    name.includes("calligraphy pen") ||
    name.includes("spatula") ||
    name.includes("tool")
  ) {
    return getCategoryByName("Brushes & Tools")!
  }

  // 11. Decoupage Material
  if (
    name.includes("decoupage") ||
    rawCat.toLowerCase().includes("decoupage") ||
    name.includes("mod podge") ||
    name.includes("napkin")
  ) {
    return getCategoryByName("Decoupage Material")!
  }

  // 12. Candle Making Supplies
  if (name.includes("candle") || name.includes("wax") || name.includes("wick")) {
    return getCategoryByName("Candle Making Supplies")!
  }

  // 13. Flower Making
  if (name.includes("flower making") || name.includes("floral wire") || name.includes("pollen")) {
    return getCategoryByName("Flower Making")!
  }

  // 14. Scrapbooking & Journaling Supplies
  if (
    name.includes("scrapbook") ||
    name.includes("journaling") ||
    name.includes("washi") ||
    name.includes("ephemera")
  ) {
    return getCategoryByName("Scrapbooking & Journaling Supplies")!
  }

  // 15. Accessories
  if (name.includes("accessory") || name.includes("accessories")) {
    return getCategoryByName("Accessories")!
  }

  // Cannot be confidently assigned: return null for unassigned state
  return null
}
