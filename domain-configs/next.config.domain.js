/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for production deployment
  output: 'export',
  trailingSlash: true,
  // No assetPrefix needed for dedicated domain
  images: {
    domains: ['modelviewer.dev'],
    unoptimized: true, // Required for static export
  },
  // Disable source maps for production
  productionBrowserSourceMaps: false,
  // Optimize bundle
  swcMinify: true,
}

module.exports = nextConfig
