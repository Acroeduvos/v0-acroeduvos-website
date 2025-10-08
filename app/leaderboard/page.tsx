"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  Users, 
  Star,
  Calendar,
  Award,
  Target,
  Zap,
  Activity,
  Wifi,
  WifiOff,
  Clock,
  Eye
} from "lucide-react"

interface User {
  id: string
  username: string
  rank: number
  score: number
  problemsSolved: number
  totalSubmissions: number
  accuracy: number
  streak: number
  lastActivity: string
  isOnline: boolean
  level: number
  badges: string[]
  recentActivity: {
    problemId: string
    problemTitle: string
    status: 'solved' | 'attempted' | 'submitted'
    timestamp: string
  }[]
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<User[]>([])
  const [realTimeStats, setRealTimeStats] = useState<any>(null)
  const [isRealTime, setIsRealTime] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [timeframe, setTimeframe] = useState("all")
  const [category, setCategory] = useState("score")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
    
    // Set up real-time updates
    const interval = setInterval(() => {
      fetchLeaderboard()
      setLastUpdated(new Date())
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard')
      const data = await response.json()
      setLeaderboard(data.leaderboard || [])
      setRealTimeStats(data.realTimeStats || null)
      setIsRealTime(data.metadata?.isRealTime || false)
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      setIsRealTime(false)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />
      case 2: return <Medal className="h-6 w-6 text-gray-400" />
      case 3: return <Medal className="h-6 w-6 text-amber-600" />
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Problem Solver": return "bg-green-100 text-green-800"
      case "Speed Demon": return "bg-blue-100 text-blue-800"
      case "Accuracy Master": return "bg-purple-100 text-purple-800"
      case "Streak King": return "bg-orange-100 text-orange-800"
      case "Algorithm Expert": return "bg-red-100 text-red-800"
      case "Data Structure Guru": return "bg-indigo-100 text-indigo-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved': return <Star className="h-3 w-3 text-green-500" />
      case 'attempted': return <Clock className="h-3 w-3 text-yellow-500" />
      case 'submitted': return <Zap className="h-3 w-3 text-blue-500" />
      default: return <Circle className="h-3 w-3" />
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
                <Trophy className="h-10 w-10 text-yellow-500" />
                Leaderboard
                {isRealTime && (
                  <Badge variant="secondary" className="ml-3 animate-pulse">
                    <Activity className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                )}
              </h1>
              <p className="text-xl text-muted-foreground">
                Real-time rankings and competitive performance
              </p>
            </div>
            {realTimeStats && (
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  {isRealTime ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {realTimeStats.totalUsers} total users
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    {realTimeStats.onlineUsers} online
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {realTimeStats.averageAccuracy}% avg accuracy
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="score">Score</SelectItem>
                      <SelectItem value="problems">Problems</SelectItem>
                      <SelectItem value="accuracy">Accuracy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top Performers
                  {realTimeStats && (
                    <Badge variant="outline" className="ml-2">
                      {realTimeStats.platformActivity} activity
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        {getRankIcon(user.rank)}
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {user.username.substring(0, 2).toUpperCase()}
                          </div>
                          {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">@{user.username}</h3>
                          <Badge variant="outline" className="text-xs">
                            Level {user.level}
                          </Badge>
                          {user.isOnline && (
                            <Badge variant="secondary" className="text-xs animate-pulse">
                              <Activity className="h-3 w-3 mr-1" />
                              Online
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {user.badges.slice(0, 3).map((badge) => (
                            <Badge key={badge} className={`text-xs ${getBadgeColor(badge)}`}>
                              {badge}
                            </Badge>
                          ))}
                          {user.badges.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.badges.length - 3} more
                            </Badge>
                          )}
                        </div>
                        
                        {/* Recent Activity */}
                        {user.recentActivity.length > 0 && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            <span>
                              {getStatusIcon(user.recentActivity[0].status)}
                              {user.recentActivity[0].problemTitle}
                            </span>
                            <span>•</span>
                            <span>{new Date(user.recentActivity[0].timestamp).toLocaleTimeString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">{user.score}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.problemsSolved} problems
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.accuracy}% accuracy
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-orange-500" />
                          <span className="font-semibold">{user.streak}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">streak</div>
                        <div className="text-xs text-muted-foreground">
                          {user.totalSubmissions} submissions
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Real-time Stats */}
            {realTimeStats && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Live Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Users</span>
                      <span className="font-semibold">{realTimeStats.totalUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Online Now</span>
                      <span className="font-semibold text-green-600">{realTimeStats.onlineUsers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Problems Solved</span>
                      <span className="font-semibold">{realTimeStats.totalProblemsSolved.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Score</span>
                      <span className="font-semibold">{realTimeStats.averageScore}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-semibold">{realTimeStats.averageAccuracy}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievement Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievement Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="text-xs font-medium">Problem Solver</div>
                    <div className="text-xs text-muted-foreground">First problem</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-xs font-medium">Speed Demon</div>
                    <div className="text-xs text-muted-foreground">Under 5 min</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl mb-1">🔥</div>
                    <div className="text-xs font-medium">Streak King</div>
                    <div className="text-xs text-muted-foreground">7 day streak</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-xs font-medium">Accuracy Master</div>
                    <div className="text-xs text-muted-foreground">80%+ accuracy</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.slice(0, 5).map((user) => (
                    user.recentActivity.length > 0 && (
                      <div key={user.id} className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {user.username.substring(0, 1).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <span className="font-medium">@{user.username}</span>
                          <span className="text-muted-foreground ml-1">
                            {user.recentActivity[0].status} {user.recentActivity[0].problemTitle}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(user.recentActivity[0].timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}