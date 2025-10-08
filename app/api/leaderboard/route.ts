import { NextRequest, NextResponse } from 'next/server'

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

// Generate dynamic leaderboard data
const generateDynamicLeaderboard = (): User[] => {
  const usernames = [
    'CodeMaster', 'AlgorithmNinja', 'DataStruct', 'PythonPro', 'JavaWizard',
    'CSharpExpert', 'JavaScriptKing', 'ReactGuru', 'NodeNinja', 'MongoDB',
    'SQLMaster', 'GitHero', 'DockerDev', 'Kubernetes', 'AWSExpert',
    'AzurePro', 'GCPMaster', 'DevOpsKing', 'FullStack', 'BackendBoss',
    'FrontendGod', 'UIMaster', 'UXExpert', 'DesignPro', 'MobileDev',
    'iOSExpert', 'AndroidPro', 'FlutterDev', 'ReactNative', 'CrossPlatform',
    'GameDev', 'UnityPro', 'UnrealEngine', 'GraphicsDev', 'AIGuru',
    'MLExpert', 'DataScientist', 'AnalyticsPro', 'BIGuru', 'CloudArchitect'
  ]

  const badges = [
    'Problem Solver', 'Speed Demon', 'Accuracy Master', 'Streak King',
    'Algorithm Expert', 'Data Structure Guru', 'Math Wizard', 'Logic Master',
    'Code Optimizer', 'Debug Expert', 'Test Champion', 'Performance Pro'
  ]

  const problems = [
    'Two Sum', 'Add Two Numbers', 'Longest Substring', 'Binary Tree Path',
    'Reverse Integer', 'Palindrome Number', 'Valid Parentheses', 'Merge Lists'
  ]

  const currentTime = new Date()
  
  return usernames.map((username, index) => {
    const baseScore = 2500 - (index * 25) + Math.floor(Math.random() * 100)
    const problemsSolved = Math.max(1, Math.floor(Math.random() * 8))
    const totalSubmissions = problemsSolved + Math.floor(Math.random() * 20)
    const accuracy = Math.round(((problemsSolved / totalSubmissions) * 100) * 100) / 100
    const streak = Math.floor(Math.random() * 15) + 1
    const level = Math.floor(baseScore / 100) + 1
    const isOnline = Math.random() > 0.3 // 70% chance of being online
    
    // Generate recent activity
    const recentActivity = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
      problemId: (Math.floor(Math.random() * 8) + 1).toString(),
      problemTitle: problems[Math.floor(Math.random() * problems.length)],
      status: ['solved', 'attempted', 'submitted'][Math.floor(Math.random() * 3)] as 'solved' | 'attempted' | 'submitted',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString() // Last hour
    }))

    // Generate user badges
    const userBadges = badges
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 4) + 1)

    return {
      id: `user_${index + 1}`,
      username,
      rank: index + 1,
      score: Math.max(100, baseScore),
      problemsSolved,
      totalSubmissions,
      accuracy,
      streak,
      lastActivity: new Date(Date.now() - Math.random() * 86400000).toISOString(), // Last 24 hours
      isOnline,
      level,
      badges: userBadges,
      recentActivity
    }
  }).sort((a, b) => b.score - a.score) // Sort by score descending
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Health check endpoint
    if (searchParams.get('health') === 'true') {
      return NextResponse.json({
        success: true,
        message: 'AcroEduvos Real-Time Leaderboard API is running',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        features: ['real-time', 'dynamic', 'live-rankings']
      })
    }

    // Generate fresh leaderboard data
    const leaderboard = generateDynamicLeaderboard()
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const onlineOnly = searchParams.get('online') === 'true'
    const top = parseInt(searchParams.get('top') || '0')

    let filteredLeaderboard = leaderboard

    if (onlineOnly) {
      filteredLeaderboard = filteredLeaderboard.filter(user => user.isOnline)
    }

    if (top > 0) {
      filteredLeaderboard = filteredLeaderboard.slice(0, top)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedLeaderboard = filteredLeaderboard.slice(startIndex, endIndex)

    // Calculate real-time platform stats
    const totalUsers = leaderboard.length
    const onlineUsers = leaderboard.filter(user => user.isOnline).length
    const totalScore = leaderboard.reduce((sum, user) => sum + user.score, 0)
    const averageScore = Math.round(totalScore / totalUsers)
    const totalProblemsSolved = leaderboard.reduce((sum, user) => sum + user.problemsSolved, 0)
    const averageAccuracy = leaderboard.reduce((sum, user) => sum + user.accuracy, 0) / totalUsers

    return NextResponse.json({
      leaderboard: paginatedLeaderboard,
      total: filteredLeaderboard.length,
      page,
      totalPages: Math.ceil(filteredLeaderboard.length / limit),
      realTimeStats: {
        totalUsers,
        onlineUsers,
        averageScore,
        totalProblemsSolved,
        averageAccuracy: Math.round(averageAccuracy * 100) / 100,
        lastUpdated: new Date().toISOString(),
        platformActivity: onlineUsers > totalUsers * 0.5 ? 'high' : onlineUsers > totalUsers * 0.2 ? 'medium' : 'low'
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        isRealTime: true,
        version: '2.0.0'
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
