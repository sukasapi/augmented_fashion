#!/bin/bash

# Deploy script khusus untuk cPanel
# Script ini akan mempersiapkan file untuk upload ke cPanel

echo "🚀 Deploy ke cPanel - Augmented Fashion"
echo "======================================"

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

# Konfigurasi
DEPLOY_DIR="cpanel-deploy"
DOMAIN_TYPE="folder" # folder, subdomain, domain

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --type)
            DOMAIN_TYPE="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: ./deploy-cpanel.sh [options]"
            echo ""
            echo "Options:"
            echo "  --type TYPE    Deploy type: folder, subdomain, domain"
            echo "  --help, -h     Show this help message"
            echo ""
            echo "Examples:"
            echo "  ./deploy-cpanel.sh --type folder"
            echo "  ./deploy-cpanel.sh --type subdomain"
            echo "  ./deploy-cpanel.sh --type domain"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Validate domain type
if [[ "$DOMAIN_TYPE" != "folder" && "$DOMAIN_TYPE" != "subdomain" && "$DOMAIN_TYPE" != "domain" ]]; then
    print_error "Invalid domain type: $DOMAIN_TYPE"
    print_info "Valid types: folder, subdomain, domain"
    exit 1
fi

print_info "Deploy type: $DOMAIN_TYPE"

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

# Check if out directory exists
if [ ! -d "out" ]; then
    print_warning "Out directory not found. Building for static export..."
    npm run build
    
    if [ $? -ne 0 ]; then
        print_error "Build failed!"
        exit 1
    fi
    print_status "Static export completed"
fi

# Create deploy directory
if [ -d "$DEPLOY_DIR" ]; then
    print_warning "Deploy directory exists. Removing..."
    rm -rf "$DEPLOY_DIR"
fi

mkdir -p "$DEPLOY_DIR"
print_status "Created deploy directory: $DEPLOY_DIR"

# Copy files from out directory
if [ -d "out" ]; then
    print_info "Copying files from out/ to $DEPLOY_DIR/"
    cp -r out/* "$DEPLOY_DIR/"
    print_status "Files copied successfully"
else
    print_error "Out directory not found!"
    exit 1
fi

# Copy .htaccess file
if [ -f ".htaccess" ]; then
    cp .htaccess "$DEPLOY_DIR/"
    print_status ".htaccess copied"
else
    print_warning ".htaccess not found. Creating default..."
    
    # Create default .htaccess
    cat > "$DEPLOY_DIR/.htaccess" << 'EOF'
RewriteEngine On

# Handle Next.js routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [QSA,L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE application/ld+json
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType model/gltf-binary "access plus 1 year"
    ExpiresByType model/vnd.usdz+zip "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
EOF
    
    print_status "Default .htaccess created"
fi

# Create deployment instructions
cat > "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt" << EOF
🚀 INSTRUKSI DEPLOY KE CPANEL
============================

1. LOGIN KE CPANEL
   - Buka browser dan login ke cPanel
   - Navigate ke "File Manager"
   - Buka folder "public_html"

2. UPLOAD FILES
   - Buat folder baru di public_html (sesuai tipe deploy)
   - Upload semua file dari folder ini ke folder tersebut
   - Pastikan file .htaccess ikut ter-upload

3. SET PERMISSIONS
   - Folder: 755
   - File: 644

4. TEST WEBSITE
   - Buka domain Anda
   - Test semua fitur

TIPE DEPLOY: $DOMAIN_TYPE

STRUKTUR FOLDER:
EOF

# Add folder structure based on domain type
case $DOMAIN_TYPE in
    "subdomain")
        echo "public_html/ar/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── _next/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── media/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── index.html" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── model/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "└── .htaccess" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "URL: https://ar.yourdomain.com" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        ;;
    "domain")
        echo "public_html/augmented-fashion/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── _next/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── media/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── index.html" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── model/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "└── .htaccess" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "URL: https://augmentedfashion.com" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        ;;
    "folder")
        echo "public_html/augmented-fashion/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── _next/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── media/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── index.html" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "├── model/" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "└── .htaccess" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        echo "URL: https://yourdomain.com/augmented-fashion" >> "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.txt"
        ;;
esac

# Create file list
print_info "Creating file list..."
find "$DEPLOY_DIR" -type f -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.glb" -o -name "*.usdz" -o -name "*.htaccess" | sort > "$DEPLOY_DIR/FILE_LIST.txt"

# Count files
FILE_COUNT=$(find "$DEPLOY_DIR" -type f | wc -l)
FOLDER_COUNT=$(find "$DEPLOY_DIR" -type d | wc -l)

print_status "Deploy preparation completed!"
echo ""
echo "📁 DEPLOY DIRECTORY: $DEPLOY_DIR"
echo "📊 FILES: $FILE_COUNT"
echo "📂 FOLDERS: $FOLDER_COUNT"
echo "🎯 TYPE: $DOMAIN_TYPE"
echo ""

# Display next steps
echo "📋 NEXT STEPS:"
echo "=============="
echo "1. Buka folder: $DEPLOY_DIR"
echo "2. Baca file: DEPLOY_INSTRUCTIONS.txt"
echo "3. Upload semua file ke cPanel"
echo "4. Set permissions (755 untuk folder, 644 untuk file)"
echo "5. Test website"
echo ""

# Display file structure
echo "📁 FILE STRUCTURE:"
echo "=================="
tree "$DEPLOY_DIR" 2>/dev/null || find "$DEPLOY_DIR" -type f | head -20

if [ $FILE_COUNT -gt 20 ]; then
    echo "... dan $((FILE_COUNT - 20)) file lainnya"
fi

echo ""
print_status "Deploy files ready! Check folder: $DEPLOY_DIR"

