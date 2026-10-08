"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createPortal } from "react-dom"
import { X, Plus, Minus } from "lucide-react"
import { SHOP_CATEGORIES, ShopCategoryConfig, ShopSubcategoryConfig } from "@/lib/config/shop-categories"

export interface ShopCategoryDrawerProps {
  isOpen: boolean
  onClose: () => void
  activeCategorySlug?: string
  activeSubcategorySlug?: string
  onSelectCategory?: (categorySlug: string, subcategorySlug?: string) => void
}

export function ShopCategoryDrawer({
  isOpen,
  onClose,
  activeCategorySlug,
  activeSubcategorySlug,
  onSelectCategory,
}: ShopCategoryDrawerProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-expand current active category if present
  useEffect(() => {
    if (activeCategorySlug && activeCategorySlug !== "all") {
      setExpandedCategories((prev) => ({
        ...prev,
        [activeCategorySlug]: true,
      }))
    }
  }, [activeCategorySlug])

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  // Handle ESC key to close drawer
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }))
  }

  const handleNavigate = (categorySlug: string, subcategorySlug?: string) => {
    onClose()
    if (onSelectCategory) {
      onSelectCategory(categorySlug, subcategorySlug)
      return
    }

    if (categorySlug === "all") {
      router.push("/shop")
    } else if (subcategorySlug) {
      router.push(`/shop/${categorySlug}/${subcategorySlug}`)
    } else {
      router.push(`/shop/${categorySlug}`)
    }
  }

  if (!mounted || !isOpen) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shop Product Categories"
      className="fixed inset-0 z-[999999] flex justify-end"
    >
      {/* 1. Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        aria-hidden="true"
      />

      {/* 2. Side Category Drawer */}
      <div
        ref={drawerRef}
        className="relative z-10 flex h-full w-[86vw] sm:w-[380px] max-w-[380px] flex-col bg-[#fffdfa] text-stone-900 shadow-2xl transition-transform duration-300 ease-out animate-in slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimal Editorial Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-stone-200/80 px-6 bg-white">
          <span className="font-serif text-lg font-bold tracking-wider text-stone-900">
            SHOP
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close category menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer touch-manipulation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Category List */}
        <nav
          aria-label="Product categories"
          className="flex-1 overflow-y-auto px-6 py-4 overscroll-contain"
        >
          {/* Top: All Products Link */}
          <div className="border-b border-stone-200/90 pb-3 mb-1">
            <button
              type="button"
              onClick={() => handleNavigate("all")}
              className={`flex w-full min-h-[48px] items-center text-left text-[15px] font-bold tracking-tight transition-colors cursor-pointer touch-manipulation ${
                !activeCategorySlug || activeCategorySlug === "all"
                  ? "text-[#7c2d8a]"
                  : "text-stone-900 hover:text-[#7c2d8a]"
              }`}
            >
              <span>All Products</span>
            </button>
          </div>

          {/* 16 Main Categories List */}
          <ul className="divide-y divide-stone-100/90">
            {SHOP_CATEGORIES.map((cat: ShopCategoryConfig) => {
              const hasSubcategories = cat.subcategories && cat.subcategories.length > 0
              const isExpanded = !!expandedCategories[cat.slug]
              const isCategoryActive = activeCategorySlug === cat.slug

              return (
                <li key={cat.id} className="py-0.5">
                  {/* Category Main Row */}
                  <div className="flex items-center justify-between min-h-[50px]">
                    {/* Main Category Name */}
                    <button
                      type="button"
                      onClick={() => {
                        if (hasSubcategories) {
                          toggleCategory(cat.slug)
                        } else {
                          handleNavigate(cat.slug)
                        }
                      }}
                      className={`flex-1 text-left py-3 text-[15px] sm:text-base tracking-tight transition-colors cursor-pointer touch-manipulation ${
                        isCategoryActive
                          ? "font-bold text-[#7c2d8a]"
                          : "font-semibold text-stone-800 hover:text-[#7c2d8a]"
                      }`}
                    >
                      {cat.name}
                    </button>

                    {/* Expand/Collapse Control: Only for categories that have subcategories */}
                    {hasSubcategories && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleCategory(cat.slug)
                        }}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? `Collapse ${cat.name}` : `Expand ${cat.name}`}
                        className="flex min-w-[48px] min-h-[48px] items-center justify-end pr-1 text-stone-500 hover:text-[#7c2d8a] transition-colors cursor-pointer touch-manipulation"
                      >
                        {isExpanded ? (
                          <Minus className="h-4 w-4 stroke-[2.2] text-stone-700 hover:text-[#7c2d8a] transition-colors" />
                        ) : (
                          <Plus className="h-4 w-4 stroke-[2.2] text-stone-500 hover:text-[#7c2d8a] transition-colors" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Subcategories Accordion with smooth height/opacity animation */}
                  {hasSubcategories && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isExpanded ? "max-h-[600px] opacity-100 py-1" : "max-h-0 opacity-0 py-0"
                      }`}
                    >
                      <ul className="pl-4 pb-2 space-y-0.5">
                        {/* Direct "All [Category]" link */}
                        <li>
                          <button
                            type="button"
                            onClick={() => handleNavigate(cat.slug)}
                            className={`w-full min-h-[38px] flex items-center text-left text-xs font-semibold tracking-wide transition-colors cursor-pointer touch-manipulation ${
                              isCategoryActive && !activeSubcategorySlug
                                ? "text-[#7c2d8a] font-bold"
                                : "text-[#7c2d8a] hover:text-[#5a1e64]"
                            }`}
                          >
                            All {cat.name}
                          </button>
                        </li>

                        {/* Individual Subcategories */}
                        {cat.subcategories.map((sub: ShopSubcategoryConfig) => {
                          const isSubActive =
                            isCategoryActive && activeSubcategorySlug === sub.slug

                          return (
                            <li key={sub.id}>
                              <button
                                type="button"
                                onClick={() => handleNavigate(cat.slug, sub.slug)}
                                className={`w-full min-h-[40px] flex items-center text-left text-sm transition-colors cursor-pointer touch-manipulation ${
                                  isSubActive
                                    ? "font-semibold text-[#7c2d8a]"
                                    : "font-normal text-stone-600 hover:text-[#7c2d8a]"
                                }`}
                              >
                                {sub.name}
                              </button>

                              {/* Child subcategories if configured (e.g. Transfer sheet sizes) */}
                              {sub.children && sub.children.length > 0 && (
                                <ul className="pl-4 py-1 space-y-0.5">
                                  {sub.children.map((child: ShopSubcategoryConfig) => (
                                    <li key={child.id}>
                                      <button
                                        type="button"
                                        onClick={() => handleNavigate(cat.slug, child.slug)}
                                        className="w-full min-h-[34px] flex items-center text-left text-xs font-normal text-stone-500 hover:text-[#7c2d8a] transition-colors cursor-pointer touch-manipulation"
                                      >
                                        {child.name}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Minimal Footer Info */}
        <div className="shrink-0 border-t border-stone-200/80 px-6 py-4 bg-white/80">
          <Link
            href="/shop"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-xl bg-stone-900 py-3 text-xs font-bold text-white hover:bg-stone-800 transition-colors touch-manipulation"
          >
            <span>Explore All Craft Supplies</span>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  )
}
