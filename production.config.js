// Production Configuration for AcroEduvos
const productionConfig = {
  // Application URLs
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://acroeduvos.in',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://acroeduvos.in/api',
  
  // Network Configuration
  host: process.env.CUSTOM_HOST || '0.0.0.0',
  port: process.env.CUSTOM_PORT || 3000,
  
  // Support Configuration
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@acroeduvos.in',
  
  // Feature Flags
  features: {
    compiler: process.env.NEXT_PUBLIC_ENABLE_COMPILER !== 'false',
    auth: process.env.NEXT_PUBLIC_ENABLE_AUTH !== 'false',
    support: process.env.NEXT_PUBLIC_ENABLE_SUPPORT !== 'false',
    networkAccess: process.env.NEXT_PUBLIC_ENABLE_NETWORK_ACCESS !== 'false',
  },
  
  // Security
  security: {
    corsOrigin: process.env.NEXT_PUBLIC_CORS_ORIGIN || '*',
    secureHeaders: process.env.NEXT_PUBLIC_SECURE_HEADERS !== 'false',
  },
  
  // Build Configuration
  build: {
    output: 'standalone',
    generateStaticParams: true,
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  },
  
  // Network IP Range
  allowedIPs: [
    '127.0.0.1',
    'localhost',
    '172.16.20.0/24', // 172.16.20.0 to 172.16.20.255
    '0.0.0.0',
    'acroeduvos.in',
    'www.acroeduvos.in'
  ],
  
  // Domains
  domains: [
    'localhost',
    '127.0.0.1',
    'acroeduvos.in',
    'www.acroeduvos.in'
  ]
}

module.exports = productionConfig
