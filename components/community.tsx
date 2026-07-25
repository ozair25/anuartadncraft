"use client"

import { ArrowRight } from "lucide-react"
import { RibbonLabel } from "@/components/ribbon-label"

const posts = [
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop",
  "/images/community-6.png",
]

export function Community() {
  return (
    <section className="border-t border-border/50 bg-card/40 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <RibbonLabel>Our Creative Community</RibbonLabel>
            <h2 className="mt-4 font-serif text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Inspire. <span className="italic text-primary">Create.</span> Share
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground hover:text-primary"
          >
            Follow Us On Instagram
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-6">
          {posts.map((src, i) => (
            <a
              key={src}
              href="#"
              className="group relative aspect-square overflow-hidden rounded-lg border border-border/60"
            >
              <img
                src={src || "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop"}
                alt={`Community creation ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop"
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
