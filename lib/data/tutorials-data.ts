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
  category: "Resin Art" | "Lippan Art" | "Decoupage" | "Alcohol Inks" | "Canvas & Acrylic" | "Candles & Clay" | "DIY Crafts"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  instructor: string
  coverImage: string
  videoUrl?: string
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

export const TUTORIAL_CATEGORIES = [
  "All Crafts",
  "Resin Art",
  "Lippan Art",
  "Decoupage",
  "Alcohol Inks",
  "Canvas & Acrylic",
  "Candles & Clay",
  "DIY Crafts",
] as const

export const TUTORIALS_DATA: TutorialItem[] = [
  {
    id: "tut-resin-ocean-waves",
    slug: "realistic-resin-ocean-waves-lacing",
    title: "Realistic Resin Ocean Waves & Foam Lacing on Round Pine Base",
    category: "Resin Art",
    difficulty: "Beginner",
    duration: "45 Mins + 24h Curing",
    instructor: "Yashaswee Sanghavi (Master Resin Artist)",
    coverImage: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791472095/anuarts.vid1_1_o3f0w5.mp4",
    shortDescription: "Learn how to blend turquoise, deep ocean blue, and translucent teal resin pigments, and blow realistic white foam cells using a heat gun.",
    viewsCount: "4.8k crafters",
    rating: 4.9,
    reviewsCount: 142,
    featured: true,
    safetyNotes: "Always work in a well-ventilated room with nitrile gloves. Wear an organic vapor mask when using heat guns.",
    materials: [
      { name: "2:1 Ultra-Clear Epoxy Resin Kit (300g)", amount: "300g pack", shopCategory: "resin-art" },
      { name: "White Wave Cell Pigment Paste", amount: "30g jar", shopCategory: "resin-art" },
      { name: "Ocean Pigment Set (Turquoise, Royal Blue, Seafoam)", amount: "3 shades", shopCategory: "resin-art" },
      { name: "12-Inch Pre-sanded Round MDF / Pine Base", amount: "1 piece", shopCategory: "mdf-bases" },
      { name: "Silicone Mixing Cups & Stirring Sticks", amount: "4 cups + sticks", shopCategory: "resin-tools" },
      { name: "Variable Temp Heat Gun or Butane Micro Torch", amount: "1 tool", shopCategory: "resin-tools" },
      { name: "Painter's Tape (Blue) & Spirit Level", amount: "1 roll", shopCategory: "craft-essentials" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Base Prep & Levelling",
        instruction: "Tape the back edge of your round wooden base with painter's tape to catch resin drips. Elevate the base evenly on 4 plastic cups and check with a spirit level to ensure a perfectly flat surface.",
        proTip: "If your room temperature is below 22°C, place your Part A resin bottle in lukewarm water for 8 minutes to eliminate air bubbles before mixing."
      },
      {
        stepNumber: 2,
        title: "Precise Resin Ratio & Thorough Mixing",
        instruction: "Using a digital scale, weigh 200g of Part A (Resin) and 100g of Part B (Hardener). Mix slowly and deliberately in one direction for 4 continuous minutes, scraping the walls and bottom of the cup.",
        proTip: "Never whip the resin vigorously; slow, rhythmic scraping minimizes micro-bubble formation."
      },
      {
        stepNumber: 3,
        title: "Color Division & Gradient Pour",
        instruction: "Divide resin into 4 smaller cups: Deep Navy (40%), Cyan Turquoise (30%), Seafoam (20%), and Clear (10%). Pour the deep navy along the top edge, followed by turquoise and clear sand-tone. Blend the seams gently with your gloved fingers.",
      },
      {
        stepNumber: 4,
        title: "Creating the White Ocean Foam Lacing",
        instruction: "Mix a dollop of White Wave Cell paste into 30ml of clear resin. Drizzle a thin horizontal line across the boundary between colors. Hold your heat gun at a 45-degree angle on low speed, pushing the white line gently toward the beach to stretch the pigment into realistic lacing cells.",
        proTip: "Swipe once smoothly with the heat gun—don't hover in one spot or the resin will scorch and lose its cell structure."
      },
      {
        stepNumber: 5,
        title: "Torch & Dust-Free Curing",
        instruction: "Pass a butane torch 2 inches above the surface in sweeping motions to pop any surface micro-bubbles. Cover immediately with a clean inverted plastic tub and leave untouched for 24 hours.",
      }
    ],
    relatedWorkshopSlug: "ws-ocean-resin"
  },
  {
    id: "tut-lippan-art-traditional",
    slug: "traditional-kutch-lippan-mud-mirror-art",
    title: "Traditional Kutch Lippan Mud & Mirror Craft for Beginners",
    category: "Lippan Art",
    difficulty: "Beginner",
    duration: "60 Mins + Drying",
    instructor: "Yashaswee Sanghavi (Studio Master)",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791472117/anuarts.vid2_1_qw8cpb.mp4",
    shortDescription: "Master the heritage mud-wash art of Gujarat using smooth clay dough, geometric cord rolling, and authentic convex glass mirrors (Aabhla).",
    viewsCount: "6.2k crafters",
    rating: 5.0,
    reviewsCount: 198,
    featured: true,
    safetyNotes: "Handle small glass mirrors carefully with craft tweezers. Keep wet clay dough sealed in airtight wrap.",
    materials: [
      { name: "Smooth Lippan Ceramic Clay / Dough", amount: "500g pouch", shopCategory: "lippan-art" },
      { name: "Fevicryl Craft Glue / Lippan Adhesive", amount: "100ml bottle", shopCategory: "craft-essentials" },
      { name: "Mixed Shapes Glass Mirrors (Round, Eye, Diamond, Triangle)", amount: "300+ pieces", shopCategory: "lippan-art" },
      { name: "10x10 Inch Pre-Cut Primed MDF Board", amount: "1 piece", shopCategory: "mdf-bases" },
      { name: "Clay Modelling Tools & Smooth Rolling Mat", amount: "1 tool set", shopCategory: "lippan-art" },
      { name: "White Chalk Paint / Gesso Basecoat", amount: "100ml bottle", shopCategory: "paints" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Base Grid & Pencil Layout",
        instruction: "Prime your MDF board with a solid white chalk paint base. Once dry, use a compass and ruler to pencil out traditional mandala concentric circles and 8-point radial lines.",
        proTip: "Keep lines very light with a 2B pencil so they easily hide beneath the clay dough and chalk paint."
      },
      {
        stepNumber: 2,
        title: "Kneading & Rolling Uniform Clay Coils",
        instruction: "Take walnut-sized balls of Lippan dough and roll between your palms and a smooth glass tile to create long, uniform spaghetti-thin clay coils (approximately 3mm diameter).",
        proTip: "Rub a drop of talcum powder or baby oil on your palms to prevent clay from sticking and ensure silky-smooth coils."
      },
      {
        stepNumber: 3,
        title: "Border Laying & Texturing",
        instruction: "Apply a fine line of craft glue along your pencil guidelines. Press your clay coil along the glue line. Use a modelling needle or toothpick to indent fine diagonal hatches or decorative beads along the coil.",
      },
      {
        stepNumber: 4,
        title: "Embedding the Mirrors (Aabhla)",
        instruction: "Dip each mirror reverse in craft glue and press gently into the damp clay chambers. The clay borders should lightly hug the mirror edges without overflowing onto the reflective glass.",
      },
      {
        stepNumber: 5,
        title: "Finishing & Cleaning",
        instruction: "Allow clay to dry completely for 12 hours. Wipe mirror surfaces clean with a cotton swab dipped in isopropyl alcohol to restore diamond-bright sparkle.",
      }
    ],
    relatedWorkshopSlug: "ws-lippan-art"
  },
  {
    id: "tut-vintage-decoupage",
    slug: "vintage-tea-box-decoupage-rice-paper",
    title: "Vintage Decoupage on MDF Box with Rice Paper & Crackle Finish",
    category: "Decoupage",
    difficulty: "Beginner",
    duration: "40 Mins",
    instructor: "Yashaswee Sanghavi",
    coverImage: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Transform plain MDF storage boxes into heirloom vintage treasures using botanical rice paper, Mod Podge decoupage glue, and aged crackle glaze.",
    viewsCount: "3.5k crafters",
    rating: 4.8,
    reviewsCount: 89,
    materials: [
      { name: "Botanical Floral Rice Paper Sheet (A4)", amount: "1 sheet", shopCategory: "decoupage" },
      { name: "Matte Decoupage Glue & Sealer (Mod Podge)", amount: "120ml jar", shopCategory: "decoupage" },
      { name: "2-Step Crackle Medium Set", amount: "50ml pack", shopCategory: "decoupage" },
      { name: "Raw MDF Trinket / Tea Box", amount: "1 piece", shopCategory: "mdf-bases" },
      { name: "Soft Flat Synthetic Bristle Brush (1-inch)", amount: "1 brush", shopCategory: "brushes" },
      { name: "Antique Brown Chalk Paint & Gold Wax", amount: "1 jar", shopCategory: "paints" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Priming with Ivory Chalk Paint",
        instruction: "Sand the raw MDF box smooth. Apply two coats of Ivory or Off-White chalk paint. Rice paper becomes slightly translucent when wet, so a pale background ensures the printed floral vibrancy shines through.",
        proTip: "Never use dark paint beneath decoupage napkins or rice paper, or the illustrations will look muddy."
      },
      {
        stepNumber: 2,
        title: "Feathering Rice Paper Edges",
        instruction: "Do not cut the paper with sharp scissors! Wet a thin paintbrush with water and trace the borders of the floral design, then gently tear the paper with your fingers to create soft, feathery borders that blend seamlessly into the paint.",
      },
      {
        stepNumber: 3,
        title: "Bubble-Free Decoupage Paste Application",
        instruction: "Coat the MDF lid generously with Mod Podge. Lay the rice paper down starting from the center outward. Place a piece of plastic cling wrap over the paper and smooth from center to edge with your fingers to banish all trapped air bubbles.",
      },
      {
        stepNumber: 4,
        title: "Applying Crackle Glaze & Antique Patina",
        instruction: "Apply Crackle Step 1 evenly and allow to dry clear. Follow with Crackle Step 2 to generate organic porcelain fissures. Rub a tiny dab of burnt umber pigment or gold wax into the fissures and buff with a soft cloth.",
      }
    ],
    relatedWorkshopSlug: "ws-decoupage"
  },
  {
    id: "tut-alcohol-ink-blooms",
    slug: "alcohol-ink-fluid-blooms-brass-accents",
    title: "Alcohol Ink Fluid Blooms with Metallic Brass Ring Accents on Yupo",
    category: "Alcohol Inks",
    difficulty: "Intermediate",
    duration: "35 Mins",
    instructor: "Yashaswee Sanghavi",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Create dreamy organic floral petals and shimmering metallic boundaries on synthetic non-porous Yupo paper with blending solution and air blowers.",
    viewsCount: "2.9k crafters",
    rating: 4.9,
    reviewsCount: 76,
    safetyNotes: "Work near an open window. 99% Isopropyl alcohol is flammable; keep away from heaters and open flames.",
    materials: [
      { name: "Fast-Drying Alcohol Inks (Magenta, Sapphire, Emerald)", amount: "3 bottles (15ml)", shopCategory: "alcohol-inks" },
      { name: "Rich Metallic Brass / Gold Alcohol Ink", amount: "1 bottle", shopCategory: "alcohol-inks" },
      { name: "99% Isopropyl Alcohol Blending Solution", amount: "100ml bottle", shopCategory: "alcohol-inks" },
      { name: "Heavyweight Synthetic Yupo Paper (300 GSM A4)", amount: "3 sheets", shopCategory: "papers" },
      { name: "Precision Hand Air Blower Bulb", amount: "1 tool", shopCategory: "craft-essentials" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Creating the Alcohol Puddle",
        instruction: "Drip a quarter-sized puddle of blending solution in the center of your smooth Yupo sheet. Drop one droplet of Magenta ink and one droplet of Sapphire directly into the center.",
        proTip: "Shake the metallic brass bottle vigorously until the metal ball rattles loudly—metallic pigments settle quickly at the bottle bottom!"
      },
      {
        stepNumber: 2,
        title: "Blowing Gentle Bloom Petals",
        instruction: "Position the hand air blower nozzle 1 inch above the edge of the puddle at a shallow 30-degree angle. Gently pulse air from the outside edge back toward the center to create fine rippled petal ridges.",
      },
      {
        stepNumber: 3,
        title: "Adding the Shimmering Brass Rings",
        instruction: "Add a single drop of metallic brass into the drying inner boundary and blow outward across the petal edges. The alcohol evaporates in seconds, leaving an ornate gilded contour.",
      },
      {
        stepNumber: 4,
        title: "Sealing the Artwork",
        instruction: "Alcohol ink on Yupo can easily re-activate if touched with moisture. Spray with two light coats of UV archival spray varnish from a 12-inch distance.",
      }
    ],
    relatedWorkshopSlug: "ws-alcohol-ink"
  },
  {
    id: "tut-canvas-impasto-knife",
    slug: "3d-textured-floral-impasto-knife-painting",
    title: "3D Textured Floral Impasto with Palette Knife & Heavy Gel",
    category: "Canvas & Acrylic",
    difficulty: "Intermediate",
    duration: "50 Mins + Drying",
    instructor: "Yashaswee Sanghavi",
    coverImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Sculpt lush, three-dimensional rose petals and foliage on stretched canvas using flexible Italian palette knives and heavy-body acrylic paste.",
    viewsCount: "3.8k crafters",
    rating: 5.0,
    reviewsCount: 114,
    materials: [
      { name: "Heavy Modelling Texture Paste", amount: "500g tub", shopCategory: "paints" },
      { name: "Heavy Body Artists' Acrylics (Crimson, Ochre, Olive)", amount: "4 tubes", shopCategory: "paints" },
      { name: "Flexible Stainless Steel Palette Knives (No. 1, 3, 5)", amount: "3-piece set", shopCategory: "tools" },
      { name: "10x12 Inch Stretched Cotton Canvas", amount: "1 piece", shopCategory: "canvas" },
      { name: "Flat Acrylic Base Background Brush", amount: "1 brush", shopCategory: "brushes" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Tonal Canvas Wash Background",
        instruction: "Apply an atmospheric muted beige and sage wash on your canvas with broad horizontal brush strokes to provide depth and contrast for your sculptured flowers.",
      },
      {
        stepNumber: 2,
        title: "Mixing 50:50 Paint & Modelling Paste",
        instruction: "On your palette, blend equal parts heavy acrylic paint with modelling paste using the flat back of your palette knife until smooth like cake frosting.",
        proTip: "Do not overwork the paste or whip air into it; maintain thick, buttery peaks on your knife blade."
      },
      {
        stepNumber: 3,
        title: "Sculpting Rose Petals with the Knife Edge",
        instruction: "Scoop a bead of paste along the rounded edge of Palette Knife No. 3. Touch the knife to the canvas at a 20-degree angle, press gently, and twist the wrist as you pull away to leave an elevated curved petal.",
      },
      {
        stepNumber: 4,
        title: "Leaves & Stems Sculpting",
        instruction: "Switch to a thin diamond knife loaded with olive green paste. Cut long trailing stems and flick the knife tip outward to form sharp organic leaves.",
      }
    ],
    relatedWorkshopSlug: "ws-acrylic-painting"
  },
  {
    id: "tut-uv-resin-botanical-jewellery",
    slug: "uv-resin-pressed-flower-jewellery-charms",
    title: "UV Resin Pressed Flower Jewellery & Bookmark Pendants",
    category: "Resin Art",
    difficulty: "Beginner",
    duration: "30 Mins",
    instructor: "Yashaswee Sanghavi",
    coverImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Fast, zero-mess crystal jewellery! Preserve miniature real dried forget-me-nots, baby's breath, and gold foil inside open metal bezels using 36W UV light.",
    viewsCount: "5.1k crafters",
    rating: 4.9,
    reviewsCount: 167,
    materials: [
      { name: "Crystal-Clear UV Resin (Hard Type)", amount: "60g bottle", shopCategory: "resin-art" },
      { name: "Assorted Real Dried Pressed Miniature Flowers", amount: "1 organizer box", shopCategory: "resin-art" },
      { name: "Geometrical Hollow Metal Bezels (Gold & Silver)", amount: "10 pieces", shopCategory: "diy-kits" },
      { name: "36W UV LED Curing Lamp", amount: "1 lamp", shopCategory: "resin-tools" },
      { name: "Fine-Tip Precision Tweezers & Silicone Mat", amount: "1 set", shopCategory: "craft-essentials" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Taping the Bezel Base",
        instruction: "Affix special heat-resistant UV tape firmly across the back of each hollow metal bezel to create a leak-proof temporary bottom.",
      },
      {
        stepNumber: 2,
        title: "First Thin Adhesive Layer",
        instruction: "Squeeze a paper-thin layer of UV resin into the bezel. Spread evenly into all corners with a toothpick. Cure under the UV lamp for 60 seconds.",
      },
      {
        stepNumber: 3,
        title: "Arranging Real Pressed Botanicals",
        instruction: "Dip miniature pressed flowers in a drop of resin and place them gently onto the cured base using tweezers. Add flakes of gold leaf around the blossoms. Flash-cure for 30 seconds to lock them into position.",
        proTip: "Pre-coating dry flowers with a tiny smear of resin prevents air pockets from escaping into your top dome."
      },
      {
        stepNumber: 4,
        title: "Creating the High-Gloss Curved Dome",
        instruction: "Squeeze a generous bead of UV resin onto the center until surface tension rounds it into an elegant glossy dome. Cure under the 36W UV lamp for 3 full minutes.",
      }
    ],
    relatedWorkshopSlug: "ws-ocean-resin"
  },
  {
    id: "tut-aromatherapy-soy-candles",
    slug: "botanical-aromatherapy-soy-wax-candles",
    title: "Hand-Poured Soy Wax Candles with Dried Botanicals & Crystals",
    category: "Candles & Clay",
    difficulty: "Beginner",
    duration: "40 Mins + Cooling",
    instructor: "Yashaswee Sanghavi",
    coverImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Craft clean-burning, non-toxic organic soy wax candles infused with essential lavender oils, rose quartz crystals, and garden botanicals.",
    viewsCount: "2.4k crafters",
    rating: 4.8,
    reviewsCount: 65,
    materials: [
      { name: "Natural Pure Soy Wax Flakes", amount: "500g bag", shopCategory: "diy-kits" },
      { name: "Pure Essential Oil (Lavender & Bergamot)", amount: "20ml bottle", shopCategory: "diy-kits" },
      { name: "Natural Cotton Wicks with Metal Sustainer Tabs", amount: "4 wicks", shopCategory: "craft-essentials" },
      { name: "Amber Glass Jars with Cork / Metal Lids", amount: "2 jars (200ml)", shopCategory: "craft-essentials" },
      { name: "Dried Jasmine Buds, Rose Petals & Mini Crystals", amount: "1 pack", shopCategory: "craft-essentials" },
      { name: "Candy / Candle Pouring Thermometer", amount: "1 tool", shopCategory: "craft-essentials" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Wick Placement & Jar Warming",
        instruction: "Glue the cotton wick tab securely into the center bottom of your amber jar using a wick sticker or glue dot. Secure the wick upright using a wooden centering stick.",
      },
      {
        stepNumber: 2,
        title: "Gentle Double-Boiler Melting",
        instruction: "Melt soy wax flakes slowly in a pouring pitcher over a double boiler until fully liquid and reaching 80°C (175°F). Remove from heat source.",
        proTip: "Never overheat soy wax beyond 85°C, as it scorches and develops a bumpy frosting surface."
      },
      {
        stepNumber: 3,
        title: "Fragrance Infusion & Pouring",
        instruction: "Allow the wax to cool to 60°C (140°F), then stir in 8% essential oil for two minutes. Pour slowly into your glass jars, leaving 1/2 inch of space at the rim.",
      },
      {
        stepNumber: 4,
        title: "Topping with Crystals & Botanicals",
        instruction: "Wait 25-30 minutes until the top surface starts developing an opaque skin. Gently press mini crystals and dried rose petals into the semi-solid top layer.",
      }
    ],
    relatedWorkshopSlug: "ws-specialty"
  },
  {
    id: "tut-terracotta-clay-incense",
    slug: "terracotta-clay-incense-burner-waterproof-glaze",
    title: "Terracotta Clay Incense Burner Sculpting & Waterproof Glaze",
    category: "Candles & Clay",
    difficulty: "Beginner",
    duration: "50 Mins + Drying",
    instructor: "Yashaswee Sanghavi",
    coverImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Sculpt organic leaf-shaped dhoop and agarbatti holders using air-dry terracotta clay, natural leaf imprint textures, and a waterproof varnish.",
    viewsCount: "1.9k crafters",
    rating: 4.8,
    reviewsCount: 52,
    materials: [
      { name: "Fine Air-Dry Natural Terracotta Clay", amount: "1kg pouch", shopCategory: "diy-kits" },
      { name: "Fresh Monstera or Ficus Leaf (for vein printing)", amount: "1 leaf", shopCategory: "craft-essentials" },
      { name: "Clay Rolling Pin & Carving Needle", amount: "1 tool set", shopCategory: "lippan-art" },
      { name: "Waterproof Gloss Clay Varnish", amount: "100ml bottle", shopCategory: "paints" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Rolling the Clay Slab",
        instruction: "Knead air-dry terracotta clay until warm and elastic. Roll into a smooth, even slab about 6mm thick.",
      },
      {
        stepNumber: 2,
        title: "Leaf Vein Impression",
        instruction: "Lay a fresh textured leaf vein-side down onto the clay. Roll over firmly with your rolling pin once. Peel the leaf back carefully to reveal ultra-crisp botanical veins.",
      },
      {
        stepNumber: 3,
        title: "Shaping into a Dish & Incense Hole",
        instruction: "Cut the leaf outline with a clay needle. Lift the edges gently into an elongated concave curve using crumpled paper supports. Poke a 3mm angled hole at the leaf stem to hold incense sticks.",
      },
      {
        stepNumber: 4,
        title: "Drying & Waterproof Glaze",
        instruction: "Let air dry for 48 hours away from direct heat to prevent warping. Brush two thick coats of waterproof gloss varnish to seal against incense ash.",
      }
    ],
    relatedWorkshopSlug: "ws-specialty"
  }
]
