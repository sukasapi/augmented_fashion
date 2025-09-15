import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import ARViewer from '../../components/ARViewer';

// Data objek 3D yang tersedia (sama dengan di index.js)
const modelObjects = [
  {
    id: 'model',
    name: '3D Model',
    creator: 'Local Model',
    description: 'Model 3D postur tubuh dengan detail yang realistis dan tekstur berkualitas tinggi.',
    glbSrc: '/media/model.glb',
    usdzSrc: null, // Tidak ada file USDZ lokal
    previewImage: '/media/model.glb',
    category: 'Local',
    tags: ['local', '3d', 'model', 'custom'],
    details: {
      vertices: 'Custom',
      textures: 'Custom',
      format: 'GLB',
      size: 'Local File'
    }
  },
  {
    id: 'walking',
    name: 'Walking Model',
    creator: 'Arifian',
    description: 'Model 3D Berjalan dengan animasi yang realistis.',
    glbSrc: '/media/walking.glb',
    usdzSrc: null, // Tidak ada file USDZ lokal
    previewImage: '/media/walking.glb',
    category: 'Local',
    tags: ['local', '3d', 'model', 'walking'],
    details: {
      vertices: 'Custom',
      textures: 'Custom',
      format: 'GLB',
      size: 'Local File'
    }
  },
  // Contoh objek baru - uncomment jika ada file chair.glb
  // {
  //   id: 'chair',
  //   name: 'Modern Chair',
  //   creator: 'Your Name',
  //   description: 'Kursi modern dengan desain yang elegan dan nyaman untuk ruang tamu atau kantor.',
  //   glbSrc: '/media/chair.glb',
  //   usdzSrc: '/media/chair.usdz', // Opsional untuk iOS AR
  //   previewImage: '/media/chair.glb',
  //   category: 'Furniture',
  //   tags: ['furniture', 'chair', 'modern', 'design'],
  //   details: {
  //     vertices: 'Custom',
  //     textures: 'Custom',
  //     format: 'GLB/USDZ',
  //     size: 'Local File'
  //   }
  // }
];

export default function ModelDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('ar'); // 'image' atau 'ar'
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);

  // Find the model object
  const model = modelObjects.find(obj => obj.id === id);
  
  // Get current model index
  useEffect(() => {
    if (model) {
      const index = modelObjects.findIndex(obj => obj.id === model.id);
      setCurrentModelIndex(index);
    }
  }, [model]);
  
  // Get previous and next models
  const getPreviousModel = () => {
    const prevIndex = currentModelIndex > 0 ? currentModelIndex - 1 : modelObjects.length - 1;
    return modelObjects[prevIndex];
  };
  
  const getNextModel = () => {
    const nextIndex = currentModelIndex < modelObjects.length - 1 ? currentModelIndex + 1 : 0;
    return modelObjects[nextIndex];
  };
  
  const navigateToModel = (modelId) => {
    router.push(`/model/${modelId}`);
  };

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

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleFullscreenToggle = (fullscreen) => {
    // Only allow fullscreen on mobile devices
    if (isMobile) {
      setIsFullscreen(fullscreen);
    }
  };

  // Show 404 if model not found
  if (!isLoading && !model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-lg text-gray-600 mb-8">Model tidak ditemukan</p>
          <Link href="/">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Kembali ke Galeri
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Memuat model...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{model.name} - Augmented Fashion</title>
        <meta name="description" content={model.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header with Back Button - Hide when fullscreen */}
        {!isFullscreen && (
          <div className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Kembali ke Galeri
                </Link>
                <span className="text-sm text-gray-500">{model.category}</span>
              </div>
            </div>
          </div>
        )}

        <div className={`${isFullscreen ? 'fixed inset-0 z-40' : 'container mx-auto px-4 py-8'}`}>

          {/* Desktop View - Direct AR Display */}
          {!isMobile && (
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  {/* Previous Model Thumbnail */}
                  <div className="flex-shrink-0 w-32">
                    <button
                      onClick={() => navigateToModel(getPreviousModel().id)}
                      className="group w-full"
                    >
                      <div className="bg-gray-100 rounded-lg p-2 hover:bg-gray-200 transition-colors">
                        <div className="aspect-square bg-gray-200 rounded mb-2 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-8 h-8 mx-auto mb-1 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm">🎯</span>
                            </div>
                            <p className="text-xs text-gray-500">3D</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span className="text-xs text-gray-600 ml-1 truncate">{getPreviousModel().name}</span>
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  {/* Main AR Viewer */}
                  <div className="flex-1 mx-6">
                    <ARViewer 
                      glbSrc={model.glbSrc}
                      usdzSrc={model.usdzSrc}
                      alt={model.name}
                      isFullscreen={isFullscreen}
                      onFullscreenToggle={handleFullscreenToggle}
                    />
                  </div>
                  
                  {/* Next Model Thumbnail */}
                  <div className="flex-shrink-0 w-32">
                    <button
                      onClick={() => navigateToModel(getNextModel().id)}
                      className="group w-full"
                    >
                      <div className="bg-gray-100 rounded-lg p-2 hover:bg-gray-200 transition-colors">
                        <div className="aspect-square bg-gray-200 rounded mb-2 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-8 h-8 mx-auto mb-1 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm">🎯</span>
                            </div>
                            <p className="text-xs text-gray-500">3D</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <span className="text-xs text-gray-600 mr-1 truncate">{getNextModel().name}</span>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Model Name and Creator - Below the model */}
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{model.name}</h2>
                  <p className="text-gray-600 mb-4">oleh {model.creator}</p>
                  <p className="text-sm text-gray-500">
                    Gunakan mouse untuk memutar, zoom, dan berinteraksi dengan model 3D
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile View - Mode Selection */}
          {isMobile && !isFullscreen && (
            <div className="max-w-md mx-auto">
              {/* Navigation Arrows for Mobile */}
              <div className="mb-4 flex items-center justify-between">
                <button
                  onClick={() => navigateToModel(getPreviousModel().id)}
                  className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm text-gray-600 truncate max-w-20">{getPreviousModel().name}</span>
                </button>
                
                <div className="text-center">
                  <span className="text-xs text-gray-500">
                    {currentModelIndex + 1} / {modelObjects.length}
                  </span>
                </div>
                
                <button
                  onClick={() => navigateToModel(getNextModel().id)}
                  className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm text-gray-600 truncate max-w-20">{getNextModel().name}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Mode Selection Buttons */}
              <div className="mb-6">
                <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => handleViewModeChange('image')}
                    className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'image'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📱 Lihat Gambar
                  </button>
                  <button
                    onClick={() => handleViewModeChange('ar')}
                    className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'ar'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    🥽 Lihat AR
                  </button>
                </div>
              </div>

              {/* Content based on selected mode */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                {viewMode === 'image' ? (
                  <>
                    <div className="flex justify-center">
                      <div className="w-full max-w-sm">
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-2xl">🎯</span>
                            </div>
                            <p className="text-sm text-gray-500">3D Model Preview</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Model Name and Creator - Below the preview */}
                    <div className="mt-6 text-center">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h2>
                      <p className="text-gray-600 mb-4">oleh {model.creator}</p>
                      <p className="text-sm text-gray-500">
                        Preview model 3D {model.name}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <ARViewer 
                        glbSrc={model.glbSrc}
                        usdzSrc={model.usdzSrc}
                        alt={model.name}
                        isFullscreen={isFullscreen}
                        onFullscreenToggle={handleFullscreenToggle}
                      />
                    </div>
                    
                    {/* Model Name and Creator - Below the AR model */}
                    <div className="mt-6 text-center">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h2>
                      <p className="text-gray-600 mb-4">oleh {model.creator}</p>
                      <p className="text-sm text-gray-500">
                        Gunakan tombol AR untuk melihat model dalam Augmented Reality
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Related Models - Hidden, replaced with side navigation */}
        </div>
      </main>
    </>
  );
}
