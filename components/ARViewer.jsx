import { useState, useEffect, useRef } from 'react';

const ARViewer = ({ 
  glbSrc = '/media/model.glb',
  usdzSrc = null,
  fallbackImage = '/api/placeholder/400/400',
  alt = '3D Model',
  showInfo = false,
  onInfoToggle = null,
  isFullscreen = false,
  onFullscreenToggle = null
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showModelInfo, setShowModelInfo] = useState(showInfo);
  const [isMobile, setIsMobile] = useState(false);
  const modelViewerRef = useRef(null);

  useEffect(() => {
    // Check if model-viewer is available
    if (typeof window !== 'undefined') {
      const checkModelViewer = () => {
        if (customElements.get('model-viewer')) {
          setScriptLoaded(true);
          setIsLoading(false);
        } else {
          // Wait a bit for script to load
          setTimeout(checkModelViewer, 100);
        }
      };
      
      checkModelViewer();
    }
  }, []);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(isMobileDevice || isSmallScreen);
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

  // Handle fullscreen changes
  useEffect(() => {
    if (modelViewerRef.current && scriptLoaded) {
      // Force model-viewer to re-render when fullscreen changes
      setTimeout(() => {
        if (modelViewerRef.current) {
          modelViewerRef.current.dispatchEvent(new Event('resize'));
        }
      }, 200);
    }
  }, [isFullscreen, scriptLoaded]);

  const handleModelLoad = () => {
    setIsLoading(false);
  };

  const handleModelError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleInfoToggle = () => {
    const newShowInfo = !showModelInfo;
    setShowModelInfo(newShowInfo);
    if (onInfoToggle) {
      onInfoToggle(newShowInfo);
    }
  };

  const handleFullscreenToggle = () => {
    // Only allow fullscreen on mobile devices
    if (onFullscreenToggle && isMobile) {
      const newFullscreen = !isFullscreen;
      onFullscreenToggle(newFullscreen);
      
      // Force re-render model-viewer when toggling fullscreen
      if (modelViewerRef.current) {
        setTimeout(() => {
          if (modelViewerRef.current) {
            modelViewerRef.current.dispatchEvent(new Event('resize'));
          }
        }, 100);
      }
    }
  };

  if (hasError || !scriptLoaded) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
        <div className="w-16 h-16 mb-4 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-600 text-center">
          Browser tidak mendukung AR atau terjadi kesalahan saat memuat model.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Silakan gunakan browser yang mendukung WebXR atau AR Quick Look.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full mx-auto ${isFullscreen ? 'fixed inset-0 z-50 bg-black flex items-center justify-center' : isMobile ? 'max-w-full' : 'max-w-md'}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-gray-600">Memuat model 3D...</p>
            </div>
          </div>
        )}
        
        <model-viewer
          key={`${isFullscreen ? 'fullscreen' : 'normal'}-${glbSrc}`}
          ref={modelViewerRef}
          src={glbSrc}
          {...(usdzSrc && { 'ios-src': usdzSrc })}
          alt={alt}
          auto-rotate
          camera-controls
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          ar-placement="floor"
          shadow-intensity="1"
          environment-image="https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr"
          skybox-image="https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr"
          onload={handleModelLoad}
          onerror={handleModelError}
          style={{
            width: '100%',
            height: isFullscreen ? '100vh' : isMobile ? '70vh' : '400px',
            backgroundColor: isFullscreen ? '#000' : '#f3f4f6',
            borderRadius: isFullscreen ? '0' : '8px',
            display: 'block'
          }}
        >
          <button
            slot="ar-button"
            className="ar-button"
            style={{
              backgroundImage: 'url(https://modelviewer.dev/shared-assets/icons/ic_view_in_ar_new_googblue_48dp.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '20px 20px',
              backgroundPosition: '12px 50%',
              backgroundColor: '#fff',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              bottom: '132px',
              padding: '0px 16px 0px 40px',
              fontFamily: 'Roboto Regular, Helvetica Neue, sans-serif',
              fontSize: '14px',
              color: '#4285f4',
              height: '36px',
              lineHeight: '36px',
              borderRadius: '18px',
              border: '1px solid #DADCE0',
              cursor: 'pointer'
            }}
          >
            Lihat dalam AR
          </button>
        </model-viewer>
        
        {/* Control Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          {/* Fullscreen Toggle Button - Only for Mobile */}
          {isMobile && onFullscreenToggle && (
            <button
              onClick={handleFullscreenToggle}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
              title={isFullscreen ? "Keluar Fullscreen" : "Fullscreen"}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isFullscreen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                )}
              </svg>
            </button>
          )}
          
          {/* Info Toggle Button - Available for both Desktop and Mobile */}
          <button
            onClick={handleInfoToggle}
            className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
            title={showModelInfo ? "Sembunyikan Info" : "Tampilkan Info"}
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${showModelInfo ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        
        {/* Back Button for Fullscreen */}
        {isFullscreen && (
          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={handleFullscreenToggle}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
              title="Keluar Fullscreen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Model Info Overlay */}
        {showModelInfo && (
          <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg z-10">
            <div className="text-sm text-gray-700">
              <div className="font-semibold mb-1">Model Information</div>
              <div className="space-y-1">
                <div><span className="font-medium">Format:</span> {usdzSrc ? 'GLB/USDZ' : 'GLB'}</div>
                <div><span className="font-medium">Source:</span> Local File</div>
                <div><span className="font-medium">AR Support:</span> WebXR, AR Quick Look</div>
                <div><span className="font-medium">Controls:</span> Mouse/Touch untuk rotate & zoom</div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ARViewer;
