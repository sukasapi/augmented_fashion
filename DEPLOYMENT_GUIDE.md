# 🚀 Panduan Deploy ke cPanel

Panduan lengkap untuk deploy aplikasi Next.js Augmented Fashion ke server produksi menggunakan cPanel.

## 📋 **Persiapan Sebelum Deploy**

### **1. Build Aplikasi untuk Production**
```bash
# Build aplikasi
npm run build

# Test build lokal
npm start
```

### **2. File yang Perlu Diupload**
Setelah build, folder `.next` akan berisi file yang sudah dioptimasi untuk production.

## 🗂️ **Struktur File untuk Upload**

```
public_html/
├── .next/                    # Folder build Next.js
├── public/                   # Static files
│   └── media/               # Model 3D files
│       ├── model.glb
│       └── walking.glb
├── package.json             # Dependencies
├── next.config.js           # Konfigurasi Next.js
└── server.js               # Server file (jika menggunakan custom server)
```

## 🔧 **Metode Deploy ke cPanel**

### **Metode 1: Upload Manual via File Manager**

1. **Login ke cPanel**
2. **Buka File Manager**
3. **Navigate ke `public_html`**
4. **Upload file berikut:**
   - Folder `.next` (dari build)
   - Folder `public`
   - `package.json`
   - `next.config.js`

### **Metode 2: Upload via FTP/SFTP**

```bash
# Upload menggunakan FTP client seperti FileZilla
# Upload ke folder public_html/
```

### **Metode 3: Git Deploy (jika tersedia)**

```bash
# Clone repository ke server
git clone https://github.com/username/augmented-fashion.git

# Install dependencies
npm install

# Build aplikasi
npm run build
```

## ⚙️ **Konfigurasi Server**

### **1. Node.js Version**
Pastikan server mendukung Node.js 18+ (Next.js 14 requirement)

### **2. Package.json untuk Production**
```json
{
  "name": "augmented-fashion",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.32",
    "react": "^18",
    "react-dom": "^18"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### **3. Next.js Config untuk Production**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Untuk deployment yang lebih efisien
  images: {
    domains: ['modelviewer.dev'],
  },
  // Disable source maps untuk production
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
```

## 🌐 **Konfigurasi Web Server**

### **Apache (.htaccess)**
Buat file `.htaccess` di root `public_html`:

```apache
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
</IfModule>
```

### **Nginx (jika menggunakan Nginx)**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/public_html;
    index index.html;

    # Handle Next.js routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🚀 **Script Deploy Otomatis**

### **deploy.sh**
```bash
#!/bin/bash

# Build aplikasi
echo "Building application..."
npm run build

# Upload ke server (ganti dengan detail server Anda)
echo "Uploading to server..."
rsync -avz --delete .next/ user@yourserver.com:public_html/.next/
rsync -avz --delete public/ user@yourserver.com:public_html/public/
rsync -avz package.json user@yourserver.com:public_html/
rsync -avz next.config.js user@yourserver.com:public_html/

echo "Deployment completed!"
```

### **package.json Scripts**
```json
{
  "scripts": {
    "deploy": "npm run build && ./deploy.sh",
    "deploy:staging": "npm run build && rsync -avz --delete .next/ staging@server.com:public_html/",
    "deploy:production": "npm run build && rsync -avz --delete .next/ prod@server.com:public_html/"
  }
}
```

## 🔍 **Troubleshooting**

### **Error: Module not found**
```bash
# Pastikan semua dependencies terinstall
npm install --production
```

### **Error: Build failed**
```bash
# Clear cache dan rebuild
rm -rf .next
npm run build
```

### **Error: 404 on refresh**
- Pastikan `.htaccess` sudah dikonfigurasi dengan benar
- Check apakah server mendukung URL rewriting

### **Error: Model files not loading**
- Pastikan folder `public/media/` terupload dengan benar
- Check permission file (755 untuk folder, 644 untuk file)

## 📊 **Optimasi Performance**

### **1. Enable Gzip Compression**
Sudah dikonfigurasi di `.htaccess`

### **2. Set Cache Headers**
Sudah dikonfigurasi di `.htaccess`

### **3. Optimize Images**
```bash
# Install image optimization tools
npm install --save-dev imagemin imagemin-webp
```

### **4. Bundle Analysis**
```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
```

## 🔒 **Security Checklist**

- [ ] Remove source maps dari production
- [ ] Set proper file permissions
- [ ] Enable HTTPS
- [ ] Set security headers
- [ ] Remove development dependencies

## 📱 **Testing Setelah Deploy**

1. **Test semua halaman:**
   - `/` (galeri)
   - `/model/model` (model pertama)
   - `/model/walking` (model kedua)

2. **Test fitur:**
   - AR viewer berfungsi
   - Model 3D load dengan benar
   - Navigation panah berfungsi
   - Fullscreen mode (mobile)

3. **Test performance:**
   - Page load speed
   - Model loading time
   - Mobile responsiveness

## 🎯 **Final Checklist**

- [ ] Build berhasil tanpa error
- [ ] File terupload ke server
- [ ] Dependencies terinstall
- [ ] Web server dikonfigurasi
- [ ] SSL certificate aktif
- [ ] Domain pointing ke server
- [ ] Testing semua fitur

---

**Selamat! Aplikasi Augmented Fashion sudah siap di production! 🎉**
