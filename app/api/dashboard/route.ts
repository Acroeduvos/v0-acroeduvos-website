import { NextRequest, NextResponse } from 'next/server'

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

// Generate dynamic dashboard data
const generateDynamicDashboard = (userId?: string): DashboardData => {
  const currentTime = new Date()
  const username = userId || 'CodeMaster'
  
  // Generate user data
  const user = {
    id: userId || 'user_1',
    username,
    email: `${username.toLowerCase()}@acroeduvos.com`,
    level: Math.floor(Math.random() * 20) + 5,
    score: Math.floor(Math.random() * 2000) + 500,
    rank: Math.floor(Math.random() * 100) + 1,
    streak: Math.floor(Math.random() * 30) + 1,
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    badges: [
      {
        id: '1',
        name: 'Problem Solver',
        description: 'Solved your first problem',
        icon: '🏆',
        earnedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'common' as const
      },
      {
        id: '2',
        name: 'Speed Demon',
        description: 'Solved a problem in under 5 minutes',
        icon: '⚡',
        earnedDate: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'rare' as const
      },
      {
        id: '3',
        name: 'Streak King',
        description: 'Maintained a 7-day solving streak',
        icon: '🔥',
        earnedDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'epic' as const
      }
    ]
  }

  // Generate stats
  const stats = {
    problemsSolved: Math.floor(Math.random() * 50) + 10,
    totalSubmissions: Math.floor(Math.random() * 100) + 20,
    accuracy: Math.round((Math.random() * 30 + 60) * 100) / 100, // 60-90%
    averageTimePerProblem: Math.floor(Math.random() * 20) + 10, // 10-30 minutes
    favoriteLanguage: ['Python', 'JavaScript', 'Java', 'C++', 'C#'][Math.floor(Math.random() * 5)],
    totalTimeSpent: Math.floor(Math.random() * 100) + 50, // 50-150 hours
    thisWeekActivity: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)),
    monthlyProgress: Array.from({ length: 6 }, (_, i) => ({
      month: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
      problemsSolved: Math.floor(Math.random() * 20) + 5,
      scoreGained: Math.floor(Math.random() * 200) + 50,
      accuracy: Math.round((Math.random() * 20 + 70) * 100) / 100
    }))
  }

  // Generate recent activity
  const recentActivity: Activity[] = [
    {
      id: '1',
      type: 'problem_solved',
      title: 'Solved Two Sum',
      description: 'Successfully solved the Two Sum problem in Python',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      points: 25,
      problemId: '1',
      problemTitle: 'Two Sum'
    },
    {
      id: '2',
      type: 'streak_milestone',
      title: '7 Day Streak!',
      description: 'Maintained solving streak for 7 consecutive days',
      timestamp: new Date(Date.now() - Math.random() * 7200000).toISOString(),
      points: 100
    },
    {
      id: '3',
      type: 'badge_earned',
      title: 'Speed Demon Badge',
      description: 'Earned the Speed Demon badge for fast problem solving',
      timestamp: new Date(Date.now() - Math.random() * 10800000).toISOString(),
      points: 50
    }
  ]

  // Generate achievements
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Problem Solver',
      description: 'Solve 10 problems',
      progress: Math.min(stats.problemsSolved, 10),
      maxProgress: 10,
      reward: '50 points',
      isCompleted: stats.problemsSolved >= 10,
      icon: '🎯'
    },
    {
      id: '2',
      title: 'Accuracy Master',
      description: 'Maintain 80% accuracy over 20 problems',
      progress: Math.min(stats.problemsSolved, 20),
      maxProgress: 20,
      reward: '100 points',
      isCompleted: stats.accuracy >= 80 && stats.problemsSolved >= 20,
      icon: '🎯'
    },
    {
      id: '3',
      title: 'Language Master',
      description: 'Solve problems in 5 different languages',
      progress: Math.floor(Math.random() * 5) + 1,
      maxProgress: 5,
      reward: '150 points',
      isCompleted: false,
      icon: '🌐'
    }
  ]

  // Generate upcoming challenges
  const upcomingChallenges: Challenge[] = [
    {
      id: '1',
      title: 'Weekly Algorithm Challenge',
      description: 'Solve 5 algorithm problems this week',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      participants: Math.floor(Math.random() * 500) + 100,
      difficulty: 'Medium',
      prize: 'Premium subscription for 1 month',
      isParticipating: Math.random() > 0.5
    },
    {
      id: '2',
      title: 'Data Structures Marathon',
      description: 'Master all data structure problems',
      startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      participants: Math.floor(Math.random() * 300) + 50,
      difficulty: 'Hard',
      prize: 'Exclusive badge + 500 points',
      isParticipating: false
    }
  ]

  // Generate recommendations
  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'problem',
      title: 'Longest Substring Without Repeating Characters',
      description: 'Based on your recent activity, try this sliding window problem',
      difficulty: 'Medium',
      reason: 'You\'ve been practicing string problems',
      estimatedTime: '15-25 minutes'
    },
    {
      id: '2',
      type: 'topic',
      title: 'Dynamic Programming',
      description: 'Learn dynamic programming to solve more complex problems',
      difficulty: 'Hard',
      reason: 'Your level suggests you\'re ready for advanced topics',
      estimatedTime: '2-3 hours'
    }
  ]

  return {
    user,
    stats,
    recentActivity,
    achievements,
    upcomingChallenges,
    recommendations
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Health check endpoint
    if (searchParams.get('health') === 'true') {
      return NextResponse.json({
        success: true,
        message: 'AcroEduvos Real-Time Dashboard API is running',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        features: ['real-time', 'dynamic', 'personalized']
      })
    }

    const userId = searchParams.get('userId') || 'default'
    
    // Generate fresh dashboard data
    const dashboardData = generateDynamicDashboard(userId)
    
    return NextResponse.json({
      ...dashboardData,
      metadata: {
        generatedAt: new Date().toISOString(),
        isRealTime: true,
        version: '2.0.0',
        userId
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
        isRealTime: false
      },
      { status: 500 }
    )
  }
}
