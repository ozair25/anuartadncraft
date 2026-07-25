import { MetadataRoute } from 'next'
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/data/mock-db'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anuarts.com'

  const productUrls = INITIAL_PRODUCTS.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
  }))

  const categoryUrls = INITIAL_CATEGORIES.map((c) => ({
    url: `${baseUrl}/shop/${c.slug}`,
    lastModified: new Date(),
  }))

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/shop`, lastModified: new Date() },
    { url: `${baseUrl}/collections`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/faqs`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    ...productUrls,
    ...categoryUrls,
  ]
}
