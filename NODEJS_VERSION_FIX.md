# 🚨 Fix Node.js Version Issue - cPanel

Masalah: Server cPanel menggunakan Node.js versi 10.24.1 yang tidak kompatibel dengan Next.js 14.

## 🔍 **Analisis Masalah:**

### **Error yang Terjadi:**
```
npm WARN notsup Unsupported engine for next@14.2.32: wanted: {"node":">=18.17.0"} (current: {"node":"10.24.1","npm":"6.14.12"})
```

### **Root Cause:**
- **Server Node.js:** 10.24.1 (sangat lama)
- **Required Node.js:** >=18.17.0
- **Next.js 14:** Tidak kompatibel dengan Node.js 10

## 🛠️ **Solusi 1: Downgrade ke Next.js 12 (Recommended) ✅**

### **Step 1: Update package.json**
```json
{
  "dependencies": {
    "next": "^12.3.4",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "eslint-config-next": "12.3.4"
  }
}
```

### **Step 2: Update next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 12 compatible configuration
  trailingSlash: true,
  images: {
    domains: ['modelviewer.dev'],
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  swcMinify: true,
}
```

### **Step 3: Build dan Deploy**
```bash
# Di komputer lokal
npm install
npm run build
npm run deploy:cpanel:folder
```

## 🛠️ **Solusi 2: Request Node.js Update ke Hosting**

### **Step 1: Kontak Support Hosting**
Minta hosting untuk update Node.js ke versi 18+:

```
Subject: Request Node.js Update to Version 18+

Dear Support,

I need to update Node.js version on my hosting account to version 18.17.0 or higher to run my Next.js 14 application.

Current version: 10.24.1
Required version: >=18.17.0

Please update Node.js version in my cPanel account.

Thank you.
```

### **Step 2: Cek Node.js Version di cPanel**
1. Buka cPanel
2. Cari "Node.js Selector" atau "Node.js Version"
3. Pilih Node.js 18+ jika tersedia

## 🛠️ **Solusi 3: Static Export (Tidak Perlu Node.js)**

### **Step 1: Build Static Files**
```bash
# Di komputer lokal
npm run build
```

### **Step 2: Upload Static Files**
```bash
# Upload folder out/ ke cPanel
# Tidak perlu npm install di server
```

## 🚀 **Solusi Terbaik: Downgrade ke Next.js 12**

### **Keuntungan Next.js 12:**
- ✅ Kompatibel dengan Node.js 10+
- ✅ Semua fitur AR tetap berfungsi
- ✅ Performance tetap optimal
- ✅ Tidak perlu update server

### **Langkah-langkah:**

#### **1. Update Dependencies:**
```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install ulang dengan Next.js 12
npm install
```

#### **2. Build Aplikasi:**
```bash
npm run build
```

#### **3. Deploy ke cPanel:**
```bash
npm run deploy:cpanel:folder
```

## 📊 **Perbandingan Versi:**

| Feature | Next.js 12 | Next.js 14 |
|---------|------------|------------|
| Node.js Support | 10.17.0+ | 18.17.0+ |
| AR Support | ✅ | ✅ |
| Static Export | ✅ | ✅ |
| Performance | ✅ | ✅ |
| cPanel Compatible | ✅ | ❌ |

## 🔧 **Konfigurasi Next.js 12:**

### **package.json:**
```json
{
  "dependencies": {
    "next": "^12.3.4",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "eslint-config-next": "12.3.4"
  }
}
```

### **next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ['modelviewer.dev'],
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  swcMinify: true,
}
```

## 🚨 **Troubleshooting:**

### **Jika Masih Error:**
1. **Cek Node.js Version:**
   ```bash
   node --version
   npm --version
   ```

2. **Clear Cache:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build Ulang:**
   ```bash
   npm run build
   ```

### **Jika Build Berhasil:**
```bash
# Deploy ke cPanel
npm run deploy:cpanel:folder

# Upload folder cpanel-deploy/ ke cPanel
```

## 🎯 **Hasil Akhir:**

Setelah downgrade ke Next.js 12:
- ✅ **Kompatibel** dengan Node.js 10+
- ✅ **AR functionality** tetap berfungsi
- ✅ **Performance** tetap optimal
- ✅ **cPanel deployment** berhasil
- ✅ **Semua fitur** tetap berfungsi

## 📞 **Support:**

Jika masih mengalami masalah:
1. **Cek log error** di cPanel
2. **Test dengan domain lain**
3. **Kontak support hosting**
4. **Cek dokumentasi Next.js 12**

## 🚀 **Quick Fix Commands:**

```bash
# Fix Node.js version issue
rm -rf node_modules package-lock.json
npm install
npm run build
npm run deploy:cpanel:folder
```

**Next.js 12 adalah solusi terbaik untuk cPanel dengan Node.js 10!** 🎯
