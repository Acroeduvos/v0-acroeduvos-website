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
}

export default nextConfig
