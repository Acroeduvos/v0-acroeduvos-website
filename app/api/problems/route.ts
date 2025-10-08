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
  testCases: TestCase[]
  examples: Example[]
  acceptanceRate: number
  totalSubmissions: number
  isLive: boolean
  liveSubmissions: number
  lastSubmission?: string
  realTimeStats: {
    activeUsers: number
    submissionsPerMinute: number
    averageSolveTime: number
    successRate: number
  }
}

interface TestCase {
  input: string
  expectedOutput: string
  isHidden: boolean
}

interface Example {
  input: string
  output: string
  explanation?: string
}

// Real-time problem generator
const generateDynamicProblems = (): Problem[] => {
  const currentTime = new Date()
  const baseProblems = [
    {
      id: '1',
      title: 'Two Sum',
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
      difficulty: 'Easy' as const,
      category: 'Array',
      tags: ['Array', 'Hash Table'],
      timeLimit: 2000,
      memoryLimit: 128,
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        }
      ],
      testCases: [
        { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]', isHidden: false },
        { input: '[3,2,4]\n6', expectedOutput: '[1,2]', isHidden: false },
        { input: '[3,3]\n6', expectedOutput: '[0,1]', isHidden: false }
      ]
    },
    {
      id: '2',
      title: 'Add Two Numbers',
      description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
      difficulty: 'Medium' as const,
      category: 'Linked List',
      tags: ['Linked List', 'Math', 'Recursion'],
      timeLimit: 3000,
      memoryLimit: 256,
      examples: [
        {
          input: 'l1 = [2,4,3], l2 = [5,6,4]',
          output: '[7,0,8]',
          explanation: '342 + 465 = 807'
        }
      ],
      testCases: [
        { input: '[2,4,3]\n[5,6,4]', expectedOutput: '[7,0,8]', isHidden: false },
        { input: '[0]\n[0]', expectedOutput: '[0]', isHidden: false },
        { input: '[9,9,9,9,9,9,9]\n[9,9,9,9]', expectedOutput: '[8,9,9,9,0,0,0,1]', isHidden: false }
      ]
    },
    {
      id: '3',
      title: 'Longest Substring Without Repeating Characters',
      description: `Given a string s, find the length of the longest substring without repeating characters.`,
      difficulty: 'Medium' as const,
      category: 'String',
      tags: ['Hash Table', 'String', 'Sliding Window'],
      timeLimit: 3000,
      memoryLimit: 256,
      examples: [
        {
          input: 's = "abcabcbb"',
          output: '3',
          explanation: 'The answer is "abc", with the length of 3.'
        },
        {
          input: 's = "bbbbb"',
          output: '1',
          explanation: 'The answer is "b", with the length of 1.'
        }
      ],
      testCases: [
        { input: '"abcabcbb"', expectedOutput: '3', isHidden: false },
        { input: '"bbbbb"', expectedOutput: '1', isHidden: false },
        { input: '"pwwkew"', expectedOutput: '3', isHidden: false }
      ]
    },
    {
      id: '4',
      title: 'Binary Tree Maximum Path Sum',
      description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.`,
      difficulty: 'Hard' as const,
      category: 'Tree',
      tags: ['Dynamic Programming', 'Tree', 'DFS'],
      timeLimit: 4000,
      memoryLimit: 512,
      examples: [
        {
          input: 'root = [1,2,3]',
          output: '6',
          explanation: 'The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.'
        }
      ],
      testCases: [
        { input: '[1,2,3]', expectedOutput: '6', isHidden: false },
        { input: '[-10,9,20,null,null,15,7]', expectedOutput: '42', isHidden: false },
        { input: '[-3]', expectedOutput: '-3', isHidden: false }
      ]
    },
    {
      id: '5',
      title: 'Reverse Integer',
      description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).`,
      difficulty: 'Easy' as const,
      category: 'Math',
      tags: ['Math'],
      timeLimit: 2000,
      memoryLimit: 128,
      examples: [
        {
          input: 'x = 123',
          output: '321',
          explanation: 'Reversing 123 gives us 321.'
        },
        {
          input: 'x = -123',
          output: '-321',
          explanation: 'Reversing -123 gives us -321.'
        }
      ],
      testCases: [
        { input: '123', expectedOutput: '321', isHidden: false },
        { input: '-123', expectedOutput: '-321', isHidden: false },
        { input: '120', expectedOutput: '21', isHidden: false }
      ]
    },
    {
      id: '6',
      title: 'Palindrome Number',
      description: `Given an integer x, return true if x is a palindrome integer.

An integer is a palindrome when it reads the same backward as forward.

For example, 121 is a palindrome while 123 is not.`,
      difficulty: 'Easy' as const,
      category: 'Math',
      tags: ['Math'],
      timeLimit: 2000,
      memoryLimit: 128,
      examples: [
        {
          input: 'x = 121',
          output: 'true',
          explanation: '121 reads as 121 from left to right and from right to left.'
        },
        {
          input: 'x = -121',
          output: 'false',
          explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.'
        }
      ],
      testCases: [
        { input: '121', expectedOutput: 'true', isHidden: false },
        { input: '-121', expectedOutput: 'false', isHidden: false },
        { input: '10', expectedOutput: 'false', isHidden: false }
      ]
    },
    {
      id: '7',
      title: 'Valid Parentheses',
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
      difficulty: 'Easy' as const,
      category: 'String',
      tags: ['String', 'Stack'],
      timeLimit: 2000,
      memoryLimit: 128,
      examples: [
        {
          input: 's = "()"',
          output: 'true',
          explanation: 'The string contains valid parentheses.'
        },
        {
          input: 's = "()[]{}"',
          output: 'true',
          explanation: 'All brackets are properly closed.'
        }
      ],
      testCases: [
        { input: '"()"', expectedOutput: 'true', isHidden: false },
        { input: '"()[]{}"', expectedOutput: 'true', isHidden: false },
        { input: '"(]"', expectedOutput: 'false', isHidden: false }
      ]
    },
    {
      id: '8',
      title: 'Merge Two Sorted Lists',
      description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
      difficulty: 'Easy' as const,
      category: 'Linked List',
      tags: ['Linked List', 'Recursion'],
      timeLimit: 2000,
      memoryLimit: 128,
      examples: [
        {
          input: 'list1 = [1,2,4], list2 = [1,3,4]',
          output: '[1,1,2,3,4,4]',
          explanation: 'Merge the sorted lists into one sorted list.'
        }
      ],
      testCases: [
        { input: '[1,2,4]\n[1,3,4]', expectedOutput: '[1,1,2,3,4,4]', isHidden: false },
        { input: '[]\n[]', expectedOutput: '[]', isHidden: false },
        { input: '[]\n[0]', expectedOutput: '[0]', isHidden: false }
      ]
    }
  ]

  // Generate real-time data for each problem
  return baseProblems.map(problem => {
    const timeSinceStart = Date.now() % 86400000 // Time since start of day
    const problemIndex = parseInt(problem.id)
    
    // Generate dynamic stats based on current time and problem
    const baseSubmissions = [1250000, 890000, 2100000, 450000, 1500000, 1800000, 2200000, 1400000][problemIndex - 1] || 1000000
    const baseAcceptanceRate = [45.8, 34.2, 31.7, 28.9, 25.8, 52.3, 37.4, 58.2][problemIndex - 1] || 40.0
    
    // Simulate real-time activity
    const liveSubmissions = Math.floor(Math.random() * 50) + 10
    const activeUsers = Math.floor(Math.random() * 25) + 5
    const submissionsPerMinute = Math.floor(Math.random() * 20) + 5
    const averageSolveTime = Math.floor(Math.random() * 300) + 60 // 1-6 minutes
    const successRate = Math.random() * 0.3 + 0.4 // 40-70% success rate
    
    return {
      ...problem,
      acceptanceRate: baseAcceptanceRate + (Math.random() - 0.5) * 5, // ±2.5% variation
      totalSubmissions: baseSubmissions + Math.floor(timeSinceStart / 1000) * Math.floor(Math.random() * 10),
      isLive: true,
      liveSubmissions,
      lastSubmission: new Date(Date.now() - Math.random() * 300000).toISOString(), // Last 5 minutes
      realTimeStats: {
        activeUsers,
        submissionsPerMinute,
        averageSolveTime,
        successRate: Math.round(successRate * 100) / 100
      }
    }
  })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Health check endpoint
    if (searchParams.get('health') === 'true') {
      return NextResponse.json({
        success: true,
        message: 'AcroEduvos Real-Time Problems API is running',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        features: ['real-time', 'dynamic', 'live-stats']
      })
    }

    // Generate fresh problems with real-time data
    const problems = generateDynamicProblems()
    
    const difficulty = searchParams.get('difficulty')
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const liveOnly = searchParams.get('live') === 'true'

    let filteredProblems = problems

    if (difficulty) {
      filteredProblems = filteredProblems.filter(p => p.difficulty === difficulty)
    }

    if (category) {
      filteredProblems = filteredProblems.filter(p => p.category === category)
    }

    if (liveOnly) {
      filteredProblems = filteredProblems.filter(p => p.isLive)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProblems = filteredProblems.slice(startIndex, endIndex)

    // Calculate real-time platform stats
    const totalActiveUsers = problems.reduce((sum, p) => sum + p.realTimeStats.activeUsers, 0)
    const totalSubmissionsPerMinute = problems.reduce((sum, p) => sum + p.realTimeStats.submissionsPerMinute, 0)
    const overallSuccessRate = problems.reduce((sum, p) => sum + p.realTimeStats.successRate, 0) / problems.length

    return NextResponse.json({
      problems: paginatedProblems,
      total: filteredProblems.length,
      page,
      totalPages: Math.ceil(filteredProblems.length / limit),
      realTimeStats: {
        totalActiveUsers,
        totalSubmissionsPerMinute,
        overallSuccessRate: Math.round(overallSuccessRate * 100) / 100,
        lastUpdated: new Date().toISOString(),
        platformStatus: 'active'
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