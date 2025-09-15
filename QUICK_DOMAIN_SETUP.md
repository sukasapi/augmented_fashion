# 🚀 Quick Domain Setup Guide

Panduan cepat untuk mengatur domain aplikasi Augmented Fashion.

## 🎯 **Pilih Opsi Domain Anda**

### **1. Subdomain (Recommended) 🌟**
```
URL: https://ar.yourdomain.com
Folder: public_html/ar/
```

**Keuntungan:**
- ✅ Mudah setup
- ✅ Tidak perlu domain baru
- ✅ SEO friendly
- ✅ Professional look

**Setup:**
```bash
./setup-domain.sh subdomain
```

### **2. Domain Dedicado**
```
URL: https://augmentedfashion.com
Folder: public_html/augmented-fashion/
```

**Keuntungan:**
- ✅ Branding yang kuat
- ✅ URL yang pendek
- ✅ Professional

**Setup:**
```bash
./setup-domain.sh domain
```

### **3. Folder di Domain Utama**
```
URL: https://yourdomain.com/augmented-fashion
Folder: public_html/augmented-fashion/
```

**Keuntungan:**
- ✅ Tidak perlu subdomain
- ✅ Mudah maintenance

**Setup:**
```bash
./setup-domain.sh folder
```

## 🔧 **Langkah-langkah Setup**

### **Step 1: Pilih Opsi**
```bash
# Pilih salah satu:
./setup-domain.sh subdomain    # Untuk ar.yourdomain.com
./setup-domain.sh domain       # Untuk augmentedfashion.com
./setup-domain.sh folder       # Untuk yourdomain.com/augmented-fashion
```

### **Step 2: Upload ke Server**
```bash
# File sudah siap di folder out/
# Upload semua file ke folder yang sesuai:
```

**Untuk Subdomain:**
- Upload ke: `public_html/ar/`

**Untuk Domain Dedicado:**
- Upload ke: `public_html/augmented-fashion/`

**Untuk Folder:**
- Upload ke: `public_html/augmented-fashion/`

### **Step 3: Setup DNS (jika perlu)**

#### **Subdomain:**
```
Type: A
Name: ar
Value: [IP Server]
TTL: 14400
```

#### **Domain Dedicado:**
```
Type: A
Name: @
Value: [IP Server]
TTL: 14400

Type: A
Name: www
Value: [IP Server]
TTL: 14400
```

## 📋 **Checklist Cepat**

- [ ] Pilih opsi domain
- [ ] Jalankan setup script
- [ ] Upload file ke server
- [ ] Setup DNS (jika perlu)
- [ ] Test website
- [ ] Test AR functionality

## 🧪 **Test Website**

### **Desktop:**
- Buka gallery
- Klik model
- Test 3D viewer
- Test info button

### **Mobile:**
- Test responsive design
- Test mode selection
- Test AR functionality
- Test fullscreen mode

## 🚨 **Troubleshooting Cepat**

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

## 📞 **Need Help?**

1. Cek `DEPLOYMENT_GUIDE.md` untuk detail
2. Cek `DOMAIN_SETUP.md` untuk DNS setup
3. Test dengan domain lain
4. Kontak support hosting

## 🎉 **Setelah Setup Selesai**

Website Anda akan berfungsi penuh dengan:
- ✅ Gallery 3D models
- ✅ Model detail pages
- ✅ AR functionality
- ✅ Mobile responsive
- ✅ Fullscreen mode
- ✅ Professional domain
