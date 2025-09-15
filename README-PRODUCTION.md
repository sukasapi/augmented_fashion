# 🚀 Augmented Fashion - Production Server

Server production yang telah dimodifikasi untuk menjalankan aplikasi Augmented Fashion di lingkungan produksi.

## 📁 **File Production**

### **Server Files:**
- `server.js` - Server utama dengan fitur production
- `ecosystem.config.js` - Konfigurasi PM2
- `start-production.sh` - Script startup production
- `test-production.js` - Script testing production

### **Configuration:**
- `nginx.conf` - Konfigurasi Nginx reverse proxy
- `env.production` - Environment variables production

### **Documentation:**
- `PRODUCTION_SETUP.md` - Panduan setup production lengkap

## 🎯 **Quick Start Production**

### **1. Start dengan PM2 (Recommended):**
```bash
npm run start:pm2
```

### **2. Start dengan Script:**
```bash
./start-production.sh
```

### **3. Start Manual:**
```bash
npm run start:prod
```

## 🔧 **Production Features**

### **✅ Security:**
- Security headers (X-Frame-Options, X-XSS-Protection, dll)
- HTTPS redirect
- Remove X-Powered-By header
- Content-Type validation

### **✅ Performance:**
- Gzip compression
- Static file caching
- Optimized static file serving
- Memory management

### **✅ Monitoring:**
- Health check endpoint (`/health`)
- Request logging
- Error handling
- Graceful shutdown

### **✅ Static Files:**
- Proper MIME types untuk 3D models (.glb, .usdz)
- Long-term caching
- Optimized serving

## 📊 **Monitoring Commands**

### **PM2 Commands:**
```bash
# Monitor aplikasi
npm run monitor:pm2

# View logs
npm run logs:pm2

# Restart aplikasi
npm run restart:pm2

# Stop aplikasi
npm run stop:pm2
```

### **Health Check:**
```bash
# Test health endpoint
npm run health

# Test production
npm run test:prod

# Test remote server
npm run test:prod:remote
```

## 🌐 **Server Configuration**

### **Environment Variables:**
```bash
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

### **PM2 Configuration:**
- Cluster mode (multi-core)
- Auto-restart on crash
- Memory limit: 1GB
- Log rotation
- Health monitoring

### **Nginx Configuration:**
- SSL/HTTPS support
- Gzip compression
- Static file caching
- Security headers
- Reverse proxy

## 🚨 **Troubleshooting**

### **Server Tidak Start:**
```bash
# Check logs
pm2 logs augmented-fashion

# Check port
netstat -tlnp | grep :3000

# Check process
ps aux | grep node
```

### **404 Errors:**
```bash
# Check file permissions
ls -la /var/www/augmented-fashion

# Check .next directory
ls -la /var/www/augmented-fashion/.next

# Check public directory
ls -la /var/www/augmented-fashion/public
```

### **AR Tidak Berfungsi:**
```bash
# Check HTTPS
curl -I https://yourdomain.com

# Check SSL certificate
openssl s_client -connect yourdomain.com:443

# Check model files
ls -la /var/www/augmented-fashion/public/media/
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
# Static files with long cache
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|glb|usdz)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### **3. Gzip Compression:**
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript;
```

## 🔒 **Security Features**

### **Security Headers:**
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### **HTTPS Redirect:**
- Automatic redirect from HTTP to HTTPS
- SSL certificate validation
- Secure cookie settings

### **File Protection:**
- Deny access to sensitive files
- Proper file permissions
- Content-Type validation

## 📋 **Production Checklist**

### **✅ Server Setup:**
- [ ] Node.js 16+ installed
- [ ] PM2 installed and configured
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

## 🎉 **Production Ready Features**

Setelah setup selesai, server akan memiliki:
- ✅ High availability (PM2 cluster)
- ✅ Auto-restart on crash
- ✅ SSL/HTTPS enabled
- ✅ Security headers
- ✅ Performance optimization
- ✅ Monitoring & logging
- ✅ Health check endpoint
- ✅ Graceful shutdown
- ✅ Static file optimization
- ✅ 3D model support
- ✅ AR functionality
- ✅ Mobile responsive
- ✅ Production ready

## 📞 **Support**

Jika mengalami masalah:
1. Cek logs: `pm2 logs augmented-fashion`
2. Cek health: `curl http://localhost:3000/health`
3. Test production: `npm run test:prod`
4. Restart aplikasi: `pm2 restart augmented-fashion`
5. Cek dokumentasi: `PRODUCTION_SETUP.md`

