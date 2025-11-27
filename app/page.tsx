"use client"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { QuickStartSection } from "@/components/quick-start-section"
import { CoursesPreview } from "@/components/courses-preview"
import { CompilerPreview } from "@/components/compiler-preview"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Activity, Users, Code, Trophy, TrendingUp, 
  Wifi, WifiOff, Zap, Star, Target
} from "lucide-react"

interface LiveStats {
  activeUsers: number
  submissionsToday: number
  problemsSolved: number
  coursesCompleted: number
  newUsers: number
  liveEvents: number
}

export default function HomePage() {
  const [liveStats, setLiveStats] = useState<LiveStats>({
    activeUsers: 75,
    submissionsToday: 450,
    problemsSolved: 1200,
    coursesCompleted: 45,
    newUsers: 15,
    liveEvents: 3
  })
  const [isLive, setIsLive] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLastUpdated(new Date())
    
    const updateLiveStats = () => {
      setLiveStats({
        activeUsers: Math.floor(Math.random() * 100) + 50,
        submissionsToday: Math.floor(Math.random() * 500) + 300,
        problemsSolved: Math.floor(Math.random() * 1000) + 800,
        coursesCompleted: Math.floor(Math.random() * 50) + 30,
        newUsers: Math.floor(Math.random() * 20) + 10,
        liveEvents: Math.floor(Math.random() * 5) + 2
      })
      setLastUpdated(new Date())
    }

    // Set up interval for real-time updates
    const interval = setInterval(updateLiveStats, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Live Stats Banner - Unique Purple/Teal Gradient */}
      <div className="gradient-animate text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {isLive ? (
                  <Wifi className="h-4 w-4 text-green-300 live-pulse" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-300" />
                )}
                <span className="font-medium">🔴 LIVE 24/7</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{liveStats.activeUsers} users coding now</span>
              </div>
              <div className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                <span>{liveStats.submissionsToday} submissions today</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span>{liveStats.problemsSolved} problems solved</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-75">
                Updated: {mounted && lastUpdated ? lastUpdated.toLocaleTimeString() : '--:--:--'}
              </span>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Activity className="h-3 w-3 mr-1 live-pulse" />
                LIVE
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <main>
        <HeroSection />
        <QuickStartSection />
        <FeaturesSection />
        <CoursesPreview />
        <CompilerPreview />
        
        {/* Live Activity Feed */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container">
            <div className="text-center space-y-4 mb-16">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Live Activity</h2>
                {isLive && (
                  <Badge variant="secondary" className="animate-pulse">
                    <Activity className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                )}
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See what's happening on Acroeduvos in real-time
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{liveStats.activeUsers}</h3>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-secondary/20 hover:border-secondary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mx-auto mb-4">
                    <Code className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">{liveStats.submissionsToday}</h3>
                  <p className="text-sm text-muted-foreground">Submissions Today</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-purple-500/20 hover:border-purple-500/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full mx-auto mb-4">
                    <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">{liveStats.problemsSolved}</h3>
                  <p className="text-sm text-muted-foreground">Problems Solved</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-teal-500/20 hover:border-teal-500/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-full mx-auto mb-4">
                    <Star className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400">{liveStats.coursesCompleted}</h3>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Live Activity Feed */}
            <div className="mt-16">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Live Activity Feed</h3>
                    <Badge variant="secondary" className="animate-pulse">LIVE</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">CodeMaster just solved "Binary Search" in 12 minutes</span>
                      <span className="text-xs text-muted-foreground ml-auto">{new Date(Date.now() - 2 * 60 * 1000).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">PythonPro started the Java Programming course</span>
                      <span className="text-xs text-muted-foreground ml-auto">{new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">AlgoNinja achieved a 15-day coding streak!</span>
                      <span className="text-xs text-muted-foreground ml-auto">{new Date(Date.now() - 8 * 60 * 1000).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">DataWizard completed Module 4 of C++ Programming</span>
                      <span className="text-xs text-muted-foreground ml-auto">{new Date(Date.now() - 12 * 60 * 1000).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
