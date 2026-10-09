"use client"

import { useEffect } from "react"
import { RibbonLabel } from "@/components/ribbon-label"

export default function ErrorBoundary({
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
    <div className="min-h-[70vh] bg-[#fffaff] flex items-center justify-center text-center py-20 px-4">
      <div className="max-w-md">
        <RibbonLabel>Unexpected Error</RibbonLabel>
        <h1 className="mt-4 font-serif text-3xl font-black text-stone-900">
          Something Went Wrong
        </h1>
        <p className="mt-2 text-xs text-stone-600">
          We encountered a temporary issue while loading this page.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-full bg-[#7c2d8a] px-6 py-2.5 text-xs font-bold text-white shadow cursor-pointer hover:bg-purple-900 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="rounded-full border border-pink-200 bg-white px-6 py-2.5 text-xs font-bold text-stone-900 hover:bg-stone-50 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  )
}
