import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-[#fffaff] flex flex-col font-sans">
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 animate-pulse space-y-8">
          {/* Breadcrumb skeleton */}
          <div className="h-5 bg-purple-100/70 rounded-full w-48" />

          {/* Product main section */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Image gallery skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-purple-100/50 rounded-3xl border border-pink-100" />
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 w-20 bg-purple-100/40 rounded-xl" />
                ))}
              </div>
            </div>

            {/* Info skeleton */}
            <div className="space-y-6">
              <div className="h-6 bg-pink-100/80 rounded-full w-32" />
              <div className="h-10 bg-purple-100/70 rounded-xl w-4/5" />
              <div className="h-6 bg-purple-100/50 rounded-lg w-1/3" />
              <div className="h-12 bg-pink-50 rounded-2xl w-full border border-pink-100/60" />
              <div className="space-y-2">
                <div className="h-4 bg-stone-200/60 rounded w-full" />
                <div className="h-4 bg-stone-200/60 rounded w-5/6" />
                <div className="h-4 bg-stone-200/60 rounded w-3/4" />
              </div>
              <div className="h-14 bg-[#7c2d8a]/20 rounded-full w-full mt-6" />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
