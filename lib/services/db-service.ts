import { Category, Collection, Order, Blog, Coupon, ContactEnquiry, NewsletterSubscriber } from "@/types/ecommerce"
import { INITIAL_CATEGORIES, INITIAL_COLLECTIONS, INITIAL_BLOGS, INITIAL_COUPONS } from "@/lib/data/mock-db"

// LocalStorage Keys for non-commerce & content features
const KEYS = {
  CATEGORIES: "anu_arts_categories",
  COLLECTIONS: "anu_arts_collections",
  ORDERS: "anu_arts_orders",
  BLOGS: "anu_arts_blogs",
  COUPONS: "anu_arts_coupons",
  ENQUIRIES: "anu_arts_enquiries",
  SUBSCRIBERS: "anu_arts_subscribers",
  WISHLIST: "anu_arts_wishlist",
}

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err)
    return defaultValue
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(`Error writing ${key} to localStorage`, err)
  }
}

// Categories (Metadata & Navigation)
export const getCategories = (): Category[] => getItem<Category[]>(KEYS.CATEGORIES, INITIAL_CATEGORIES)

// Collections (Themes & Navigation)
export const getCollections = (): Collection[] => getItem<Collection[]>(KEYS.COLLECTIONS, INITIAL_COLLECTIONS)

// Orders (Read-only helpers for Profile & Order Tracking)
export const getOrders = (): Order[] => getItem<Order[]>(KEYS.ORDERS, [])

export const getOrderById = (orderIdOrNumber: string): Order | undefined => {
  const orders = getOrders()
  return orders.find(
    (o) => o.id.toLowerCase() === orderIdOrNumber.toLowerCase() || o.orderNumber.toLowerCase() === orderIdOrNumber.toLowerCase()
  )
}

// Blogs
export const getBlogs = (): Blog[] => getItem<Blog[]>(KEYS.BLOGS, INITIAL_BLOGS)

export const getBlogBySlug = (slug: string): Blog | undefined => {
  return getBlogs().find((b) => b.slug === slug || b.id === slug)
}

export const saveBlog = (blog: Blog): Blog => {
  const blogs = getBlogs()
  const idx = blogs.findIndex((b) => b.id === blog.id)
  if (idx >= 0) {
    blogs[idx] = blog
  } else {
    blogs.unshift(blog)
  }
  setItem(KEYS.BLOGS, blogs)
  return blog
}

export const deleteBlog = (id: string): void => {
  const list = getBlogs().filter((b) => b.id !== id)
  setItem(KEYS.BLOGS, list)
}

// Coupons
export const getCoupons = (): Coupon[] => getItem<Coupon[]>(KEYS.COUPONS, INITIAL_COUPONS)

export const saveCoupon = (coupon: Coupon): Coupon => {
  const list = getCoupons()
  const idx = list.findIndex((c) => c.id === coupon.id)
  if (idx >= 0) {
    list[idx] = coupon
  } else {
    list.unshift(coupon)
  }
  setItem(KEYS.COUPONS, list)
  return coupon
}

export const addCoupon = saveCoupon

export const getCouponByCode = (code: string): Coupon | undefined => {
  return getCoupons().find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && (c.isActive || (c as any).active))
}

// Enquiries & Newsletter
export const getEnquiries = (): ContactEnquiry[] => getItem<ContactEnquiry[]>(KEYS.ENQUIRIES, [])

export const addEnquiry = (enquiry: Omit<ContactEnquiry, "id" | "date" | "status" | "createdAt"> & { subject?: string }): ContactEnquiry => {
  const list = getEnquiries()
  const newEnquiry: ContactEnquiry = {
    ...enquiry,
    id: "enq-" + Date.now(),
    date: new Date().toLocaleDateString(),
    createdAt: new Date().toISOString(),
    status: "New"
  }
  list.unshift(newEnquiry)
  setItem(KEYS.ENQUIRIES, list)
  return newEnquiry
}

export const getSubscribers = (): NewsletterSubscriber[] => getItem<NewsletterSubscriber[]>(KEYS.SUBSCRIBERS, [])

export const addSubscriber = (email: string): NewsletterSubscriber => {
  const list = getSubscribers()
  const existing = list.find((s) => s.email.toLowerCase() === email.toLowerCase())
  if (existing) return existing
  const sub: NewsletterSubscriber = {
    id: "sub-" + Date.now(),
    email,
    subscribedAt: new Date().toISOString()
  }
  list.unshift(sub)
  setItem(KEYS.SUBSCRIBERS, list)
  return sub
}
