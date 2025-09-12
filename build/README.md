# Three.js Build Files

Folder ini berisi file build Three.js yang diperlukan untuk aplikasi AR Fashion Gallery.

## ✅ Status: File Tersedia

Semua file Three.js sudah tersedia dan siap digunakan!

### **Primary File (Active)**
- ✅ `three.min.js` - Three.js main file (minified) - **SEDANG DIGUNAKAN**

### **Backup Files (Available)**
- ✅ `three.cjs` - Three.js CommonJS version (backup 1)
- ✅ `three.core.min.js` - Three.js core version (backup 2)
- ✅ `three.module.min.js` - Three.js module version (backup 3)

### **Additional Files (Optional)**
- `three.module.js` - Three.js module (unminified)
- `three.core.js` - Three.js core (unminified)
- `three.tsl.min.js` - Three.js with TSL support
- `three.webgpu.min.js` - Three.js with WebGPU support

## 🚀 Loading Strategy

Aplikasi menggunakan strategy loading berikut:

### **1. Primary Loading**
- ✅ `./build/three.min.js` - File lokal utama (prioritas 1)

### **2. Secondary Backup**
- ✅ `https://cdnjs.cloudflare.com/ajax/libs/three.js/r144/three.min.js` - CDN backup

### **3. Local Backup Files**
- ✅ `./build/three.cjs` - CommonJS version
- ✅ `./build/three.core.min.js` - Core version  
- ✅ `./build/three.module.min.js` - Module version

### **4. CDN Fallback**
- ✅ `https://unpkg.com/three@0.144.0/build/three.min.js` - Alternative CDN

### **5. Last Resort**
- ✅ Simplified Three.js fallback jika semua gagal

## ⚠️ Important Notes

- **File Size**: Minified files lebih kecil dan loading lebih cepat
- **Module Type**: Beberapa file memerlukan `type="module"` di script tag
- **Compatibility**: Pastikan versi Three.js kompatibel dengan AR.js
- **Updates**: Update Three.js files secara berkala untuk security patches

## 🎯 Expected Console Output

### **Success Case (Local File)**
```
✅ Three.js local script loaded successfully
🔍 Checking THREE availability...
THREE type: object
✅ THREE is immediately available
🎬 DOM ready, checking Three.js...
✅ Three.js is available
```

### **Backup Case**
```
🔄 Loading Three.js backup...
🔄 Trying local backup 1/3: ./build/three.cjs
✅ Three.js backup loaded successfully: ./build/three.cjs
```

### **CDN Fallback Case**
```
🌐 All local files failed, trying CDN...
✅ Three.js CDN backup loaded successfully
```

## 🐛 Troubleshooting

### **✅ File Available**
- ✅ File `three.min.js` sudah tersedia di folder `./build/`
- ✅ Semua backup files juga tersedia
- ✅ Aplikasi akan otomatis fallback jika ada masalah

### **🔍 Debug Steps**
1. Check console browser untuk loading status
2. Pastikan web server bisa akses folder build
3. Periksa network tab untuk file loading status
4. Aplikasi memiliki multiple fallbacks yang robust

## 📚 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
