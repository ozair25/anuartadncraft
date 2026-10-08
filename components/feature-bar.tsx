import { Truck, ShieldCheck, Award, RotateCcw } from "lucide-react"

const features = [
  { icon: Truck, title: "Pan-India Shipping", sub: "6–8 working days delivery", color: "from-purple-500/20 to-pink-500/20 text-purple-400" },
  { icon: ShieldCheck, title: "Secure Checkout", sub: "100% Protected Payments", color: "from-pink-500/20 to-rose-500/20 text-pink-400" },
  { icon: Award, title: "Premium Art Supplies", sub: "Authentic & Studio Tested", color: "from-amber-500/20 to-yellow-500/20 text-amber-400" },
  { icon: RotateCcw, title: "Transit Damage Support", sub: "Covered with opening video", color: "from-emerald-500/20 to-teal-500/20 text-emerald-400" },
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
