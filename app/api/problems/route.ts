import { NextRequest, NextResponse } from 'next/server'
import { problemsDatabase, getProblemById, getProblemBySlug, getProblemsByDifficulty, getProblemsByCategory, getProblemsByCompany, searchProblems } from '@/lib/database/problems-data'

export async function GET(request: NextRequest) {
  try {
    // Update real-time stats for all problems
    const updatedProblems = problems.map(problem => ({
      ...problem,
      liveSubmissions: Math.floor(Math.random() * 100) + 50,
      lastSubmission: new Date().toISOString(),
      realTimeStats: {
        activeUsers: Math.floor(Math.random() * 30) + 10,
        submissionsPerMinute: Math.floor(Math.random() * 20) + 5,
        successRate: Math.random() * 30 + 65 // 65-95%
      }
    }))

    const response = {
      success: true,
      problems: updatedProblems,
      realTimeStats: {
        totalProblems: problems.length,
        activeUsers: updatedProblems.reduce((sum, p) => sum + p.realTimeStats.activeUsers, 0),
        totalSubmissions: updatedProblems.reduce((sum, p) => sum + p.liveSubmissions, 0),
        averageSuccessRate: updatedProblems.reduce((sum, p) => sum + p.realTimeStats.successRate, 0) / problems.length
      },
      metadata: {
        lastUpdated: new Date().toISOString(),
        isLive: true,
        version: '1.0.0'
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Problems API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch problems' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle problem submission
    const { problemId, code, language } = body
    
    if (!problemId || !code || !language) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Simulate submission processing
    const result = {
      success: true,
      submissionId: `sub_${Date.now()}`,
      status: 'Accepted',
      executionTime: Math.random() * 100 + 50,
      memoryUsage: Math.random() * 10 + 5,
      score: Math.floor(Math.random() * 20) + 80 // 80-100%
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Problem submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}
