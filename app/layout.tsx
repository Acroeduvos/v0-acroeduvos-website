import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata to match the new branding
export const metadata: Metadata = {
  title: "Acroeduvos - Competitive Programming Platform",
  description: "Enhance your coding skills with challenges, contests, and learning resources.",
  icons: {
    icon: "/logo.png",
  },
    generator: 'v0.dev'
}

function HeaderFallback() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <div className="relative h-10 w-10 mr-2 bg-gray-200 rounded-full"></div>
          <span className="text-xl font-bold">Acroeduvos</span>
        </div>
        <div className="w-full max-w-md mx-4 h-10 bg-gray-100 rounded-md"></div>
        <div className="w-64 h-10 bg-gray-100 rounded-md"></div>
      </div>
    </header>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Suspense fallback={<HeaderFallback />}>
            <Header />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
