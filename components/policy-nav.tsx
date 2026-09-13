"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface PolicyNavProps {
  className?: string
  theme?: "light" | "dark"
}

export const POLICIES = [
  { name: "Refund policy", href: "/refund-policy", altHref: "/policies/refund-policy" },
  { name: "Shipping policy", href: "/shipping-policy", altHref: "/policies/shipping-policy" },
  { name: "Contact information", href: "/contact-information", altHref: "/policies/contact-information" },
  { name: "Terms of service", href: "/terms-of-service", altHref: "/policies/terms-of-service" },
  { name: "Privacy policy", href: "/privacy-policy", altHref: "/policies/privacy-policy" },
]

export function PolicyNav({ className = "", theme = "light" }: PolicyNavProps) {
  const pathname = usePathname()

  const isDark = theme === "dark"

  return (
    <nav
      id="policy-navigation-bar"
      aria-label="Policy and Legal Navigation"
      className={`w-full overflow-x-auto no-scrollbar py-2.5 ${className}`}
    >
      <div className="flex items-center justify-center gap-2 sm:gap-6 min-w-max px-4">
        {POLICIES.map((policy) => {
          const isActive = pathname === policy.href || pathname === policy.altHref || (policy.name === "Terms of service" && pathname === "/terms-conditions")
          
          if (isDark) {
            return (
              <Link
                key={policy.href}
                href={policy.href}
                className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap px-2 py-1 rounded-md ${
                  isActive
                    ? "text-[#60a5fa] underline underline-offset-4 decoration-2 font-semibold"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                {policy.name}
              </Link>
            )
          }

          return (
            <Link
              key={policy.href}
              href={policy.href}
              className={`text-xs sm:text-sm font-medium transition-all whitespace-nowrap px-3 py-1.5 rounded-full ${
                isActive
                  ? "bg-[#7c2d8a] text-white font-semibold shadow-xs"
                  : "bg-white/80 text-stone-600 hover:text-[#7c2d8a] hover:bg-stone-100 border border-stone-200/80"
              }`}
            >
              {policy.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
