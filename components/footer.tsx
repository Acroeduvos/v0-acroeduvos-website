import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <Image src="/logo.png" alt="Acroeduvos Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold">Acroeduvos</span>
            </Link>
            <p className="mt-2 text-gray-600">
              A competitive programming platform to enhance your coding skills through challenges and contests.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/problems" className="text-sm text-gray-600 hover:text-black">
                  Problems
                </Link>
              </li>
              <li>
                <Link href="/contests" className="text-sm text-gray-600 hover:text-black">
                  Contests
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-sm text-gray-600 hover:text-black">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-sm text-gray-600 hover:text-black">
                  Learning Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/discuss" className="text-sm text-gray-600 hover:text-black">
                  Discussion Forum
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-black">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-gray-600 hover:text-black">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="text-sm text-gray-600 hover:text-black">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-black">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-black">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-black">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-black">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Acroeduvos.in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
