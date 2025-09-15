# 🚀 Panduan Deploy ke cPanel - Augmented Fashion

Panduan lengkap untuk deploy aplikasi Next.js Augmented Fashion ke hosting cPanel.

## 📋 **Persiapan Sebelum Deploy**

### **1. Requirements Hosting:**
- ✅ cPanel hosting dengan Node.js support
- ✅ SSH access (optional, untuk advanced)
- ✅ File Manager access
- ✅ Domain yang sudah aktif
- ✅ SSL certificate (untuk AR functionality)

### **2. Build Aplikasi Lokal:**
```bash
# Pastikan di folder project
cd C:\laragon\www\augmented_fashion

# Install dependencies
npm install

# Build aplikasi
npm run build
```

## 🗂️ **Metode Deploy ke cPanel**

### **Metode 1: Upload Manual via File Manager (Recommended)**

#### **Step 1: Login ke cPanel**
1. Buka browser dan login ke cPanel
2. Navigate ke **"File Manager"**
3. Buka folder **`public_html`**

#### **Step 2: Siapkan File untuk Upload**
Setelah build, Anda akan mendapatkan folder `out/` yang berisi file static.

**File yang perlu diupload:**
```
public_html/
├── _next/                   # Folder dari out/_next
├── media/                   # Folder dari out/media (model files)
├── index.html              # File utama
├── model/                  # Folder model pages
│   ├── model.html          # Halaman model pertama
│   └── walking.html        # Halaman model kedua
└── .htaccess               # Konfigurasi Apache
```

#### **Step 3: Upload Process**
1. **Buat folder baru** di `public_html` (misal: `augmented-fashion`)
2. **Upload semua file** dari folder `out/` ke folder tersebut
3. **Upload file `.htaccess`** ke folder yang sama
4. **Set permissions** (755 untuk folder, 644 untuk file)

#### **Step 4: Test Website**
- Buka domain Anda: `https://yourdomain.com/augmented-fashion`
- Test semua fitur (gallery, model detail, AR)

### **Metode 2: Upload via FTP/SFTP**

#### **Step 1: Setup FTP Client**
- Gunakan FileZilla, WinSCP, atau FTP client lainnya
- Connect ke server dengan credentials dari cPanel

#### **Step 2: Upload Files**
```bash
# Upload semua file dari folder out/ ke public_html/augmented-fashion/
# Pastikan struktur folder sama seperti di atas
```

#### **Step 3: Set Permissions**
```bash
# Set permissions via FTP client atau cPanel File Manager
# Folder: 755
# File: 644
```

### **Metode 3: Upload via Git (Advanced)**

#### **Step 1: Setup Git di cPanel**
1. Buka **"Git Version Control"** di cPanel
2. Clone repository atau upload via Git

#### **Step 2: Build di Server**
```bash
# SSH ke server
ssh username@yourdomain.com

# Navigate ke folder project
cd public_html/augmented-fashion

# Install dependencies
npm install --production

# Build aplikasi
npm run build
```

## 🔧 **Konfigurasi cPanel**

### **1. Setup Node.js (jika tersedia)**
1. Buka **"Node.js Selector"** di cPanel
2. Pilih Node.js version 16+
3. Install dependencies: `npm install --production`
4. Start aplikasi: `npm start`

### **2. Setup SSL Certificate**
1. Buka **"SSL/TLS"** di cPanel
2. Install SSL certificate (Let's Encrypt atau custom)
3. Force HTTPS redirect

### **3. Setup .htaccess**
Pastikan file `.htaccess` ada dan berisi:
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
```

## 📁 **Struktur File di cPanel**

### **Untuk Subdomain (ar.yourdomain.com):**
```
public_html/
├── ar/                      # Subdomain folder
│   ├── _next/              # Next.js build files
│   ├── media/              # Model 3D files
│   ├── index.html          # Main page
│   ├── model/              # Model pages
│   └── .htaccess           # Apache config
└── [folder lain untuk domain utama]
```

### **Untuk Domain Dedicado:**
```
public_html/
├── augmented-fashion/       # Domain folder
│   ├── _next/              # Next.js build files
│   ├── media/              # Model 3D files
│   ├── index.html          # Main page
│   ├── model/              # Model pages
│   └── .htaccess           # Apache config
└── [folder lain]
```

### **Untuk Folder di Domain Utama:**
```
public_html/
├── augmented-fashion/       # Folder aplikasi
│   ├── _next/              # Next.js build files
│   ├── media/              # Model 3D files
│   ├── index.html          # Main page
│   ├── model/              # Model pages
│   └── .htaccess           # Apache config
└── [file lain untuk domain utama]
```

## 🚀 **Langkah-langkah Deploy Lengkap**

### **Step 1: Build Aplikasi**
```bash
# Di komputer lokal
npm run build
```

### **Step 2: Siapkan File**
- Folder `out/` akan berisi semua file static
- Copy file `.htaccess` ke folder yang sama

### **Step 3: Upload ke cPanel**
1. **Login ke cPanel**
2. **Buka File Manager**
3. **Navigate ke public_html**
4. **Buat folder baru** (misal: `augmented-fashion`)
5. **Upload semua file** dari folder `out/`
6. **Upload file `.htaccess`**

### **Step 4: Set Permissions**
```bash
# Via File Manager:
# - Klik kanan pada folder → Change Permissions → 755
# - Klik kanan pada file → Change Permissions → 644
```

### **Step 5: Test Website**
- Buka: `https://yourdomain.com/augmented-fashion`
- Test gallery, model detail, AR functionality

## 🔄 **Update Aplikasi**

### **Cara Update:**
1. **Build ulang** di komputer lokal
2. **Upload file baru** ke cPanel
3. **Replace file lama** dengan file baru
4. **Test website** untuk memastikan berfungsi

### **Script Update Otomatis:**
```bash
#!/bin/bash
# update-cpanel.sh

echo "🔄 Updating Augmented Fashion on cPanel..."

# Build aplikasi
npm run build

# Upload ke cPanel (via FTP atau File Manager)
# Ganti dengan method upload yang Anda gunakan

echo "✅ Update completed!"
```

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

### **Permission Denied:**
1. **Cek permissions** - set 755 untuk folder, 644 untuk file
2. **Cek ownership** - pastikan file dimiliki oleh user yang benar
3. **Cek cPanel settings** - pastikan tidak ada restriction

## 📊 **Testing Deploy**

### **1. Test Basic Functionality:**
- Buka halaman utama
- Test gallery
- Test model detail
- Test navigation

### **2. Test AR Functionality:**
- Test di mobile browser
- Test AR button
- Test fullscreen mode
- Test model loading

### **3. Test Performance:**
- Test loading speed
- Test file caching
- Test compression

## 🎯 **Opsi Domain Setup**

### **1. Subdomain (Recommended):**
```
URL: https://ar.yourdomain.com
Folder: public_html/ar/
```

### **2. Domain Dedicado:**
```
URL: https://augmentedfashion.com
Folder: public_html/augmented-fashion/
```

### **3. Folder di Domain Utama:**
```
URL: https://yourdomain.com/augmented-fashion
Folder: public_html/augmented-fashion/
```

## 📞 **Support**

Jika mengalami masalah:
1. **Cek log error** di cPanel
2. **Test dengan domain lain**
3. **Kontak support hosting**
4. **Cek dokumentasi cPanel**

## 🎉 **Setelah Deploy Selesai**

Website Anda akan berfungsi penuh dengan:
- ✅ Gallery 3D models
- ✅ Model detail pages
- ✅ AR functionality
- ✅ Mobile responsive
- ✅ Fullscreen mode
- ✅ Professional domain
- ✅ SSL/HTTPS security
- ✅ Fast loading
- ✅ Production ready
