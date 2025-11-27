/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Production build configuration
  output: 'standalone', // Enabled for production deployment
  trailingSlash: false,
  
  // Experimental features for better performance
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverComponentsExternalPackages: ['child_process'],
  },
  
  // Configure for network access
  env: {
    CUSTOM_HOST: process.env.CUSTOM_HOST || '0.0.0.0',
    CUSTOM_PORT: process.env.CUSTOM_PORT || '3000',
  },
  // Allow access from local network IPs
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig