import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Footer } from "@/components/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "AcroEduvos - Master Programming & Crack MNC Interviews",
  description:
    "Free 24/7 competitive programming platform. Practice 500+ problems, real-time code execution in 12+ languages, MNC interview questions. Like LeetCode & CodeChef but completely free!",
  generator: "AcroEduvos",
  applicationName: "AcroEduvos Learning Platform",
  keywords: [
    "programming courses",
    "coding practice",
    "MNC interviews",
    "Python",
    "Java",
    "C++",
    "C programming",
    "data structures",
    "algorithms",
    "leetcode",
    "codechef",
    "hackerrank",
    "system design",
    "acroeduvos.in",
    "free coding platform",
    "competitive programming",
    "online compiler",
    "real-time execution"
  ],
  authors: [{ name: "AcroEduvos Team" }],
  creator: "AcroEduvos",
  publisher: "AcroEduvos",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://acroeduvos.in'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' }
    ],
    apple: '/logo.png',
    shortcut: '/logo.png'
  },
  openGraph: {
    title: "AcroEduvos - Free 24/7 Competitive Programming Platform",
    description: "Practice 500+ coding problems with real-time execution in 12+ languages. MNC interview questions. Completely free!",
    url: 'https://acroeduvos.in',
    siteName: 'AcroEduvos',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'AcroEduvos - Competitive Programming Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "AcroEduvos - Free 24/7 Competitive Programming",
    description: "Practice 500+ problems with real-time code execution. Like LeetCode & CodeChef but free!",
    creator: '@acroeduvos',
    images: ['/logo.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
