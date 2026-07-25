"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { ArrowLeft, ArrowRight, Paintbrush } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-20 flex items-center justify-center text-center">
        <div className="max-w-md px-4">
          <Paintbrush className="mx-auto h-12 w-12 text-primary animate-bounce" />
          <RibbonLabel>Page Not Found</RibbonLabel>
          <h1 className="mt-4 font-serif text-4xl font-black text-foreground">
            404 <span className="italic text-primary">Masterpiece Missing</span>
          </h1>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            The page or art product you are searching for might have been moved or renamed.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-bold text-foreground shadow hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-primary" /> Go Back
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow hover:opacity-90 transition-opacity"
            >
              Back to Art Shop <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
