import { NextRequest, NextResponse } from 'next/server'
import { problemsDatabase, getProblemById, getProblemBySlug, getProblemsByDifficulty, getProblemsByCategory, getProblemsByCompany, searchProblems } from '@/lib/database/problems-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty')
    const category = searchParams.get('category')
    const company = searchParams.get('company')
    const search = searchParams.get('search')
    const id = searchParams.get('id')
    const slug = searchParams.get('slug')

    // Get specific problem by ID or slug
    if (id) {
      const problem = getProblemById(id)
      if (!problem) {
        return NextResponse.json(
          { success: false, error: 'Problem not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({
        success: true,
        problem: {
          ...problem,
          isLive: true,
          liveSubmissions: Math.floor(Math.random() * 100) + 50,
          lastSubmission: new Date().toISOString(),
          realTimeStats: {
            activeUsers: Math.floor(Math.random() * 30) + 10,
            submissionsPerMinute: Math.floor(Math.random() * 20) + 5,
            successRate: Math.random() * 30 + 65
          }
        }
      })
    }

    if (slug) {
      const problem = getProblemBySlug(slug)
      if (!problem) {
        return NextResponse.json(
          { success: false, error: 'Problem not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({
        success: true,
        problem: {
          ...problem,
          isLive: true,
          liveSubmissions: Math.floor(Math.random() * 100) + 50,
          lastSubmission: new Date().toISOString(),
          realTimeStats: {
            activeUsers: Math.floor(Math.random() * 30) + 10,
            submissionsPerMinute: Math.floor(Math.random() * 20) + 5,
            successRate: Math.random() * 30 + 65
          }
        }
      })
    }

    // Filter problems based on query parameters
    let filteredProblems = problemsDatabase

    if (difficulty) {
      filteredProblems = getProblemsByDifficulty(difficulty as 'Easy' | 'Medium' | 'Hard')
    } else if (category) {
      filteredProblems = getProblemsByCategory(category)
    } else if (company) {
      filteredProblems = getProblemsByCompany(company)
    } else if (search) {
      filteredProblems = searchProblems(search)
    }

    // Add real-time stats to all problems
    const updatedProblems = filteredProblems.map(problem => ({
      ...problem,
      isLive: true,
      liveSubmissions: Math.floor(Math.random() * 100) + 50,
      lastSubmission: new Date().toISOString(),
      realTimeStats: {
        activeUsers: Math.floor(Math.random() * 30) + 10,
        submissionsPerMinute: Math.floor(Math.random() * 20) + 5,
        successRate: Math.random() * 30 + 65
      }
    }))

    const response = {
      success: true,
      problems: updatedProblems,
      realTimeStats: {
        totalProblems: problemsDatabase.length,
        activeUsers: updatedProblems.reduce((sum, p) => sum + p.realTimeStats.activeUsers, 0),
        totalSubmissions: updatedProblems.reduce((sum, p) => sum + p.liveSubmissions, 0),
        averageSuccessRate: updatedProblems.reduce((sum, p) => sum + p.realTimeStats.successRate, 0) / (updatedProblems.length || 1)
      },
      metadata: {
        lastUpdated: new Date().toISOString(),
        isLive: true,
        version: '2.0.0',
        filters: { difficulty, category, company, search }
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
    const { problemId, code, language, testCases } = body
    
    if (!problemId || !code || !language) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: problemId, code, language' },
        { status: 400 }
      )
    }

    const problem = getProblemById(problemId) || getProblemBySlug(problemId)
    
    if (!problem) {
      return NextResponse.json(
        { success: false, error: 'Problem not found' },
        { status: 404 }
      )
    }

    // Execute code against test cases
    const testResults = []
    let passedCount = 0
    
    for (const testCase of problem.testCases) {
      // Call execution API
      const execResponse = await fetch(`${request.nextUrl.origin}/api/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          code,
          input: testCase.input
        })
      })
      
      const execResult = await execResponse.json()
      const passed = execResult.success && execResult.output?.trim() === testCase.expectedOutput.trim()
      
      if (passed) passedCount++
      
      testResults.push({
        input: testCase.isHidden ? 'Hidden test case' : testCase.input,
        expectedOutput: testCase.isHidden ? 'Hidden' : testCase.expectedOutput,
        actualOutput: execResult.output || execResult.error || 'No output',
        passed,
        executionTime: execResult.executionTime,
        memoryUsage: execResult.memoryUsage,
        isHidden: testCase.isHidden
      })
    }

    const allPassed = passedCount === problem.testCases.length
    const result = {
      success: true,
      submissionId: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: allPassed ? 'Accepted' : passedCount > 0 ? 'Partial' : 'Wrong Answer',
      testResults,
      passedCount,
      totalCount: problem.testCases.length,
      score: Math.round((passedCount / problem.testCases.length) * 100),
      timestamp: new Date().toISOString()
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
