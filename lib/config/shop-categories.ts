/**
 * Centralized Shop Category Configuration
 * 
 * When the client provides the final Shop category flowchart,
 * update this configuration file only.
 */

export interface ShopCategoryConfig {
  id: string
  label: string
  slug: string
  description?: string
  keywords: string[]
}

export const SHOP_CATEGORIES: ShopCategoryConfig[] = [
  {
    id: "all",
    label: "All Supplies",
    slug: "all",
    description: "Browse our complete collection of art & craft materials.",
    keywords: [],
  },
  {
    id: "diy-kits",
    label: "DIY Kits",
    slug: "diy-kits",
    description: "All-in-one complete kits for beginners, kids & hobbyists.",
    keywords: ["diy", "kit", "starter", "pack"],
  },
  {
    id: "art-supplies",
    label: "Art Supplies",
    slug: "art-supplies",
    description: "Artist-grade canvases, palettes, easels & studio tools.",
    keywords: ["art supplies", "canvas", "board", "brush", "palette", "easel"],
  },
  {
    id: "paints-colours",
    label: "Paints & Colours",
    slug: "paints",
    description: "Acrylics, watercolors, gouache, glass & fabric colours.",
    keywords: ["paint", "colour", "color", "acrylic", "watercolor", "gouache"],
  },
  {
    id: "stencils-mdf",
    label: "Stencils & MDF Bases",
    slug: "stencils",
    description: "Laser-cut MDF cutouts, templates, mandir bases & stencils.",
    keywords: ["stencil", "mdf", "cutout", "base", "mandir"],
  },
  {
    id: "craft-specialties",
    label: "Resin & Craft Specialties",
    slug: "resin",
    description: "Epoxy resin, pigments, molds, mirrors & craft embellishments.",
    keywords: ["resin", "epoxy", "pigment", "mirror", "clay", "lippan"],
  },
]
