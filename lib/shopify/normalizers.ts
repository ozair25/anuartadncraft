import { Product, ProductVariant, Collection } from "@/types/ecommerce"

export interface ShopifyProductNode {
  id: string
  title: string
  handle: string
  description?: string
  descriptionHtml?: string
  vendor?: string
  productType?: string
  tags?: string[]
  availableForSale?: boolean
  totalInventory?: number | null
  priceRange?: {
    minVariantPrice?: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice?: {
      amount: string
      currencyCode: string
    }
  }
  compareAtPriceRange?: {
    minVariantPrice?: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice?: {
      amount: string
      currencyCode: string
    }
  }
  images?: {
    edges?: Array<{
      node?: {
        url?: string
        altText?: string | null
      }
    }>
  }
  variants?: {
    edges?: Array<{
      node?: {
        id: string
        title: string
        sku?: string | null
        availableForSale?: boolean
        quantityAvailable?: number | null
        price?: {
          amount: string
          currencyCode: string
        }
        compareAtPrice?: {
          amount: string
          currencyCode: string
        } | null
        selectedOptions?: Array<{
          name: string
          value: string
        }>
      }
    }>
  }
  collections?: {
    edges?: Array<{
      node?: {
        id: string
        title: string
        handle: string
      }
    }>
  }
}

export function normalizeShopifyProduct(node: ShopifyProductNode): Product {
  const images =
    node.images?.edges?.map((edge) => edge.node?.url || "").filter(Boolean) || []

  // Ensure there's at least one image or a sensible art-themed placeholder
  if (images.length === 0) {
    images.push("https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80")
  }

  const primaryImage = images[0]

  // Primary variant
  const primaryVariantNode = node.variants?.edges?.[0]?.node
  const variantId = primaryVariantNode?.id || ""

  // Price calculations
  const rawPrice =
    node.priceRange?.minVariantPrice?.amount ||
    primaryVariantNode?.price?.amount ||
    "0"
  const price = Math.round(parseFloat(rawPrice)) || 0

  const rawCompareAtPrice =
    node.compareAtPriceRange?.minVariantPrice?.amount ||
    primaryVariantNode?.compareAtPrice?.amount
  const originalPrice = rawCompareAtPrice
    ? Math.round(parseFloat(rawCompareAtPrice))
    : undefined

  let discount: string | undefined = undefined
  if (originalPrice && originalPrice > price) {
    const pct = Math.round(((originalPrice - price) / originalPrice) * 100)
    if (pct > 0) {
      discount = `${pct}% OFF`
    }
  }

  // Stock
  const stock =
    typeof node.totalInventory === "number" && node.totalInventory > 0
      ? node.totalInventory
      : node.availableForSale !== false
      ? 50
      : 0

  // Category & Collection
  const primaryCollection = node.collections?.edges?.[0]?.node
  const category =
    node.productType && node.productType.trim().length > 0
      ? node.productType.trim()
      : primaryCollection?.title || "Art Supplies"

  const collection = primaryCollection?.handle || ""

  // Map variants
  const variants: ProductVariant[] =
    node.variants?.edges?.map((e) => {
      const v = e.node!
      const vPrice = Math.round(parseFloat(v.price?.amount || "0")) || price
      const vOrig = v.compareAtPrice
        ? Math.round(parseFloat(v.compareAtPrice.amount))
        : undefined
      return {
        id: v.id,
        title: v.title,
        price: vPrice,
        originalPrice: vOrig,
        available: v.availableForSale ?? true,
        sku: v.sku || undefined,
        quantityAvailable: v.quantityAvailable ?? undefined,
        selectedOptions: v.selectedOptions || [],
      }
    }) || []

  // Extract specs from variant options or tags
  const specs: Record<string, string> = {}
  if (primaryVariantNode?.selectedOptions) {
    for (const opt of primaryVariantNode.selectedOptions) {
      if (opt.name && opt.value && opt.value !== "Default Title") {
        specs[opt.name] = opt.value
      }
    }
  }
  if (node.vendor) {
    specs["Brand / Artisan"] = node.vendor
  }
  if (category) {
    specs["Category"] = category
  }

  // Clean description
  const cleanDescription =
    node.descriptionHtml ||
    node.description ||
    "High quality premium art and craft supply from Anu Art & Craft Studio."

  const shortDescription = node.description
    ? node.description.length > 150
      ? node.description.slice(0, 150) + "..."
      : node.description
    : "Premium handmade art product crafted with care."

  const tags = node.tags || []
  const isBestSeller =
    tags.some((t) => t.toLowerCase().includes("bestseller") || t.toLowerCase() === "hot")
  const isFeatured =
    tags.some((t) => t.toLowerCase().includes("featured") || t.toLowerCase() === "popular")
  const isNewArrival =
    tags.some((t) => t.toLowerCase().includes("new") || t.toLowerCase() === "latest")

  return {
    id: node.id,
    name: node.title,
    slug: node.handle,
    sku: primaryVariantNode?.sku || node.handle.toUpperCase(),
    description: cleanDescription,
    shortDescription,
    price,
    originalPrice,
    discount,
    images,
    thumbnail: primaryImage,
    image: primaryImage,
    stock,
    category,
    collection,
    tags,
    brand: node.vendor || "Anu Arts",
    rating: 4.9,
    reviewsCount: 24,
    isFeatured,
    isBestSeller,
    isNewArrival,
    specs,
    variantId,
    variants,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export interface ShopifyCollectionNode {
  id: string
  title: string
  handle: string
  description?: string
  image?: {
    url?: string
    altText?: string | null
  } | null
  products?: {
    edges?: Array<unknown>
  }
}

export function normalizeShopifyCollection(
  node: ShopifyCollectionNode,
  productCount = 0
): Collection {
  return {
    id: node.id,
    title: node.title,
    slug: node.handle,
    description:
      node.description ||
      "Curated collection of handcrafted and premium art supplies from Anu Arts.",
    image:
      node.image?.url ||
      "https://images.unsplash.com/photo-1460661419200-fd425c44c1d7?w=800&q=80",
    productCount:
      productCount || (node.products?.edges ? node.products.edges.length : 12),
  }
}
