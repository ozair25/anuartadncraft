import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/shopify/products'
import { INITIAL_CATEGORIES } from '@/lib/data/mock-db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://anuarts.com'

  let products: Array<{ slug: string }> = []
  try {
    products = await getAllProducts()
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error)
  }

  const productUrls = products.map((p) => ({
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
