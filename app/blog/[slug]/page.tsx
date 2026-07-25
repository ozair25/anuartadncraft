"use client"

import { use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { INITIAL_BLOGS } from "@/lib/data/mock-db"
import { ArrowLeft, Clock, User, Share2 } from "lucide-react"

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const blogSlug = resolvedParams.slug

  const blog = INITIAL_BLOGS.find(
    (b) => b.slug.toLowerCase() === blogSlug.toLowerCase() || b.id === blogSlug
  ) || INITIAL_BLOGS[0]

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <article className="mx-auto max-w-4xl px-4 md:px-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Previous Page
          </button>

          <RibbonLabel>{blog.category}</RibbonLabel>
          <h1 className="mt-4 font-serif text-3xl font-black text-foreground md:text-5xl leading-tight">
            {blog.title}
          </h1>

          <div className="mt-4 flex items-center justify-between border-b border-border/60 pb-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <User className="h-3.5 w-3.5 text-primary" /> {blog.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-primary" /> {blog.readTime}
              </span>
              <span>•</span>
              <span>{blog.date}</span>
            </div>
            <button className="flex items-center gap-1 hover:text-primary font-bold">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-sm aspect-video">
            <img
              src={blog.image}
              alt={blog.title}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div
            className="mt-8 prose prose-neutral max-w-none text-xs md:text-sm leading-relaxed text-foreground space-y-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
            <span className="text-xs font-bold text-foreground">Tags:</span>
            {blog.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold text-foreground">
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
