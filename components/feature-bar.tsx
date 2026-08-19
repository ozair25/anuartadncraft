import { Truck, ShieldCheck, Award, RotateCcw } from "lucide-react"

const features = [
  { icon: Truck, title: "Free Shipping", sub: "On orders above ₹999", color: "from-purple-500/20 to-pink-500/20 text-purple-600" },
  { icon: ShieldCheck, title: "Secure Payment", sub: "100% Protected", color: "from-pink-500/20 to-rose-500/20 text-pink-600" },
  { icon: Award, title: "Premium Quality", sub: "Trusted by 1M+ Artists", color: "from-amber-500/20 to-yellow-500/20 text-amber-600" },
  { icon: RotateCcw, title: "Easy Returns", sub: "Hassle free returns", color: "from-emerald-500/20 to-teal-500/20 text-emerald-600" },
]

export function FeatureBar() {
  return (
    <section className="bg-[#180d29] text-white py-4 border-y border-purple-500/20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-3 md:px-6 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, sub, color }) => (
          <div key={title} className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} shadow-xs`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-white">{title}</p>
              <p className="text-xs text-purple-200/70">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
