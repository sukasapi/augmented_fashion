#!/usr/bin/env node

/**
 * Production Testing Script
 * Test various endpoints and functionality of the production server
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  protocol: process.env.PROTOCOL || 'http',
  timeout: 5000
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Test results
const results = {
  passed: 0,
  failed: 0,
  total: 0
};

// Utility functions
const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    const client = options.protocol === 'https' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(config.timeout, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
};

// Test functions
const testHealthCheck = async () => {
  log('\n🔍 Testing Health Check Endpoint...', 'cyan');
  
  try {
    const response = await makeRequest({
      protocol: config.protocol,
      hostname: config.host,
      port: config.port,
      path: '/health',
      method: 'GET'
    });
    
    if (response.statusCode === 200) {
      const healthData = JSON.parse(response.body);
      log('✅ Health check passed', 'green');
      log(`   Status: ${healthData.status}`, 'blue');
      log(`   Uptime: ${Math.round(healthData.uptime)}s`, 'blue');
      log(`   Memory: ${Math.round(healthData.memory.heapUsed / 1024 / 1024)}MB`, 'blue');
      results.passed++;
    } else {
      log(`❌ Health check failed: ${response.statusCode}`, 'red');
      results.failed++;
    }
  } catch (error) {
    log(`❌ Health check error: ${error.message}`, 'red');
    results.failed++;
  }
  
  results.total++;
};

const testMainPage = async () => {
  log('\n🔍 Testing Main Page...', 'cyan');
  
  try {
    const response = await makeRequest({
      protocol: config.protocol,
      hostname: config.host,
      port: config.port,
      path: '/',
      method: 'GET'
    });
    
    if (response.statusCode === 200) {
      log('✅ Main page accessible', 'green');
      log(`   Content-Type: ${response.headers['content-type']}`, 'blue');
      log(`   Content-Length: ${response.headers['content-length']} bytes`, 'blue');
      results.passed++;
    } else {
      log(`❌ Main page failed: ${response.statusCode}`, 'red');
      results.failed++;
    }
  } catch (error) {
    log(`❌ Main page error: ${error.message}`, 'red');
    results.failed++;
  }
  
  results.total++;
};

const testModelPage = async () => {
  log('\n🔍 Testing Model Detail Page...', 'cyan');
  
  try {
    const response = await makeRequest({
      protocol: config.protocol,
      hostname: config.host,
      port: config.port,
      path: '/model/model',
      method: 'GET'
    });
    
    if (response.statusCode === 200) {
      log('✅ Model page accessible', 'green');
      log(`   Content-Type: ${response.headers['content-type']}`, 'blue');
      results.passed++;
    } else {
      log(`❌ Model page failed: ${response.statusCode}`, 'red');
      results.failed++;
    }
  } catch (error) {
    log(`❌ Model page error: ${error.message}`, 'red');
    results.failed++;
  }
  
  results.total++;
};

const testStaticFiles = async () => {
  log('\n🔍 Testing Static Files...', 'cyan');
  
  const staticFiles = [
    '/_next/static/css/',
    '/_next/static/js/',
    '/media/model.glb'
  ];
  
  for (const file of staticFiles) {
    try {
      const response = await makeRequest({
        protocol: config.protocol,
        hostname: config.host,
        port: config.port,
        path: file,
        method: 'GET'
      });
      
      if (response.statusCode === 200 || response.statusCode === 404) {
        log(`✅ Static file ${file}: ${response.statusCode}`, 'green');
        results.passed++;
      } else {
        log(`❌ Static file ${file}: ${response.statusCode}`, 'red');
        results.failed++;
      }
    } catch (error) {
      log(`❌ Static file ${file} error: ${error.message}`, 'red');
      results.failed++;
    }
    
    results.total++;
  }
};

const testSecurityHeaders = async () => {
  log('\n🔍 Testing Security Headers...', 'cyan');
  
  try {
    const response = await makeRequest({
      protocol: config.protocol,
      hostname: config.host,
      port: config.port,
      path: '/',
      method: 'GET'
    });
    
    const securityHeaders = [
      'x-frame-options',
      'x-content-type-options',
      'x-xss-protection',
      'referrer-policy'
    ];
    
    let securityScore = 0;
    
    for (const header of securityHeaders) {
      if (response.headers[header]) {
        log(`✅ ${header}: ${response.headers[header]}`, 'green');
        securityScore++;
      } else {
        log(`❌ ${header}: missing`, 'red');
      }
    }
    
    if (securityScore === securityHeaders.length) {
      log('✅ All security headers present', 'green');
      results.passed++;
    } else {
      log(`❌ Security headers incomplete: ${securityScore}/${securityHeaders.length}`, 'red');
      results.failed++;
    }
  } catch (error) {
    log(`❌ Security headers test error: ${error.message}`, 'red');
    results.failed++;
  }
  
  results.total++;
};

const testPerformance = async () => {
  log('\n🔍 Testing Performance...', 'cyan');
  
  const startTime = Date.now();
  
  try {
    const response = await makeRequest({
      protocol: config.protocol,
      hostname: config.host,
      port: config.port,
      path: '/',
      method: 'GET'
    });
    
    const responseTime = Date.now() - startTime;
    
    if (response.statusCode === 200) {
      if (responseTime < 1000) {
        log(`✅ Performance good: ${responseTime}ms`, 'green');
        results.passed++;
      } else if (responseTime < 3000) {
        log(`⚠️ Performance acceptable: ${responseTime}ms`, 'yellow');
        results.passed++;
      } else {
        log(`❌ Performance poor: ${responseTime}ms`, 'red');
        results.failed++;
      }
    } else {
      log(`❌ Performance test failed: ${response.statusCode}`, 'red');
      results.failed++;
    }
  } catch (error) {
    log(`❌ Performance test error: ${error.message}`, 'red');
    results.failed++;
  }
  
  results.total++;
};

// Main test runner
const runTests = async () => {
  log('🚀 Starting Production Tests...', 'bright');
  log(`🌐 Testing: ${config.protocol}://${config.host}:${config.port}`, 'blue');
  log('=' * 50, 'cyan');
  
  // Run all tests
  await testHealthCheck();
  await testMainPage();
  await testModelPage();
  await testStaticFiles();
  await testSecurityHeaders();
  await testPerformance();
  
  // Print results
  log('\n📊 Test Results:', 'bright');
  log('=' * 30, 'cyan');
  log(`✅ Passed: ${results.passed}`, 'green');
  log(`❌ Failed: ${results.failed}`, 'red');
  log(`📈 Total: ${results.total}`, 'blue');
  log(`🎯 Success Rate: ${Math.round((results.passed / results.total) * 100)}%`, 'magenta');
  
  if (results.failed === 0) {
    log('\n🎉 All tests passed! Production server is ready.', 'green');
    process.exit(0);
  } else {
    log('\n⚠️ Some tests failed. Please check the issues above.', 'yellow');
    process.exit(1);
  }
};

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  log('Production Testing Script', 'bright');
  log('Usage: node test-production.js [options]', 'blue');
  log('', 'reset');
  log('Options:', 'bright');
  log('  --host HOST     Server hostname (default: localhost)', 'blue');
  log('  --port PORT     Server port (default: 3000)', 'blue');
  log('  --protocol      Protocol (http/https, default: http)', 'blue');
  log('  --timeout MS    Request timeout in ms (default: 5000)', 'blue');
  log('  --help, -h      Show this help message', 'blue');
  process.exit(0);
}

// Parse command line arguments
for (let i = 2; i < process.argv.length; i += 2) {
  const arg = process.argv[i];
  const value = process.argv[i + 1];
  
  switch (arg) {
    case '--host':
      config.host = value;
      break;
    case '--port':
      config.port = parseInt(value);
      break;
    case '--protocol':
      config.protocol = value;
      break;
    case '--timeout':
      config.timeout = parseInt(value);
      break;
  }
}

// Run tests
runTests().catch(error => {
  log(`❌ Test runner error: ${error.message}`, 'red');
  process.exit(1);
});

