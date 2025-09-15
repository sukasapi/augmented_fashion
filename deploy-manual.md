# 📋 Deploy Manual ke cPanel

Panduan step-by-step untuk deploy manual tanpa script otomatis.

## 🚀 **Langkah-langkah Deploy Manual**

### **1. Build Aplikasi**
```bash
npm run build
```

### **2. Siapkan File untuk Upload**
Setelah build, Anda akan mendapatkan folder `out/` yang berisi file static.

### **3. Upload via cPanel File Manager**

#### **File yang Perlu Diupload:**
```
public_html/
├── _next/                   # Folder dari out/_next
├── media/                   # Folder dari out/media (model files)
├── index.html              # File utama
├── model/
│   ├── model.html          # Halaman model pertama
│   └── walking.html        # Halaman model kedua
└── .htaccess               # Konfigurasi Apache
```

### **4. Upload Process:**

1. **Login ke cPanel**
2. **Buka File Manager**
3. **Navigate ke `public_html`**
4. **Upload semua file dari folder `out/`**
5. **Upload file `.htaccess`**

### **5. Set Permissions**
- **Folders**: 755
- **Files**: 644

## 🔧 **Konfigurasi Server**

### **Pastikan Server Support:**
- ✅ **Node.js 18+** (untuk build process)
- ✅ **Apache dengan mod_rewrite**
- ✅ **HTTPS** (untuk AR functionality)

### **Check .htaccess:**
Pastikan file `.htaccess` sudah terupload dan berfungsi.

## 🧪 **Testing Setelah Deploy**

### **Test URLs:**
- `https://yourdomain.com/` - Galeri
- `https://yourdomain.com/model/model/` - Model pertama
- `https://yourdomain.com/model/walking/` - Model kedua

### **Test Features:**
- ✅ Model 3D load
- ✅ AR button muncul
- ✅ Navigation panah berfungsi
- ✅ Fullscreen mode (mobile)
- ✅ Responsive design

## 🚨 **Troubleshooting**

### **Error 404:**
- Check `.htaccess` file
- Verify file permissions
- Check URL structure

### **Model tidak load:**
- Check folder `media/` terupload
- Verify file permissions (644)
- Check browser console untuk error

### **AR tidak berfungsi:**
- Pastikan menggunakan HTTPS
- Check browser support untuk WebXR
- Test di device yang mendukung AR

## 📞 **Support**

Jika mengalami masalah:
1. Check browser console untuk error
2. Verify semua file terupload dengan benar
3. Test di browser yang berbeda
4. Check server logs di cPanel
