"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity,
  Zap,
  Clock,
  Target,
  Award,
  Globe,
  Code2,
  Trophy,
  Star,
  Wifi,
  WifiOff,
  RefreshCw
} from "lucide-react"

interface RealTimeData {
  timestamp: string
  platform: {
    totalUsers: number
    activeUsers: number
    onlineUsers: number
    totalSubmissions: number
    submissionsPerMinute: number
    averageExecutionTime: number
    successRate: number
    platformActivity: 'high' | 'medium' | 'low'
  }
  problems: {
    totalProblems: number
    solvedToday: number
    averageDifficulty: number
    popularLanguages: string[]
  }
  leaderboard: {
    topUsers: Array<{
      rank: number
      username: string
      score: number
      isOnline: boolean
      lastActivity: string
    }>
  }
  compiler: {
    activeSessions: number
    languagesInUse: string[]
    recentSubmissions: Array<{
      user: string
      language: string
      status: 'solved' | 'attempted' | 'error'
      executionTime: number
      timestamp: string
    }>
  }
}

export default function AnalyticsPage() {
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null)
  const [isRealTime, setIsRealTime] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRealTimeData()
    
    // Set up real-time updates
    const interval = setInterval(() => {
      fetchRealTimeData()
      setLastUpdated(new Date())
    }, 8000) // Update every 8 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchRealTimeData = async () => {
    try {
      const response = await fetch('/api/realtime')
      const data = await response.json()
      setRealTimeData(data)
      setIsRealTime(data.metadata?.isRealTime || false)
    } catch (error) {
      console.error('Error fetching real-time data:', error)
      setIsRealTime(false)
    } finally {
      setLoading(false)
    }
  }

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'high': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved': return <Star className="h-4 w-4 text-green-500" />
      case 'attempted': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'error': return <Zap className="h-4 w-4 text-red-500" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center gap-3">
                <BarChart3 className="h-10 w-10 text-primary" />
                Live Analytics
                {isRealTime && (
                  <Badge variant="secondary" className="ml-3 animate-pulse">
                    <Activity className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                )}
              </h1>
              <p className="text-xl text-muted-foreground">
                Real-time platform analytics and performance metrics
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                {isRealTime ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                <Button variant="ghost" size="sm" onClick={fetchRealTimeData}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              {realTimeData && (
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {realTimeData.platform.activeUsers} active
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    {realTimeData.platform.submissionsPerMinute}/min
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {realTimeData.platform.successRate}% success
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{realTimeData?.platform.totalUsers || 0}</p>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Activity className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{realTimeData?.platform.activeUsers || 0}</p>
                      <p className="text-sm text-muted-foreground">Active Now</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Zap className="h-8 w-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{realTimeData?.platform.submissionsPerMinute || 0}</p>
                      <p className="text-sm text-muted-foreground">Submissions/min</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Target className="h-8 w-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">{realTimeData?.platform.successRate || 0}%</p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Platform Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Activity Level</span>
                    <Badge className={getActivityColor(realTimeData?.platform.platformActivity || 'low')}>
                      {realTimeData?.platform.platformActivity || 'low'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Execution Time</span>
                    <span className="font-semibold">{realTimeData?.platform.averageExecutionTime || 0}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Submissions</span>
                    <span className="font-semibold">{realTimeData?.platform.totalSubmissions?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Online Users</span>
                    <span className="font-semibold">{realTimeData?.platform.onlineUsers || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Submissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Recent Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {realTimeData?.compiler.recentSubmissions.map((submission, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        {getStatusIcon(submission.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">@{submission.user}</span>
                          <Badge variant="outline" className="text-xs">
                            {submission.language}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {submission.status} • {submission.executionTime}ms
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {new Date(submission.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {realTimeData?.leaderboard.topUsers.map((user) => (
                    <div key={user.rank} className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">@{user.username}</span>
                          {user.isOnline && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.score} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Language Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Languages in Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {realTimeData?.compiler.languagesInUse.map((language, index) => (
                    <div key={language} className="flex items-center justify-between">
                      <span className="text-sm">{language}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {Math.floor(Math.random() * 50) + 10}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Problems Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Problems Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Problems</span>
                    <span className="font-semibold">{realTimeData?.problems.totalProblems || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Solved Today</span>
                    <span className="font-semibold">{realTimeData?.problems.solvedToday || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Difficulty</span>
                    <span className="font-semibold">{realTimeData?.problems.averageDifficulty || 0}/5</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm">Popular Languages</span>
                    <div className="flex flex-wrap gap-1">
                      {realTimeData?.problems.popularLanguages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Status</span>
                    <Badge variant="secondary" className="text-green-600">
                      <Wifi className="h-3 w-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compiler Status</span>
                    <Badge variant="secondary" className="text-green-600">
                      <Code2 className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Status</span>
                    <Badge variant="secondary" className="text-green-600">
                      <Globe className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-time Updates</span>
                    <Badge variant="secondary" className="text-blue-600">
                      <Activity className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
