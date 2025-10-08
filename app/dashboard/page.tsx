"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Users, 
  Star,
  Award,
  Clock,
  Activity,
  Zap,
  Calendar,
  BookOpen,
  BarChart3,
  Play,
  CheckCircle,
  Circle,
  XCircle,
  Wifi,
  WifiOff
} from "lucide-react"

interface DashboardData {
  user: {
    id: string
    username: string
    email: string
    level: number
    score: number
    rank: number
    streak: number
    joinDate: string
    lastActive: string
    avatar: string
    badges: Badge[]
  }
  stats: {
    problemsSolved: number
    totalSubmissions: number
    accuracy: number
    averageTimePerProblem: number
    favoriteLanguage: string
    totalTimeSpent: number
    thisWeekActivity: number[]
    monthlyProgress: MonthlyProgress[]
  }
  recentActivity: Activity[]
  achievements: Achievement[]
  upcomingChallenges: Challenge[]
  recommendations: Recommendation[]
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedDate: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface Activity {
  id: string
  type: 'problem_solved' | 'problem_attempted' | 'streak_milestone' | 'badge_earned' | 'level_up'
  title: string
  description: string
  timestamp: string
  points: number
  problemId?: string
  problemTitle?: string
}

interface Achievement {
  id: string
  title: string
  description: string
  progress: number
  maxProgress: number
  reward: string
  isCompleted: boolean
  icon: string
}

interface Challenge {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  participants: number
  difficulty: string
  prize: string
  isParticipating: boolean
}

interface Recommendation {
  id: string
  type: 'problem' | 'topic' | 'skill'
  title: string
  description: string
  difficulty: string
  reason: string
  estimatedTime: string
}

interface MonthlyProgress {
  month: string
  problemsSolved: number
  scoreGained: number
  accuracy: number
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isRealTime, setIsRealTime] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
    
    // Set up real-time updates
    const interval = setInterval(() => {
      fetchDashboardData()
      setLastUpdated(new Date())
    }, 20000) // Update every 20 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setDashboardData(data)
      setIsRealTime(data.metadata?.isRealTime || false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setIsRealTime(false)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'problem_solved': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'problem_attempted': return <Circle className="h-4 w-4 text-yellow-500" />
      case 'streak_milestone': return <Zap className="h-4 w-4 text-orange-500" />
      case 'badge_earned': return <Award className="h-4 w-4 text-purple-500" />
      case 'level_up': return <Trophy className="h-4 w-4 text-blue-500" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800'
      case 'rare': return 'bg-blue-100 text-blue-800'
      case 'epic': return 'bg-purple-100 text-purple-800'
      case 'legendary': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
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

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Unable to load dashboard</h1>
            <Button onClick={fetchDashboardData}>Retry</Button>
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
                Dashboard
                {isRealTime && (
                  <Badge variant="secondary" className="ml-3 animate-pulse">
                    <Activity className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                )}
              </h1>
              <p className="text-xl text-muted-foreground">
                Welcome back, @{dashboardData.user.username}! Here's your progress overview.
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
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  Rank #{dashboardData.user.rank}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {dashboardData.user.score} points
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  {dashboardData.user.streak} day streak
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Target className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{dashboardData.stats.problemsSolved}</p>
                      <p className="text-sm text-muted-foreground">Problems Solved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{dashboardData.stats.accuracy}%</p>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-8 w-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{dashboardData.stats.averageTimePerProblem}m</p>
                      <p className="text-sm text-muted-foreground">Avg Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-8 w-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">{dashboardData.stats.favoriteLanguage}</p>
                      <p className="text-sm text-muted-foreground">Favorite Language</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">+{activity.points} pts</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {dashboardData.achievements.map((achievement) => (
                    <div key={achievement.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Reward: {achievement.reward}</span>
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
            {/* User Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                    {dashboardData.user.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">@{dashboardData.user.username}</h3>
                    <p className="text-sm text-muted-foreground">Level {dashboardData.user.level}</p>
                    <Badge variant="outline" className="mt-2">
                      Rank #{dashboardData.user.rank}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-semibold">{dashboardData.user.score}</p>
                      <p className="text-muted-foreground">Points</p>
                    </div>
                    <div>
                      <p className="font-semibold">{dashboardData.user.streak}</p>
                      <p className="text-muted-foreground">Streak</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.user.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center gap-3 p-2 border rounded-lg">
                      <span className="text-xl">{badge.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{badge.name}</h4>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                      <Badge className={`text-xs ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recommendations.map((rec) => (
                    <div key={rec.id} className="p-3 border rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <Play className="h-4 w-4 text-blue-500 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{rec.title}</h4>
                          <p className="text-xs text-muted-foreground">{rec.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{rec.reason}</span>
                        <span>{rec.estimatedTime}</span>
                      </div>
                      <Button size="sm" className="w-full mt-2">
                        Start {rec.type}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.upcomingChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{challenge.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                        <span>{challenge.participants} participants</span>
                        <span>Prize: {challenge.prize}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant={challenge.isParticipating ? "default" : "outline"}
                        className="w-full"
                      >
                        {challenge.isParticipating ? "Participating" : "Join Challenge"}
                      </Button>
                    </div>
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