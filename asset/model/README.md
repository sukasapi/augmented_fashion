# Model 3D Collection

Folder ini berisi koleksi model 3D dalam format GLB yang dapat digunakan dalam aplikasi AR Fashion Gallery.

## 📁 Struktur File

```
asset/model/
├── model.glb          # Model custom utama (opsional)
├── fashion-1.glb      # Model fashion 1 (opsional)
├── fashion-2.glb      # Model fashion 2 (opsional)
├── fashion-3.glb      # Model fashion 3 (opsional)
└── README.md          # File dokumentasi ini
```

## 🎨 Cara Menambahkan Model

1. **Siapkan Model 3D**:
   - Format: GLB (GL Transmission Format Binary)
   - Ukuran: Maksimal 10MB untuk performa optimal
   - Optimasi: Gunakan texture yang sudah dikompres

2. **Nama File**:
   - Gunakan nama yang deskriptif (contoh: `dress-1.glb`, `shoes-2.glb`)
   - Hindari spasi, gunakan tanda hubung atau underscore
   - Ekstensi file harus `.glb`

3. **Posisi Model**:
   - Pastikan model berada di pusat koordinat (0,0,0)
   - Orientasi model menghadap ke arah yang benar
   - Scale model sudah sesuai (tidak terlalu besar/kecil)

## 🔧 Tips Optimasi

- **Texture**: Gunakan format JPG atau PNG yang sudah dikompres
- **Geometry**: Kurangi jumlah polygon jika tidak diperlukan
- **Animation**: Hapus animasi yang tidak digunakan
- **Materials**: Gunakan material yang sederhana untuk performa mobile

## 📱 Kompatibilitas

- **Mobile**: Model akan otomatis di-scale ke 0.5x untuk performa optimal
- **Desktop**: Model akan ditampilkan dengan scale penuh
- **AR Mode**: Model akan muncul di atas marker AR
- **Fallback Mode**: Model akan muncul tanpa marker di desktop

## 🎯 Penggunaan

1. **Tambahkan model** ke folder ini
2. **Update aplikasi** untuk mengenali model baru
3. **Test model** di browser mobile dan desktop
4. **Optimasi** jika diperlukan untuk performa yang lebih baik

## 📋 Daftar Model yang Didukung

- `model.glb` - Model custom utama (jika ada)
- Model primitif (Box, Sphere, Cylinder, Cone) - Built-in
- Model GLB custom - Dapat ditambahkan sesuai kebutuhan

## ⚠️ Catatan Penting

- Pastikan model tidak mengandung virus atau malware
- Gunakan model yang memiliki lisensi yang sesuai
- Test model di berbagai perangkat untuk memastikan kompatibilitas
- Backup model original sebelum melakukan optimasi