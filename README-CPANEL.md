# 🚀 Augmented Fashion - cPanel Deployment

Panduan lengkap untuk deploy aplikasi Next.js Augmented Fashion ke hosting cPanel.

## 📁 **File cPanel Deployment**

### **Scripts:**
- `deploy-cpanel.sh` - Script untuk mempersiapkan file deploy
- `upload-cpanel.sh` - Script untuk upload via FTP
- `CPANEL_DEPLOYMENT.md` - Panduan lengkap deployment
- `QUICK_CPANEL_DEPLOY.md` - Panduan cepat deployment

### **Configuration:**
- `.htaccess` - Konfigurasi Apache untuk production
- `nginx.conf` - Konfigurasi Nginx (optional)

## 🎯 **Quick Start cPanel**

### **1. Deploy ke Folder (Recommended):**
```bash
npm run deploy:cpanel:folder
```

### **2. Deploy ke Subdomain:**
```bash
npm run deploy:cpanel:subdomain
```

### **3. Deploy ke Domain Dedicado:**
```bash
npm run deploy:cpanel:domain
```

### **4. Upload via FTP:**
```bash
npm run upload:cpanel --host ftp.yourdomain.com --user username --pass password
```

## 🔧 **cPanel Features**

### **✅ Static File Serving:**
- Optimized serving untuk 3D models (.glb, .usdz)
- Proper MIME types
- Long-term caching
- Gzip compression

### **✅ Security:**
- Security headers
- HTTPS redirect
- File protection
- Content-Type validation

### **✅ Performance:**
- Static file caching
- Gzip compression
- Optimized routing
- Fast loading

### **✅ AR Support:**
- HTTPS required untuk AR
- Proper MIME types untuk 3D models
- Mobile optimization
- WebXR support

## 📊 **Deploy Commands**

### **cPanel Deploy:**
```bash
# Deploy ke folder
npm run deploy:cpanel:folder

# Deploy ke subdomain
npm run deploy:cpanel:subdomain

# Deploy ke domain dedicado
npm run deploy:cpanel:domain

# Upload via FTP
npm run upload:cpanel --host ftp.yourdomain.com --user username --pass password
```

### **Manual Deploy:**
```bash
# Siapkan file
npm run deploy:cpanel:folder

# Upload manual ke cPanel File Manager
# Buka folder: cpanel-deploy/
# Upload semua file ke public_html/augmented-fashion/
```

## 🌐 **Domain Options**

### **1. Folder (yourdomain.com/augmented-fashion):**
- **Setup:** `npm run deploy:cpanel:folder`
- **URL:** `https://yourdomain.com/augmented-fashion`
- **Folder:** `public_html/augmented-fashion/`

### **2. Subdomain (ar.yourdomain.com):**
- **Setup:** `npm run deploy:cpanel:subdomain`
- **URL:** `https://ar.yourdomain.com`
- **Folder:** `public_html/ar/`

### **3. Domain Dedicado (augmentedfashion.com):**
- **Setup:** `npm run deploy:cpanel:domain`
- **URL:** `https://augmentedfashion.com`
- **Folder:** `public_html/augmented-fashion/`

## 📋 **Deploy Process**

### **Step 1: Build Aplikasi**
```bash
npm run build
```

### **Step 2: Siapkan File Deploy**
```bash
npm run deploy:cpanel:folder
```

### **Step 3: Upload ke cPanel**
- **Manual:** Upload via File Manager
- **FTP:** Upload via FTP client
- **Script:** Upload via upload script

### **Step 4: Set Permissions**
- **Folder:** 755
- **File:** 644
- **.htaccess:** 644

### **Step 5: Test Website**
- Buka domain
- Test gallery, model detail, AR

## 🚨 **Troubleshooting**

### **404 Error:**
1. **Cek file .htaccess** - pastikan ada dan benar
2. **Cek path upload** - pastikan file ada di path yang benar
3. **Cek permissions** - pastikan 755 untuk folder, 644 untuk file

### **AR Tidak Berfungsi:**
1. **Cek HTTPS** - AR memerlukan HTTPS
2. **Cek SSL certificate** - pastikan aktif
3. **Cek model files** - pastikan file .glb ada
4. **Cek browser support** - pastikan browser mendukung AR

### **File Tidak Ter-upload:**
1. **Cek ukuran file** - pastikan tidak melebihi limit
2. **Cek format file** - pastikan format yang benar
3. **Cek koneksi** - pastikan koneksi stabil

## 📈 **Performance Optimization**

### **1. Static File Caching:**
```apache
# .htaccess
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType model/gltf-binary "access plus 1 year"
    ExpiresByType model/vnd.usdz+zip "access plus 1 year"
</IfModule>
```

### **2. Gzip Compression:**
```apache
# .htaccess
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>
```

### **3. Security Headers:**
```apache
# .htaccess
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## 🔒 **Security Features**

### **Security Headers:**
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### **File Protection:**
- Deny access to sensitive files
- Proper file permissions
- Content-Type validation

### **HTTPS Support:**
- SSL certificate required
- HTTPS redirect
- Secure cookie settings

## 📋 **cPanel Checklist**

### **✅ Hosting Requirements:**
- [ ] cPanel hosting dengan Apache
- [ ] SSL certificate aktif
- [ ] File Manager access
- [ ] FTP access (optional)

### **✅ Deploy Process:**
- [ ] Build aplikasi
- [ ] Siapkan file deploy
- [ ] Upload ke cPanel
- [ ] Set permissions
- [ ] Test website

### **✅ Functionality:**
- [ ] Gallery berfungsi
- [ ] Model detail berfungsi
- [ ] AR functionality berfungsi
- [ ] Mobile responsive
- [ ] SSL/HTTPS aktif

## 🎉 **cPanel Ready Features**

Setelah deploy selesai, website akan memiliki:
- ✅ Static file serving
- ✅ 3D model support
- ✅ AR functionality
- ✅ Mobile responsive
- ✅ SSL/HTTPS security
- ✅ Performance optimization
- ✅ Security headers
- ✅ Fast loading
- ✅ Production ready

## 📞 **Support**

Jika mengalami masalah:
1. **Cek log error** di cPanel
2. **Test dengan domain lain**
3. **Kontak support hosting**
4. **Cek dokumentasi cPanel**

## 🚀 **Quick Commands**

```bash
# Deploy ke folder
npm run deploy:cpanel:folder

# Deploy ke subdomain
npm run deploy:cpanel:subdomain

# Deploy ke domain dedicado
npm run deploy:cpanel:domain

# Upload via FTP
npm run upload:cpanel --host ftp.yourdomain.com --user username --pass password
```

**Aplikasi siap untuk cPanel deployment!** 🎯

