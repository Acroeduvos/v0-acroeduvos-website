import { NextRequest, NextResponse } from 'next/server'

interface User {
  id: string
  username: string
  name: string
  avatar?: string
  score: number
  totalSubmissions: number
  accuracy: number
  streak: number
  lastActivity: string
  isOnline: boolean
  level: string
  badges: string[]
  recentActivity: {
    type: string
    problem: string
    timestamp: string
    result: string
  }[]
}

const generateUsers = (): User[] => {
  const usernames = ['CodeMaster', 'AlgoNinja', 'PythonPro', 'JavaGuru', 'CppExpert', 'DataWizard', 'TechLead', 'DevChamp', 'CodeGenius', 'AlgoKing', 'BugHunter', 'DebugMaster', 'LogicPro', 'SyntaxGuru', 'CompileBoss']
  const names = ['Alex Chen', 'Sarah Johnson', 'Mike Rodriguez', 'Emma Wilson', 'David Kim', 'Lisa Zhang', 'Tom Brown', 'Amy Lee', 'Chris Davis', 'Maria Garcia', 'John Smith', 'Anna Taylor', 'Kevin Wang', 'Rachel Green', 'Steve White']
  const badges = ['Gold Medal', 'Silver Medal', 'Bronze Medal', 'Speed Demon', 'Accuracy Master', 'Streak King', 'Problem Solver', 'Code Reviewer', 'Team Player', 'Innovator']
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master']
  const activities = ['Solved', 'Attempted', 'Completed', 'Reviewed', 'Shared']
  const problems = ['Two Sum', 'Binary Search', 'Merge Sort', 'Longest Substring', 'Max Profit', 'Valid Parentheses', 'Palindrome', 'Fibonacci', 'Quick Sort', 'Bubble Sort']

  return usernames.map((username, index) => ({
    id: `user_${index + 1}`,
    username,
    name: names[index],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    score: Math.floor(Math.random() * 5000) + 1000,
    totalSubmissions: Math.floor(Math.random() * 500) + 50,
    accuracy: Math.random() * 30 + 70, // 70-100%
    streak: Math.floor(Math.random() * 50) + 1,
    lastActivity: new Date(Date.now() - Math.random() * 86400000).toISOString(), // Last 24 hours
    isOnline: Math.random() > 0.3, // 70% chance of being online
    level: levels[Math.floor(Math.random() * levels.length)],
    badges: badges.slice(0, Math.floor(Math.random() * 4) + 1),
    recentActivity: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
      type: activities[Math.floor(Math.random() * activities.length)],
      problem: problems[Math.floor(Math.random() * problems.length)],
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Last hour
      result: Math.random() > 0.2 ? 'Accepted' : 'Wrong Answer' // 80% success rate
    }))
  }))
}

export async function GET(request: NextRequest) {
  try {
    const users = generateUsers()
    
    // Sort by score (descending)
    const sortedUsers = users.sort((a, b) => b.score - a.score)
    
    // Update real-time stats
    const updatedUsers = sortedUsers.map((user, index) => ({
      ...user,
      score: user.score + Math.floor(Math.random() * 100) - 50, // Slight score variation
      lastActivity: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      isOnline: Math.random() > 0.25, // 75% chance of being online
      recentActivity: user.recentActivity.map(activity => ({
        ...activity,
        timestamp: new Date(Date.now() - Math.random() * 1800000).toISOString() // Last 30 minutes
      }))
    }))

    const response = {
      success: true,
      users: updatedUsers,
      realTimeStats: {
        totalUsers: updatedUsers.length,
        onlineUsers: updatedUsers.filter(u => u.isOnline).length,
        totalSubmissions: updatedUsers.reduce((sum, u) => sum + u.totalSubmissions, 0),
        averageAccuracy: updatedUsers.reduce((sum, u) => sum + u.accuracy, 0) / updatedUsers.length,
        topScore: updatedUsers[0]?.score || 0,
        activeInLastHour: updatedUsers.filter(u => 
          new Date().getTime() - new Date(u.lastActivity).getTime() < 3600000
        ).length
      },
      metadata: {
        lastUpdated: new Date().toISOString(),
        isLive: true,
        refreshInterval: 5000, // 5 seconds
        version: '1.0.0'
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Leaderboard API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle user score update
    const { userId, score, submissionResult } = body
    
    if (!userId || score === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Simulate score update
    const result = {
      success: true,
      message: 'Score updated successfully',
      newScore: score,
      rankChange: Math.floor(Math.random() * 5) - 2, // -2 to +2 rank change
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Leaderboard update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update leaderboard' },
      { status: 500 }
    )
  }
}
