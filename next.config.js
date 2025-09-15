/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 12 compatible configuration
  trailingSlash: true,
  images: {
    domains: ['modelviewer.dev'],
    unoptimized: true, // Required for static export
  },
  // Disable source maps for production
  productionBrowserSourceMaps: false,
  // Optimize bundle
  swcMinify: true,
  // Asset prefix if needed (uncomment if using subdirectory)
  // assetPrefix: '/augmented-fashion',
}

module.exports = nextConfig
