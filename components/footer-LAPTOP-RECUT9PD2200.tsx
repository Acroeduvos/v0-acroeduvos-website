import Link from "next/link"
import { Mail, Phone, MapPin, Code2, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">AcroEduvos</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Master programming and crack MNC interviews with our comprehensive learning platform. 
              Practice coding, learn from experts, and advance your career.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/courses" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Courses
              </Link>
              <Link href="/practice" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Practice
              </Link>
              <Link href="/compiler" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Code Compiler
              </Link>
              <Link href="/dashboard" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Leaderboard
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="/support" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Help Center
              </Link>
              <Link href="/support" className="block text-gray-400 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
              <Link href="/support" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Contact Us
              </Link>
              <a href="mailto:support@acroeduvos.in" className="block text-gray-400 hover:text-white transition-colors text-sm">
                support@acroeduvos.in
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:support@acroeduvos.in" className="text-sm text-white hover:text-blue-400 transition-colors">
                    support@acroeduvos.in
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Website</p>
                  <a href="https://acroeduvos.in" className="text-sm text-white hover:text-blue-400 transition-colors">
                    acroeduvos.in
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Code2 className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Network Access</p>
                  <p className="text-sm text-white">
                    172.16.20.0 - 172.16.20.255
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 AcroEduvos. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-white transition-colors text-sm">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
