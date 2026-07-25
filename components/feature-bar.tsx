import { Truck, ShieldCheck, Award, RotateCcw } from "lucide-react"

const features = [
  { icon: Truck, title: "Free Shipping", sub: "On orders above ₹999" },
  { icon: ShieldCheck, title: "Secure Payment", sub: "100% Protected" },
  { icon: Award, title: "Premium Quality", sub: "Trusted by Artists" },
  { icon: RotateCcw, title: "Easy Returns", sub: "Hassle free returns" },
]

export function FeatureBar() {
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-5 md:px-6 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon className="h-6 w-6 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold">{title}</p>
              <p className="text-xs text-cream/60">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
