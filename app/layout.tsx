import type { Metadata, Viewport } from 'next'
import { Jost, Playfair_Display, Alex_Brush } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
})

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Anu Arts & Craft | Art Supplies, Creative Workshops & DIY Kits',
  description:
    'Where your ideas come to life. Discover premium art materials, painting classes, crafting workshops, and DIY kits in Indore.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'light',
  themeColor: '#7c2d8a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light ${jost.variable} ${playfair.variable} ${alexBrush.variable} overflow-x-clip w-full`}
    >
      <body className="bg-[#fffaff] font-sans text-[16px] leading-[1.5] text-[#1c1917] antialiased overflow-x-clip w-full max-w-full selection:bg-pink-200 selection:text-purple-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

