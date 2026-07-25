"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { INITIAL_COLLECTIONS } from "@/lib/data/mock-db"
import { ArrowRight } from "lucide-react"

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8">
            <RibbonLabel>Curated Art Themes</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
              Curated Art <span className="italic text-primary">Collections</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Handpicked complete supplies bundles designed for specific mediums, hobbies, and artistic journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INITIAL_COLLECTIONS.map((col) => (
              <Link key={col.id} href={`/collections/${col.slug}`}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-[4px_4px_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={col.image || "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop"}
                      alt={col.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop"
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {col.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{col.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
                      Explore Collection ({col.productCount} Items)
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
