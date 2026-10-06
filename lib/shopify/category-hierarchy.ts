import { Collection, Product } from "@/types/ecommerce"
import {
  SHOP_CATEGORIES,
  ShopSubcategoryConfig,
  mapProductToMainCategory,
} from "@/lib/config/shop-categories"

export interface DynamicShopSubcategory {
  id: string
  name: string
  slug: string
  handle: string
  description?: string
  image?: string
  productCount: number
  keywords?: string[]
  children?: DynamicShopSubcategory[]
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
 * Dynamically builds the complete Shop Category & Subcategory Hierarchy
 * driven by the client's official structure and live Shopify Collections.
 * Always maintains strictly the 16 Official Main Categories as top-level categories.
 */
export function buildShopifyCategoryHierarchy(
  shopifyCollections: Collection[] = [],
  products: Product[] = []
): DynamicShopCategory[] {
  // 1. Initialize strictly with the 16 Official Main Categories and their subcategories
  const categories: DynamicShopCategory[] = SHOP_CATEGORIES.map((base) => ({
    id: base.id,
    name: base.name,
    slug: base.slug,
    handle: base.slug,
    description: base.description,
    type: base.type,
    isShopifyCollection: false,
    subcategories: (base.subcategories || []).map((sub) => ({
      id: sub.id,
      name: sub.name,
      slug: sub.slug,
      handle: sub.slug,
      description: sub.description,
      keywords: sub.keywords,
      productCount: 0,
      children: (sub.children || []).map((child) => ({
        id: child.id,
        name: child.name,
        slug: child.slug,
        handle: child.slug,
        description: child.description,
        keywords: child.keywords,
        productCount: 0,
      })),
    })),
    productCount: 0,
  }))

  const categoryMap = new Map<string, DynamicShopCategory>()
  categories.forEach((c) => categoryMap.set(c.slug, c))

  // 2. Connect incoming Shopify Collections (the CMS source of truth)
  shopifyCollections.forEach((col) => {
    if (col.slug === "frontpage" || col.title.toLowerCase() === "home page") {
      return
    }

    const colSlug = col.slug.toLowerCase()
    const colTitle = col.title.trim()

    // A. Check if collection matches an existing main category directly
    const directMatch = categories.find(
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

    // B. Check for explicit delimited subcategory naming in Shopify Admin
    // (e.g. "DIY Kits > Clock Kits" or "Paints & Mediums / Chalk Paints")
    const delimiterMatch = colTitle.match(/^([^>\/:]+)\s*[>\/:]\s*(.+)$/)
    if (delimiterMatch) {
      const parentNameCandidate = delimiterMatch[1].trim()
      const subName = delimiterMatch[2].trim()

      const parentCategory = categories.find(
        (c) =>
          c.name.toLowerCase() === parentNameCandidate.toLowerCase() ||
          c.slug === parentNameCandidate.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      )

      if (parentCategory) {
        const subSlug = colSlug
        const existingSub = parentCategory.subcategories.find(
          (s) => s.slug === subSlug || s.name.toLowerCase() === subName.toLowerCase()
        )
        if (!existingSub) {
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
    }

    // C. Connect collection to existing subcategory or child subcategory if handles or names match
    for (const cat of categories) {
      for (const sub of cat.subcategories) {
        if (
          sub.slug === colSlug ||
          sub.name.toLowerCase() === colTitle.toLowerCase() ||
          (sub.keywords && sub.keywords.includes(colSlug))
        ) {
          sub.id = col.id
          sub.handle = col.slug
          if (col.description) sub.description = col.description
          if (col.image) sub.image = col.image
          return
        }
        if (sub.children) {
          for (const ch of sub.children) {
            if (
              ch.slug === colSlug ||
              ch.name.toLowerCase() === colTitle.toLowerCase() ||
              (ch.keywords && ch.keywords.includes(colSlug))
            ) {
              ch.id = col.id
              ch.handle = col.slug
              if (col.description) ch.description = col.description
              if (col.image) ch.image = col.image
              return
            }
          }
        }
      }
    }
  })

  // 3. Dynamically compute product counts from real live products
  categories.forEach((cat) => {
    // Count for subcategories
    cat.subcategories.forEach((sub) => {
      // Count children first if any
      if (sub.children && sub.children.length > 0) {
        sub.children.forEach((child) => {
          child.productCount = products.filter((p) =>
            isProductInSubcategory(p, cat.slug, child.slug, child.keywords)
          ).length
        })
      }

      sub.productCount = products.filter((p) =>
        isProductInSubcategory(p, cat.slug, sub.slug, sub.keywords)
      ).length
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

  return categories
}

/**
 * Checks whether a product matches a given subcategory
 */
export function isProductInSubcategory(
  product: Product,
  parentCategorySlug: string,
  subcategorySlug: string,
  keywords?: string[]
): boolean {
  const name = (product.name || "").toLowerCase()
  const desc = (product.description || "").toLowerCase()
  const cat = (product.category || "").toLowerCase()
  const colHandles = (product.collections || []).map((c) => c.handle.toLowerCase())
  const subSlug = subcategorySlug.toLowerCase()

  // 1. Direct Shopify collection handle match
  if (colHandles.includes(subSlug)) {
    return true
  }

  // Verify that the product is relevant to the parent category
  const mapped = mapProductToMainCategory(product)
  if (mapped && mapped.slug !== parentCategorySlug) {
    return false
  }

  // 2. DIY Kits Subcategories
  if (parentCategorySlug === "diy-kits") {
    if (subSlug === "under-99") {
      return product.price <= 99
    }
    if (subSlug === "mandala-art") {
      return (
        !name.includes("stencil") &&
        (colHandles.includes("mandala-art-kits") ||
          (name.includes("mandala") &&
            (name.includes("kit") || desc.includes("kit") || colHandles.includes("diy-kits"))))
      )
    }
    if (subSlug === "kids-craft-kits") {
      return (
        colHandles.includes("clock-diy-kits") ||
        colHandles.includes("tote-bag-diy") ||
        colHandles.includes("canvas-pouch-diy") ||
        colHandles.includes("canvas-wallet-clutch-diy") ||
        colHandles.includes("pen-stand-diy-kits") ||
        name.includes("clock kit") ||
        name.includes("tote bag") ||
        name.includes("kids") ||
        desc.includes("twist")
      )
    }
    if (subSlug === "home-decor-kits") {
      return (
        colHandles.includes("dangler-diy-kits") ||
        colHandles.includes("door-hangers") ||
        colHandles.includes("keyholders") ||
        colHandles.includes("mdf-wall-decors") ||
        colHandles.includes("hangings") ||
        name.includes("dangler") ||
        name.includes("doodling") ||
        name.includes("home decor kit") ||
        desc.includes("dangler")
      )
    }
    if (subSlug === "return-gift-range") {
      return (
        colHandles.includes("magnet-diy") ||
        colHandles.includes("mini-diy-kits") ||
        name.includes("magnet diy") ||
        name.includes("return gift") ||
        (name.includes("mini") && name.includes("kit") && !name.includes("clock"))
      )
    }
    if (subSlug === "combo") {
      return (
        (name.includes("combo") || name.includes("6 in 1") || name.includes("bundle")) &&
        (name.includes("kit") || colHandles.includes("diy-kits"))
      )
    }
  }

  // 3. Stencils Subcategories
  if (parentCategorySlug === "stencils-templates") {
    if (subSlug === "4x4-inch") {
      return (
        colHandles.includes("4x4-inch-stencils") ||
        name.includes("4x4") ||
        name.includes("4 x 4")
      )
    }
    if (subSlug === "4x8-inch") {
      return (
        colHandles.includes("a4-size-stencil-collection") ||
        name.includes("4x8") ||
        name.includes("4 x 8") ||
        name.includes("85") ||
        name.includes("86")
      )
    }
    if (subSlug === "a4-size") {
      return (
        colHandles.includes("a4-size-stencil-collection-1") ||
        name.includes("buddha") ||
        (name.includes("a4") && !name.includes("4x8"))
      )
    }
    if (subSlug === "12x12-inch") {
      return (
        colHandles.includes("12-inch-stencil-collection") ||
        name.includes("12 inch") ||
        name.includes("12x12") ||
        name.includes("8803") ||
        name.includes("8805") ||
        name.includes("8807")
      )
    }
    if (subSlug === "12x18-inch") {
      return name.includes("12x18") || name.includes("12 x 18")
    }
    if (subSlug === "combos") {
      return (
        name.includes("4 in 1") ||
        (name.includes("combo") && name.includes("stencil")) ||
        name.includes("8801") ||
        name.includes("8802") ||
        name.includes("8804")
      )
    }
  }

  // 4. Paints and Mediums Subcategories
  if (parentCategorySlug === "paints-mediums") {
    if (subSlug === "chalk-paints") {
      return (
        colHandles.some((h) => h.includes("chalk-paint")) ||
        (name.includes("chalk paint") && !name.includes("tote")) ||
        desc.includes("chalk paint")
      )
    }
    if (subSlug === "glue-varnish") {
      return (
        colHandles.includes("art-and-craft-mediums") ||
        name.includes("glue") ||
        name.includes("varnish") ||
        name.includes("mod podge") ||
        name.includes("sealer") ||
        name.includes("gesso")
      )
    }
    if (subSlug === "acrylic-paints") {
      return (
        name.includes("acrylic") && !name.includes("chalk")
      )
    }
    if (subSlug === "combos") {
      return (
        name.includes("combo") &&
        (name.includes("paint") || colHandles.some((h) => h.includes("chalk-paint")) || name.includes("metallic combo"))
      )
    }
    if (subSlug === "markers-pens") {
      return (
        name.includes("pen") ||
        name.includes("marker") ||
        name.includes("brush pen") ||
        name.includes("calligraphy")
      )
    }
  }

  // 5. Resin Art Subcategories
  if (parentCategorySlug === "resin-art-essentials") {
    if (subSlug === "stickers-insert-sheets") {
      return (
        colHandles.includes("resin-insert-sheet") ||
        colHandles.includes("dtf-stickers") ||
        name.includes("insert sheet") ||
        name.includes("sticker")
      )
    }
    if (subSlug === "powders-pigments") {
      return (
        colHandles.includes("alcohol-inks") ||
        name.includes("pigment") ||
        name.includes("mica") ||
        name.includes("powder")
      )
    }
    if (subSlug === "sillicon-moulds") {
      return (
        colHandles.includes("resin-art-moulds") ||
        name.includes("mould") ||
        name.includes("mold")
      )
    }
    if (subSlug === "kits") {
      return (
        colHandles.includes("resin-kit") ||
        ((name.includes("resin") || desc.includes("resin")) &&
          (name.includes("kit") || desc.includes("starter kit")))
      )
    }
    if (subSlug === "decorative-materials") {
      return (
        colHandles.includes("resin-embellishments") ||
        colHandles.includes("shells") ||
        colHandles.includes("glitters") ||
        name.includes("glitter") ||
        name.includes("shell") ||
        name.includes("flake")
      )
    }
    if (subSlug === "mdf-acrylic-cuttings") {
      return (
        colHandles.includes("acrylic-cutouts") ||
        name.includes("mdf cutting") ||
        name.includes("acrylic cutting")
      )
    }
    if (subSlug === "epoxy-resin") {
      return (
        colHandles.includes("resin-essentials") ||
        name.includes("epoxy") ||
        name.includes("crystal clear") ||
        (name.includes("resin") && (name.includes("hardener") || name.includes("2:1") || name.includes("3:1")))
      )
    }
  }

  // 6. Candle Making Subcategories
  if (parentCategorySlug === "candle-making-supplies") {
    if (subSlug === "wax-gel") {
      return (
        colHandles.includes("candle-making") ||
        name.includes("wax") ||
        name.includes("gel")
      )
    }
    if (subSlug === "colours-fragrances") {
      return (
        name.includes("colour") ||
        name.includes("fragrance") ||
        name.includes("dye") ||
        name.includes("aroma")
      )
    }
    if (subSlug === "candle-moulds") {
      return name.includes("mould") || name.includes("mold")
    }
    if (subSlug === "bowls-urlis") {
      return (
        colHandles.includes("candle-holder") ||
        name.includes("bowl") ||
        name.includes("urli") ||
        name.includes("jar")
      )
    }
    if (subSlug === "wicks-tools") {
      return name.includes("wick") || name.includes("melting pot")
    }
    if (subSlug === "kits") {
      return (
        colHandles.includes("candle-kit") ||
        ((name.includes("candle") || desc.includes("candle")) && name.includes("kit"))
      )
    }
  }

  // 7. Decoupage Material Subcategories
  if (parentCategorySlug === "decoupage-material") {
    if (subSlug === "mediums") {
      return (
        colHandles.includes("art-and-craft-mediums") ||
        name.includes("medium") ||
        name.includes("decoupage glue") ||
        name.includes("mod podge")
      )
    }
    if (subSlug === "tissue-paper") {
      return (
        colHandles.includes("decoupage-papers") ||
        name.includes("decoupage paper") ||
        name.includes("tissue") ||
        name.includes("napkin")
      )
    }
    if (
      subSlug === "transfer-sheets" ||
      subSlug === "10x15-inch" ||
      subSlug === "7x10-inch" ||
      subSlug === "metallic" ||
      subSlug === "mini-transfer"
    ) {
      if (subSlug === "10x15-inch") {
        return (
          colHandles.includes("mini-transfer-sheets") ||
          name.includes("10x15") ||
          name.includes("10 x 15") ||
          name.includes("a3 transfer")
        )
      }
      if (subSlug === "7x10-inch") {
        return (
          colHandles.includes("a4-size-transfer-sheet") ||
          name.includes("7x10") ||
          name.includes("7 x 10") ||
          (name.includes("a4") && name.includes("transfer"))
        )
      }
      if (subSlug === "metallic") {
        return (
          colHandles.includes("transfer-sheets") ||
          name.includes("metallic transfer") ||
          (name.includes("metallic") &&
            (name.includes("transfer") || name.includes("foil") || desc.includes("transfer")))
        )
      }
      if (subSlug === "mini-transfer") {
        return (
          colHandles.includes("mini-transfer-sheet") ||
          name.includes("mini transfer") ||
          name.includes("mini-transfer")
        )
      }
      // General Transfer sheets (matches all child transfers or any transfer sheet)
      return (
        colHandles.some((h) => h.includes("transfer")) ||
        name.includes("transfer") ||
        desc.includes("transfer sheet")
      )
    }
  }

  // Custom keywords fallback
  if (keywords && keywords.length > 0) {
    return keywords.some(
      (kw) =>
        name.includes(kw) ||
        desc.includes(kw) ||
        cat.includes(kw) ||
        colHandles.some((h) => h.includes(kw))
    )
  }

  return false
}

/**
 * Checks whether a product belongs to a given category
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

  // 2. Centralized Product-to-Main-Category Mapper
  const mapped = mapProductToMainCategory(product)
  if (mapped) {
    return mapped.slug === category.slug
  }

  // 3. Child / subcategory Shopify collection match
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

  // 4. Fallback to product category name
  const pCat = (product.category || "").toLowerCase()
  const catName = category.name.toLowerCase()
  const catSlug = category.slug

  if (pCat === catName) return true
  const pSlug = pCat.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  if (pSlug === catSlug || SLUG_ALIASES[pSlug] === catSlug) return true

  return false
}

/**
 * Filter products by category, optional subcategory, and optional child subcategory
 */
export function filterProductsByDynamicCategory(
  products: Product[],
  categorySlug: string,
  subcategorySlug?: string | null,
  categoriesHierarchy: DynamicShopCategory[] = [],
  childSubcategorySlug?: string | null
): Product[] {
  if (!categorySlug || categorySlug === "all") {
    return products
  }

  const category = categoriesHierarchy.find(
    (c) => c.slug === categorySlug || SLUG_ALIASES[categorySlug] === c.slug
  )

  if (!category) {
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

  // 1. If a child subcategory is selected (e.g. 10x15-inch, 7x10-inch, metallic, mini-transfer)
  if (childSubcategorySlug) {
    return products.filter((p) =>
      isProductInSubcategory(p, category.slug, childSubcategorySlug)
    )
  }

  // 2. If a subcategory is selected, filter strictly by that subcategory
  if (subcategorySlug) {
    const sub = category.subcategories.find(
      (s) =>
        s.slug === subcategorySlug ||
        (s.children && s.children.some((ch) => ch.slug === subcategorySlug))
    )
    if (sub) {
      return products.filter((p) =>
        isProductInSubcategory(p, category.slug, subcategorySlug, sub.keywords)
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

  // Filter products belonging to this category
  return products.filter((p) => isProductInCategory(p, category))
}
