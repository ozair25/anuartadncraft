/**
 * Centralized Shop Category Configuration
 * 
 * Official Main Shop Categories and Subcategories as defined by client.
 * 
 * SHOP HIERARCHY:
 * Shop
 *  → Main Category (16 official categories)
 *    → Subcategory (Official client subcategories)
 *      → Child Subcategory (e.g. Transfer sheet sizes/types)
 *        → Product
 */

export interface ShopSubcategoryConfig {
  id: string
  name: string
  slug: string
  handle?: string
  order?: number
  description?: string
  keywords?: string[]
  image?: string
  icon?: string
  children?: ShopSubcategoryConfig[]
}

export type CategoryType = "material" | "merchandising" | "seasonal"

export interface ShopCategoryConfig {
  id: string
  name: string
  label: string // Alias for backward compatibility
  slug: string
  handle: string
  order: number
  description: string
  type: CategoryType
  keywords: string[]
  shopifyCollectionHandle?: string
  image?: string
  icon?: string
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
 * Official Centralized Category & Subcategory Definitions
 */
export const SHOP_CATEGORIES: ShopCategoryConfig[] = [
  {
    id: "new-arrivals",
    handle: "new-arrivals",
    order: 1,
    shopifyCollectionHandle: "new-arrivals",
    name: "New Arrivals",
    label: "New Arrivals",
    slug: "new-arrivals",
    description: "Discover the newest additions to our art, craft, and DIY studio catalog.",
    type: "merchandising",
    keywords: ["new", "latest", "arrival", "fresh", "recent"],
    subcategories: [],
  },
  {
    id: "accessories",
    handle: "accessories",
    order: 2,
    shopifyCollectionHandle: "craft-accessories",
    name: "Accessories",
    label: "Accessories",
    slug: "accessories",
    description: "Essential crafting accessories, mirrors, beads, moti, patches, and decorative motifs.",
    type: "material",
    keywords: ["accessory", "accessories", "mirror", "mirrors", "beads", "moti", "patch", "patches", "motif", "motifs"],
    subcategories: [
      {
        id: "accessories-mirrors",
        name: "Mirrors",
        slug: "mirrors",
        description: "Small craft mirrors, round pink/gold mirrors, convex and flat mirrors for Lippan and embroidery.",
        keywords: ["mirror", "mirrors", "round pink", "round gold", "flat mirror", "convex mirror"],
      },
      {
        id: "accessories-beads",
        name: "Beads",
        slug: "beads",
        description: "Hanging moti, pearl beads, acrylic beads, and jewellery craft accessories.",
        keywords: ["bead", "beads", "moti", "hanging moti", "craft-accessories", "pearl", "ghungroo"],
      },
      {
        id: "accessories-patches",
        name: "Patches",
        slug: "patches",
        description: "Embroidered craft patches, fabric appliques, and decorative designer patches.",
        keywords: ["patch", "patches", "embroidered patch", "decorative patch", "decorative-flowers-and-patches"],
      },
      {
        id: "accessories-motifs",
        name: "Motifs",
        slug: "motifs",
        description: "Artistic motifs, embellishment butis, and traditional decorative craft accents.",
        keywords: ["motif", "motifs", "applique", "buti", "zari motif", "accent motif"],
      },
    ],
  },
  {
    id: "brushes-tools",
    handle: "brushes-tools",
    order: 3,
    shopifyCollectionHandle: "art-supplies",
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
    handle: "decoupage-material",
    order: 4,
    shopifyCollectionHandle: "decoupage",
    name: "Decoupage Material",
    label: "Decoupage Material",
    slug: "decoupage-material",
    description: "Decoupage napkins, specialty glues, mod podge, varnishes, and transfer mediums.",
    type: "material",
    keywords: ["decoupage", "mod podge", "tissue paper", "napkin", "transfer medium", "transfer sheet"],
    subcategories: [
      {
        id: "decoupage-mediums",
        name: "Mediums",
        slug: "mediums",
        description: "Decoupage glues, mod podge, varnishes, sealers, and crackle mediums.",
        keywords: ["medium", "glue", "mod podge", "varnish", "sealer", "art and craft mediums"],
      },
      {
        id: "decoupage-tissue-paper",
        name: "Tissue & paper",
        slug: "tissue-paper",
        description: "Decoupage tissues, specialty rice papers, napkins, and printed decoupage sheets.",
        keywords: ["tissue", "paper", "decoupage paper", "rice paper", "napkin"],
      },
      {
        id: "decoupage-transfer-sheets",
        name: "Transfer sheets",
        slug: "transfer-sheets",
        description: "Water transfer stickers, metallic rub-on transfers, and decorative decals.",
        keywords: ["transfer sheet", "transfer sticker", "rub on", "decal", "transfers"],
        children: [
          {
            id: "transfer-10x15-inch",
            name: "10x15 inch",
            slug: "10x15-inch",
            description: "Large 10x15 inch / A3 format decorative transfer sheets.",
            keywords: ["10x15", "a3 transfer", "mini-transfer-sheets", "10x15 inch"],
          },
          {
            id: "transfer-7x10-inch",
            name: "7x10 inch",
            slug: "7x10-inch",
            description: "Medium 7x10 inch / A4 format transfer decals.",
            keywords: ["7x10", "a4 size transfer", "7x10 inch"],
          },
          {
            id: "transfer-metallic",
            name: "Metallic",
            slug: "metallic",
            description: "Shimmering metallic gold, silver, and copper transfer sheets.",
            keywords: ["metallic", "metallic transfers", "gold transfer", "foil transfer"],
          },
          {
            id: "transfer-mini",
            name: "Mini transfer",
            slug: "mini-transfer",
            description: "Compact mini transfer decals and stickers for small craft articles.",
            keywords: ["mini transfer", "mini-transfer-sheet", "mini decal"],
          },
        ],
      },
    ],
  },
  {
    id: "papers-cardstocks",
    handle: "papers-cardstocks",
    order: 5,
    shopifyCollectionHandle: "papers",
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
    handle: "stencils-templates",
    order: 6,
    shopifyCollectionHandle: "stencils",
    name: "Stencils & Templates",
    label: "Stencils & Templates",
    slug: "stencils-templates",
    description: "Reusable laser-cut stencils, mandala designs, borders, and pattern templates.",
    type: "material",
    keywords: ["stencil", "stencils", "template", "templates", "mandala stencil", "jali", "border stencil"],
    subcategories: [
      {
        id: "stencils-4x4-inch",
        name: "4x4 inch",
        slug: "4x4-inch",
        description: "Compact 4x4 inch stencils for coasters, small bases, and card accents.",
        keywords: ["4x4", "4x4 inch", "4x4-inch-stencils"],
      },
      {
        id: "stencils-4x8-inch",
        name: "4x8 inch",
        slug: "4x8-inch",
        description: "Popular 4x8 inch decorative stencils and pattern strips.",
        keywords: ["4x8", "4x8 inch", "4x8 stencil", "a4-size-stencil-collection"],
      },
      {
        id: "stencils-a4-size",
        name: "A4 size",
        slug: "a4-size",
        description: "Standard A4 size stencils featuring full artistic backgrounds and focal motifs.",
        keywords: ["a4 size", "a4 stencil", "a4-size-stencil-collection-1"],
      },
      {
        id: "stencils-12x12-inch",
        name: "12x12 inch",
        slug: "12x12-inch",
        description: "12x12 inch classic mandala stencils and large art backdrops.",
        keywords: ["12x12", "12 inch", "12-inch-stencil-collection"],
      },
      {
        id: "stencils-12x18-inch",
        name: "12x18 inch",
        slug: "12x18-inch",
        description: "Extra large 12x18 inch stencils for wall decor, furniture, and canvas art.",
        keywords: ["12x18", "12x18 inch", "large stencil", "wall stencil"],
      },
      {
        id: "stencils-combos",
        name: "Combos",
        slug: "combos",
        description: "4 in 1 multi-design stencil collections and value combo packs.",
        keywords: ["4 in 1", "combo", "4 in 1 stencil", "stencil combo"],
      },
    ],
  },
  {
    id: "scrapbooking-journaling-supplies",
    handle: "scrapbooking-journaling-supplies",
    order: 7,
    shopifyCollectionHandle: "scrapbooking",
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
    handle: "flower-making",
    order: 8,
    shopifyCollectionHandle: "flower-making",
    name: "Flower Making",
    label: "Flower Making",
    slug: "flower-making",
    image: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1791483127/i_craft_Chenille_Stems_Collection_kuqwxy.png",
    description: "Materials, floral wire, pollen, duplex papers, and tools for handcrafted flowers.",
    type: "material",
    keywords: ["flower", "flower making", "floral", "pollen", "duplex", "petal"],
    subcategories: [],
  },
  {
    id: "paints-mediums",
    handle: "paints-mediums",
    order: 9,
    shopifyCollectionHandle: "paints",
    name: "Paints & Mediums",
    label: "Paints & Mediums",
    slug: "paints-mediums",
    description: "Artisanal chalk paints, acrylics, watercolours, gesso, and texturing mediums.",
    type: "material",
    keywords: ["paint", "paints", "chalk paint", "acrylic", "watercolor", "watercolour", "medium", "gesso", "varnish"],
    subcategories: [
      {
        id: "paints-chalk-paints",
        name: "Chalk paints",
        slug: "chalk-paints",
        description: "Velvety ultra-matte chalk paints in 50ml, 100ml, and 250ml artisanal shades.",
        keywords: ["chalk paint", "chalk paints", "chalk-paints-50-ml", "chalk-paint-100-ml", "chalk-paint-250-ml"],
      },
      {
        id: "paints-glue-varnish",
        name: "Glue & Varnish",
        slug: "glue-varnish",
        description: "Protective clear gloss and matte varnishes, adhesives, and craft sealers.",
        keywords: ["glue", "varnish", "sealer", "adhesive", "mod podge", "clear coat"],
      },
      {
        id: "paints-acrylic-paints",
        name: "Acrylic paints",
        slug: "acrylic-paints",
        description: "Richly pigmented artist-grade acrylic paints and liquid colours.",
        keywords: ["acrylic", "acrylic paint", "acrylics"],
      },
      {
        id: "paints-combos",
        name: "Combos",
        slug: "combos",
        description: "Assorted colour palette combos and value chalk paint sets.",
        keywords: ["combo", "metallic combo", "paint combo", "palette set"],
      },
      {
        id: "paints-markers-pens",
        name: "Markers and pens",
        slug: "markers-pens",
        description: "Dual-tip brush pens, calligraphy lettering pens, and acrylic paint markers.",
        keywords: ["marker", "pen", "pens", "calligraphy pen", "brush pen", "lettering"],
      },
    ],
  },
  {
    id: "mdf-acrylic-bases",
    handle: "mdf-acrylic-bases",
    order: 10,
    shopifyCollectionHandle: "mdf",
    name: "MDF & Acrylic Bases",
    label: "MDF & Acrylic Bases",
    slug: "mdf-acrylic-bases",
    description: "Precision-cut MDF cutouts, coaster bases, trays, fridge magnets, keyholders, and acrylic embellishments.",
    type: "material",
    keywords: ["mdf", "mdf base", "acrylic base", "coaster", "tray", "magnet", "keyholder", "plank", "embellishment"],
    subcategories: [
      {
        id: "mdf-coasters",
        name: "Coasters",
        slug: "coasters",
        description: "Round, square, and designer MDF coaster bases and sets for resin, decoupage, and painting.",
        keywords: ["coaster", "coasters", "tea-coasters", "tea coaster", "cup coaster"],
      },
      {
        id: "mdf-trays-organisers",
        name: "Trays & organisers",
        slug: "trays-organisers",
        description: "Wooden and MDF serving trays, tile trays, desk organisers, and multi-compartment boxes.",
        keywords: ["tray", "trays", "organiser", "organisers", "organizer", "trays-and-organisers", "tile tray"],
      },
      {
        id: "mdf-fridge-magnets",
        name: "Fridge magnets",
        slug: "fridge-magnets",
        description: "Laser cut MDF fridge magnet blanks, cutout bases, and miniature magnet surfaces.",
        keywords: ["fridge magnet", "fridge-magnet-bases", "magnet", "magnet base", "magnet diy"],
      },
      {
        id: "mdf-keyholders",
        name: "Keyholders",
        slug: "keyholders",
        description: "Designer wall-hanging keyholder blanks and pre-drilled MDF key stands.",
        keywords: ["keyholder", "keyholders", "key holder", "key stand", "key rack"],
      },
      {
        id: "mdf-planks",
        name: "Planks",
        slug: "planks",
        description: "Smooth wooden planks, welcome signs, name plates, and decorative hanging boards.",
        keywords: ["plank", "planks", "welcome plank", "name plate", "hanging plank", "mdf-wall-decors"],
      },
      {
        id: "mdf-acrylic-embellishments",
        name: "Acrylic embellishments",
        slug: "acrylic-embellishments",
        description: "Precision laser cut acrylic cutouts, mantra plaques, mirrors, and modern embellishments.",
        keywords: ["acrylic embellishment", "acrylic cutout", "acrylic-cutouts", "mantra", "acrylic cutouts"],
      },
      {
        id: "mdf-embellishments",
        name: "Mdf embellishments",
        slug: "mdf-embellishments",
        description: "3D wooden laser cutouts, miniatures, floral accents, borders, and decorative MDF motifs.",
        keywords: ["mdf embellishment", "mdf-embelishments", "3d-wooden-embellishment", "minature", "miniature"],
      },
      {
        id: "mdf-candle-holders",
        name: "Candle holders",
        slug: "candle-holders",
        description: "Tea light bases, festive diya holders, and wooden candle stands.",
        keywords: ["candle holder", "candle-holder", "tlight", "t-light", "tea light base"],
      },
      {
        id: "mdf-festive-special",
        name: "Festive special",
        slug: "festive-special",
        description: "Festive Rangoli bases, Shubh Labh cutouts, festive centerpieces, and festival MDF specials.",
        keywords: ["festive special", "festive-diy", "rangoli", "shubh labh", "diwali base", "toran"],
      },
      {
        id: "mdf-other-miscellaneous-bases",
        name: "Other miscellaneous bases",
        slug: "other-miscellaneous-bases",
        description: "MDF tiles, clock faces, photo frames, desk plaques, and assorted craft cutouts.",
        keywords: ["miscellaneous", "mdf-tiles", "3-inch-mdf-tiles", "tile", "clock base", "blank base"],
      },
    ],
  },
  {
    id: "resin-art-essentials",
    handle: "resin-art-essentials",
    order: 11,
    shopifyCollectionHandle: "resin",
    name: "Resin Art Essentials",
    label: "Resin Art Essentials",
    slug: "resin-art-essentials",
    image: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1791485871/Resin_Craft_Kits_and_Floral_Creations_mgnlho.png",
    description: "Crystal-clear epoxy resins, hardeners, silicone molds, mica pigments, and cups.",
    type: "material",
    keywords: ["resin", "epoxy", "hardener", "silicone mold", "mica pigment", "resin art"],
    subcategories: [
      {
        id: "resin-stickers-insert-sheets",
        name: "Stickers & insert sheets",
        slug: "stickers-insert-sheets",
        description: "Clear gold foil quote stickers, floral films, and transparent resin insert sheets.",
        keywords: ["sticker", "insert sheet", "resin-insert-sheet", "quote sticker", "gold film"],
      },
      {
        id: "resin-powders-pigments",
        name: "Powders & Pigments",
        slug: "powders-pigments",
        description: "Shimmering mica powders, metallic pigments, paste colours, and alcohol inks.",
        keywords: ["powder", "pigment", "mica", "alcohol-inks", "resin pigment"],
      },
      {
        id: "resin-sillicon-moulds",
        name: "Sillicon Moulds",
        slug: "sillicon-moulds",
        description: "High-grade silicone casting moulds for coasters, trays, clocks, and jewelry.",
        keywords: ["silicone", "mould", "mold", "resin-art-moulds", "silicone mould", "coaster mould"],
      },
      {
        id: "resin-kits",
        name: "Kits",
        slug: "kits",
        description: "All-in-one beginner and artist resin crafting starter kits.",
        keywords: ["resin kit", "starter kit", "epoxy kit"],
      },
      {
        id: "resin-decorative-materials",
        name: "Decorative materials",
        slug: "decorative-materials",
        description: "Glitters, natural crushed shells, gold foil flakes, and resin inclusions.",
        keywords: ["decorative", "resin-embellishments", "glitter", "shell", "gold flake", "pebble"],
      },
      {
        id: "resin-mdf-acrylic-cuttings",
        name: "Mdf & acrylic cuttings",
        slug: "mdf-acrylic-cuttings",
        description: "Pre-cut MDF bases, clock shapes, and acrylic backings ready for resin pouring.",
        keywords: ["mdf cutting", "acrylic cutting", "resin base", "wooden cutting", "clock base"],
      },
      {
        id: "resin-epoxy-resin",
        name: "Epoxy resin",
        slug: "epoxy-resin",
        description: "Ultra-clear 2:1 and 3:1 bubble-free epoxy resins and hardeners.",
        keywords: ["epoxy", "epoxy resin", "resin-essentials", "crystal clear", "hardener"],
      },
    ],
  },
  {
    id: "diy-kits",
    handle: "diy-kits",
    order: 12,
    shopifyCollectionHandle: "diy-kits",
    name: "DIY Kits",
    label: "DIY Kits",
    slug: "diy-kits",
    description: "Complete all-in-one craft kits with materials, pre-marked bases, and step-by-step guidance.",
    type: "material",
    keywords: ["diy kit", "diy kits", "diy", "activity kit", "decor kit", "dangler", "clock kit", "tote bag kit"],
    subcategories: [
      {
        id: "diy-under-99",
        name: "Under 99",
        slug: "under-99",
        description: "Pocket-friendly craft activity sets and mini DIY items under ₹99.",
        keywords: ["under 99", "99", "pocket kit", "mini kit"],
      },
      {
        id: "diy-mandala-art",
        name: "Mandala art",
        slug: "mandala-art",
        description: "Pre-marked mandala bases, dotting tools, and beginner-friendly mandala kits.",
        keywords: ["mandala", "mandala art", "mandala-art-kits", "dot mandala"],
      },
      {
        id: "diy-kids-craft-kits",
        name: "Kids craft kits",
        slug: "kids-craft-kits",
        description: "Creative clock kits, tote bags, and activity sets designed specifically for kids.",
        keywords: ["kids", "clock-diy-kits", "tote-bag-diy", "kids craft", "dinosaur", "sailboat", "unicorn"],
      },
      {
        id: "diy-home-decor-kits",
        name: "Home decor kits",
        slug: "home-decor-kits",
        description: "Handcrafted dangling art pieces, wall hangings, and decorative accent kits.",
        keywords: ["home decor", "dangler-diy-kits", "dangler", "hot air balloon", "evil eye", "hamsa"],
      },
      {
        id: "diy-return-gift-range",
        name: "Return gift range",
        slug: "return-gift-range",
        description: "Thoughtful DIY craft kits curated for birthday party favors and return gifts.",
        keywords: ["return gift", "party favor", "magnet-diy", "mini dangler", "bulk gift"],
      },
      {
        id: "diy-combo",
        name: "Combo",
        slug: "combo",
        description: "6 in 1 multi-activity kits, family crafting bundles, and combo packs.",
        keywords: ["combo", "6 in 1", "bundle", "multi kit"],
      },
    ],
  },
  {
    id: "candle-making-supplies",
    handle: "candle-making-supplies",
    order: 13,
    shopifyCollectionHandle: "candle-making",
    name: "Candle Making Supplies",
    label: "Candle Making Supplies",
    slug: "candle-making-supplies",
    image: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1791483128/DIY_Candle_Making_Kit_Collection_o6v40a.png",
    description: "Soy wax, paraffin flakes, candle wicks, dye chips, and artisanal fragrances.",
    type: "material",
    keywords: ["candle", "candle making", "wax", "soy wax", "wick", "candle fragrance"],
    subcategories: [
      {
        id: "candle-wax-gel",
        name: "Wax & gel",
        slug: "wax-gel",
        description: "Pure natural soy wax, paraffin wax flakes, and transparent candle gel.",
        keywords: ["wax", "gel", "soy wax", "gel wax", "paraffin", "candle-making"],
      },
      {
        id: "candle-colours-fragrances",
        name: "Colours & fragrances",
        slug: "colours-fragrances",
        description: "Concentrated candle dye blocks, chips, and premium aromatic fragrance oils.",
        keywords: ["colour", "fragrance", "dye", "scent", "aroma oil"],
      },
      {
        id: "candle-moulds",
        name: "Candle moulds",
        slug: "candle-moulds",
        description: "Silicone 3D candle moulds, pillar moulds, bubble cube, and geometric shapes.",
        keywords: ["candle mould", "candle mold", "pillar mould", "bubble mould"],
      },
      {
        id: "candle-bowls-urlis",
        name: "Bowls & urlis",
        slug: "bowls-urlis",
        description: "Traditional brass & metal urlis, terracotta bowls, and glass candle jars.",
        keywords: ["bowl", "urli", "candle holder", "candle-holder", "metal urli", "jar"],
      },
      {
        id: "candle-wicks-tools",
        name: "Wicks & tools",
        slug: "wicks-tools",
        description: "Lead-free cotton wicks, wooden wicks, wick sustainers, and wax melting pots.",
        keywords: ["wick", "wicks", "wick holder", "melting pot", "thermometer", "tool"],
      },
      {
        id: "candle-kits",
        name: "Kits",
        slug: "kits",
        description: "Complete DIY scented candle making beginner kits with wax, wick, and fragrance.",
        keywords: ["candle kit", "candle making kit", "diy candle"],
      },
    ],
  },
  {
    id: "lippan-art-essentials",
    handle: "lippan-art-essentials",
    order: 14,
    shopifyCollectionHandle: "lippan-art",
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
    handle: "value-packs",
    order: 15,
    shopifyCollectionHandle: "value-packs",
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
    handle: "festive-collection",
    order: 16,
    shopifyCollectionHandle: "festive-diy",
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

  // 1. Merchandising: Value Packs
  if (
    name.includes("combo") ||
    name.includes("value pack") ||
    name.includes("bundle") ||
    rawCat.toLowerCase().includes("combo")
  ) {
    return getCategoryByName("Value Packs")!
  }

  // 2. Seasonal: Festive Collection
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

  // 5. DIY Kits
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
    coll === "tea-coasters" ||
    coll === "trays-and-organisers" ||
    coll === "fridge-magnet-bases" ||
    coll === "keyholders" ||
    coll === "candle-holder" ||
    coll === "acrylic-cutouts" ||
    coll === "mdf-embelishments" ||
    coll === "3d-wooden-embellishment" ||
    coll === "mdf-tiles" ||
    coll === "3-inch-mdf-tiles" ||
    coll === "mdf-wall-decors" ||
    coll === "festive-diy" ||
    name.includes("mdf") ||
    rawCat.toLowerCase().includes("mdf") ||
    name.includes("acrylic base") ||
    name.includes("cutout") ||
    name.includes("coaster") ||
    name.includes("fridge magnet") ||
    name.includes("keyholder") ||
    name.includes("plank")
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
  if (
    coll === "mirrors" ||
    coll === "craft-accessories" ||
    coll === "decorative-flowers-and-patches" ||
    name.includes("mirror") ||
    name.includes("moti") ||
    name.includes("bead") ||
    name.includes("patch") ||
    name.includes("motif") ||
    name.includes("accessory") ||
    name.includes("accessories")
  ) {
    return getCategoryByName("Accessories")!
  }

  return null
}

/**
 * Helper to get all 16 official shop categories sorted by display order
 */
export function getShopCategoriesSorted(): ShopCategoryConfig[] {
  return [...SHOP_CATEGORIES].sort((a, b) => a.order - b.order)
}
