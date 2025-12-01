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
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'global'

    const users = generateUsers()

    // Sort by score (descending)
    let sortedUsers = users.sort((a, b) => b.score - a.score)

    // Filter based on type
    if (type === 'weekly') {
      // For weekly, adjust scores to simulate weekly performance
      sortedUsers = sortedUsers.map(user => ({
        ...user,
        score: Math.floor(user.score * 0.3) + Math.floor(Math.random() * 500)
      })).sort((a, b) => b.score - a.score)
    } else if (type === 'monthly') {
      // For monthly, adjust scores to simulate monthly performance
      sortedUsers = sortedUsers.map(user => ({
        ...user,
        score: Math.floor(user.score * 0.6) + Math.floor(Math.random() * 1000)
      })).sort((a, b) => b.score - a.score)
    }

    // Add rank to each user
    const leaderboard = sortedUsers.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      score: user.score,
      problemsSolved: user.totalSubmissions,
      contestsWon: Math.floor(Math.random() * 10),
      streak: user.streak,
      country: ['USA', 'India', 'China', 'UK', 'Germany', 'Canada'][Math.floor(Math.random() * 6)]
    }))

    const response = {
      success: true,
      leaderboard,
      type,
      metadata: {
        totalUsers: leaderboard.length,
        lastUpdated: new Date().toISOString(),
        isLive: true
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
