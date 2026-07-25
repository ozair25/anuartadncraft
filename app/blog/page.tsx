import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { INITIAL_BLOGS } from "@/lib/data/mock-db"
import { ArrowRight, Clock, User } from "lucide-react"

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <RibbonLabel>Art Studio Journal</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl">
              Tips, Tutorials &amp; <span className="italic text-primary">Guides</span>
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">
              Inspiration and techniques for artists, crafters, and DIY enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INITIAL_BLOGS.map((blog) => (
              <article
                key={blog.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:-translate-y-1 transition-transform"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">
                    {blog.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blog.author}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blog.readTime}</span>
                    </div>
                    <Link href={`/blog/${blog.slug}`}>
                      <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                  >
                    Read Full Article <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
