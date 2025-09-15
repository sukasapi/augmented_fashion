#!/bin/bash

# Upload script untuk cPanel via FTP
# Script ini akan upload file ke cPanel hosting

echo "📤 Upload ke cPanel via FTP - Augmented Fashion"
echo "=============================================="

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

# Konfigurasi FTP (UBAH SESUAI KEBUTUHAN)
FTP_HOST=""
FTP_USER=""
FTP_PASS=""
FTP_DIR="/public_html/augmented-fashion"
LOCAL_DIR="cpanel-deploy"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --host)
            FTP_HOST="$2"
            shift 2
            ;;
        --user)
            FTP_USER="$2"
            shift 2
            ;;
        --pass)
            FTP_PASS="$2"
            shift 2
            ;;
        --dir)
            FTP_DIR="$2"
            shift 2
            ;;
        --local)
            LOCAL_DIR="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: ./upload-cpanel.sh [options]"
            echo ""
            echo "Options:"
            echo "  --host HOST     FTP hostname"
            echo "  --user USER     FTP username"
            echo "  --pass PASS     FTP password"
            echo "  --dir DIR       Remote directory (default: /public_html/augmented-fashion)"
            echo "  --local DIR     Local directory (default: cpanel-deploy)"
            echo "  --help, -h      Show this help message"
            echo ""
            echo "Examples:"
            echo "  ./upload-cpanel.sh --host ftp.yourdomain.com --user username --pass password"
            echo "  ./upload-cpanel.sh --host ftp.yourdomain.com --user username --pass password --dir /public_html/ar"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Check if required parameters are provided
if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
    print_error "Missing required parameters!"
    echo ""
    echo "Required parameters:"
    echo "  --host HOST     FTP hostname"
    echo "  --user USER     FTP username"
    echo "  --pass PASS     FTP password"
    echo ""
    echo "Example:"
    echo "  ./upload-cpanel.sh --host ftp.yourdomain.com --user username --pass password"
    exit 1
fi

# Check if local directory exists
if [ ! -d "$LOCAL_DIR" ]; then
    print_error "Local directory not found: $LOCAL_DIR"
    print_info "Run ./deploy-cpanel.sh first to prepare files"
    exit 1
fi

# Check if lftp is available
if ! command -v lftp &> /dev/null; then
    print_error "lftp is not installed!"
    print_info "Install lftp:"
    print_info "  Ubuntu/Debian: sudo apt install lftp"
    print_info "  CentOS/RHEL: sudo yum install lftp"
    print_info "  macOS: brew install lftp"
    exit 1
fi

print_info "FTP Host: $FTP_HOST"
print_info "FTP User: $FTP_USER"
print_info "Remote Dir: $FTP_DIR"
print_info "Local Dir: $LOCAL_DIR"

# Create FTP script
FTP_SCRIPT=$(mktemp)
cat > "$FTP_SCRIPT" << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
set ftp:list-options -a
set ftp:charset utf8
set file:charset utf8

open $FTP_HOST
user $FTP_USER $FTP_PASS

# Create remote directory if it doesn't exist
mkdir -p $FTP_DIR
cd $FTP_DIR

# Upload all files
mirror -R --delete --verbose --exclude-glob="*.tmp" --exclude-glob="*.log" $LOCAL_DIR/ .

# Set permissions
chmod 755 .
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

quit
EOF

print_info "Starting FTP upload..."

# Execute FTP script
lftp -f "$FTP_SCRIPT"

if [ $? -eq 0 ]; then
    print_status "Upload completed successfully!"
    echo ""
    echo "🌐 Website should be available at:"
    echo "   https://yourdomain.com/augmented-fashion"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Test website functionality"
    echo "   2. Check AR functionality"
    echo "   3. Test mobile responsiveness"
    echo "   4. Verify SSL certificate"
else
    print_error "Upload failed!"
    echo ""
    echo "🔍 Troubleshooting:"
    echo "   1. Check FTP credentials"
    echo "   2. Check FTP hostname"
    echo "   3. Check network connection"
    echo "   4. Check remote directory permissions"
fi

# Clean up
rm -f "$FTP_SCRIPT"

echo ""
print_info "Upload process completed!"

