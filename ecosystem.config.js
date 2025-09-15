module.exports = {
  apps: [{
    name: 'augmented-fashion',
    script: 'server.js',
    instances: 'max', // Use all CPU cores
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      HOSTNAME: '0.0.0.0'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0'
    },
    // PM2 configuration
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    
    // Logging
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Monitoring
    watch: false, // Disable in production
    ignore_watch: ['node_modules', 'logs', '.next'],
    
    // Advanced features
    kill_timeout: 5000,
    listen_timeout: 3000,
    shutdown_with_message: true,
    
    // Health check
    health_check_grace_period: 3000,
    health_check_fatal_exceptions: true
  }]
};
