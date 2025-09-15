# 📋 Cara Menambah Objek 3D Baru

Panduan lengkap untuk menambah model 3D baru ke dalam aplikasi Augmented Fashion.

## 🎯 **Langkah-langkah Menambah Objek Baru**

### **1. Siapkan File Model 3D**

#### **Format yang Didukung:**
- **GLB** (wajib) - Format utama untuk WebGL
- **USDZ** (opsional) - Untuk AR Quick Look di iOS

#### **Lokasi File:**
```
media/
├── model.glb          # File asli
├── chair.glb          # Contoh objek baru
├── table.glb          # Contoh objek baru
└── lamp.usdz          # Contoh USDZ untuk iOS
```

### **2. Copy File ke Folder Public**

```bash
# Windows
copy media\chair.glb public\media\chair.glb
copy media\chair.usdz public\media\chair.usdz

# Linux/Mac
cp media/chair.glb public/media/chair.glb
cp media/chair.usdz public/media/chair.usdz
```

### **3. Update Data Model**

#### **File yang Perlu Diupdate:**
- `pages/index.js` - Halaman galeri
- `pages/model/[id].js` - Halaman detail

#### **Template Data Objek:**
```javascript
{
  id: 'unique-id',                    // ID unik (huruf kecil, tanpa spasi)
  name: 'Nama Objek',                 // Nama yang ditampilkan
  creator: 'Nama Pembuat',            // Nama pembuat/artis
  description: 'Deskripsi objek...',  // Deskripsi singkat
  glbSrc: '/media/objek.glb',         // Path ke file GLB
  usdzSrc: '/media/objek.usdz',       // Path ke file USDZ (opsional)
  previewImage: '/media/objek.glb',   // Preview image (biasanya sama dengan GLB)
  category: 'Kategori',               // Kategori objek
  tags: ['tag1', 'tag2', 'tag3'],     // Array tags untuk filter
  details: {                          // Detail teknis (opsional)
    vertices: 'Custom',
    textures: 'Custom', 
    format: 'GLB/USDZ',
    size: 'Local File'
  }
}
```

#### **Contoh Lengkap:**
```javascript
{
  id: 'chair',
  name: 'Modern Chair',
  creator: 'John Doe',
  description: 'Kursi modern dengan desain yang elegan dan nyaman untuk ruang tamu atau kantor.',
  glbSrc: '/media/chair.glb',
  usdzSrc: '/media/chair.usdz',
  previewImage: '/media/chair.glb',
  category: 'Furniture',
  tags: ['furniture', 'chair', 'modern', 'design'],
  details: {
    vertices: 'Custom',
    textures: 'Custom',
    format: 'GLB/USDZ',
    size: 'Local File'
  }
}
```

### **4. Restart Development Server**

```bash
npm run dev
```

## 📁 **Struktur File yang Benar**

```
augmented_fashion/
├── media/                    # File model asli
│   ├── model.glb
│   ├── chair.glb
│   └── chair.usdz
├── public/                   # File untuk serving
│   └── media/
│       ├── model.glb
│       ├── chair.glb
│       └── chair.usdz
├── pages/
│   ├── index.js             # Update data model di sini
│   └── model/
│       └── [id].js          # Update data model di sini juga
└── components/
    └── ARViewer.jsx         # Tidak perlu diubah
```

## 🎨 **Tips untuk Model 3D**

### **Optimasi Model:**
- **Ukuran File**: Usahakan < 10MB untuk performa optimal
- **Vertices**: Kurangi detail jika tidak perlu
- **Textures**: Gunakan resolusi yang sesuai (512x512, 1024x1024, 2048x2048)
- **Format**: GLB lebih efisien daripada GLTF

### **Naming Convention:**
- **File**: `nama-objek.glb` (huruf kecil, dengan dash)
- **ID**: `nama-objek` (sama dengan nama file tanpa ekstensi)
- **Name**: `Nama Objek` (dengan kapitalisasi yang benar)

### **Kategori yang Tersedia:**
- `Furniture` - Meja, kursi, lemari
- `Electronics` - Gadget, komputer
- `Art` - Patung, lukisan 3D
- `Architecture` - Bangunan, struktur
- `Nature` - Tanaman, batu, dll
- `Vehicles` - Mobil, motor, pesawat
- `Local` - Model custom

## 🔧 **Troubleshooting**

### **Model Tidak Muncul:**
1. Pastikan file ada di `public/media/`
2. Check path di data model (`/media/nama-file.glb`)
3. Restart development server
4. Check console browser untuk error

### **AR Tidak Berfungsi:**
1. Pastikan file GLB valid
2. Untuk iOS, tambahkan file USDZ
3. Test di device yang mendukung AR

### **Model Terlalu Besar:**
1. Optimasi model di software 3D
2. Kurangi resolusi texture
3. Simplify geometry

## 📝 **Contoh Workflow Lengkap**

```bash
# 1. Siapkan file model
# Letakkan chair.glb di folder media/

# 2. Copy ke public
copy media\chair.glb public\media\chair.glb

# 3. Update data model di pages/index.js dan pages/model/[id].js
# (Lihat contoh di atas)

# 4. Restart server
npm run dev

# 5. Test di browser
# Buka http://localhost:3000
```

## 🎯 **Best Practices**

1. **Konsistensi Data**: Pastikan data di `index.js` dan `[id].js` sama
2. **Unique ID**: Gunakan ID yang unik untuk setiap objek
3. **Deskripsi**: Buat deskripsi yang informatif dan menarik
4. **Tags**: Gunakan tags yang relevan untuk filtering
5. **Testing**: Test di berbagai device dan browser
6. **Backup**: Simpan file asli di folder `media/`

---

**Selamat menambah objek 3D baru! 🎉**
