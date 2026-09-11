"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RibbonLabel } from "@/components/ribbon-label"
import { useShopifyCollections } from "@/lib/shopify/hooks"

const DEFAULT_COLLECTIONS = [
  { title: "Acrylic Painting Essentials", slug: "acrylic-painting-essentials", img: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1784974074/download_20_eq14mc.jpg" },
  { title: "DIY Craft Kits For All Ages", slug: "diy-craft-kits-for-all-ages", img: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1784974233/184K_views_2_3K_reactions___Ideas_con_botellas_recicladas_%EF%B8%8F____fblifestyle___Arte_Sano_Creativo___Facebook_pryqci.jpg" },
  { title: "Art Journal Essentials", slug: "art-journal-essentials", img: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1784974074/download_22_raxeud.jpg" },
  { title: "Home Decor & More", slug: "home-decor-and-more", img: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1784974074/download_23_oi3f4o.jpg" },
]

export function CuratedCollections() {
  const { collections: shopifyCollections } = useShopifyCollections()

  const collections =
    shopifyCollections && shopifyCollections.length >= 2
      ? shopifyCollections.slice(0, 4).map((c, i) => ({
          title: c.name,
          slug: c.slug,
          img: c.image || DEFAULT_COLLECTIONS[i % DEFAULT_COLLECTIONS.length].img,
        }))
      : DEFAULT_COLLECTIONS
  return (
    <section className="bg-cream-dark/40 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <RibbonLabel>Handpicked</RibbonLabel>
            <h2 className="mt-4 font-serif text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Curated <span className="italic text-primary">Collections</span>
            </h2>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground hover:text-primary"
          >
            Explore All Collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((col) => (
            <Link key={col.title} href={`/collections/${col.slug}`}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-[4px_4px_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={col.img || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop"}
                    alt={col.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop"
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                  <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {col.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Shop Collection
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
