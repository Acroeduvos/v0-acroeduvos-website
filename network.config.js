// Network configuration for acroeduvos.in
// Supports IP range: 172.16.20.0 - 172.16.20.255

const networkConfig = {
  // Allowed IP ranges
  allowedIPs: [
    '127.0.0.1',
    'localhost',
    '172.16.20.0/24', // 172.16.20.0 to 172.16.20.255
    '0.0.0.0'
  ],
  
  // Network settings
  host: '0.0.0.0',
  port: 3000,
  
  // Domain configuration
  domains: [
    'localhost',
    '127.0.0.1',
    'acroeduvos.in',
    'www.acroeduvos.in'
  ],
  
  // Dynamic page settings
  dynamicPages: {
    enabled: true,
    fallback: true,
    revalidate: 60 // 60 seconds
  },
  
  // CORS settings
  cors: {
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://acroeduvos.in',
      'https://www.acroeduvos.in',
      /^http:\/\/172\.16\.20\.\d{1,3}:3000$/,
      /^http:\/\/172\.16\.20\.\d{1,3}$/
    ],
    credentials: true
  }
}

module.exports = networkConfig
