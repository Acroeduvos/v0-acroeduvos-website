"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Code, Trophy, Users, Activity, Wifi, WifiOff, TrendingUp } from "lucide-react"

export function HeroSection() {
  const [realTimeStats, setRealTimeStats] = useState({
    activeUsers: 1247,
    problemsSolved: 8934,
    totalStudents: 15720,
    submissionsPerMinute: 45
  })
  const [isRealTime, setIsRealTime] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        problemsSolved: prev.problemsSolved + Math.floor(Math.random() * 5),
        totalStudents: prev.totalStudents + Math.floor(Math.random() * 3),
        submissionsPerMinute: Math.floor(Math.random() * 20) + 30
      }))
      setLastUpdated(new Date())
      setIsRealTime(true)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2 relative">
            <Trophy className="mr-2 h-4 w-4" />
            Master Programming & Crack MNC Interviews
            {isRealTime && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
            )}
          </Badge>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance">
              Learn to Code with <span className="text-primary">Real Interview</span> Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Practice with curated problems from CodeChef, LeetCode, and real MNC interviews. Code in multiple
              languages with our integrated real-time compiler.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/courses">Start Learning Free</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
              <a href="/compiler">
                <Play className="mr-2 h-5 w-5" />
                Try Real-Time Compiler
              </a>
            </Button>
          </div>

          {/* Real-time Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full">
            <div className="text-center p-4 bg-background/50 rounded-lg border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Active Users</span>
              </div>
              <div className="text-2xl font-bold">{realTimeStats.activeUsers.toLocaleString()}</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Live
              </div>
            </div>
            
            <div className="text-center p-4 bg-background/50 rounded-lg border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Problems Solved</span>
              </div>
              <div className="text-2xl font-bold">{realTimeStats.problemsSolved.toLocaleString()}</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                <Activity className="h-3 w-3" />
                Today
              </div>
            </div>
            
            <div className="text-center p-4 bg-background/50 rounded-lg border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Code className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Total Students</span>
              </div>
              <div className="text-2xl font-bold">{realTimeStats.totalStudents.toLocaleString()}</div>
              <div className="text-xs text-blue-600 flex items-center justify-center gap-1">
                <Users className="h-3 w-3" />
                Growing
              </div>
            </div>
            
            <div className="text-center p-4 bg-background/50 rounded-lg border">
              <div className="flex items-center justify-center gap-2 mb-2">
                {isRealTime ? (
                  <Wifi className="h-5 w-5 text-green-500" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-muted-foreground">Submissions/min</span>
              </div>
              <div className="text-2xl font-bold">{realTimeStats.submissionsPerMinute}</div>
              <div className="text-xs text-muted-foreground">
                Updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>15+ Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>1000+ Problems</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>15k+ Students</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
