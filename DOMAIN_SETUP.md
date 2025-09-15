# 🌐 Panduan Setup Domain untuk Augmented Fashion

Panduan lengkap untuk mengarahkan domain ke aplikasi Next.js yang sudah di-deploy.

## 🎯 **Opsi Konfigurasi Domain**

### **Opsi 1: Domain ke Subdomain (Recommended)**
```
Domain utama: yourdomain.com
Subdomain: ar.yourdomain.com atau fashion.yourdomain.com
```

### **Opsi 2: Domain ke Folder**
```
Domain utama: yourdomain.com
Path: yourdomain.com/augmented-fashion
```

### **Opsi 3: Domain Dedicado**
```
Domain baru: augmentedfashion.com
```

## 🔧 **Setup DNS di cPanel**

### **1. Login ke cPanel**
- Buka cPanel hosting Anda
- Navigate ke **"Zone Editor"** atau **"DNS Zone Editor"**

### **2. Tambah Subdomain (Opsi 1 - Recommended)**

#### **A. Buat Subdomain:**
```
Subdomain: ar
Domain: yourdomain.com
Document Root: public_html/ar
```

#### **B. Tambah DNS Record:**
```
Type: A
Name: ar
Value: [IP Server Anda]
TTL: 14400
```

### **3. Setup Domain Dedicado (Opsi 3)**

#### **A. Tambah Domain:**
```
Domain: augmentedfashion.com
Document Root: public_html/augmented-fashion
```

#### **B. Tambah DNS Records:**
```
Type: A
Name: @
Value: [IP Server Anda]
TTL: 14400

Type: A
Name: www
Value: [IP Server Anda]
TTL: 14400
```

## 📁 **Struktur Folder di Server**

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

## 🚀 **Langkah-langkah Deploy**

### **1. Build Aplikasi**
```bash
npm run build
```

### **2. Upload ke Folder yang Tepat**

#### **Untuk Subdomain:**
```bash
# Upload semua file dari out/ ke public_html/ar/
```

#### **Untuk Domain Dedicado:**
```bash
# Upload semua file dari out/ ke public_html/augmented-fashion/
```

### **3. Update .htaccess**
Pastikan file `.htaccess` ada di folder yang tepat.

## 🔄 **Update Konfigurasi Next.js**

### **Untuk Subdomain:**
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: '/ar', // Tambahkan ini
  images: {
    domains: ['modelviewer.dev'],
    unoptimized: true,
  },
}
```

### **Untuk Domain Dedicado:**
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Tidak perlu assetPrefix untuk domain dedicado
  images: {
    domains: ['modelviewer.dev'],
    unoptimized: true,
  },
}
```

## 📋 **Checklist Setup Domain**

### **✅ DNS Configuration:**
- [ ] DNS A record sudah diarahkan ke IP server
- [ ] TTL sudah diset (14400 atau 3600)
- [ ] DNS sudah propagate (cek dengan `nslookup`)

### **✅ Server Configuration:**
- [ ] File sudah diupload ke folder yang tepat
- [ ] .htaccess sudah ada dan benar
- [ ] Permission folder sudah benar (755)
- [ ] Permission file sudah benar (644)

### **✅ Application Configuration:**
- [ ] next.config.js sudah diupdate
- [ ] Build sudah dilakukan ulang
- [ ] File static sudah diupload

## 🧪 **Testing Domain**

### **1. Test DNS Propagation:**
```bash
# Windows
nslookup ar.yourdomain.com

# Linux/Mac
dig ar.yourdomain.com
```

### **2. Test Website:**
- Buka browser
- Akses domain/subdomain
- Test semua fitur (gallery, model detail, AR)

### **3. Test Mobile:**
- Buka di mobile browser
- Test responsive design
- Test AR functionality

## 🚨 **Troubleshooting**

### **Domain Tidak Bisa Diakses:**
1. **Cek DNS Propagation:**
   ```bash
   nslookup yourdomain.com
   ```

2. **Cek File .htaccess:**
   - Pastikan file ada di folder yang tepat
   - Pastikan syntax benar

3. **Cek Permission:**
   ```bash
   chmod 755 folder/
   chmod 644 file.html
   ```

### **404 Error:**
1. **Cek Path:**
   - Pastikan file ada di path yang benar
   - Pastikan .htaccess mengarahkan ke index.html

2. **Cek Build:**
   - Pastikan build berhasil
   - Pastikan semua file ter-upload

### **AR Tidak Berfungsi:**
1. **Cek HTTPS:**
   - AR memerlukan HTTPS
   - Pastikan SSL certificate aktif

2. **Cek Model Files:**
   - Pastikan file .glb ada
   - Pastikan path benar

## 📞 **Support**

Jika mengalami masalah:
1. Cek log error di cPanel
2. Test dengan domain lain
3. Kontak support hosting
4. Cek dokumentasi Next.js

## 🎉 **Setelah Setup Selesai**

Domain Anda akan bisa diakses di:
- **Subdomain:** `https://ar.yourdomain.com`
- **Domain Dedicado:** `https://augmentedfashion.com`

Aplikasi akan berfungsi penuh dengan:
- ✅ Gallery 3D models
- ✅ Model detail pages
- ✅ AR functionality
- ✅ Mobile responsive
- ✅ Fullscreen mode
