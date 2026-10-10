// ============================================================================
// CENTRAL TUTORIAL VIDEOS & GUIDES CONFIGURATION
// 
// Video titles, descriptions, categories, materials, and steps are centralized
// here so they can be easily updated whenever confirmed with the client.
// ============================================================================

export interface TutorialStep {
  stepNumber: number
  title: string
  instruction: string
  proTip?: string
}

export interface TutorialMaterial {
  name: string
  amount?: string
  shopCategory?: string
  shopLink?: string
}

export interface TutorialItem {
  id: string
  slug: string
  title: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  instructor: string
  videoUrl: string
  posterUrl?: string
  coverImage?: string
  shortDescription: string
  viewsCount: string
  rating: number
  reviewsCount: number
  featured?: boolean
  safetyNotes?: string
  materials: TutorialMaterial[]
  steps: TutorialStep[]
  hideSteps?: boolean
  relatedWorkshopSlug?: string
}

export const TUTORIALS_DATA: TutorialItem[] = [
  {
    id: "tutorial-1",
    slug: "mini-mandala-canvas-painting",
    title: "Mini Mandala Canvas Painting",
    category: "Mandala Art",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547548/anuart.vid3_byqfqv.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547548/anuart.vid3_byqfqv.jpg",
    shortDescription: "Master the serene art of mini mandala canvas painting with rhythmic dotting techniques and soothing color palettes.",
    viewsCount: "1.2k views",
    rating: 5.0,
    reviewsCount: 42,
    featured: true,
    hideSteps: true,
    steps: [],
    materials: [
      {
        name: "Mandala Canvas Painting Kit",
        amount: "1 kit",
        shopCategory: "diy-kits",
        shopLink: "/product/mini-mandala-kit-sma-01",
      },
    ],
  },
  {
    id: "tutorial-2",
    slug: "lippan-art",
    title: "Lippan Art",
    category: "Lippan Art",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547630/anuart.vid4_1_sxmzxm.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547630/anuart.vid4_1_sxmzxm.jpg",
    shortDescription: "Experience authentic Kutch Lippan Mud & Mirror craft. Sculpt delicate dough borders and place radiant glass mirrors.",
    viewsCount: "1.5k views",
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    hideSteps: true,
    steps: [],
    materials: [
      {
        name: "Lippan Art Kits",
        amount: "1 kit",
        shopCategory: "lippan-art-essentials",
        shopLink: "/product/evil-eye-lippan-art-kit",
      },
    ],
  },
  {
    id: "tutorial-3",
    slug: "diwali-festive-decor-6-in-1",
    title: "Diwali Festive Decor 6 in 1",
    category: "Festive Decor",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547581/anuart.vid8_jj0fyl.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547581/anuart.vid8_jj0fyl.jpg",
    shortDescription: "Create 6 vibrant handcrafted Diwali decor pieces including mirror frames, key holders, serving trays, bookmarks, and coasters.",
    viewsCount: "980 views",
    rating: 4.9,
    reviewsCount: 29,
    featured: true,
    hideSteps: true,
    steps: [],
    materials: [
      {
        name: "6 in 1 Mandala Kit",
        amount: "1 all-inclusive kit",
        shopCategory: "diy-kits",
        shopLink: "/product/6-in-1-mandala-art-home-decor-kit",
      },
    ],
  },
  {
    id: "tutorial-4",
    slug: "floral-resin-tile-tray",
    title: "Floral Resin Tile Tray",
    category: "Resin Art",
    difficulty: "Intermediate",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547578/anuart.vid7_mkzpnz.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547578/anuart.vid7_mkzpnz.jpg",
    shortDescription: "Craft a luxurious floral ceramic tile serving tray using water-transfer motifs, rich paint coats, protective varnish, and 2:1 resin.",
    viewsCount: "1.1k views",
    rating: 5.0,
    reviewsCount: 35,
    featured: false,
    hideSteps: false,
    materials: [
      {
        name: "3 Tile MDF Tray",
        amount: "1 piece",
        shopCategory: "mdf-acrylic-bases",
        shopLink: "/search?q=MDF+Tray",
      },
      {
        name: "Mini Transfer Sheet",
        amount: "1 pack",
        shopCategory: "decoupage-material",
        shopLink: "/product/10x15-6023",
      },
      {
        name: "Chalk Paints",
        amount: "Selected shades",
        shopCategory: "paints-mediums",
        shopLink: "/product/combo-10",
      },
      {
        name: "Lapox Resin",
        amount: "2:1 ratio kit",
        shopCategory: "resin-art-essentials",
        shopLink: "/search?q=Resin",
      },
      {
        name: "Varnish",
        amount: "1 bottle",
        shopCategory: "paints-mediums",
        shopLink: "/product/glossy-varnish-100-ml",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Paint the MDF Base",
        instruction: "Take a 3-tile MDF base and paint it using the colour of your choice.",
      },
      {
        stepNumber: 2,
        title: "Base Coat Coasters",
        instruction: "Paint the coasters white.",
      },
      {
        stepNumber: 3,
        title: "Cut Transfer Sheet Prints",
        instruction: "Choose your favourite prints from the transfer sheets and cut them into the required shapes.",
      },
      {
        stepNumber: 4,
        title: "Apply Water Transfer Motifs",
        instruction: "Apply water to the transfer sheets and gently slide the designs into place.",
      },
      {
        stepNumber: 5,
        title: "Seal with Varnish & Pour 2:1 Resin",
        instruction: "Apply varnish to seal the design. Prepare the resin in a 2:1 ratio and pour it over the tray.",
        proTip: "Ensure the varnish is completely dry before pouring the mixed 2:1 resin to guarantee a flawless, mirror-like finish.",
      },
    ],
  },
  {
    id: "tutorial-5",
    slug: "festive-resin-trinket",
    title: "Festive Resin Trinket",
    category: "Resin Art",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547546/anuarts.vid5_n9de1c.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547546/anuarts.vid5_n9de1c.jpg",
    shortDescription: "Design an ornate festive trinket dish featuring smooth gradient shading, water-transfer art, varnish sealing, and kundan embellishments.",
    viewsCount: "1.3k views",
    rating: 4.8,
    reviewsCount: 31,
    featured: false,
    hideSteps: false,
    materials: [
      {
        name: "Trinket Tray Base",
        amount: "1 piece",
        shopCategory: "mdf-acrylic-bases",
        shopLink: "/search?q=Trinket+Tray",
      },
      {
        name: "Mini Transfer Sheet",
        amount: "1 pack",
        shopCategory: "decoupage-material",
        shopLink: "/product/10x15-6023",
      },
      {
        name: "Chalk Paints",
        amount: "Shading colors",
        shopCategory: "paints-mediums",
        shopLink: "/product/combo-10",
      },
      {
        name: "Matt Varnish",
        amount: "1 bottle",
        shopCategory: "paints-mediums",
        shopLink: "/product/matt-varnish-100-ml",
      },
      {
        name: "Beads",
        amount: "Decorative pack",
        shopCategory: "accessories",
        shopLink: "/product/glass-beads-yellow",
      },
      {
        name: "Lapox Resin",
        amount: "2:1 ratio kit",
        shopCategory: "resin-art-essentials",
        shopLink: "/search?q=Resin",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Create Shaded Effect on Base",
        instruction: "Take an MDF trinket tray base and apply the colours of your choice to create a shaded effect.",
      },
      {
        stepNumber: 2,
        title: "Size & Place Transfer Sheet",
        instruction: "Take a water-transfer sheet, cut it to the required size, and place it on the tray.",
      },
      {
        stepNumber: 3,
        title: "Dab Water & Slide Off",
        instruction: "Apply water, let it rest, and gently slide or peel off the transfer sheet.",
      },
      {
        stepNumber: 4,
        title: "Splashes & Varnish Seal",
        instruction: "Add paint splashes and seal the design with varnish.",
      },
      {
        stepNumber: 5,
        title: "Mix & Pour 2:1 Resin",
        instruction: "Prepare the resin in a 2:1 ratio, mix it properly, and pour it onto the tray.",
      },
      {
        stepNumber: 6,
        title: "Kundan Embellishments & Cure",
        instruction: "Decorate the tray with kundan embellishments and allow it to dry completely.",
        proTip: "Press kundan stones gently into the wet resin using craft tweezers so they set firmly as the resin cures.",
      },
    ],
  },
  {
    id: "tutorial-6",
    slug: "bottle-upcycle",
    title: "Bottle Upcycle",
    category: "Upcycling",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547513/anuart.vid6_fvgqdu.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547513/anuart.vid6_fvgqdu.jpg",
    shortDescription: "Upcycle glass bottles into enchanting home decor accents using chalk paints, precision water transfers, and durable varnish.",
    viewsCount: "870 views",
    rating: 4.9,
    reviewsCount: 24,
    featured: false,
    hideSteps: false,
    materials: [
      {
        name: "Cream Pie Chalk Paint — 100 ml",
        amount: "100 ml",
        shopCategory: "paints-mediums",
        shopLink: "/product/cream-pie-100-ml",
      },
      {
        name: "Mini Transfer Sheet",
        amount: "1 pack",
        shopCategory: "decoupage-material",
        shopLink: "/product/10x15-6023",
      },
      {
        name: "Matt Varnish",
        amount: "1 bottle",
        shopCategory: "paints-mediums",
        shopLink: "/product/matt-varnish-100-ml",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Chalk Paint Base",
        instruction: "Apply a layer of chalk paint to the surface of the bottle.",
      },
      {
        stepNumber: 2,
        title: "Cut Transfer Shape",
        instruction: "Once the paint has dried, take a water-transfer sheet and cut it into the required shape.",
      },
      {
        stepNumber: 3,
        title: "Position & Water Dab",
        instruction: "Peel off the film, place the design on the bottle, and dab it with water.",
      },
      {
        stepNumber: 4,
        title: "Rest & Slide Transfer Off",
        instruction: "Allow it to rest for one minute, then gently peel or slide the transfer sheet off, as preferred.",
      },
      {
        stepNumber: 5,
        title: "Varnish Seal",
        instruction: "Seal the finished design with varnish.",
        proTip: "Allow 24 hours of curing before handling or displaying to let the varnish bond tightly to the painted glass.",
      },
    ],
  },
]

// Dynamically derived list of categories to support easy updates when client confirms final categories
export const TUTORIAL_CATEGORIES = [
  "All Tutorials",
  ...Array.from(new Set(TUTORIALS_DATA.map((t) => t.category).filter(Boolean))),
] as const
