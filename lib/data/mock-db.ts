import { Product, Category, Collection, Blog, Review, Coupon, Order, UserProfile, Testimonial } from "@/types/ecommerce"

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Painting",
    slug: "painting",
    description: "High quality acrylics, oils, watercolors, and gouache paints for fine artists.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
    productCount: 24,
  },
  {
    id: "cat-2",
    name: "Drawing",
    slug: "drawing",
    description: "Pencils, sketchbooks, charcoal, markers, and pastels for every level of illustrator.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop",
    productCount: 18,
  },
  {
    id: "cat-3",
    name: "Crafting",
    slug: "crafting",
    description: "Clay tools, scissors, glue guns, resin art supplies, and crafting papers.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    productCount: 32,
  },
  {
    id: "cat-4",
    name: "DIY Kits",
    slug: "diy-kits",
    description: "Curated beginner-friendly complete DIY kits for embroidery, painting, resin, and pottery.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    badge: "New",
    productCount: 12,
  },
  {
    id: "cat-5",
    name: "Stationery",
    slug: "stationery",
    description: "Journals, planners, fine liners, wax seals, and aesthetic desk organization.",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop",
    productCount: 29,
  },
  {
    id: "cat-6",
    name: "Decor & More",
    slug: "decor-and-more",
    description: "Canvas boards, easels, wooden frames, and hand-crafted studio decor.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    productCount: 15,
  },
]

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: "col-1",
    title: "Acrylic Painting Essentials",
    slug: "acrylic-painting-essentials",
    description: "Everything you need to master acrylic painting, from rich heavy-body tube sets to professional synthetic hog brushes.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
    productCount: 14,
  },
  {
    id: "col-2",
    title: "DIY Craft Kits For All Ages",
    slug: "diy-craft-kits-for-all-ages",
    description: "Unpack creativity with all-in-one hobby kits with easy step-by-step video instructions.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    productCount: 10,
  },
  {
    id: "col-3",
    title: "Art Journal Essentials",
    slug: "art-journal-essentials",
    description: "Acid-free heavy 300gsm cold press paper sketchbooks, washi tapes, and vintage stamp kits.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    productCount: 16,
  },
  {
    id: "col-4",
    title: "Home Decor & More",
    slug: "home-decor-and-more",
    description: "Custom wooden easel stands, stretched cotton canvases, and gallery display frames.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    productCount: 9,
  },
]

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Camel Acrylic Colour Set (12 Shades x 20ml)",
    slug: "camel-acrylic-colour-set-12-shades",
    sku: "CAM-ACR-12",
    description: "Camel Heavy Body Acrylic Colours yield vibrant, lightfast results with smooth butter-like consistency. Suitable for canvas, wood, terracotta, glass, and fabric surfaces.",
    shortDescription: "12 vibrant tube shades of premium quick-drying acrylic paint.",
    price: 349,
    originalPrice: 420,
    discount: "17% OFF",
    images: [
      "/images/product-acrylic-set.png",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop"
    ],
    thumbnail: "/images/product-acrylic-set.png",
    stock: 45,
    category: "painting",
    collection: "acrylic-painting-essentials",
    tags: ["acrylic", "paint", "camel", "tubes", "artist"],
    brand: "Camel",
    rating: 4.8,
    reviewsCount: 124,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    variantId: "gid://shopify/ProductVariant/43659782914092",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43659782914092",
        title: "Default Title",
        price: 349,
        originalPrice: 420,
        available: true,
        sku: "CAM-ACR-12",
        selectedOptions: [{ name: "Title", value: "Default Title" }],
      },
    ],
    seoTitle: "Buy Camel Acrylic Colour Set 12 Shades Online - Anu Arts",
    seoDescription: "Shop authentic Camel 12 shades acrylic paint set at best prices with express delivery across India.",
    altText: "Camel Acrylic Colour Set 12 Shades Box",
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-07-20T12:00:00Z",
    specs: {
      "Quantity": "12 Tubes x 20ml",
      "Finish": "Satin Finish",
      "Surface": "Canvas, Wood, Terracotta, Glass",
      "Drying Time": "15-20 Minutes"
    }
  },
  {
    id: "prod-2",
    name: "Brustro Hardbound Artists Sketchbook A4 (160 GSM)",
    slug: "brustro-hardbound-artists-sketchbook-a4",
    sku: "BRU-SKT-A4",
    description: "Brustro Premium Hardbound Sketchbook features 160 GSM acid-free natural shade paper ideal for dry mediums like graphite, charcoal, colored pencils, and light ink washes.",
    shortDescription: "160 GSM acid-free paper sketchbook with durable elegant black hard cover.",
    price: 499,
    originalPrice: 599,
    discount: "16% OFF",
    images: [
      "/images/product-sketchbook.png",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop"
    ],
    thumbnail: "/images/product-sketchbook.png",
    stock: 32,
    category: "drawing",
    collection: "art-journal-essentials",
    tags: ["sketchbook", "brustro", "a4", "drawing", "paper"],
    brand: "Brustro",
    rating: 4.9,
    reviewsCount: 98,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    variantId: "gid://shopify/ProductVariant/43659902287916",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43659902287916",
        title: "Default Title",
        price: 499,
        originalPrice: 599,
        available: true,
        sku: "BRU-SKT-A4",
        selectedOptions: [{ name: "Title", value: "Default Title" }],
      },
    ],
    seoTitle: "Brustro A4 Hardbound Sketchbook 160 GSM - Anu Arts",
    seoDescription: "Buy Brustro A4 hardbound artist sketchbook online. Heavy acid-free papers ideal for graphite & charcoal.",
    altText: "Brustro Hardbound Artists Sketchbook A4",
    createdAt: "2026-01-12T10:00:00Z",
    updatedAt: "2026-07-15T12:00:00Z",
    specs: {
      "Size": "A4 (21 x 29.7 cm)",
      "Paper Weight": "160 GSM",
      "Sheets": "80 Sheets (160 Pages)",
      "Binding": "Hardbound Thread Sewn"
    }
  },
  {
    id: "prod-3",
    name: "Fevicryl Fabric Colours Kit (6 Shades x 10ml)",
    slug: "fevicryl-fabric-colours-kit-6-shades",
    sku: "FEV-FAB-6",
    description: "Fevicryl Fabric Colours remain soft on fabric post drying and retain high brilliance over repeated washes without cracking or fading.",
    shortDescription: "Vibrant fabric paint set ideal for cotton, denim, canvas tote bags, and silk.",
    price: 180,
    originalPrice: 210,
    discount: "14% OFF",
    images: [
      "/images/product-fabric-colours.png",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"
    ],
    thumbnail: "/images/product-fabric-colours.png",
    stock: 60,
    category: "crafting",
    collection: "diy-craft-kits-for-all-ages",
    tags: ["fevicryl", "fabric", "paint", "textile", "diy"],
    brand: "Fevicryl",
    rating: 4.7,
    reviewsCount: 142,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    variantId: "gid://shopify/ProductVariant/43885824344108",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43885824344108",
        title: "Default Title",
        price: 180,
        originalPrice: 210,
        available: true,
        sku: "FEV-FAB-6",
        selectedOptions: [{ name: "Title", value: "Default Title" }],
      },
    ],
    seoTitle: "Fevicryl Fabric Colours 6 Shades Set - Anu Arts",
    seoDescription: "Washproof fabric paints for clothes, canvas bags and cushion covers.",
    altText: "Fevicryl Fabric Colours Kit",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-07-22T12:00:00Z",
    specs: {
      "Pack": "6 Bottles x 10ml",
      "Curing": "Iron reverse side after 24 hrs",
      "Washability": "Machine & Hand Wash Safe"
    }
  },
  {
    id: "prod-4",
    name: "Camel Artists' Oil Pastels (50 Shades)",
    slug: "camel-artists-oil-pastels-50-shades",
    sku: "CAM-PAS-50",
    description: "Rich smooth oil pastels with intense colour laydown and seamless blending properties.",
    shortDescription: "50 soft creamy oil pastel sticks with free blending tool and scraper.",
    price: 599,
    originalPrice: 699,
    discount: "14% OFF",
    images: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop"
    ],
    thumbnail: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop",
    stock: 25,
    category: "drawing",
    collection: "art-journal-essentials",
    tags: ["pastels", "oil pastels", "camel", "drawing"],
    brand: "Camel",
    rating: 4.8,
    reviewsCount: 81,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    variantId: "gid://shopify/ProductVariant/43660089131052",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43660089131052",
        title: "Default Title",
        price: 599,
        originalPrice: 699,
        available: true,
        sku: "CAM-PAS-50",
        selectedOptions: [{ name: "Title", value: "Default Title" }],
      },
    ],
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-07-21T12:00:00Z"
  },
  {
    id: "prod-5",
    name: "Craft Essential Tools Set (Pack of 7)",
    slug: "craft-essential-tools-set-pack-of-7",
    sku: "CRF-TL-7",
    description: "Complete starter toolkit featuring precision craft knife, bone folder, self-healing cutting mat, stainless steel ruler, bone scraper, and craft tweezers.",
    shortDescription: "7 essential precision hand tools for scrapbooking, papercrafts, and model building.",
    price: 450,
    originalPrice: 550,
    discount: "18% OFF",
    images: [
      "https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=600&auto=format&fit=crop"
    ],
    thumbnail: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=600&auto=format&fit=crop",
    stock: 18,
    category: "crafting",
    collection: "diy-craft-kits-for-all-ages",
    tags: ["tools", "crafting", "cutting mat", "craft knife"],
    brand: "Anu Craft",
    rating: 4.6,
    reviewsCount: 65,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    variantId: "gid://shopify/ProductVariant/43660199559212",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43660199559212",
        title: "Default Title",
        price: 450,
        originalPrice: 550,
        available: true,
        sku: "CRF-TL-7",
        selectedOptions: [{ name: "Title", value: "Default Title" }],
      },
    ],
    createdAt: "2026-02-05T10:00:00Z",
    updatedAt: "2026-07-18T12:00:00Z"
  },
  {
    id: "prod-6",
    name: "Resin Art Beginner Starter Kit (300g Resin + Molds)",
    slug: "resin-art-beginner-starter-kit",
    sku: "RES-KIT-BEG",
    description: "High clarity crystal clear 2:1 epoxy resin, silicon coaster molds, mica powders, glitter packets, mixing cups, and wooden sticks.",
    shortDescription: "Complete epoxy resin craft kit with molds and pigments for crystal coasters & bookmarks.",
    price: 899,
    originalPrice: 1199,
    discount: "25% OFF",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"
    ],
    thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    stock: 20,
    category: "diy-kits",
    collection: "diy-craft-kits-for-all-ages",
    tags: ["resin", "epoxy", "diy kit", "molds"],
    brand: "ResinPro",
    rating: 4.9,
    reviewsCount: 52,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    variantId: "gid://shopify/ProductVariant/43660200247340",
    variants: [
      {
        id: "gid://shopify/ProductVariant/43660200247340",
        title: "Default Title",
        price: 899,
        originalPrice: 1199,
        available: true,
        sku: "RES-KIT-BEG",
        selectedOptions: [{ name: "Title", value: "Default Title" }],
      },
    ],
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-07-22T12:00:00Z"
  }
]

export const INITIAL_BLOGS: Blog[] = [
  {
    id: "blog-1",
    title: "10 Acrylic Painting Techniques Every Beginner Should Master",
    slug: "10-acrylic-painting-techniques-for-beginners",
    excerpt: "Discover dry brushing, glazing, impasto, stippling, and wet-on-wet blending with our comprehensive step-by-step studio guide.",
    content: `
      <h2>Mastering Acrylics: A Studio Guide</h2>
      <p>Acrylic paint is one of the most versatile mediums available to modern artists. Fast-drying, water-soluble, and vivid, it allows for incredible experimentation without long drying wait times.</p>
      
      <h3>1. Dry Brushing</h3>
      <p>By applying dry paint with a stiff dry brush onto textured canvas paper, you achieve a scratchy, highly textured effect perfect for tree bark, ocean foam, and animal fur.</p>

      <h3>2. Glazing</h3>
      <p>Thin down your acrylic paint with an acrylic glazing medium to build translucent layers of brilliant color depth over underpaintings.</p>

      <h3>3. Impasto</h3>
      <p>Use a palette knife combined with heavy gel medium to sculpt thick, sculptural strokes that catch light on canvas.</p>
    `,
    author: "Ananya Sharma",
    date: "July 18, 2026",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    category: "Tutorials",
    tags: ["Painting", "Acrylic", "Beginner Guide"],
    readTime: "5 min read"
  },
  {
    id: "blog-2",
    title: "How to Choose the Right Sketchbook Paper Weight (GSM Guide)",
    slug: "how-to-choose-sketchbook-paper-weight-gsm-guide",
    excerpt: "Demystifying 90 GSM vs 160 GSM vs 300 GSM papers for graphite, gouache, watercolors, and alcohol markers.",
    content: `
      <h2>Understanding Paper Weights (GSM)</h2>
      <p>Grams per Square Meter (GSM) determines paper thickness and resistance to buckling under moisture.</p>
      <ul>
        <li><strong>90 - 120 GSM:</strong> Ideal for daily quick graphite sketches, gel pens, and charcoal.</li>
        <li><strong>160 - 200 GSM:</strong> Heavyweight paper great for ink washes, colored pencils, and light acrylic washes.</li>
        <li><strong>300 GSM:</strong> Cold press watercolor paper designed to hold water without warping.</li>
      </ul>
    `,
    author: "Rajesh Kumar",
    date: "June 28, 2026",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    category: "Guides",
    tags: ["Sketchbook", "Paper", "Art Supplies"],
    readTime: "4 min read"
  }
]

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: "c1",
    code: "ANUARTS10",
    discountPercent: 10,
    minOrderValue: 299,
    expiresAt: "2026-12-31",
    isActive: true
  },
  {
    id: "c2",
    code: "WELCOME15",
    discountPercent: 15,
    maxDiscount: 200,
    minOrderValue: 499,
    expiresAt: "2026-12-31",
    isActive: true
  }
]

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Priya V.",
    role: "Fine Art Student",
    content: "The quality of acrylics and sketchbooks from Anu Arts is outstanding. Fast shipping and super eco-friendly packaging!",
    rating: 5
  },
  {
    id: "t2",
    name: "Vikram Mehta",
    role: "Hobbyist Painter",
    content: "Ordered the resin art starter kit and Camel pastels. Every single item arrived in pristine condition.",
    rating: 5
  }
]
