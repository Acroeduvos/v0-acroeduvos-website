/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://acroeduvos.in',
    NEXT_PUBLIC_APP_NAME: 'Acroeduvos',
    NEXT_PUBLIC_APP_DESCRIPTION: 'Competitive Programming Platform',
    JUDGE0_API_KEY: process.env.JUDGE0_API_KEY,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["acroeduvos.in"],
    },
  },
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  trailingSlash: false,
  experimental: {
    serverActions: {
      allowedOrigins: ["acroeduvos.in"],
    },
    appDir: true,
    serverComponentsExternalPackages: [],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/auth/register',
        permanent: true,
      },
    ]
  },
}

export default nextConfig