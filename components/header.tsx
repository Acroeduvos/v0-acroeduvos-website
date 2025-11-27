"use client"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Code2, BookOpen, Trophy, Users, Menu, Terminal, BarChart3, HelpCircle } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Acroeduvos Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Acroeduvos</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/courses"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      >
                        <BookOpen className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">Programming Fundamentals</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Master the basics with hands-on coding practice
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <div className="grid gap-1">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/courses/dsa"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Data Structures & Algorithms</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Arrays, Trees, Graphs, Dynamic Programming
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/courses/system-design"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">System Design</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Scalable architecture and design patterns
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/courses/web-development"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Web Development</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Full-stack development with modern frameworks
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/practice"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Practice
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/compiler"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Compiler
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/classroom"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Classroom
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/leaderboard"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Leaderboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/dashboard"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/resources"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Resources
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/support"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Support
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden md:inline-flex">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="hidden md:inline-flex">Get Started</Button>
          </Link>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/courses">
                  <Button variant="ghost" className="justify-start w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Courses
                  </Button>
                </Link>
                <Link href="/practice">
                  <Button variant="ghost" className="justify-start w-full">
                    <Trophy className="mr-2 h-4 w-4" />
                    Practice
                  </Button>
                </Link>
                <Link href="/compiler">
                  <Button variant="ghost" className="justify-start w-full">
                    <Terminal className="mr-2 h-4 w-4" />
                    Compiler
                  </Button>
                </Link>
                <Link href="/classroom">
                  <Button variant="ghost" className="justify-start w-full">
                    <Terminal className="mr-2 h-4 w-4" />
                    Classroom
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button variant="ghost" className="justify-start w-full">
                    <Trophy className="mr-2 h-4 w-4" />
                    Leaderboard
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="ghost" className="justify-start w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button variant="ghost" className="justify-start w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Resources
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="ghost" className="justify-start w-full">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Support
                  </Button>
                </Link>
                <div className="border-t pt-4 mt-4">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start mb-2">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
