# 🎨 AR Fashion Gallery

Aplikasi web Augmented Reality yang memungkinkan pengguna untuk melihat dan menjelajahi koleksi model 3D fashion dengan teknologi AR.js dan Three.js.

## 🚀 Fitur Utama

### 📱 **Multi-Device Support**
- **Mobile**: AR dengan marker detection
- **Desktop**: 3D viewer tanpa marker
- **Auto-detection**: Otomatis mendeteksi perangkat dan menyesuaikan mode

### 🎨 **Gallery System**
- **Multiple Models**: 5 model 3D berbeda (Box, Sphere, Cylinder, Cone, Custom GLB)
- **Interactive Gallery**: Modal gallery dengan preview thumbnail
- **Model Switching**: Tombol navigasi panah kiri/kanan
- **Real-time Preview**: Preview model secara real-time

### 🎯 **AR Features**
- **Marker Detection**: Deteksi marker Hiro pattern
- **GLB Support**: Dukungan model 3D format GLB
- **Fallback System**: Model primitif jika GLB tidak tersedia
- **Auto Animation**: Animasi rotasi otomatis

### 💻 **User Experience**
- **Responsive Design**: Interface yang adaptif untuk semua ukuran layar
- **Modern UI**: Design modern dengan gradient dan glassmorphism
- **Touch Controls**: Kontrol yang mudah digunakan di mobile
- **Status Updates**: Status real-time untuk feedback pengguna

## 📱 Cara Penggunaan

### **Mode Mobile (AR dengan Marker)**

1. **Download Marker**:
   - Buka `marker.html` untuk melihat marker AR
   - Download dan cetak marker Hiro pattern
   - Cetak dengan ukuran minimal 8cm x 8cm

2. **Gunakan Aplikasi**:
   - Buka `index.html` di browser mobile
   - Izinkan akses kamera saat diminta
   - Arahkan kamera ke marker yang sudah dicetak
   - Model 3D akan muncul di atas marker

3. **Navigasi Model**:
   - Gunakan tombol panah kiri/kanan untuk ganti model
   - Klik tombol gallery (🎨) untuk melihat koleksi
   - Pilih model dari gallery untuk langsung ganti

### **Mode Desktop (3D Viewer)**

1. **Buka Aplikasi**:
   - Buka `index.html` di browser desktop
   - Model 3D akan langsung tampil tanpa marker

2. **Navigasi Model**:
   - Gunakan tombol panah kiri/kanan untuk ganti model
   - Klik tombol gallery (🎨) untuk melihat koleksi
   - Pilih model dari gallery untuk langsung ganti

## 🛠️ Teknologi

- **AR.js**: Framework AR untuk web browser (v0.11.0)
- **Three.js**: 3D graphics library (local build) - Using local Three.js files from ./build/ folder
- **A-Frame**: Web framework untuk AR/VR
- **HTML5**: Camera API dan WebRTC
- **CSS3**: Modern styling dengan glassmorphism
- **JavaScript ES6+**: Modern JavaScript dengan classes

## 📁 Struktur Project

```
augmented_fashion/
├── index.html              # Aplikasi utama
├── marker.html             # Halaman marker AR
├── README.md               # Dokumentasi
├── build/                  # Three.js build files
│   ├── three.module.min.js # Three.js module (primary)
│   ├── three.core.min.js   # Three.js core (fallback)
│   ├── three.cjs           # Three.js CommonJS
│   └── ...                 # Other Three.js build files
├── asset/
│   └── model/
│       ├── README.md       # Dokumentasi model
│       └── model.glb       # Model custom (opsional)
```

## 🎨 Model Collection

### **Built-in Models**
1. **Box 3D** - Kubus merah dengan animasi rotasi
2. **Sphere 3D** - Bola biru dengan animasi rotasi
3. **Cylinder 3D** - Silinder hijau dengan animasi rotasi
4. **Cone 3D** - Kerucut orange dengan animasi rotasi
5. **Custom Model** - Model GLB dari `./asset/model/model.glb`

### **Custom Models**
- Tambahkan file `.glb` ke folder `./asset/model/`
- Model akan otomatis terdeteksi dan ditampilkan
- Gunakan nama file yang deskriptif

## 🔧 Setup Development

### **Prerequisites**
- Web server (Apache, Nginx, atau Live Server)
- Browser modern dengan dukungan WebRTC
- Kamera perangkat (untuk mode mobile)

### **Installation**
1. Clone atau download project
2. **Pastikan Three.js files ada di folder `./build/`**:
   - `three.module.min.js` (primary)
   - `three.core.min.js` (fallback)
   - `three.cjs` (alternative)
3. Pastikan file `index.html` diakses melalui web server
4. Buka `index.html` di browser
5. Izinkan akses kamera (untuk mode mobile)

### **Development Server**
```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan Node.js (live-server)
npx live-server

# Menggunakan PHP
php -S localhost:8000
```

## 📱 Browser Support

| Browser | Mobile | Desktop | AR Support |
|---------|--------|---------|------------|
| Chrome | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ |
| Safari | ✅ | ✅ | ✅ (iOS 11+) |
| Edge | ✅ | ✅ | ✅ |

## 🎯 Marker Pattern

Aplikasi menggunakan **Hiro pattern** dari AR.js:
- Pattern yang sudah terbukti stabil
- Mudah dideteksi oleh kamera mobile
- Ukuran optimal untuk smartphone
- Download dari `marker.html`

## 🐛 Troubleshooting

### **Model Tidak Muncul**
- **Mobile**: Pastikan marker tercetak dengan baik dan terdeteksi
- **Desktop**: Refresh halaman dan pastikan JavaScript enabled
- **GLB Model**: Periksa path file dan format model

### **Kamera Tidak Bekerja**
- Izinkan akses kamera di browser
- Pastikan browser mendukung WebRTC
- Restart browser jika perlu

### **Gallery Tidak Buka**
- Periksa console browser untuk error
- Pastikan JavaScript enabled
- Refresh halaman

### **Model Tidak Ganti**
- Periksa console browser untuk error
- Pastikan model collection ter-load dengan benar
- Coba refresh halaman

### **Three.js Loading Error**
- **Missing Files**: Pastikan folder `./build/` berisi file Three.js
- **File Permissions**: Pastikan web server bisa akses file di folder build
- **Module Type**: Beberapa file Three.js memerlukan `type="module"`
- **Console Check**: Periksa console untuk error loading specific

## 🎨 Customization

### **Menambah Model Baru**
1. Tambahkan file `.glb` ke `./asset/model/`
2. Update array `models` di `index.html`
3. Tambahkan thumbnail untuk gallery
4. Test model di berbagai perangkat

### **Mengubah UI**
- Edit CSS di bagian `<style>` di `index.html`
- Gunakan CSS variables untuk konsistensi warna
- Test responsive design di berbagai ukuran layar

### **Mengubah Animasi**
- Edit attribute `animation` pada model
- Gunakan A-Frame animation system
- Test performa di perangkat mobile

## 📄 License

MIT License - bebas digunakan untuk keperluan personal maupun komersial.

## 🤝 Contributing

1. Fork project
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📞 Support

Jika mengalami masalah:
1. Check console browser (F12) untuk error
2. Periksa file README.md untuk troubleshooting
3. Pastikan setup sesuai petunjuk
4. Test di browser dan perangkat yang berbeda

## 🎉 Credits

- **AR.js**: Framework AR untuk web
- **Three.js**: 3D graphics library
- **A-Frame**: Web framework untuk AR/VR
- **Hiro Pattern**: Marker pattern dari AR.js

---

**Happy AR Coding! 🎨✨**
