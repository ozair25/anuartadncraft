import { Scissors, ShieldCheck, Palette, Truck, Lock } from "lucide-react"

const items = [
  { icon: Scissors, title: "Wide Range", sub: "1000+ Products" },
  { icon: ShieldCheck, title: "Trusted Quality", sub: "Handpicked Items" },
  { icon: Palette, title: "For Every Creator", sub: "Beginners to Pros" },
  { icon: Truck, title: "Pan India Delivery", sub: "Fast & Reliable" },
  { icon: Lock, title: "Secure & Safe", sub: "Shop with Confidence" },
]

export function TrustFeatures() {
  return (
    <section className="bg-[#f5eee1] border-b border-[#e2d6c3] py-6">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 lg:divide-x divide-[#d9cebe]">
        {items.map(({ icon: Icon, title, sub }, idx) => (
          <div
            key={title}
            className={`flex items-center gap-3.5 py-3 lg:py-1 ${
              idx !== 0 ? "lg:pl-6" : ""
            } ${idx % 2 !== 0 ? "pl-2 md:pl-0" : ""}`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ebd8c1] border border-[#d2beaa] text-[#1f1c19] shadow-2xs">
              <Icon className="h-5 w-5 text-[#8b1e1e]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#1f1c19] tracking-tight">{title}</p>
              <p className="text-[11px] font-medium text-[#6b6255]">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

