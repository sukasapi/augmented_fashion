#!/bin/bash

# Production startup script for Augmented Fashion
# This script handles production deployment with proper configuration

echo "🚀 Starting Augmented Fashion in Production Mode"
echo "================================================"

# Colors for output
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

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed!"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed!"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version: $(node -v)"
print_status "npm version: $(npm -v)"

# Set production environment
export NODE_ENV=production
export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-0.0.0.0}

print_info "Environment: $NODE_ENV"
print_info "Port: $PORT"
print_info "Hostname: $HOSTNAME"

# Create logs directory
if [ ! -d "logs" ]; then
    mkdir -p logs
    print_status "Created logs directory"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    npm install --production
    
    if [ $? -ne 0 ]; then
        print_error "Failed to install dependencies!"
        exit 1
    fi
    
    print_status "Dependencies installed successfully"
fi

# Build application if .next doesn't exist
if [ ! -d ".next" ]; then
    print_warning ".next directory not found. Building application..."
    npm run build
    
    if [ $? -ne 0 ]; then
        print_error "Build failed!"
        exit 1
    fi
    
    print_status "Application built successfully"
fi

# Check if PM2 is available
if command -v pm2 &> /dev/null; then
    print_info "PM2 detected. Starting with PM2..."
    
    # Stop existing PM2 processes
    pm2 stop augmented-fashion 2>/dev/null || true
    pm2 delete augmented-fashion 2>/dev/null || true
    
    # Start with PM2
    pm2 start ecosystem.config.js --env production
    
    if [ $? -eq 0 ]; then
        print_status "Application started with PM2"
        print_info "PM2 Status:"
        pm2 status
        print_info "PM2 Logs: pm2 logs augmented-fashion"
        print_info "PM2 Monitor: pm2 monit"
    else
        print_error "Failed to start with PM2"
        exit 1
    fi
else
    print_warning "PM2 not found. Starting with Node.js directly..."
    
    # Start with Node.js directly
    node server.js &
    SERVER_PID=$!
    
    if [ $? -eq 0 ]; then
        print_status "Application started with PID: $SERVER_PID"
        print_info "To stop the server: kill $SERVER_PID"
        
        # Save PID to file
        echo $SERVER_PID > server.pid
        print_info "PID saved to server.pid"
    else
        print_error "Failed to start application"
        exit 1
    fi
fi

# Wait a moment for server to start
sleep 3

# Health check
print_info "Performing health check..."
HEALTH_URL="http://${HOSTNAME}:${PORT}/health"

if command -v curl &> /dev/null; then
    HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL" 2>/dev/null)
    
    if [ "$HEALTH_RESPONSE" = "200" ]; then
        print_status "Health check passed"
    else
        print_warning "Health check failed (HTTP $HEALTH_RESPONSE)"
    fi
else
    print_warning "curl not available. Skipping health check."
fi

# Display startup information
echo ""
echo "🎉 Application Started Successfully!"
echo "=================================="
echo "🌐 URL: http://${HOSTNAME}:${PORT}"
echo "📊 Health Check: http://${HOSTNAME}:${PORT}/health"
echo "📱 Environment: Production"
echo "🔒 HTTPS Redirect: Enabled"
echo "🛡️ Security Headers: Enabled"
echo ""

# Display useful commands
echo "📋 Useful Commands:"
echo "==================="
if command -v pm2 &> /dev/null; then
    echo "• View logs: pm2 logs augmented-fashion"
    echo "• Monitor: pm2 monit"
    echo "• Restart: pm2 restart augmented-fashion"
    echo "• Stop: pm2 stop augmented-fashion"
    echo "• Status: pm2 status"
else
    echo "• View logs: tail -f logs/app.log"
    echo "• Stop server: kill \$(cat server.pid)"
    echo "• Check status: ps aux | grep node"
fi

echo "• Health check: curl http://${HOSTNAME}:${PORT}/health"
echo ""

print_status "Production server is ready!"
