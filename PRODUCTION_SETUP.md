# 🚀 Production Setup Guide - Augmented Fashion

Panduan lengkap untuk menjalankan aplikasi Augmented Fashion di server produksi.

## 📋 **Persiapan Server**

### **1. Requirements Server:**
- ✅ Node.js 16+ 
- ✅ npm atau yarn
- ✅ PM2 (recommended)
- ✅ Nginx (optional, untuk reverse proxy)
- ✅ SSL Certificate
- ✅ Domain dengan DNS setup

### **2. Install Dependencies:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx (optional)
sudo apt install nginx -y
```

## 🔧 **Konfigurasi Aplikasi**

### **1. Upload File ke Server:**
```bash
# Upload semua file aplikasi ke server
# Pastikan struktur folder:
/var/www/augmented-fashion/
├── server.js
├── package.json
├── ecosystem.config.js
├── start-production.sh
├── .next/
├── public/
└── logs/
```

### **2. Install Dependencies:**
```bash
cd /var/www/augmented-fashion
npm install --production
```

### **3. Build Aplikasi:**
```bash
npm run build
```

## 🚀 **Menjalankan Aplikasi**

### **Metode 1: Dengan PM2 (Recommended)**
```bash
# Start dengan PM2
npm run start:pm2

# Atau manual
pm2 start ecosystem.config.js --env production

# Monitor aplikasi
npm run monitor:pm2

# View logs
npm run logs:pm2

# Restart aplikasi
npm run restart:pm2

# Stop aplikasi
npm run stop:pm2
```

### **Metode 2: Script Production**
```bash
# Jalankan script production
./start-production.sh

# Atau
npm run deploy:prod
```

### **Metode 3: Manual**
```bash
# Set environment
export NODE_ENV=production
export PORT=3000
export HOSTNAME=0.0.0.0

# Start server
node server.js
```

## 🌐 **Setup Nginx (Optional)**

### **1. Copy Konfigurasi:**
```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/augmented-fashion
sudo ln -s /etc/nginx/sites-available/augmented-fashion /etc/nginx/sites-enabled/

# Test nginx config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### **2. Setup SSL (Let's Encrypt):**
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 **Monitoring & Logs**

### **1. PM2 Monitoring:**
```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs augmented-fashion

# View specific log
pm2 logs augmented-fashion --lines 100

# Restart on file change
pm2 start ecosystem.config.js --watch
```

### **2. System Monitoring:**
```bash
# Check process
ps aux | grep node

# Check port
netstat -tlnp | grep :3000

# Check memory usage
free -h

# Check disk usage
df -h
```

### **3. Health Check:**
```bash
# Test health endpoint
curl http://localhost:3000/health

# Test from external
curl https://yourdomain.com/health
```

## 🔒 **Security Configuration**

### **1. Firewall Setup:**
```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow HTTP/HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Allow Node.js port (if not using nginx)
sudo ufw allow 3000

# Check status
sudo ufw status
```

### **2. User Permissions:**
```bash
# Create dedicated user
sudo adduser --system --group --home /var/www/augmented-fashion nodejs

# Set ownership
sudo chown -R nodejs:nodejs /var/www/augmented-fashion

# Set permissions
sudo chmod -R 755 /var/www/augmented-fashion
```

## 🔄 **Auto-restart & Updates**

### **1. PM2 Auto-restart:**
```bash
# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup

# Follow instructions to enable auto-start
```

### **2. Update Script:**
```bash
#!/bin/bash
# update-app.sh

echo "🔄 Updating Augmented Fashion..."

# Backup current version
cp -r /var/www/augmented-fashion /var/www/augmented-fashion.backup.$(date +%Y%m%d_%H%M%S)

# Pull latest changes
cd /var/www/augmented-fashion
git pull origin main

# Install dependencies
npm install --production

# Build application
npm run build

# Restart PM2
pm2 restart augmented-fashion

echo "✅ Update completed!"
```

## 🚨 **Troubleshooting**

### **1. Aplikasi Tidak Start:**
```bash
# Check logs
pm2 logs augmented-fashion

# Check port availability
netstat -tlnp | grep :3000

# Check Node.js version
node -v

# Check dependencies
npm list
```

### **2. 404 Errors:**
```bash
# Check file permissions
ls -la /var/www/augmented-fashion

# Check .next directory
ls -la /var/www/augmented-fashion/.next

# Check public directory
ls -la /var/www/augmented-fashion/public
```

### **3. AR Tidak Berfungsi:**
```bash
# Check HTTPS
curl -I https://yourdomain.com

# Check SSL certificate
openssl s_client -connect yourdomain.com:443

# Check model files
ls -la /var/www/augmented-fashion/public/media/
```

### **4. Performance Issues:**
```bash
# Check memory usage
pm2 monit

# Check CPU usage
top

# Check disk I/O
iostat -x 1

# Restart if needed
pm2 restart augmented-fashion
```

## 📈 **Performance Optimization**

### **1. PM2 Cluster Mode:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'augmented-fashion',
    script: 'server.js',
    instances: 'max', // Use all CPU cores
    exec_mode: 'cluster'
  }]
};
```

### **2. Nginx Caching:**
```nginx
# Add to nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|glb|usdz)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### **3. Gzip Compression:**
```nginx
# Add to nginx.conf
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

## 🎉 **Production Checklist**

### **✅ Server Setup:**
- [ ] Node.js 16+ installed
- [ ] PM2 installed
- [ ] Nginx configured (optional)
- [ ] SSL certificate installed
- [ ] Firewall configured

### **✅ Application:**
- [ ] Dependencies installed
- [ ] Application built
- [ ] PM2 process running
- [ ] Health check working
- [ ] Logs accessible

### **✅ Security:**
- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] Firewall configured
- [ ] User permissions set
- [ ] Sensitive files protected

### **✅ Monitoring:**
- [ ] PM2 monitoring enabled
- [ ] Log rotation configured
- [ ] Health check endpoint working
- [ ] Auto-restart enabled
- [ ] Update process documented

## 📞 **Support**

Jika mengalami masalah:
1. Cek logs: `pm2 logs augmented-fashion`
2. Cek health: `curl http://localhost:3000/health`
3. Restart aplikasi: `pm2 restart augmented-fashion`
4. Cek dokumentasi: `PRODUCTION_SETUP.md`

## 🎯 **Hasil Akhir**

Setelah setup selesai, aplikasi akan berjalan dengan:
- ✅ High availability (PM2 cluster)
- ✅ Auto-restart on crash
- ✅ SSL/HTTPS enabled
- ✅ Security headers
- ✅ Performance optimization
- ✅ Monitoring & logging
- ✅ Production ready
