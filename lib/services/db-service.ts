import { Product, Category, Collection, Order, Blog, Coupon, ContactEnquiry, NewsletterSubscriber, Review } from "@/types/ecommerce"
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COLLECTIONS, INITIAL_BLOGS, INITIAL_COUPONS } from "@/lib/data/mock-db"

// LocalStorage Keys
const KEYS = {
  PRODUCTS: "anu_arts_products",
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

// Products API
export const getProducts = (): Product[] => getItem<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS)

export const getProductBySlug = (slug: string): Product | undefined => {
  const products = getProducts()
  return products.find((p) => p.slug === slug || p.id === slug)
}

export const saveProduct = (product: Product): Product => {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === product.id)
  if (index >= 0) {
    products[index] = { ...product, updatedAt: new Date().toISOString() }
  } else {
    products.unshift({ ...product, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
  }
  setItem(KEYS.PRODUCTS, products)
  return product
}

export const addProduct = saveProduct

export const deleteProduct = (id: string): void => {
  const products = getProducts().filter((p) => p.id !== id)
  setItem(KEYS.PRODUCTS, products)
}

// Categories
export const getCategories = (): Category[] => getItem<Category[]>(KEYS.CATEGORIES, INITIAL_CATEGORIES)

export const saveCategory = (category: Category): Category => {
  const categories = getCategories()
  const idx = categories.findIndex((c) => c.id === category.id)
  if (idx >= 0) {
    categories[idx] = category
  } else {
    categories.push(category)
  }
  setItem(KEYS.CATEGORIES, categories)
  return category
}

export const deleteCategory = (id: string): void => {
  const categories = getCategories().filter((c) => c.id !== id)
  setItem(KEYS.CATEGORIES, categories)
}

// Collections
export const getCollections = (): Collection[] => getItem<Collection[]>(KEYS.COLLECTIONS, INITIAL_COLLECTIONS)

export const saveCollection = (col: Collection): Collection => {
  const cols = getCollections()
  const idx = cols.findIndex((c) => c.id === col.id)
  if (idx >= 0) {
    cols[idx] = col
  } else {
    cols.push(col)
  }
  setItem(KEYS.COLLECTIONS, cols)
  return col
}

// Orders
export const getOrders = (): Order[] => getItem<Order[]>(KEYS.ORDERS, [])

export const getOrderById = (orderIdOrNumber: string): Order | undefined => {
  const orders = getOrders()
  return orders.find(
    (o) => o.id.toLowerCase() === orderIdOrNumber.toLowerCase() || o.orderNumber.toLowerCase() === orderIdOrNumber.toLowerCase()
  )
}

export const createOrder = (order: Order): Order => {
  const orders = getOrders()
  orders.unshift(order)
  setItem(KEYS.ORDERS, orders)
  return order
}

export const updateOrderStatus = (orderId: string, status: Order['status'], trackingNumber?: string): Order | undefined => {
  const orders = getOrders()
  const idx = orders.findIndex((o) => o.id === orderId)
  if (idx >= 0) {
    orders[idx].status = status
    if (trackingNumber) orders[idx].trackingNumber = trackingNumber
    setItem(KEYS.ORDERS, orders)
    return orders[idx]
  }
  return undefined
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
