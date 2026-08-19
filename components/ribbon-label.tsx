import { cn } from "@/lib/utils"

export function RibbonLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 px-4 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-xs",
        className,
      )}
    >
      {children}
    </span>
  )
}
