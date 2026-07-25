"use client"

import Link from "next/link"
import { RibbonLabel } from "@/components/ribbon-label"

const categories = [
  { label: "Painting", slug: "painting", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop" },
  { label: "Drawing", slug: "drawing", img: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop" },
  { label: "Crafting", slug: "crafting", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop" },
  { label: "DIY Kits", slug: "diy-kits", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop", badge: "New" },
  { label: "Stationery", slug: "stationery", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop" },
  { label: "Decor & More", slug: "decor-and-more", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop" },
]

export function ShopByCategory() {
  const bgImageUrl = "https://res.cloudinary.com/dtrvyelcg/image/upload/v1784128276/%D0%9E%D0%B1%D0%BE%D0%B8_dxm3wn.jpg"

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background Image - 100% opacity */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{ backgroundImage: `url('${bgImageUrl}')` }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-xl rounded-2xl bg-card/85 p-6 md:p-8 backdrop-blur-md border border-border/60 text-center shadow-lg">
          <RibbonLabel>Categories</RibbonLabel>
          <h2 className="mt-3 font-serif text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Shop By <span className="italic text-primary">Category</span>
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs font-medium text-muted-foreground md:text-sm">
            Everything you need for your creative journey, neatly organized.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={`/shop/${cat.slug}`}
              className="group flex flex-col items-center gap-3 text-center p-4 rounded-2xl bg-card/90 backdrop-blur-md border border-border/60 shadow-sm transition-all hover:bg-card hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-card bg-card shadow-[3px_3px_0_rgba(0,0,0,0.1)] transition-transform group-hover:scale-105 md:h-28 md:w-28">
                  <img
                    src={cat.img || "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop"}
                    alt={cat.label}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop"
                    }}
                  />
                </div>
                {cat.badge && (
                  <span className="absolute -right-1 top-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow">
                    {cat.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
