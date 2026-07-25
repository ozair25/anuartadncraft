"use client"

import { useEffect } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-20 flex items-center justify-center text-center">
        <div className="max-w-md px-4">
          <RibbonLabel>Unexpected Error</RibbonLabel>
          <h1 className="mt-4 font-serif text-3xl font-black text-foreground">
            Something Went Wrong
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">
            We encountered a temporary issue while loading this page.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => reset()}
              className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="rounded-full border border-border bg-card px-6 py-2.5 text-xs font-bold text-foreground"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
