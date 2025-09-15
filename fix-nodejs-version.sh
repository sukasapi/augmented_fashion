#!/bin/bash

# Fix Node.js version issue untuk cPanel
# Script ini akan downgrade ke Next.js 12 yang kompatibel dengan Node.js 10+

echo "🔧 Fix Node.js Version Issue - cPanel"
echo "====================================="

# Colors untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found!"
    exit 1
fi

print_info "Fixing Node.js version compatibility issue..."

# Backup original package.json
if [ ! -f "package.json.backup" ]; then
    cp package.json package.json.backup
    print_status "Backed up original package.json"
fi

# Update package.json untuk Next.js 12
print_info "Updating package.json to Next.js 12..."

# Create temporary package.json
cat > package.json.tmp << 'EOF'
{
  "name": "augmented-fashion",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "start:prod": "NODE_ENV=production node server.js",
    "start:pm2": "pm2 start ecosystem.config.js --env production",
    "stop:pm2": "pm2 stop augmented-fashion",
    "restart:pm2": "pm2 restart augmented-fashion",
    "logs:pm2": "pm2 logs augmented-fashion",
    "monitor:pm2": "pm2 monit",
    "lint": "next lint",
    "export": "next build && next export",
    "deploy": "npm run build && ./deploy.sh",
    "deploy:manual": "npm run build",
    "deploy:prod": "npm run build && ./start-production.sh",
    "setup:subdomain": "./setup-domain.sh subdomain",
    "setup:domain": "./setup-domain.sh domain",
    "setup:folder": "./setup-domain.sh folder",
    "health": "curl http://localhost:3000/health",
    "test:prod": "node test-production.js",
    "test:prod:remote": "node test-production.js --host yourdomain.com --protocol https",
    "deploy:cpanel": "./deploy-cpanel.sh",
    "deploy:cpanel:folder": "./deploy-cpanel.sh --type folder",
    "deploy:cpanel:subdomain": "./deploy-cpanel.sh --type subdomain",
    "deploy:cpanel:domain": "./deploy-cpanel.sh --type domain",
    "upload:cpanel": "./upload-cpanel.sh"
  },
  "dependencies": {
    "next": "^12.3.4",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "12.3.4",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
EOF

# Replace package.json
mv package.json.tmp package.json
print_status "Updated package.json to Next.js 12"

# Update next.config.js untuk Next.js 12
print_info "Updating next.config.js for Next.js 12..."

cat > next.config.js << 'EOF'
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
EOF

print_status "Updated next.config.js for Next.js 12"

# Clean install
print_info "Cleaning and reinstalling dependencies..."

# Remove old dependencies
if [ -d "node_modules" ]; then
    rm -rf node_modules
    print_status "Removed old node_modules"
fi

if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    print_status "Removed package-lock.json"
fi

# Clear npm cache
npm cache clean --force
print_status "Cleared npm cache"

# Install new dependencies
print_info "Installing Next.js 12 dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Test build
print_info "Testing build with Next.js 12..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Build successful with Next.js 12!"
else
    print_error "Build failed"
    exit 1
fi

# Deploy to cPanel
print_info "Deploying to cPanel..."
npm run deploy:cpanel:folder

if [ $? -eq 0 ]; then
    print_status "Deploy to cPanel successful!"
else
    print_error "Deploy to cPanel failed"
    exit 1
fi

echo ""
echo "🎉 Node.js Version Fix Completed!"
echo "================================"
echo ""
echo "✅ Updated to Next.js 12 (compatible with Node.js 10+)"
echo "✅ Updated next.config.js"
echo "✅ Cleaned and reinstalled dependencies"
echo "✅ Build successful"
echo "✅ Deploy to cPanel successful"
echo ""
echo "📁 Files ready for upload:"
echo "   - cpanel-deploy/ folder"
echo "   - Upload to cPanel File Manager"
echo ""
echo "🌐 Website should work on cPanel now!"
echo ""
echo "📋 Next steps:"
echo "   1. Upload cpanel-deploy/ folder to cPanel"
echo "   2. Set permissions (755 untuk folder, 644 untuk file)"
echo "   3. Test website functionality"
echo "   4. Test AR functionality"
echo ""
print_status "Node.js version issue fixed successfully!"
