import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, ShoppingBag } from "lucide-react"

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-[#fffaff] flex flex-col font-sans">
      <SiteHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-40 bg-purple-100/60 rounded animate-pulse" />

        {/* Header bar skeleton */}
        <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="h-7 w-48 bg-purple-200/50 rounded-lg animate-pulse" />
            <div className="h-4 w-72 bg-purple-100/40 rounded animate-pulse" />
          </div>
          <div className="h-10 w-48 bg-purple-100/50 rounded-full animate-pulse" />
        </div>

        {/* Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Category Sidebar Skeleton */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm space-y-3">
              <div className="h-5 w-32 bg-purple-100/70 rounded animate-pulse" />
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-9 bg-purple-50/60 rounded-xl animate-pulse" />
              ))}
            </div>
          </aside>

          {/* Right Product Grid Skeleton */}
          <div className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col overflow-hidden rounded-2xl border border-pink-100 bg-white p-3 space-y-3 animate-pulse shadow-sm"
                >
                  <div className="aspect-square bg-purple-50/70 rounded-xl" />
                  <div className="h-3 bg-purple-100/60 rounded w-3/4" />
                  <div className="h-3 bg-purple-50/50 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
