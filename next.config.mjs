/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
  async rewrites() {
    return [
      {
        source: '/cart/c/:path*',
        destination: 'https://e08d97-2b.myshopify.com/cart/c/:path*',
      },
      {
        source: '/checkouts/:path*',
        destination: 'https://e08d97-2b.myshopify.com/checkouts/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' blob: data: https://res.cloudinary.com https://images.unsplash.com https://cdn.shopify.com https://*.myshopify.com",
              "media-src 'self' blob: data: https://res.cloudinary.com",
              "connect-src 'self' https://*.myshopify.com https://res.cloudinary.com https://cdn.shopify.com",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.cloudinary.com",
              "frame-ancestors 'self' https://*.google.com https://*.googleusercontent.com https://*.run.app",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
