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
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/contests/:id/problems/:problemId/solve',
        destination: '/contests/[id]/problems/[problemId]/solve',
      },
      {
        source: '/auth/login',
        destination: '/auth/login/page',
      },
      {
        source: '/auth/register',
        destination: '/auth/register/page',
      },
      {
        source: '/tutorials/:slug*',
        destination: '/tutorials/:slug*',
      },
    ]
  },
}

export default nextConfig