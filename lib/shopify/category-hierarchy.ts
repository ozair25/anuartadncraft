import { Collection, Product } from "@/types/ecommerce"

export interface DynamicShopSubcategory {
  id: string
  name: string
  slug: string
  handle: string
  description?: string
  image?: string
  productCount: number
}

export interface DynamicShopCategory {
  id: string
  name: string
  slug: string
  handle: string
  description: string
  image?: string
  type: "material" | "merchandising" | "seasonal"
  isShopifyCollection: boolean
  shopifyCollectionId?: string
  subcategories: DynamicShopSubcategory[]
  productCount: number
}

/**
 * 16 Main Shop Categories finalized by the client.
 * These serve as the top-level parent categories in the CMS architecture.
 */
export const OFFICIAL_MAIN_CATEGORIES: ReadonlyArray<{
  name: string
  slug: string
  description: string
  type: "material" | "merchandising" | "seasonal"
}> = [
  {
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Discover the newest additions to our art, craft, and DIY studio catalog.",
    type: "merchandising",
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Essential crafting accessories, findings, embellishments, and craft hardware.",
    type: "material",
  },
  {
    name: "Brushes & Tools",
    slug: "brushes-tools",
    description: "Professional artist brushes, palette knives, pottery tools, and craft applicators.",
    type: "material",
  },
  {
    name: "Decoupage Material",
    slug: "decoupage-material",
    description: "Decoupage napkins, specialty glues, mod podge, varnishes, and transfer mediums.",
    type: "material",
  },
  {
    name: "Papers & Cardstocks",
    slug: "papers-cardstocks",
    description: "Premium gilding foils, textured cardstocks, handmade sheets, and specialty papers.",
    type: "material",
  },
  {
    name: "Stencils & Templates",
    slug: "stencils-templates",
    description: "Reusable laser-cut stencils, mandala designs, borders, and pattern templates.",
    type: "material",
  },
  {
    name: "Scrapbooking & Journaling Supplies",
    slug: "scrapbooking-journaling-supplies",
    description: "Art journals, washi tapes, vintage stamps, ephemera, and creative journaling tools.",
    type: "material",
  },
  {
    name: "Flower Making",
    slug: "flower-making",
    description: "Materials, floral wire, pollen, duplex papers, and tools for handcrafted flowers.",
    type: "material",
  },
  {
    name: "Paints & Mediums",
    slug: "paints-mediums",
    description: "Artisanal chalk paints, acrylics, watercolours, gesso, and texturing mediums.",
    type: "material",
  },
  {
    name: "MDF & Acrylic Bases",
    slug: "mdf-acrylic-bases",
    description: "Precision-cut MDF cutouts, plaques, mandir backdrops, and clear acrylic bases.",
    type: "material",
  },
  {
    name: "Resin Art Essentials",
    slug: "resin-art-essentials",
    description: "Crystal-clear epoxy resins, hardeners, silicone molds, mica pigments, and cups.",
    type: "material",
  },
  {
    name: "DIY Kits",
    slug: "diy-kits",
    description: "Complete all-in-one craft kits with materials, pre-marked bases, and step-by-step guidance.",
    type: "material",
  },
  {
    name: "Candle Making Supplies",
    slug: "candle-making-supplies",
    description: "Soy wax, paraffin flakes, candle wicks, dye chips, and artisanal fragrances.",
    type: "material",
  },
  {
    name: "Lippan Art Essentials",
    slug: "lippan-art-essentials",
    description: "Authentic mud and mirror craft materials, Lippan clay cones, mirrors, and boards.",
    type: "material",
  },
  {
    name: "Value Packs",
    slug: "value-packs",
    description: "Economical bundles, combo sets, and bulk craft supply assortments.",
    type: "merchandising",
  },
  {
    name: "Festive Collection",
    slug: "festive-collection",
    description: "Celebration craft supplies, Diwali, Rakhi, and seasonal celebration decor materials.",
    type: "seasonal",
  },
]

/**
 * Handle aliases to ensure backward compatibility and clean matching
 */
const SLUG_ALIASES: Record<string, string> = {
  paints: "paints-mediums",
  stencils: "stencils-templates",
  resin: "resin-art-essentials",
  "art-supplies": "brushes-tools",
  mdf: "mdf-acrylic-bases",
  "craft-accessories": "accessories",
  "festive-diy": "festive-collection",
}

/**
 * Maps known Shopify collections to their parent main category
 */
const SHOPIFY_SUBCOLLECTION_PARENT_MAP: Record<string, string> = {
  // DIY Kits Subcollections in Shopify
  "mandala-art-kits": "diy-kits",
  "clock-diy-kits": "diy-kits",
  "dangler-diy-kits": "diy-kits",
  "tote-bag-diy": "diy-kits",
  "magnet-diy": "diy-kits",
  "canvas-pouch-diy": "diy-kits",
  "canvas-wallet-clutch-diy": "diy-kits",
  "felt-art-kit": "diy-kits",
  "yarn-art-kits": "diy-kits",
  "mini-diy-kits": "diy-kits",
  "pen-stand-diy-kits": "diy-kits",
  "pre-mark-canvas-painting-kits": "diy-kits",

  // Stencils & Templates Subcollections in Shopify
  "12-inch-stencil-collection": "stencils-templates",
  "a4-size-stencil-collection": "stencils-templates",
  "a4-size-stencil-collection-1": "stencils-templates",
  "border-stencils": "stencils-templates",
  "filgree-stencils": "stencils-templates",
  "4x4-inch-stencils": "stencils-templates",
  "reverse-stencil": "stencils-templates",

  // Paints & Mediums Subcollections in Shopify
  "chalk-paints-50-ml": "paints-mediums",
  "chalk-paint-100-ml": "paints-mediums",
  "chalk-paint-250-ml": "paints-mediums",
  "art-and-craft-mediums": "paints-mediums",
  "alcohol-inks": "paints-mediums",

  // Resin Art Essentials Subcollections in Shopify
  "resin-essentials": "resin-art-essentials",
  "resin-art-moulds": "resin-art-essentials",
  "resin-embellishments": "resin-art-essentials",
  "resin-insert-sheet": "resin-art-essentials",

  // Lippan Art Essentials Subcollections in Shopify
  "lippan-art-kits": "lippan-art-essentials",
  "mirrors": "lippan-art-essentials",

  // MDF & Acrylic Bases Subcollections in Shopify
  "mdf-tiles": "mdf-acrylic-bases",
  "3-inch-mdf-tiles": "mdf-acrylic-bases",
  "mdf-wall-decors": "mdf-acrylic-bases",
  "fridge-magnet-bases": "mdf-acrylic-bases",
  "tea-coasters": "mdf-acrylic-bases",
  "platters": "mdf-acrylic-bases",
  "acrylic-cutouts": "mdf-acrylic-bases",
  "trays-and-organisers": "mdf-acrylic-bases",
  "keyholders": "mdf-acrylic-bases",
  "door-hangers": "mdf-acrylic-bases",

  // Candle Making Supplies Subcollections in Shopify
  "candle-making": "candle-making-supplies",
  "candle-holder": "candle-making-supplies",

  // Flower Making Subcollections in Shopify
  "decorative-flowers-and-patches": "flower-making",
  "pipe-cleaner": "flower-making",

  // Decoupage Material Subcollections in Shopify
  "decoupage-papers": "decoupage-material",

  // Papers & Cardstocks Subcollections in Shopify
  "mini-transfer-sheets": "papers-cardstocks",
  "transfer-sheets": "papers-cardstocks",
  "mini-transfer-sheet": "papers-cardstocks",
  "a4-size-transfer-sheet": "papers-cardstocks",
  "pattern-papers": "papers-cardstocks",
  "element-sheet": "papers-cardstocks",
  "colouring-pads-books": "papers-cardstocks",
  "envelopes": "papers-cardstocks",
  "dtf-stickers": "papers-cardstocks",

  // Scrapbooking & Journaling Supplies Subcollections in Shopify
  "scrapbook-templates": "scrapbooking-journaling-supplies",
  "stamps": "scrapbooking-journaling-supplies",
  "sentiments": "scrapbooking-journaling-supplies",

  // Festive Collection Subcollections in Shopify
  "christmas-diy-collection": "festive-collection",
  "shubh-labh": "festive-collection",
  "lighting-banners": "festive-collection",
  "hangings": "festive-collection",

  // Accessories Subcollections in Shopify
  "mdf-embelishments": "accessories",
  "mini-wooden-elements": "accessories",
  "shells": "accessories",
  "glitters": "accessories",
  "3d-wooden-embellishment": "accessories",
  "add-on-elements": "accessories",
  "alphabets": "accessories",
}

/**
 * Dynamically builds the complete Shop Category & Subcategory Hierarchy
 * driven directly by Shopify Collections and real-time catalog data.
 */
export function buildShopifyCategoryHierarchy(
  shopifyCollections: Collection[] = [],
  products: Product[] = []
): DynamicShopCategory[] {
  // 1. Initialize with the 16 Official Main Categories as base parent collections
  const categoryMap = new Map<string, DynamicShopCategory>()

  OFFICIAL_MAIN_CATEGORIES.forEach((base) => {
    categoryMap.set(base.slug, {
      id: base.slug,
      name: base.name,
      slug: base.slug,
      handle: base.slug,
      description: base.description,
      type: base.type,
      isShopifyCollection: false,
      subcategories: [],
      productCount: 0,
    })
  })

  // 2. Process all incoming Shopify Collections (the single CMS source of truth)
  shopifyCollections.forEach((col) => {
    // Ignore internal homepage/frontpage collections
    if (col.slug === "frontpage" || col.title.toLowerCase() === "home page") {
      return
    }

    const colSlug = col.slug.toLowerCase()
    const colTitle = col.title.trim()

    // A. Check for explicit delimited subcategory naming in Shopify Admin
    // (e.g. "DIY Kits > Clock Kits" or "Paints & Mediums / Chalk Paints")
    const delimiterMatch = colTitle.match(/^([^>\/:]+)\s*[>\/:]\s*(.+)$/)
    if (delimiterMatch) {
      const parentNameCandidate = delimiterMatch[1].trim()
      const subName = delimiterMatch[2].trim()

      // Find or create parent
      let parentCategory = Array.from(categoryMap.values()).find(
        (c) =>
          c.name.toLowerCase() === parentNameCandidate.toLowerCase() ||
          c.slug === parentNameCandidate.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      )

      if (!parentCategory) {
        const parentSlug = parentNameCandidate.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        parentCategory = {
          id: parentSlug,
          name: parentNameCandidate,
          slug: parentSlug,
          handle: parentSlug,
          description: `Curated collection of ${parentNameCandidate}.`,
          type: "material",
          isShopifyCollection: false,
          subcategories: [],
          productCount: 0,
        }
        categoryMap.set(parentSlug, parentCategory)
      }

      // Add subcategory under parent
      const subSlug = colSlug
      if (!parentCategory.subcategories.some((s) => s.slug === subSlug)) {
        parentCategory.subcategories.push({
          id: col.id,
          name: subName,
          slug: subSlug,
          handle: col.slug,
          description: col.description,
          image: col.image,
          productCount: 0,
        })
      }
      return
    }

    // B. Check if collection matches an existing main category directly
    const directMatch = Array.from(categoryMap.values()).find(
      (c) =>
        c.slug === colSlug ||
        c.name.toLowerCase() === colTitle.toLowerCase() ||
        SLUG_ALIASES[colSlug] === c.slug
    )

    if (directMatch) {
      directMatch.isShopifyCollection = true
      directMatch.shopifyCollectionId = col.id
      directMatch.handle = col.slug
      if (col.description && col.description.length > 10) {
        directMatch.description = col.description
      }
      if (col.image) {
        directMatch.image = col.image
      }
      return
    }

    // C. Check if collection is a child collection belonging to a main parent
    const parentSlug = SHOPIFY_SUBCOLLECTION_PARENT_MAP[colSlug]
    if (parentSlug && categoryMap.has(parentSlug)) {
      const parent = categoryMap.get(parentSlug)!
      if (!parent.subcategories.some((s) => s.slug === colSlug)) {
        parent.subcategories.push({
          id: col.id,
          name: colTitle,
          slug: colSlug,
          handle: col.slug,
          description: col.description,
          image: col.image,
          productCount: 0,
        })
      }
      return
    }

    // D. Newly created collection in Shopify Admin that doesn't belong to any existing parent
    // Automatically add as a new CMS-driven top-level main category!
    const newMainSlug = colSlug
    if (!categoryMap.has(newMainSlug)) {
      categoryMap.set(newMainSlug, {
        id: col.id,
        name: colTitle,
        slug: newMainSlug,
        handle: col.slug,
        description: col.description || `Browse our collection of ${colTitle}.`,
        image: col.image,
        type: "material",
        isShopifyCollection: true,
        shopifyCollectionId: col.id,
        subcategories: [],
        productCount: 0,
      })
    }
  })

  // 3. Dynamically compute product counts from real live products
  const resultCategories = Array.from(categoryMap.values())

  resultCategories.forEach((cat) => {
    // Count for subcategories
    cat.subcategories.forEach((sub) => {
      sub.productCount = products.filter((p) => {
        return (
          p.collections?.some(
            (c) =>
              c.handle === sub.handle ||
              c.id === sub.id ||
              c.title.toLowerCase() === sub.name.toLowerCase()
          ) ||
          p.collection === sub.handle ||
          (p.subcategory && p.subcategory.toLowerCase() === sub.name.toLowerCase())
        )
      }).length
    })

    // Count for main category
    if (cat.slug === "new-arrivals") {
      const newItems = products.filter(
        (p) =>
          p.isNewArrival ||
          p.category === "New Arrivals" ||
          p.collections?.some((c) => c.handle === "new-arrivals") ||
          (p.tags || []).some(
            (t) => t.toLowerCase() === "new" || t.toLowerCase() === "latest"
          )
      )
      cat.productCount = newItems.length > 0 ? newItems.length : Math.min(12, products.length)
    } else {
      cat.productCount = products.filter((p) =>
        isProductInCategory(p, cat)
      ).length
    }
  })

  return resultCategories
}

/**
 * Checks whether a product belongs to a given category
 * (via Shopify collections, subcollections, or category matching)
 */
export function isProductInCategory(
  product: Product,
  category: DynamicShopCategory
): boolean {
  // 1. Direct Shopify collection match
  if (
    product.collections?.some(
      (c) =>
        c.handle === category.handle ||
        c.handle === category.slug ||
        c.id === category.shopifyCollectionId ||
        c.title.toLowerCase() === category.name.toLowerCase()
    ) ||
    product.collection === category.handle ||
    product.collection === category.slug
  ) {
    return true
  }

  // 2. Child / subcategory Shopify collection match
  if (
    category.subcategories.some((sub) =>
      product.collections?.some(
        (c) =>
          c.handle === sub.handle ||
          c.id === sub.id ||
          c.title.toLowerCase() === sub.name.toLowerCase()
      ) ||
      product.collection === sub.handle
    )
  ) {
    return true
  }

  // 3. Fallback to product category name
  const pCat = (product.category || "").toLowerCase()
  const catName = category.name.toLowerCase()
  const catSlug = category.slug

  if (pCat === catName) return true
  const pSlug = pCat.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  if (pSlug === catSlug || SLUG_ALIASES[pSlug] === catSlug) return true

  return false
}

/**
 * Filter products by category and optional subcategory
 */
export function filterProductsByDynamicCategory(
  products: Product[],
  categorySlug: string,
  subcategorySlug?: string | null,
  categoriesHierarchy: DynamicShopCategory[] = []
): Product[] {
  if (!categorySlug || categorySlug === "all") {
    return products
  }

  const category = categoriesHierarchy.find(
    (c) => c.slug === categorySlug || SLUG_ALIASES[categorySlug] === c.slug
  )

  if (!category) {
    // If not found in hierarchy, fallback to collection or category match
    return products.filter((p) => {
      const pCat = (p.category || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")
      const pCol = (p.collection || "").toLowerCase()
      return (
        pCat === categorySlug ||
        pCol === categorySlug ||
        p.collections?.some((c) => c.handle === categorySlug)
      )
    })
  }

  // If a subcategory is selected, filter strictly by that subcategory
  if (subcategorySlug) {
    const sub = category.subcategories.find((s) => s.slug === subcategorySlug)
    if (sub) {
      return products.filter(
        (p) =>
          p.collections?.some(
            (c) =>
              c.handle === sub.handle ||
              c.id === sub.id ||
              c.title.toLowerCase() === sub.name.toLowerCase()
          ) ||
          p.collection === sub.handle ||
          (p.subcategory && p.subcategory.toLowerCase() === sub.name.toLowerCase())
      )
    }
  }

  // Merchandising: New Arrivals
  if (category.slug === "new-arrivals") {
    const news = products.filter(
      (p) =>
        p.isNewArrival ||
        p.category === "New Arrivals" ||
        p.collections?.some((c) => c.handle === "new-arrivals") ||
        (p.tags || []).some(
          (t) => t.toLowerCase() === "new" || t.toLowerCase() === "latest"
        )
    )
    return news.length > 0 ? news : products.slice(0, 12)
  }

  // Filter products belonging to this category or any of its subcollections
  return products.filter((p) => isProductInCategory(p, category))
}
