#!/bin/bash

# Deploy script untuk Augmented Fashion
# Pastikan untuk mengubah konfigurasi server sesuai kebutuhan

echo "🚀 Starting deployment process..."

# Colors untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Konfigurasi server (UBAH SESUAI KEBUTUHAN)
SERVER_USER="your_username"
SERVER_HOST="your_server.com"
SERVER_PATH="/public_html"
LOCAL_PATH="."

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

# Check if build exists
if [ ! -d ".next" ]; then
    print_warning "Build folder not found. Building application..."
    npm run build
    
    if [ $? -ne 0 ]; then
        print_error "Build failed!"
        exit 1
    fi
    print_status "Build completed successfully"
else
    print_status "Build folder found"
fi

# Check if public folder exists
if [ ! -d "public" ]; then
    print_error "Public folder not found!"
    exit 1
fi

print_status "Starting file upload..."

# Upload .next folder
echo "📦 Uploading .next folder..."
rsync -avz --delete .next/ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/.next/

if [ $? -eq 0 ]; then
    print_status ".next folder uploaded successfully"
else
    print_error "Failed to upload .next folder"
    exit 1
fi

# Upload public folder
echo "📁 Uploading public folder..."
rsync -avz --delete public/ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/public/

if [ $? -eq 0 ]; then
    print_status "Public folder uploaded successfully"
else
    print_error "Failed to upload public folder"
    exit 1
fi

# Upload package.json
echo "📄 Uploading package.json..."
rsync -avz package.json ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

if [ $? -eq 0 ]; then
    print_status "package.json uploaded successfully"
else
    print_error "Failed to upload package.json"
    exit 1
fi

# Upload next.config.js
echo "⚙️  Uploading next.config.js..."
rsync -avz next.config.js ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

if [ $? -eq 0 ]; then
    print_status "next.config.js uploaded successfully"
else
    print_error "Failed to upload next.config.js"
    exit 1
fi

# Upload .htaccess if exists
if [ -f ".htaccess" ]; then
    echo "🔧 Uploading .htaccess..."
    rsync -avz .htaccess ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
    
    if [ $? -eq 0 ]; then
        print_status ".htaccess uploaded successfully"
    else
        print_warning "Failed to upload .htaccess"
    fi
fi

# Install dependencies on server (optional)
echo "📦 Installing dependencies on server..."
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_PATH} && npm install --production"

if [ $? -eq 0 ]; then
    print_status "Dependencies installed on server"
else
    print_warning "Failed to install dependencies on server"
fi

# Set proper permissions
echo "🔐 Setting file permissions..."
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_PATH} && find . -type d -exec chmod 755 {} \; && find . -type f -exec chmod 644 {} \;"

if [ $? -eq 0 ]; then
    print_status "File permissions set successfully"
else
    print_warning "Failed to set file permissions"
fi

echo ""
print_status "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Test your website: https://yourdomain.com"
echo "2. Check if all models load correctly"
echo "3. Test AR functionality on mobile"
echo "4. Verify navigation works properly"
echo ""
echo "🔧 If you encounter issues:"
echo "- Check server logs"
echo "- Verify file permissions"
echo "- Ensure Node.js version is 18+"
echo "- Check if all files uploaded correctly"
