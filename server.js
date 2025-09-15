const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");
const fs = require("fs");

// Environment configuration
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";

// Initialize Next.js app
const app = next({ 
  dev,
  hostname,
  port,
  // Production optimizations
  conf: {
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }
});

const handle = app.getRequestHandler();

// Security headers middleware
const securityHeaders = (req, res, next) => {
  // Remove X-Powered-By header
  res.removeHeader('X-Powered-By');
  
  // Security headers
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // HTTPS redirect for production
  if (!dev && req.headers['x-forwarded-proto'] !== 'https') {
    res.writeHead(301, {
      'Location': `https://${req.headers.host}${req.url}`
    });
    res.end();
    return;
  }
  
  next();
};

// Static file serving for production
const serveStaticFiles = (req, res, next) => {
  if (dev) {
    next();
    return;
  }

  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  // Serve static files from public directory
  if (pathname.startsWith('/media/') || pathname.startsWith('/_next/static/')) {
    const filePath = path.join(__dirname, 'public', pathname);
    
    // Check if file exists
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      const contentType = getContentType(ext);
      
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      return;
    }
  }
  
  next();
};

// Get content type based on file extension
const getContentType = (ext) => {
  const types = {
    '.glb': 'model/gltf-binary',
    '.usdz': 'model/vnd.usdz+zip',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
  };
  
  return types[ext] || 'application/octet-stream';
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Server Error:', err);
  
  if (res.headersSent) {
    return next(err);
  }
  
  res.status(500).json({
    error: dev ? err.message : 'Internal Server Error',
    ...(dev && { stack: err.stack })
  });
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`;
    
    if (res.statusCode >= 400) {
      console.error(`❌ ${logMessage}`);
    } else {
      console.log(`✅ ${logMessage}`);
    }
  });
  
  next();
};

// Health check endpoint
const healthCheck = (req, res, next) => {
  if (req.url === '/health' || req.url === '/api/health') {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.env.npm_package_version || '1.0.0'
    });
    return;
  }
  next();
};

// Main server setup
app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Apply middleware in order
    requestLogger(req, res, () => {
      securityHeaders(req, res, () => {
        healthCheck(req, res, () => {
          serveStaticFiles(req, res, () => {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl);
          });
        });
      });
    });
  });

  // Error handling
  server.on('error', (err) => {
    console.error('Server Error:', err);
    process.exit(1);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      console.log('Process terminated');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
      console.log('Process terminated');
      process.exit(0);
    });
  });

  // Start server
  server.listen(port, hostname, (err) => {
    if (err) throw err;
    
    console.log(`🚀 Server ready on http://${hostname}:${port}`);
    console.log(`📱 Environment: ${dev ? 'development' : 'production'}`);
    console.log(`🌐 Hostname: ${hostname}`);
    console.log(`🔧 Port: ${port}`);
    
    if (!dev) {
      console.log(`🔒 HTTPS redirect enabled`);
      console.log(`🛡️ Security headers enabled`);
      console.log(`📊 Health check: http://${hostname}:${port}/health`);
    }
  });
}).catch((ex) => {
  console.error('Failed to start server:', ex);
  process.exit(1);
});