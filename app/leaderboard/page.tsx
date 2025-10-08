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
  Zap
} from "lucide-react"

interface User {
  id: string
  name: string
  username: string
  rank: number
  points: number
  problemsSolved: number
  contests: number
  rating: number
  badge: string
  country: string
  avatar?: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Chen",
    username: "alex_coder",
    rank: 1,
    points: 2850,
    problemsSolved: 247,
    contests: 15,
    rating: 1850,
    badge: "Grandmaster",
    country: "🇺🇸"
  },
  {
    id: "2", 
    name: "Priya Sharma",
    username: "priya_algo",
    rank: 2,
    points: 2720,
    problemsSolved: 198,
    contests: 12,
    rating: 1780,
    badge: "Master",
    country: "🇮🇳"
  },
  {
    id: "3",
    name: "David Kim",
    username: "david_dp",
    rank: 3,
    points: 2580,
    problemsSolved: 186,
    contests: 18,
    rating: 1720,
    badge: "Master",
    country: "🇰🇷"
  },
  {
    id: "4",
    name: "Sarah Johnson",
    username: "sarah_bits",
    rank: 4,
    points: 2450,
    problemsSolved: 167,
    contests: 14,
    rating: 1650,
    badge: "Expert",
    country: "🇬🇧"
  },
  {
    id: "5",
    name: "Raj Patel",
    username: "raj_contest",
    rank: 5,
    points: 2320,
    problemsSolved: 156,
    contests: 16,
    rating: 1580,
    badge: "Expert",
    country: "🇮🇳"
  }
]

const contests = [
  {
    id: "1",
    title: "Weekly Contest 285",
    date: "2024-01-15",
    duration: "90 minutes",
    participants: 1247,
    status: "upcoming"
  },
  {
    id: "2", 
    title: "Biweekly Contest 142",
    date: "2024-01-12",
    duration: "90 minutes",
    participants: 2156,
    status: "completed"
  },
  {
    id: "3",
    title: "Weekly Contest 284", 
    date: "2024-01-08",
    duration: "90 minutes",
    participants: 1987,
    status: "completed"
  }
]

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [timeframe, setTimeframe] = useState("all")
  const [category, setCategory] = useState("rating")

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
      case "Grandmaster": return "bg-red-100 text-red-800"
      case "Master": return "bg-orange-100 text-orange-800"
      case "Expert": return "bg-purple-100 text-purple-800"
      case "Specialist": return "bg-blue-100 text-blue-800"
      case "Pupil": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <Trophy className="h-10 w-10 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Top performers and competitive rankings
          </p>
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
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="points">Points</SelectItem>
                      <SelectItem value="problems">Problems</SelectItem>
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
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        {getRankIcon(user.rank)}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{user.name}</h3>
                          <span className="text-sm text-muted-foreground">@{user.username}</span>
                          <span className="text-lg">{user.country}</span>
                        </div>
                        <Badge className={getBadgeColor(user.badge)}>
                          {user.badge}
                        </Badge>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">{user.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.problemsSolved} problems
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="font-semibold">{user.points}</div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Contests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Contests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contests.map((contest) => (
                    <div key={contest.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{contest.title}</h4>
                        <Badge variant={contest.status === 'upcoming' ? 'default' : 'secondary'}>
                          {contest.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {contest.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-3 w-3" />
                          {contest.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          {contest.participants.toLocaleString()} participants
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Platform Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Users</span>
                    <span className="font-semibold">12,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Problems Solved</span>
                    <span className="font-semibold">2.4M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Contests</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Problems</span>
                    <span className="font-semibold">450+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
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
                    <div className="text-2xl mb-1">🥇</div>
                    <div className="text-xs font-medium">Grandmaster</div>
                    <div className="text-xs text-muted-foreground">Rating 1800+</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl mb-1">🥈</div>
                    <div className="text-xs font-medium">Master</div>
                    <div className="text-xs text-muted-foreground">Rating 1600+</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl mb-1">🥉</div>
                    <div className="text-xs font-medium">Expert</div>
                    <div className="text-xs text-muted-foreground">Rating 1400+</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="text-xs font-medium">Specialist</div>
                    <div className="text-xs text-muted-foreground">Rating 1200+</div>
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
