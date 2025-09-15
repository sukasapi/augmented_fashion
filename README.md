# Augmented Fashion - AR Model Viewer

Project Next.js dengan Tailwind CSS yang menampilkan model 3D menggunakan `<model-viewer>` dengan dukungan Augmented Reality.

## 🚀 Fitur

- **Responsive Design**: Otomatis mendeteksi desktop/mobile dan menyesuaikan tampilan
- **AR Support**: Mendukung WebXR dan AR Quick Look
- **Loading States**: Loading spinner saat model dimuat
- **Fallback**: Gambar statis jika browser tidak mendukung AR
- **Modern UI**: Menggunakan Tailwind CSS untuk styling yang clean

## 📱 Behavior

### Desktop
- Langsung menampilkan model 3D dengan kontrol interaktif
- Mouse untuk rotate, zoom, dan pan

### Mobile/Tablet
- Menampilkan pilihan mode:
  - **"Lihat Gambar"**: Preview gambar statis
  - **"Lihat AR"**: Model 3D dengan tombol AR

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Struktur Project

```
├── components/
│   └── ARViewer.jsx          # Komponen model-viewer
├── pages/
│   ├── _app.js               # App wrapper dengan global styles
│   └── index.js              # Halaman utama dengan logic desktop/mobile
├── styles/
│   └── globals.css           # Global styles + Tailwind
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🎯 Model yang Digunakan

- **GLB**: https://modelviewer.dev/shared-assets/models/Astronaut.glb
- **USDZ**: https://modelviewer.dev/shared-assets/models/Astronaut.usdz

## 🔧 Customization

### Mengganti Model
Edit props di `ARViewer` component:
```jsx
<ARViewer 
  glbSrc="path/to/your/model.glb"
  usdzSrc="path/to/your/model.usdz"
  alt="Your Model Name"
/>
```

### Styling
Modifikasi `tailwind.config.js` atau tambahkan custom CSS di `styles/globals.css`

## 📱 Browser Support

- **AR**: Chrome (Android), Safari (iOS), Edge
- **3D Model**: Semua browser modern
- **Fallback**: Gambar statis untuk browser lama

## 🚀 Deployment

Project ini siap untuk deployment di:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any static hosting service

## 📄 License

MIT License
