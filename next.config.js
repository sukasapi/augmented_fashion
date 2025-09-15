/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for production deployment
  output: 'export',
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
