import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'global'

    const users = db.getUsers()

    // Sort by score (descending)
    let sortedUsers = [...users].sort((a, b) => b.score - a.score)

    // Filter based on type
    if (type === 'weekly') {
      // For weekly, we might filter by recent activity or just simulate for now
      // In a real DB, we'd query by date range
      sortedUsers = sortedUsers.map(user => ({
        ...user,
        score: Math.floor(user.score * 0.3) // Simulate weekly score
      })).sort((a, b) => b.score - a.score)
    } else if (type === 'monthly') {
      sortedUsers = sortedUsers.map(user => ({
        ...user,
        score: Math.floor(user.score * 0.6) // Simulate monthly score
      })).sort((a, b) => b.score - a.score)
    }

    // Add rank to each user
    const leaderboard = sortedUsers.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      score: user.score,
      problemsSolved: user.totalSubmissions,
      contestsWon: Math.floor(user.score / 1000), // Derived stat
      streak: user.streak,
      country: ['USA', 'India', 'China', 'UK', 'Germany', 'Canada'][index % 6]
    }))

    return NextResponse.json({
      success: true,
      leaderboard,
      type,
      metadata: {
        totalUsers: leaderboard.length,
        lastUpdated: new Date().toISOString(),
        isLive: true
      }
    })
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
    const { userId, score } = body

    if (!userId || score === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const updatedUser = db.updateUserScore(userId, score)

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Score updated successfully',
      newScore: score,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Leaderboard update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update leaderboard' },
      { status: 500 }
    )
  }
}
