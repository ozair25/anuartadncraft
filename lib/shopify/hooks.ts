"use client"

import { useState, useEffect } from "react"
import { Product, Collection } from "@/types/ecommerce"

export function useShopifyProducts(options?: {
  collection?: string
  query?: string
  initialProducts?: Product[]
}) {
  const [products, setProducts] = useState<Product[]>(options?.initialProducts || [])
  const [loading, setLoading] = useState<boolean>(
    !options?.initialProducts || options.initialProducts.length === 0
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (options?.initialProducts && options.initialProducts.length > 0) {
      setProducts(options.initialProducts)
      setLoading(false)
    }
  }, [options?.initialProducts])

  useEffect(() => {
    let isMounted = true

    // Skip redundant client fetch if initial products already populated and no sub-filters requested
    if (options?.initialProducts && options.initialProducts.length > 0 && !options.collection && !options.query) {
      setLoading(false)
      return
    }

    async function fetchProducts() {
      try {
        if (!options?.initialProducts || options.initialProducts.length === 0) {
          setLoading(true)
        }
        setError(null)
        const params = new URLSearchParams()
        if (options?.collection) params.set("collection", options.collection)
        if (options?.query) params.set("query", options.query)

        const queryString = params.toString()
        const url = queryString ? `/api/shopify/products?${queryString}` : `/api/shopify/products`

        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
          },
        })

        const contentType = res.headers.get("content-type") || ""
        let data: any = null
        if (contentType.includes("application/json")) {
          data = await res.json()
        } else {
          const text = await res.text()
          console.warn("[Shopify Hooks] Expected JSON but received:", text.substring(0, 150))
          throw new Error(`Shopify API endpoint returned non-JSON response (${res.status})`)
        }

        console.log("[Shopify Diagnostics] API response:", data)

        // Robustly parse products whether nested under products, data.products, or an array
        const rawProducts: Product[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : Array.isArray(data?.data?.products)
          ? data.data.products
          : Array.isArray(data?.data)
          ? data.data
          : []

        console.log("[Shopify Diagnostics] Number of products returned:", rawProducts.length)

        if (!res.ok || data?.error) {
          const errMsg = data?.error || `HTTP ${res.status}: Failed to fetch products from Shopify`
          console.error("Shopify Storefront API fetch error:", errMsg, data?.details)
          if (isMounted) {
            setError(errMsg)
          }
          return
        }

        if (isMounted && rawProducts.length > 0) {
          setProducts(rawProducts)
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Failed to fetch products"
        console.error("Shopify Storefront API network/parse error:", err)
        if (isMounted) {
          setError(errMsg)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()
    return () => {
      isMounted = false
    }
  }, [options?.collection, options?.query])

  return { products, loading, error }
}

export function useShopifyProduct(handleOrSlug: string, initialProduct?: Product) {
  const [product, setProduct] = useState<Product | undefined>(initialProduct)
  const [loading, setLoading] = useState<boolean>(!initialProduct)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!handleOrSlug) return
    let isMounted = true

    // If initialProduct is provided and matches the requested handle or slug, use it and avoid redundant fetch
    if (initialProduct && (initialProduct.slug === handleOrSlug || initialProduct.id === handleOrSlug)) {
      setProduct(initialProduct)
      setLoading(false)
      return
    }

    async function fetchProduct() {
      try {
        if (!initialProduct) {
          setLoading(true)
        }
        setError(null)
        const res = await fetch(
          `/api/shopify/products?handle=${encodeURIComponent(handleOrSlug)}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )

        const contentType = res.headers.get("content-type") || ""
        let data: any = null
        if (contentType.includes("application/json")) {
          data = await res.json()
        } else {
          throw new Error(`Shopify API endpoint returned non-JSON (${res.status})`)
        }

        const rawProduct = data?.product || data?.data?.product || (data?.id ? data : undefined)

        if (!res.ok || data?.error) {
          const errMsg = data?.error || `HTTP ${res.status}: Failed to fetch product '${handleOrSlug}'`
          console.error("Shopify Storefront API product fetch error:", errMsg, data?.details)
          if (isMounted) {
            setError(errMsg)
          }
          return
        }

        if (isMounted && rawProduct) {
          setProduct(rawProduct)
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Failed to fetch product"
        console.error("Shopify Storefront API product network error:", err)
        if (isMounted) {
          setError(errMsg)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProduct()
    return () => {
      isMounted = false
    }
  }, [handleOrSlug])

  return { product, loading, error }
}

export function useShopifyCollections(options?: { initialCollections?: Collection[] }) {
  const [collections, setCollections] = useState<Collection[]>(
    options?.initialCollections || []
  )
  const [loading, setLoading] = useState<boolean>(
    !options?.initialCollections || options.initialCollections.length === 0
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function fetchCols() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch("/api/shopify/products?collections=true")
        const data = await res.json().catch(() => null)

        if (!res.ok || data?.error) {
          const errMsg = data?.error || `HTTP ${res.status}: Failed to fetch collections`
          console.error("Shopify collections fetch error:", errMsg)
          if (isMounted) {
            setError(errMsg)
          }
          return
        }

        if (isMounted && data?.collections) {
          setCollections(data.collections)
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Failed to fetch collections"
        console.error("Shopify collections network error:", err)
        if (isMounted) {
          setError(errMsg)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCols()
    return () => {
      isMounted = false
    }
  }, [])

  return { collections, loading, error }
}
