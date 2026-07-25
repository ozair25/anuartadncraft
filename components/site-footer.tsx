import { Camera, AtSign, Send, Share2, Phone, Mail, MapPin } from "lucide-react"

const columns = [
  {
    title: "Shop",
    links: ["All Products", "Painting", "Drawing", "Crafting", "DIY Kits", "Stationery"],
  },
  {
    title: "Help",
    links: [
      "FAQs",
      "Shipping & Delivery",
      "Returns & Refunds",
      "Terms & Conditions",
      "Privacy Policy",
      "Track Your Order",
    ],
  },
  {
    title: "About",
    links: ["Our Story", "Blog", "Wholesale Enquiry", "Careers", "Contact Us"],
  },
]

const socials = [Camera, AtSign, Send, Share2]

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <p className="font-serif text-2xl font-black text-cream">ANU ARTS</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cream/50">
            Art &amp; Craft Supplies
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Your one-stop destination for quality art and craft supplies. Inspiring
            creativity since day one.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-cream">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-cream/60 transition-colors hover:text-primary"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-cream">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-cream/60">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              hello@anuarts.in
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              G-1, Art Street, Creative Nagar, India - 452001
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream/50 md:flex-row md:px-6">
          <p>© 2024 Anu Arts. All Rights Reserved.</p>
          <p>Made with love for creators.</p>
        </div>
      </div>
    </footer>
  )
}
