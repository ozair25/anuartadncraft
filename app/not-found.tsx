import Link from "next/link"
import { ArrowLeft, ArrowRight, Paintbrush } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fffaff] flex flex-col">
      <header className="border-b border-pink-100 bg-white/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <BrandLogo />
        <Link
          href="/"
          className="text-xs font-bold text-stone-700 hover:text-[#7c2d8a] transition-colors"
        >
          Return Home
        </Link>
      </header>
      <main className="flex-1 py-20 flex items-center justify-center text-center px-4">
        <div className="max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-[#7c2d8a] mb-4">
            <Paintbrush className="h-8 w-8 text-[#7c2d8a]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-stone-900">
            404 <span className="italic text-[#7c2d8a]">Page Not Found</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
            The masterpiece, craft supply, or workshop you are looking for might have been moved or is currently unavailable.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-bold text-stone-800 shadow-sm hover:border-[#7c2d8a] hover:text-[#7c2d8a] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Go Home
            </Link>
            <Link
              href="/shop"
              prefetch={true}
              className="inline-flex items-center gap-2 rounded-full bg-[#7c2d8a] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-purple-900 transition-colors"
            >
              Explore Shop <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

