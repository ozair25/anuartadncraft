export interface ProductVariant {
  id: string
  title: string
  price: number
  originalPrice?: number
  available: boolean
  sku?: string
  quantityAvailable?: number
  selectedOptions?: Array<{ name: string; value: string }>
}

export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  discount?: string
  images: string[]
  thumbnail: string
  image?: string
  stock: number
  inStock?: boolean
  category: string
  subcategory?: string // Reserved for future client-provided subcategories
  collection?: string
  collections?: Array<{ id: string; title: string; handle: string }>
  tags: string[]
  brand: string
  rating: number
  reviewsCount: number
  isFeatured?: boolean
  isBestSeller?: boolean
  isNewArrival?: boolean
  seoTitle?: string
  seoDescription?: string
  altText?: string
  relatedProductIds?: string[]
  createdAt: string
  updatedAt: string
  specs?: Record<string, string>
  variantId?: string
  variants?: ProductVariant[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  badge?: string
  productCount: number
}

export interface Collection {
  id: string
  title: string
  slug: string
  description: string
  image: string
  productCount: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedOptions?: Record<string, string>
  lineId?: string
  variantId?: string
}

export interface Address {
  id: string
  name: string
  phone: string
  street: string
  city: string
  state: string
  pincode: string
  isDefault?: boolean
}

export interface UserProfile {
  id: string
  email: string
  displayName: string
  role: 'user' | 'admin'
  phone?: string
  addresses: Address[]
  createdAt: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  userEmail: string
  userName: string
  items: OrderItem[]
  subtotal: number
  discountAmount: number
  shippingFee: number
  total: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  shippingAddress: Address
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD'
  paymentStatus: 'Paid' | 'Pending' | 'Failed'
  trackingNumber?: string
  carrier?: string
  createdAt: string
}

export interface Review {
  id: string
  productId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  image: string
  category: string
  tags: string[]
  readTime: string
}

export interface Coupon {
  id: string
  code: string
  discountPercent: number
  maxDiscount?: number
  minOrderValue: number
  expiresAt: string
  isActive: boolean
}

export interface ContactEnquiry {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  date: string
  createdAt?: string
  status: 'New' | 'Replied' | 'Archived'
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribedAt: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
}
