import type { Metadata, Viewport } from 'next'
import { Jost, Playfair_Display, Alex_Brush } from 'next/font/google'
import { Providers } from '@/components/providers'
import { JsonLd } from '@/components/seo/json-ld'
import { GoogleAnalytics } from '@/components/seo/google-analytics'
import { SITE_URL, SITE_NAME, getOrganizationSchema, getWebSiteSchema } from '@/lib/seo/config'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const alexBrush = Alex_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Anu Arts & Craft | Art Supplies, DIY Kits & Resin Art',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Explore art and craft supplies, DIY kits, resin art essentials, painting materials, creative workshops, and tutorials at Anu Arts & Craft.',
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  generator: 'Next.js',
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Anu Arts & Craft | Art Supplies, DIY Kits & Resin Art',
    description:
      'Explore art and craft supplies, DIY kits, resin art essentials, painting materials, creative workshops, and tutorials at Anu Arts & Craft.',
    images: [
      {
        url: '/images/hero-banner-bg.png',
        width: 1200,
        height: 630,
        alt: 'Anu Arts & Craft Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anu Arts & Craft | Art Supplies, DIY Kits & Resin Art',
    description:
      'Explore art and craft supplies, DIY kits, resin art essentials, painting materials, creative workshops, and tutorials at Anu Arts & Craft.',
    images: ['/images/hero-banner-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    title: 'Anu Arts',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#7c2d8a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const orgSchema = getOrganizationSchema()
  const webSiteSchema = getWebSiteSchema()

  return (
    <html lang="en" className={`light w-full ${jost.variable} ${playfair.variable} ${alexBrush.variable}`}>
      <head>
        <JsonLd data={[orgSchema, webSiteSchema]} />
      </head>
      <body className="bg-[#fffaff] font-sans text-[16px] leading-[1.5] text-[#1c1917] antialiased w-full max-w-full selection:bg-pink-200 selection:text-purple-900">
        <GoogleAnalytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
