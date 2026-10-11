import { NextRequest } from "next/server"

interface RateLimitRecord {
  count: number
  resetTime: number
}

// In-memory sliding window cache for rate limiting with automatic eviction
const ipRequestCounts = new Map<string, RateLimitRecord>()

// Cleanup stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  const cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [key, record] of ipRequestCounts.entries()) {
      if (record.resetTime < now) {
        ipRequestCounts.delete(key)
      }
    }
  }, 5 * 60 * 1000)

  // Unref timer in Node environments so it doesn't hold open process shutdown
  if (typeof (cleanupTimer as any).unref === "function") {
    (cleanupTimer as any).unref()
  }
}

/**
 * Extracts the real client IP address from request headers securely.
 */
export function getClientIp(req: NextRequest): string {
  const xForwardedFor = req.headers.get("x-forwarded-for")
  if (xForwardedFor) {
    // First IP in comma-separated list is the original client IP
    const firstIp = xForwardedFor.split(",")[0]?.trim()
    if (firstIp) return firstIp
  }

  const cfConnectingIp = req.headers.get("cf-connecting-ip")
  if (cfConnectingIp) return cfConnectingIp.trim()

  const xRealIp = req.headers.get("x-real-ip")
  if (xRealIp) return xRealIp.trim()

  return "127.0.0.1"
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  retryAfterSeconds?: number
}

/**
 * Checks and increments rate limit for an identifier.
 * @param req NextRequest
 * @param bucket Namespace/action (e.g. "search", "cart", "contact")
 * @param limit Maximum allowed requests per window
 * @param windowSeconds Window duration in seconds
 */
export function checkRateLimit(
  req: NextRequest,
  bucket: string,
  limit = 60,
  windowSeconds = 60
): RateLimitResult {
  const ip = getClientIp(req)
  const key = `${bucket}:${ip}`
  const now = Date.now()
  const windowMs = windowSeconds * 1000

  let record = ipRequestCounts.get(key)

  if (!record || record.resetTime < now) {
    record = {
      count: 1,
      resetTime: now + windowMs,
    }
    ipRequestCounts.set(key, record)
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: Math.ceil(record.resetTime / 1000),
    }
  }

  record.count += 1

  if (record.count > limit) {
    const retryAfter = Math.max(1, Math.ceil((record.resetTime - now) / 1000))
    return {
      success: false,
      limit,
      remaining: 0,
      reset: Math.ceil(record.resetTime / 1000),
      retryAfterSeconds: retryAfter,
    }
  }

  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - record.count),
    reset: Math.ceil(record.resetTime / 1000),
  }
}
