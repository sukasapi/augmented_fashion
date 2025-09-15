import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Data objek 3D yang tersedia
const modelObjects = [
  {
    id: 'model',
    name: '3D Model',
    creator: 'Local Model',
    description: 'Model 3D postur tubuh',
    glbSrc: '/media/model.glb',
    usdzSrc: null, // Tidak ada file USDZ lokal
    previewImage: '/media/model.glb',
    category: 'Local',
    tags: ['local', '3d', 'model']
  },
  {
    id: 'walking',
    name: 'Walking Model',
    creator: 'Arifian',
    description: 'Model 3D Berjalan',
    glbSrc: '/media/walking.glb',
    usdzSrc: null, // Tidak ada file USDZ lokal
    previewImage: '/media/walking.glb',
    category: 'Local',
    tags: ['local', '3d', 'model']
  },
  // Contoh objek baru - uncomment jika ada file chair.glb
  // {
  //   id: 'chair',
  //   name: 'Modern Chair',
  //   creator: 'Your Name',
  //   description: 'Kursi modern dengan desain yang elegan dan nyaman',
  //   glbSrc: '/media/chair.glb',
  //   usdzSrc: '/media/chair.usdz', // Opsional untuk iOS AR
  //   previewImage: '/media/chair.glb',
  //   category: 'Furniture',
  //   tags: ['furniture', 'chair', 'modern', 'design']
  // }
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(isMobileDevice || isSmallScreen);
      setIsLoading(false);
    };

    checkMobile();
    
    // Listen for resize events
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isSmallScreen);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(modelObjects.map(obj => obj.category))];

  // Filter objects by category
  const filteredObjects = selectedCategory === 'All' 
    ? modelObjects 
    : modelObjects.filter(obj => obj.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Memuat galeri...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Augmented Fashion - Galeri Model 3D</title>
        <meta name="description" content="Pilih dan jelajahi model 3D dengan teknologi AR" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Augmented Fashion
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih model 3D yang ingin Anda jelajahi dengan teknologi Augmented Reality
            </p>
          </div>

          {/* Category Filter */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredObjects.map((obj) => (
                <Link key={obj.id} href={`/model/${obj.id}`}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
                    {/* Preview Image dengan Model Viewer */}
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <model-viewer
                        src={obj.glbSrc}
                        alt={obj.name}
                        auto-rotate
                        camera-controls
                        disable-zoom
                        disable-pan
                        disable-tap
                        interaction-policy="allow-when-focused"
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#f3f4f6'
                        }}
                      >
                        {/* Fallback jika model tidak load */}
                        <div slot="poster" className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-2xl">🎯</span>
                            </div>
                            <p className="text-sm text-gray-500">3D Model</p>
                          </div>
                        </div>
                      </model-viewer>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white rounded-full p-3 shadow-lg">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {obj.name}
                        </h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {obj.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {obj.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {obj.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                        {obj.tags.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{obj.tags.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredObjects.length === 0 && (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada model ditemukan</h3>
              <p className="text-gray-500">Coba pilih kategori lain atau lihat semua model.</p>
            </div>
          )}

          {/* Features Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl mb-3">🥽</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">AR Support</h3>
                <p className="text-sm text-gray-600">
                  Lihat model 3D dalam Augmented Reality dengan WebXR dan AR Quick Look
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Responsive</h3>
                <p className="text-sm text-gray-600">
                  Otomatis menyesuaikan tampilan untuk desktop dan mobile
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive</h3>
                <p className="text-sm text-gray-600">
                  Rotate, zoom, dan explore model 3D dengan kontrol yang intuitif
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
