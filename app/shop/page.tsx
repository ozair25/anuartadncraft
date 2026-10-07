import { ShopClient } from "@/app/shop/shop-client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Art & Craft Supplies | Anu Arts Studio",
  description: "Browse premium craft supplies, tools, resin art, MDF bases, paints, and DIY kits from Anu Art & Craft Studio.",
}

export default function ShopPage() {
  return <ShopClient />
}
