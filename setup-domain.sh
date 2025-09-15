#!/bin/bash

# Script untuk setup domain configuration
# Jalankan: ./setup-domain.sh [subdomain|domain|folder]

echo "🌐 Setup Domain Configuration untuk Augmented Fashion"
echo "=================================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Function untuk print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check argument
if [ $# -eq 0 ]; then
    echo "Usage: ./setup-domain.sh [subdomain|domain|folder]"
    echo ""
    echo "Options:"
    echo "  subdomain  - Setup untuk subdomain (ar.yourdomain.com)"
    echo "  domain     - Setup untuk domain dedicado (augmentedfashion.com)"
    echo "  folder     - Setup untuk folder (yourdomain.com/augmented-fashion)"
    exit 1
fi

DOMAIN_TYPE=$1

# Backup current next.config.js
if [ -f "next.config.js" ]; then
    cp next.config.js next.config.js.backup
    print_status "Backup next.config.js created"
fi

# Update next.config.js based on domain type
case $DOMAIN_TYPE in
    "subdomain")
        print_status "Setting up for subdomain deployment..."
        
        # Update next.config.js for subdomain
        cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for production deployment
  output: 'export',
  trailingSlash: true,
  assetPrefix: '/ar', // Subdomain path
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
EOF
        
        print_status "next.config.js updated for subdomain"
        print_warning "Upload files to: public_html/ar/"
        print_warning "Domain akan diakses di: https://ar.yourdomain.com"
        ;;
        
    "domain")
        print_status "Setting up for dedicated domain deployment..."
        
        # Update next.config.js for dedicated domain
        cat > next.config.js << 'EOF'
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
EOF
        
        print_status "next.config.js updated for dedicated domain"
        print_warning "Upload files to: public_html/augmented-fashion/"
        print_warning "Domain akan diakses di: https://augmentedfashion.com"
        ;;
        
    "folder")
        print_status "Setting up for folder deployment..."
        
        # Update next.config.js for folder
        cat > next.config.js << 'EOF'
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
EOF
        
        print_status "next.config.js updated for folder deployment"
        print_warning "Upload files to: public_html/augmented-fashion/"
        print_warning "Domain akan diakses di: https://yourdomain.com/augmented-fashion"
        ;;
        
    *)
        print_error "Invalid option: $DOMAIN_TYPE"
        echo "Valid options: subdomain, domain, folder"
        exit 1
        ;;
esac

# Build application
print_status "Building application..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Build completed successfully!"
    echo ""
    echo "📁 Files ready for upload:"
    echo "   - out/ folder contains all static files"
    echo "   - Upload all files from out/ to your server"
    echo ""
    echo "🔧 Next steps:"
    echo "   1. Upload files to server"
    echo "   2. Setup DNS (if needed)"
    echo "   3. Test website"
    echo ""
    echo "📖 For detailed instructions, see:"
    echo "   - DEPLOYMENT_GUIDE.md"
    echo "   - DOMAIN_SETUP.md"
else
    print_error "Build failed!"
    exit 1
fi
