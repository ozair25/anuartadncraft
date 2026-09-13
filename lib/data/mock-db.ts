import { Category, Collection, Blog, Coupon, Testimonial } from "@/types/ecommerce"

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
