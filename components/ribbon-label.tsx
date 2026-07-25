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
        "inline-block bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground",
        "shadow-[3px_3px_0_rgba(0,0,0,0.12)]",
        className,
      )}
      style={{
        clipPath:
          "polygon(4% 0, 96% 0, 100% 50%, 96% 100%, 4% 100%, 0 50%)",
      }}
    >
      {children}
    </span>
  )
}
