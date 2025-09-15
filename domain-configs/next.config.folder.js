/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for production deployment
  output: 'export',
  trailingSlash: true,
  assetPrefix: '/augmented-fashion', // Folder path
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
