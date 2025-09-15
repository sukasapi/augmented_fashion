# 🚀 Quick Deploy ke cPanel - Augmented Fashion

Panduan cepat untuk deploy aplikasi ke cPanel hosting.

## 🎯 **3 Cara Deploy ke cPanel**

### **1. Deploy Otomatis (Recommended) 🌟**
```bash
# Pilih tipe deploy
npm run deploy:cpanel:folder      # Untuk folder
npm run deploy:cpanel:subdomain   # Untuk subdomain
npm run deploy:cpanel:domain      # Untuk domain dedicado

# Upload via FTP (jika ada FTP access)
npm run upload:cpanel --host ftp.yourdomain.com --user username --pass password
```

### **2. Deploy Manual via File Manager**
```bash
# Siapkan file
npm run deploy:cpanel:folder

# Upload manual ke cPanel File Manager
# Buka folder: cpanel-deploy/
# Upload semua file ke public_html/augmented-fashion/
```

### **3. Deploy via FTP Client**
```bash
# Siapkan file
npm run deploy:cpanel:folder

# Upload via FileZilla/WinSCP
# Connect ke server
# Upload folder cpanel-deploy/ ke public_html/augmented-fashion/
```

## 📋 **Langkah-langkah Deploy**

### **Step 1: Pilih Tipe Deploy**
```bash
# Folder di domain utama (yourdomain.com/augmented-fashion)
npm run deploy:cpanel:folder

# Subdomain (ar.yourdomain.com)
npm run deploy:cpanel:subdomain

# Domain dedicado (augmentedfashion.com)
npm run deploy:cpanel:domain
```

### **Step 2: Upload ke cPanel**
```bash
# Manual via File Manager
# 1. Buka cPanel File Manager
# 2. Navigate ke public_html
# 3. Upload semua file dari folder cpanel-deploy/
# 4. Set permissions (755 untuk folder, 644 untuk file)

# Atau via FTP
npm run upload:cpanel --host ftp.yourdomain.com --user username --pass password
```

### **Step 3: Test Website**
- Buka domain Anda
- Test gallery, model detail, AR functionality

## 🔧 **Konfigurasi cPanel**

### **1. Setup SSL Certificate**
1. Buka **"SSL/TLS"** di cPanel
2. Install SSL certificate (Let's Encrypt)
3. Force HTTPS redirect

### **2. Setup .htaccess**
File `.htaccess` sudah otomatis dibuat dengan konfigurasi:
- ✅ Next.js routing
- ✅ Gzip compression
- ✅ Static file caching
- ✅ Security headers

### **3. Setup Permissions**
```bash
# Folder: 755
# File: 644
# .htaccess: 644
```

## 📁 **Struktur File di cPanel**

### **Folder (yourdomain.com/augmented-fashion):**
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

### **Subdomain (ar.yourdomain.com):**
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

### **Domain Dedicado (augmentedfashion.com):**
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

## 🎯 **Opsi Domain**

### **1. Folder (Recommended untuk pemula):**
```
URL: https://yourdomain.com/augmented-fashion
Setup: npm run deploy:cpanel:folder
```

### **2. Subdomain (Professional):**
```
URL: https://ar.yourdomain.com
Setup: npm run deploy:cpanel:subdomain
```

### **3. Domain Dedicado (Branding kuat):**
```
URL: https://augmentedfashion.com
Setup: npm run deploy:cpanel:domain
```

## 🔄 **Update Aplikasi**

### **Cara Update:**
```bash
# 1. Build ulang
npm run deploy:cpanel:folder

# 2. Upload file baru ke cPanel
# 3. Replace file lama dengan file baru
# 4. Test website
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

**Pilih metode yang paling mudah untuk Anda!** 🎯

