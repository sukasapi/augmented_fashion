# Three.js Build Files

Folder ini berisi file build Three.js yang diperlukan untuk aplikasi AR Fashion Gallery.

## ✅ Status: File Tersedia

Semua file Three.js dan AR.js sudah tersedia dan siap digunakan!

### **Primary Files (Active)**
- ✅ `three.min.js` - Three.js main file (minified) - **SEDANG DIGUNAKAN**
- ✅ `ar.js` - AR.js main file - **SEDANG DIGUNAKAN**
- ✅ `ar.css` - AR.js CSS styles - **SEDANG DIGUNAKAN**

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

### **Three.js Loading**
1. ✅ `./build/three.min.js` - File lokal utama (prioritas 1)
2. ✅ `./build/three.cjs` - CommonJS version (backup 1)
3. ✅ `./build/three.core.min.js` - Core version (backup 2)
4. ✅ `./build/three.module.min.js` - Module version (backup 3)
5. ✅ CDN fallback - Multiple CDN sources
6. ✅ Simplified Three.js fallback (last resort)

### **AR.js Loading**
1. ✅ `./build/ar.js` - File lokal utama (prioritas 1)
2. ✅ `https://cdn.jsdelivr.net/npm/ar.js@0.11.0/dist/ar.js` - CDN backup 1
3. ✅ `https://unpkg.com/ar.js@0.11.0/dist/ar.js` - CDN backup 2
4. ✅ `https://cdnjs.cloudflare.com/ajax/libs/ar.js/0.11.0/ar.js` - CDN backup 3

### **AR.js CSS Loading**
1. ✅ `./build/ar.css` - File lokal utama (prioritas 1) - **CUSTOM MADE**
2. ✅ `https://cdn.jsdelivr.net/npm/ar.js@0.11.0/dist/ar.css` - CDN backup 1
3. ✅ `https://unpkg.com/ar.js@0.11.0/dist/ar.css` - CDN backup 2
4. ✅ Inline CSS fallback jika semua gagal

## ⚠️ Important Notes

- **File Size**: Minified files lebih kecil dan loading lebih cepat
- **Module Type**: Beberapa file memerlukan `type="module"` di script tag
- **Compatibility**: Pastikan versi Three.js kompatibel dengan AR.js
- **Updates**: Update Three.js files secara berkala untuk security patches

## 🎯 Expected Console Output

### **Success Case (Local Files)**
```
✅ AR.js CSS local loaded successfully
✅ AR.js local script loaded successfully
✅ Three.js local script loaded successfully
🔍 Checking THREE availability...
THREE type: object
✅ THREE is immediately available
🎬 DOM ready, checking Three.js...
✅ Three.js is available
```

### **AR.js CSS Features**
- ✅ **AR.js Loader**: Loading animation dengan dots
- ✅ **Scene Styling**: Basic A-Frame scene styles
- ✅ **Marker Styles**: Opacity transitions untuk markers
- ✅ **Entity Styles**: Basic entity display styles
- ✅ **Mobile Optimizations**: Responsive design
- ✅ **Performance Optimizations**: Hardware acceleration
- ✅ **Accessibility**: Focus management dan screen reader support

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
- ✅ File `three.min.js` dan `ar.js` sudah tersedia di folder `./build/`
- ✅ Semua backup files juga tersedia
- ✅ Aplikasi akan otomatis fallback jika ada masalah
- ✅ Loading dari file lokal lebih cepat dan reliable

### **🔍 Debug Steps**
1. Check console browser untuk loading status
2. Pastikan web server bisa akses folder build
3. Periksa network tab untuk file loading status
4. Aplikasi memiliki multiple fallbacks yang robust

## 📚 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
