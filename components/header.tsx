"use client"

import Link from "next/link"
import Image from "next/image"
import { Suspense, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Bell, ChevronDown, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchBar } from "@/components/search-bar"

function SearchBarFallback() {
  return <div className="w-full h-10 bg-gray-100 rounded-md"></div>
}

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ username: string; name: string; profileImage?: string } | null>(null)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (loggedIn) {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    window.location.href = "/"
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Acroeduvos Logo" width={48} height={48} className="mr-2" priority />
          <span className="text-xl font-bold hidden sm:inline-block">Acroeduvos</span>
        </Link>

        {/* Search bar */}
        <div className="hidden md:flex relative mx-4 flex-1 max-w-md">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-gray-700">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/problems" className="text-sm font-medium text-gray-700 hover:text-black">
            Problems
          </Link>
          <Link href="/contests" className="text-sm font-medium text-gray-700 hover:text-black">
            Contests
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium text-gray-700 hover:text-black">
            Leaderboard
          </Link>
          <Link href="/learn" className="text-sm font-medium text-gray-700 hover:text-black">
            Learn
          </Link>
          <Link href="/discuss" className="text-sm font-medium text-gray-700 hover:text-black">
            Discuss
          </Link>

          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                      {user?.profileImage ? (
                        <Image
                          src={
                            user.profileImage ||
                            "https://kzml86fqehr2pdkb0uai.lite.vusercontent.net/placeholder.svg?height=320&width=320"
                          }
                          alt={user.name || "User"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          src="https://kzml86fqehr2pdkb0uai.lite.vusercontent.net/placeholder.svg?height=320&width=320"
                          alt={user?.name || "User"}
                          width={32}
                          height={32}
                        />
                      )}
                    </div>
                    <span className="text-sm font-medium">{user?.name || "User"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/certificates">My Certificates</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/submissions">My Submissions</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="icon" className="text-gray-700 mr-2">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="border-black text-black hover:bg-black/5">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-black text-white hover:bg-gray-800">Sign up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
