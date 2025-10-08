import { NextRequest, NextResponse } from 'next/server'

interface Problem {
  id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  tags: string[]
  timeLimit: number
  memoryLimit: number
  acceptanceRate: number
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  testCases: {
    input: string
    expectedOutput: string
  }[]
  isLive: boolean
  liveSubmissions: number
  lastSubmission: string
  realTimeStats: {
    activeUsers: number
    submissionsPerMinute: number
    successRate: number
  }
}

const problems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    category: 'Array',
    tags: ['Array', 'Hash Table'],
    timeLimit: 1000,
    memoryLimit: 64,
    acceptanceRate: 45.2,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' },
      { input: '[3,2,4]\n6', expectedOutput: '[1,2]' },
      { input: '[3,3]\n6', expectedOutput: '[0,1]' }
    ],
    isLive: true,
    liveSubmissions: Math.floor(Math.random() * 100) + 50,
    lastSubmission: new Date().toISOString(),
    realTimeStats: {
      activeUsers: Math.floor(Math.random() * 20) + 10,
      submissionsPerMinute: Math.floor(Math.random() * 15) + 5,
      successRate: 85.2
    }
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.',
    difficulty: 'Easy',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    timeLimit: 1000,
    memoryLimit: 64,
    acceptanceRate: 38.7,
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      }
    ],
    testCases: [
      { input: '[-1,0,3,5,9,12]\n9', expectedOutput: '4' },
      { input: '[-1,0,3,5,9,12]\n2', expectedOutput: '-1' }
    ],
    isLive: true,
    liveSubmissions: Math.floor(Math.random() * 80) + 40,
    lastSubmission: new Date().toISOString(),
    realTimeStats: {
      activeUsers: Math.floor(Math.random() * 15) + 8,
      submissionsPerMinute: Math.floor(Math.random() * 12) + 3,
      successRate: 78.9
    }
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    description: 'Implement merge sort algorithm to sort an array of integers.',
    difficulty: 'Medium',
    category: 'Sorting',
    tags: ['Array', 'Divide and Conquer', 'Sorting'],
    timeLimit: 2000,
    memoryLimit: 128,
    acceptanceRate: 42.1,
    examples: [
      {
        input: '[64, 34, 25, 12, 22, 11, 90]',
        output: '[11, 12, 22, 25, 34, 64, 90]',
        explanation: 'Array sorted in ascending order using merge sort'
      }
    ],
    testCases: [
      { input: '[64, 34, 25, 12, 22, 11, 90]', expectedOutput: '[11, 12, 22, 25, 34, 64, 90]' },
      { input: '[5, 2, 8, 1, 9]', expectedOutput: '[1, 2, 5, 8, 9]' }
    ],
    isLive: true,
    liveSubmissions: Math.floor(Math.random() * 60) + 30,
    lastSubmission: new Date().toISOString(),
    realTimeStats: {
      activeUsers: Math.floor(Math.random() * 12) + 5,
      submissionsPerMinute: Math.floor(Math.random() * 8) + 2,
      successRate: 72.3
    }
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    category: 'String',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    timeLimit: 1000,
    memoryLimit: 64,
    acceptanceRate: 35.8,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      }
    ],
    testCases: [
      { input: '"abcabcbb"', expectedOutput: '3' },
      { input: '"bbbbb"', expectedOutput: '1' },
      { input: '"pwwkew"', expectedOutput: '3' }
    ],
    isLive: true,
    liveSubmissions: Math.floor(Math.random() * 70) + 35,
    lastSubmission: new Date().toISOString(),
    realTimeStats: {
      activeUsers: Math.floor(Math.random() * 18) + 8,
      submissionsPerMinute: Math.floor(Math.random() * 10) + 4,
      successRate: 68.5
    }
  },
  {
    id: 'max-profit',
    title: 'Best Time to Buy and Sell Stock',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    timeLimit: 1000,
    memoryLimit: 64,
    acceptanceRate: 52.3,
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
      }
    ],
    testCases: [
      { input: '[7,1,5,3,6,4]', expectedOutput: '5' },
      { input: '[7,6,4,3,1]', expectedOutput: '0' }
    ],
    isLive: true,
    liveSubmissions: Math.floor(Math.random() * 90) + 45,
    lastSubmission: new Date().toISOString(),
    realTimeStats: {
      activeUsers: Math.floor(Math.random() * 22) + 12,
      submissionsPerMinute: Math.floor(Math.random() * 18) + 6,
      successRate: 81.7
    }
  }
]

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
