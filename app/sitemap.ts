import { MetadataRoute } from 'next'
import { getAllProducts, getCollections } from '@/lib/shopify/products'
import { SHOP_CATEGORIES } from '@/lib/config/shop-categories'
import { INITIAL_BLOGS } from '@/lib/data/mock-db'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 3600 // Regenerate sitemap hourly in background

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL

  // 1. Static high-value landing pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/collections`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/workshops`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tutorials`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/events`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faqs`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact-information`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // 2. Categories and Subcategories
  const categoryRoutes: MetadataRoute.Sitemap = []
  for (const cat of SHOP_CATEGORIES) {
    categoryRoutes.push({
      url: `${baseUrl}/shop/${cat.slug}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
    for (const sub of cat.subcategories) {
      categoryRoutes.push({
        url: `${baseUrl}/shop/${cat.slug}/${sub.slug}`,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  // 3. Blog Articles
  const blogRoutes: MetadataRoute.Sitemap = INITIAL_BLOGS.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // 4. Collections from Shopify
  let collectionRoutes: MetadataRoute.Sitemap = []
  try {
    const collections = await getCollections()
    collectionRoutes = collections.map((col) => ({
      url: `${baseUrl}/collections/${col.slug}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch (error) {
    console.warn('[Sitemap] Could not fetch collections:', error)
  }

  // 5. Products from Shopify catalog
  let productRoutes: MetadataRoute.Sitemap = []
  try {
    const products = await getAllProducts({ fetchAll: true })
    productRoutes = products
      .filter((p) => Boolean(p.slug && p.name))
      .map((p) => {
        let lastMod: Date | undefined = undefined
        if (p.updatedAt) {
          const parsed = new Date(p.updatedAt)
          if (!isNaN(parsed.getTime())) {
            lastMod = parsed
          }
        }
        return {
          url: `${baseUrl}/product/${p.slug}`,
          ...(lastMod ? { lastModified: lastMod } : {}),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }
      })
  } catch (error) {
    console.error('[Sitemap] Failed to fetch products for sitemap:', error)
  }

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
    ...blogRoutes,
    ...productRoutes,
  ]
}
