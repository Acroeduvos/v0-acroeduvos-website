import { NextRequest, NextResponse } from 'next/server'

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

// Simulate real-time data with realistic patterns
const generateRealTimeData = (): RealTimeData => {
  const now = new Date()
  const timeOfDay = now.getHours()
  
  // Simulate realistic usage patterns based on time of day
  const baseUsers = timeOfDay >= 9 && timeOfDay <= 17 ? 150 : 80 // Higher during business hours
  const activityMultiplier = timeOfDay >= 14 && timeOfDay <= 16 ? 1.5 : 1 // Peak in afternoon
  
  return {
    timestamp: now.toISOString(),
    platform: {
      totalUsers: Math.floor(Math.random() * 500) + 1200,
      activeUsers: Math.floor(Math.random() * 30) + Math.floor(baseUsers * activityMultiplier),
      onlineUsers: Math.floor(Math.random() * 20) + Math.floor(baseUsers * 0.6),
      totalSubmissions: Math.floor(Math.random() * 1000) + 5000,
      submissionsPerMinute: Math.floor(Math.random() * 25) + Math.floor(15 * activityMultiplier),
      averageExecutionTime: Math.floor(Math.random() * 300) + 150,
      successRate: Math.round((Math.random() * 20 + 70) * 100) / 100, // 70-90%
      platformActivity: activityMultiplier > 1.2 ? 'high' : activityMultiplier > 0.8 ? 'medium' : 'low'
    },
    problems: {
      totalProblems: 8,
      solvedToday: Math.floor(Math.random() * 50) + 20,
      averageDifficulty: Math.round((Math.random() * 1.5 + 1.5) * 100) / 100, // 1.5-3.0
      popularLanguages: ['Python', 'JavaScript', 'Java', 'C++', 'C#']
    },
    leaderboard: {
      topUsers: [
        { rank: 1, username: 'CodeMaster', score: 2850, isOnline: Math.random() > 0.3, lastActivity: new Date(now.getTime() - Math.random() * 3600000).toISOString() },
        { rank: 2, username: 'AlgorithmNinja', score: 2720, isOnline: Math.random() > 0.4, lastActivity: new Date(now.getTime() - Math.random() * 3600000).toISOString() },
        { rank: 3, username: 'DataStruct', score: 2580, isOnline: Math.random() > 0.5, lastActivity: new Date(now.getTime() - Math.random() * 3600000).toISOString() },
        { rank: 4, username: 'PythonPro', score: 2450, isOnline: Math.random() > 0.3, lastActivity: new Date(now.getTime() - Math.random() * 3600000).toISOString() },
        { rank: 5, username: 'JavaWizard', score: 2320, isOnline: Math.random() > 0.4, lastActivity: new Date(now.getTime() - Math.random() * 3600000).toISOString() }
      ]
    },
    compiler: {
      activeSessions: Math.floor(Math.random() * 15) + 8,
      languagesInUse: ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'Go', 'Rust'].slice(0, Math.floor(Math.random() * 5) + 3),
      recentSubmissions: Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, i) => ({
        user: ['CodeMaster', 'AlgorithmNinja', 'DataStruct', 'PythonPro', 'JavaWizard'][Math.floor(Math.random() * 5)],
        language: ['Python', 'JavaScript', 'Java', 'C++', 'C#'][Math.floor(Math.random() * 5)],
        status: ['solved', 'attempted', 'error'][Math.floor(Math.random() * 3)] as 'solved' | 'attempted' | 'error',
        executionTime: Math.floor(Math.random() * 1000) + 100,
        timestamp: new Date(now.getTime() - Math.random() * 300000).toISOString() // Last 5 minutes
      }))
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Health check endpoint
    if (searchParams.get('health') === 'true') {
      return NextResponse.json({
        success: true,
        message: 'AcroEduvos Real-Time API is running',
        timestamp: new Date().toISOString(),
        version: '3.0.0',
        features: ['real-time', 'dynamic', 'live-stats', 'platform-analytics']
      })
    }

    // Generate fresh real-time data
    const realTimeData = generateRealTimeData()
    
    return NextResponse.json({
      ...realTimeData,
      metadata: {
        generatedAt: new Date().toISOString(),
        isRealTime: true,
        version: '3.0.0',
        updateInterval: '5-15 seconds',
        dataSource: 'dynamic-generation'
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
