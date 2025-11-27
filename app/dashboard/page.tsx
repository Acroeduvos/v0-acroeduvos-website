"use client"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, Code, Trophy, Users, Activity, Clock, Target, 
  TrendingUp, Zap, Star, Award, Calendar, Wifi, WifiOff,
  Play, CheckCircle, XCircle, AlertCircle
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"

interface UserStats {
  totalCourses: number
  completedCourses: number
  totalProblems: number
  solvedProblems: number
  currentStreak: number
  longestStreak: number
  totalHours: number
  rank: number
  points: number
  accuracy: number
}

interface RecentActivity {
  id: string
  type: 'course' | 'problem' | 'achievement'
  title: string
  description: string
  timestamp: string
  status: 'completed' | 'in_progress' | 'failed'
  points?: number
}

interface LiveStats {
  activeUsers: number
  submissionsToday: number
  newProblems: number
  liveEvents: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userStats, setUserStats] = useState<UserStats>({
    totalCourses: 6,
    completedCourses: 2,
    totalProblems: 150,
    solvedProblems: 45,
    currentStreak: 7,
    longestStreak: 21,
    totalHours: 127,
    rank: 156,
    points: 2340,
    accuracy: 78.5
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [liveStats, setLiveStats] = useState<LiveStats>({
    activeUsers: 0,
    submissionsToday: 0,
    newProblems: 0,
    liveEvents: 0
  })
  const [isLive, setIsLive] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const router = useRouter()

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        
        if (userData && token) {
          setUser(JSON.parse(userData))
          setIsLoading(false)
        } else {
          router.push('/login')
        }
      }
    }
    
    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    // Initialize recent activity
    const initialActivity: RecentActivity[] = [
      {
        id: '1',
        type: 'course',
        title: 'Python Programming',
        description: 'Completed Module 3: Data Structures',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
        points: 150
      },
      {
        id: '2',
        type: 'problem',
        title: 'Two Sum',
        description: 'Solved in 15 minutes',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
        points: 50
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Streak Master',
        description: '7 day coding streak!',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
        points: 100
      },
      {
        id: '4',
        type: 'course',
        title: 'Java Programming',
        description: 'Started Module 2: OOP Concepts',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        status: 'in_progress'
      }
    ]
    setRecentActivity(initialActivity)

    // Set up real-time updates
    const updateLiveStats = () => {
      setIsLive(true)
      setLiveStats({
        activeUsers: Math.floor(Math.random() * 50) + 20,
        submissionsToday: Math.floor(Math.random() * 200) + 150,
        newProblems: Math.floor(Math.random() * 5) + 2,
        liveEvents: Math.floor(Math.random() * 3) + 1
      })
      setLastUpdated(new Date())

      // Update user stats dynamically
      setUserStats(prev => ({
        ...prev,
        currentStreak: prev.currentStreak + (Math.random() > 0.8 ? 1 : 0),
        points: prev.points + (Math.random() > 0.9 ? Math.floor(Math.random() * 20) : 0),
        accuracy: Math.max(70, Math.min(95, prev.accuracy + (Math.random() - 0.5) * 2))
      }))

      // Add new activity occasionally
      if (Math.random() > 0.7) {
        const newActivity: RecentActivity = {
          id: Date.now().toString(),
          type: ['course', 'problem', 'achievement'][Math.floor(Math.random() * 3)] as any,
          title: ['Binary Search', 'Merge Sort', 'Code Warrior', 'Python Basics'][Math.floor(Math.random() * 4)],
          description: ['Solved in 12 minutes', 'Completed Module 4', 'New achievement unlocked!', 'Started new lesson'][Math.floor(Math.random() * 4)],
          timestamp: new Date().toISOString(),
          status: ['completed', 'in_progress', 'failed'][Math.floor(Math.random() * 3)] as any,
          points: Math.floor(Math.random() * 100) + 25
        }
        setRecentActivity(prev => [newActivity, ...prev.slice(0, 9)])
      }
    }

    // Initial update
    updateLiveStats()

    // Set up interval for real-time updates
    const interval = setInterval(updateLiveStats, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="h-4 w-4" />
      case 'problem': return <Code className="h-4 w-4" />
      case 'achievement': return <Award className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            {isLive && (
              <Badge variant="secondary" className="animate-pulse">
                <Activity className="h-3 w-3 mr-1" />
                LIVE
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-2">Track your learning progress and achievements</p>
          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              {isLive ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {liveStats.activeUsers} users online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              Rank #{userStats.rank}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {userStats.points} points
            </Badge>
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-muted-foreground">{user.email}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{liveStats.activeUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Submissions Today</p>
                <p className="text-2xl font-bold">{liveStats.submissionsToday}</p>
              </div>
              <Code className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Problems</p>
                <p className="text-2xl font-bold">{liveStats.newProblems}</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live Events</p>
                <p className="text-2xl font-bold">{liveStats.liveEvents}</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Learning Progress
              </CardTitle>
              <CardDescription>Your overall learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Courses Completed</span>
                  <span className="text-sm text-muted-foreground">{userStats.completedCourses}/{userStats.totalCourses}</span>
                </div>
                <Progress value={(userStats.completedCourses / userStats.totalCourses) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Problems Solved</span>
                  <span className="text-sm text-muted-foreground">{userStats.solvedProblems}/{userStats.totalProblems}</span>
                </div>
                <Progress value={(userStats.solvedProblems / userStats.totalProblems) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className="text-sm text-muted-foreground">{userStats.accuracy.toFixed(1)}%</span>
                </div>
                <Progress value={userStats.accuracy} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="flex-shrink-0">
                      {getTypeIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{activity.title}</p>
                        {getStatusIcon(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                        {activity.points && (
                          <Badge variant="secondary" className="text-xs">
                            +{activity.points} pts
                          </Badge>
                        )}
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
          {/* Stats Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Current Streak</span>
                <Badge variant="secondary">{userStats.currentStreak} days</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Longest Streak</span>
                <Badge variant="secondary">{userStats.longestStreak} days</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Hours</span>
                <Badge variant="secondary">{userStats.totalHours}h</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Global Rank</span>
                <Badge variant="secondary">#{userStats.rank}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/compiler">
                <Button className="w-full justify-start" variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Start Coding
                </Button>
              </Link>
              <Link href="/courses">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Courses
                </Button>
              </Link>
              <Link href="/problems">
                <Button className="w-full justify-start" variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Solve Problems
                </Button>
              </Link>
              <Link href="/classroom">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Join Classroom
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Live Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">CodeMaster solved "Binary Search"</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">PythonPro started Java course</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">AlgoNinja achieved 10-day streak</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">DataWizard completed C++ module</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
