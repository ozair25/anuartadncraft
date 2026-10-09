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
  amount: string
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
  relatedWorkshopSlug?: string
}

export const TUTORIALS_DATA: TutorialItem[] = [
  {
    id: "tutorial-1",
    slug: "tutorial-1",
    title: "Tutorial 1",
    category: "Tutorial",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547548/anuart.vid3_byqfqv.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547548/anuart.vid3_byqfqv.jpg",
    shortDescription: "Step-by-step masterclass video tutorial from Anu Arts & Craft Studio.",
    viewsCount: "1.2k views",
    rating: 5.0,
    reviewsCount: 42,
    featured: true,
    materials: [
      { name: "Art & Craft Supplies Kit", amount: "1 kit", shopCategory: "diy-kits" },
      { name: "Crafting Tools & Brushes", amount: "1 set", shopCategory: "craft-essentials" },
      { name: "MDF / Base Surface", amount: "1 piece", shopCategory: "mdf-bases" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Watch the Video Tutorial",
        instruction: "Follow along with the hands-on video demonstration guided by Anu Arts & Craft Studio.",
      },
      {
        stepNumber: 2,
        title: "Prepare Your Materials",
        instruction: "Arrange the recommended tools, surfaces, and materials in a clean, well-lit workspace.",
      },
      {
        stepNumber: 3,
        title: "Complete the Artwork",
        instruction: "Apply the demonstrated techniques step-by-step and let the piece dry/cure completely.",
      },
    ],
  },
  {
    id: "tutorial-2",
    slug: "tutorial-2",
    title: "Tutorial 2",
    category: "Tutorial",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547630/anuart.vid4_1_sxmzxm.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547630/anuart.vid4_1_sxmzxm.jpg",
    shortDescription: "Step-by-step masterclass video tutorial from Anu Arts & Craft Studio.",
    viewsCount: "1.5k views",
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    materials: [
      { name: "Art & Craft Supplies Kit", amount: "1 kit", shopCategory: "diy-kits" },
      { name: "Crafting Tools & Brushes", amount: "1 set", shopCategory: "craft-essentials" },
      { name: "MDF / Base Surface", amount: "1 piece", shopCategory: "mdf-bases" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Watch the Video Tutorial",
        instruction: "Follow along with the hands-on video demonstration guided by Anu Arts & Craft Studio.",
      },
      {
        stepNumber: 2,
        title: "Prepare Your Materials",
        instruction: "Arrange the recommended tools, surfaces, and materials in a clean, well-lit workspace.",
      },
      {
        stepNumber: 3,
        title: "Complete the Artwork",
        instruction: "Apply the demonstrated techniques step-by-step and let the piece dry/cure completely.",
      },
    ],
  },
  {
    id: "tutorial-3",
    slug: "tutorial-3",
    title: "Tutorial 3",
    category: "Tutorial",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547581/anuart.vid8_jj0fyl.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547581/anuart.vid8_jj0fyl.jpg",
    shortDescription: "Step-by-step masterclass video tutorial from Anu Arts & Craft Studio.",
    viewsCount: "980 views",
    rating: 4.9,
    reviewsCount: 29,
    featured: true,
    materials: [
      { name: "Art & Craft Supplies Kit", amount: "1 kit", shopCategory: "diy-kits" },
      { name: "Crafting Tools & Brushes", amount: "1 set", shopCategory: "craft-essentials" },
      { name: "MDF / Base Surface", amount: "1 piece", shopCategory: "mdf-bases" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Watch the Video Tutorial",
        instruction: "Follow along with the hands-on video demonstration guided by Anu Arts & Craft Studio.",
      },
      {
        stepNumber: 2,
        title: "Prepare Your Materials",
        instruction: "Arrange the recommended tools, surfaces, and materials in a clean, well-lit workspace.",
      },
      {
        stepNumber: 3,
        title: "Complete the Artwork",
        instruction: "Apply the demonstrated techniques step-by-step and let the piece dry/cure completely.",
      },
    ],
  },
  {
    id: "tutorial-4",
    slug: "tutorial-4",
    title: "Tutorial 4",
    category: "Tutorial",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547578/anuart.vid7_mkzpnz.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547578/anuart.vid7_mkzpnz.jpg",
    shortDescription: "Step-by-step masterclass video tutorial from Anu Arts & Craft Studio.",
    viewsCount: "1.1k views",
    rating: 5.0,
    reviewsCount: 35,
    featured: false,
    materials: [
      { name: "Art & Craft Supplies Kit", amount: "1 kit", shopCategory: "diy-kits" },
      { name: "Crafting Tools & Brushes", amount: "1 set", shopCategory: "craft-essentials" },
      { name: "MDF / Base Surface", amount: "1 piece", shopCategory: "mdf-bases" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Watch the Video Tutorial",
        instruction: "Follow along with the hands-on video demonstration guided by Anu Arts & Craft Studio.",
      },
      {
        stepNumber: 2,
        title: "Prepare Your Materials",
        instruction: "Arrange the recommended tools, surfaces, and materials in a clean, well-lit workspace.",
      },
      {
        stepNumber: 3,
        title: "Complete the Artwork",
        instruction: "Apply the demonstrated techniques step-by-step and let the piece dry/cure completely.",
      },
    ],
  },
  {
    id: "tutorial-5",
    slug: "tutorial-5",
    title: "Tutorial 5",
    category: "Tutorial",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547546/anuarts.vid5_n9de1c.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547546/anuarts.vid5_n9de1c.jpg",
    shortDescription: "Step-by-step masterclass video tutorial from Anu Arts & Craft Studio.",
    viewsCount: "1.3k views",
    rating: 4.8,
    reviewsCount: 31,
    featured: false,
    materials: [
      { name: "Art & Craft Supplies Kit", amount: "1 kit", shopCategory: "diy-kits" },
      { name: "Crafting Tools & Brushes", amount: "1 set", shopCategory: "craft-essentials" },
      { name: "MDF / Base Surface", amount: "1 piece", shopCategory: "mdf-bases" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Watch the Video Tutorial",
        instruction: "Follow along with the hands-on video demonstration guided by Anu Arts & Craft Studio.",
      },
      {
        stepNumber: 2,
        title: "Prepare Your Materials",
        instruction: "Arrange the recommended tools, surfaces, and materials in a clean, well-lit workspace.",
      },
      {
        stepNumber: 3,
        title: "Complete the Artwork",
        instruction: "Apply the demonstrated techniques step-by-step and let the piece dry/cure completely.",
      },
    ],
  },
  {
    id: "tutorial-6",
    slug: "tutorial-6",
    title: "Tutorial 6",
    category: "Tutorial",
    difficulty: "Beginner",
    duration: "Watch Video",
    instructor: "Anu Arts & Craft Studio",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547513/anuart.vid6_fvgqdu.mp4",
    posterUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791547513/anuart.vid6_fvgqdu.jpg",
    shortDescription: "Step-by-step masterclass video tutorial from Anu Arts & Craft Studio.",
    viewsCount: "870 views",
    rating: 4.9,
    reviewsCount: 24,
    featured: false,
    materials: [
      { name: "Art & Craft Supplies Kit", amount: "1 kit", shopCategory: "diy-kits" },
      { name: "Crafting Tools & Brushes", amount: "1 set", shopCategory: "craft-essentials" },
      { name: "MDF / Base Surface", amount: "1 piece", shopCategory: "mdf-bases" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Watch the Video Tutorial",
        instruction: "Follow along with the hands-on video demonstration guided by Anu Arts & Craft Studio.",
      },
      {
        stepNumber: 2,
        title: "Prepare Your Materials",
        instruction: "Arrange the recommended tools, surfaces, and materials in a clean, well-lit workspace.",
      },
      {
        stepNumber: 3,
        title: "Complete the Artwork",
        instruction: "Apply the demonstrated techniques step-by-step and let the piece dry/cure completely.",
      },
    ],
  },
]

// Dynamically derived list of categories to support easy updates when client confirms final categories
export const TUTORIAL_CATEGORIES = [
  "All Tutorials",
  ...Array.from(new Set(TUTORIALS_DATA.map((t) => t.category).filter(Boolean))),
] as const
