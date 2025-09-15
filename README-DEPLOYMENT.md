# 🚀 Augmented Fashion - Deployment Guide

Aplikasi Next.js untuk menampilkan model 3D dengan AR functionality.

## 📁 **File Deployment**

### **Scripts:**
- `deploy.sh` - Script otomatis untuk deploy
- `setup-domain.sh` - Script untuk setup domain configuration
- `.htaccess` - Konfigurasi Apache untuk production

### **Panduan:**
- `DEPLOYMENT_GUIDE.md` - Panduan lengkap deployment
- `DOMAIN_SETUP.md` - Panduan setup domain dan DNS
- `QUICK_DOMAIN_SETUP.md` - Panduan cepat setup domain
- `deploy-manual.md` - Panduan deploy manual

### **Konfigurasi:**
- `domain-configs/` - Folder berisi konfigurasi untuk setiap opsi domain

## 🎯 **Quick Start**

### **1. Pilih Opsi Domain:**
```bash
# Subdomain (Recommended)
npm run setup:subdomain

# Domain Dedicado
npm run setup:domain

# Folder di Domain Utama
npm run setup:folder
```

### **2. Deploy:**
```bash
# Deploy otomatis
npm run deploy

# Atau deploy manual
npm run deploy:manual
```

### **3. Upload ke Server:**
- Upload semua file dari folder `out/` ke server
- Pastikan file `.htaccess` ikut ter-upload
- Setup DNS jika perlu

## 🌐 **Opsi Domain**

### **Subdomain (Recommended):**
- URL: `https://ar.yourdomain.com`
- Folder: `public_html/ar/`
- Setup: `npm run setup:subdomain`

### **Domain Dedicado:**
- URL: `https://augmentedfashion.com`
- Folder: `public_html/augmented-fashion/`
- Setup: `npm run setup:domain`

### **Folder:**
- URL: `https://yourdomain.com/augmented-fashion`
- Folder: `public_html/augmented-fashion/`
- Setup: `npm run setup:folder`

## 📋 **Requirements**

### **Server:**
- ✅ Apache/Nginx
- ✅ PHP (untuk .htaccess)
- ✅ HTTPS (untuk AR)
- ✅ cPanel (optional)

### **Browser:**
- ✅ Chrome/Edge (AR support)
- ✅ Safari (AR support)
- ✅ Firefox (basic support)

### **Mobile:**
- ✅ iOS Safari (AR Quick Look)
- ✅ Android Chrome (WebXR)

## 🔧 **Features**

- ✅ Gallery 3D models
- ✅ Model detail pages
- ✅ AR functionality
- ✅ Mobile responsive
- ✅ Fullscreen mode
- ✅ Model information
- ✅ Navigation between models
- ✅ Loading states
- ✅ Error handling

## 📱 **Mobile Features**

- ✅ Mode selection (Image/AR)
- ✅ Fullscreen AR view
- ✅ Touch controls
- ✅ Responsive design
- ✅ AR Quick Look (iOS)
- ✅ WebXR (Android)

## 🎨 **Customization**

### **Tambah Model Baru:**
1. Copy file .glb ke `media/`
2. Copy ke `public/media/`
3. Update `modelObjects` di `pages/index.js` dan `pages/model/[id].js`
4. Restart server

### **Ubah Styling:**
- Edit `styles/globals.css`
- Edit Tailwind classes di komponen
- Update `tailwind.config.js` jika perlu

### **Ubah Domain:**
- Edit `next.config.js`
- Rebuild aplikasi
- Upload ulang

## 🚨 **Troubleshooting**

### **Build Error:**
```bash
# Clear cache
rm -rf .next
npm run build
```

### **404 Error:**
- Cek file .htaccess
- Cek path upload
- Cek permission

### **AR Tidak Berfungsi:**
- Cek HTTPS
- Cek model files
- Cek browser support

### **DNS Tidak Resolve:**
- Tunggu propagation (24-48 jam)
- Cek DNS settings
- Cek TTL

## 📞 **Support**

1. Cek dokumentasi di folder ini
2. Test dengan domain lain
3. Kontak support hosting
4. Cek log error di cPanel

## 🎉 **Success!**

Setelah deployment berhasil, website Anda akan memiliki:
- ✅ Professional domain
- ✅ Fast loading
- ✅ Mobile responsive
- ✅ AR functionality
- ✅ SEO friendly
- ✅ Production ready
