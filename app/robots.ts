import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/search',
        '/cart',
        '/checkout',
        '/profile',
        '/login',
        '/register',
        '/forgot-password',
        '/order-success/',
        '/track-order',
        '/*?*query=',
        '/*?*q=',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
