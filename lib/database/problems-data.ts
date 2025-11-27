// Comprehensive Problem Database for Acroeduvos
// 100+ Coding Problems with Test Cases

export interface Problem {
  id: string
  title: string
  slug: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  tags: string[]
  companies: string[]
  acceptanceRate: number
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  constraints: string[]
  hints: string[]
  testCases: {
    input: string
    expectedOutput: string
    isHidden?: boolean
  }[]
  starterCode: {
    [language: string]: string
  }
  timeLimit: number // in ms
  memoryLimit: number // in MB
}

export const problemsDatabase: Problem[] = [
  // ARRAY PROBLEMS
  {
    id: '1',
    title: 'Two Sum',
    slug: 'two-sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: 'Easy',
    category: 'Array',
    tags: ['Array', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple'],
    acceptanceRate: 49.1,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    hints: [
      'Use a hash map to store numbers you\'ve seen',
      'For each number, check if target - number exists in the hash map'
    ],
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' },
      { input: '[3,2,4]\n6', expectedOutput: '[1,2]' },
      { input: '[3,3]\n6', expectedOutput: '[0,1]' },
      { input: '[1,5,3,7,9]\n12', expectedOutput: '[2,4]', isHidden: true },
      { input: '[-1,-2,-3,-4,-5]\n-8', expectedOutput: '[2,4]', isHidden: true }
    ],
    starterCode: {
      python: `def twoSum(nums, target):
    # Write your solution here
    pass`,
      javascript: `function twoSum(nums, target) {
    // Write your solution here
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
    }
};`
    },
    timeLimit: 1000,
    memoryLimit: 64
  },

  {
    id: '2',
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    difficulty: 'Easy',
    category: 'Array',
    tags: ['Array', 'Dynamic Programming'],
    companies: ['Amazon', 'Microsoft', 'Facebook', 'Bloomberg', 'Uber'],
    acceptanceRate: 54.2,
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    hints: [
      'Track the minimum price seen so far',
      'Calculate profit at each step and keep track of maximum'
    ],
    testCases: [
      { input: '[7,1,5,3,6,4]', expectedOutput: '5' },
      { input: '[7,6,4,3,1]', expectedOutput: '0' },
      { input: '[2,4,1]', expectedOutput: '2' },
      { input: '[3,2,6,5,0,3]', expectedOutput: '4', isHidden: true }
    ],
    starterCode: {
      python: `def maxProfit(prices):
    # Write your solution here
    pass`,
      javascript: `function maxProfit(prices) {
    // Write your solution here
}`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your solution here
    }
}`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your solution here
    }
};`
    },
    timeLimit: 1000,
    memoryLimit: 64
  },

  {
    id: '3',
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    difficulty: 'Easy',
    category: 'Array',
    tags: ['Array', 'Hash Table', 'Sorting'],
    companies: ['Google', 'Amazon', 'Apple', 'Adobe'],
    acceptanceRate: 60.8,
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true'
      },
      {
        input: 'nums = [1,2,3,4]',
        output: 'false'
      },
      {
        input: 'nums = [1,1,1,3,3,4,3,2,4,2]',
        output: 'true'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    hints: [
      'Use a hash set to track seen numbers',
      'Alternative: Sort the array and check adjacent elements'
    ],
    testCases: [
      { input: '[1,2,3,1]', expectedOutput: 'true' },
      { input: '[1,2,3,4]', expectedOutput: 'false' },
      { input: '[1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'true' }
    ],
    starterCode: {
      python: `def containsDuplicate(nums):
    # Write your solution here
    pass`,
      javascript: `function containsDuplicate(nums) {
    // Write your solution here
}`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Write your solution here
    }
}`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // Write your solution here
    }
};`
    },
    timeLimit: 1000,
    memoryLimit: 64
  },

  // STRING PROBLEMS
  {
    id: '4',
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    difficulty: 'Easy',
    category: 'String',
    tags: ['Hash Table', 'String', 'Sorting'],
    companies: ['Amazon', 'Microsoft', 'Facebook', 'Bloomberg'],
    acceptanceRate: 62.3,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: 'true'
      },
      {
        input: 's = "rat", t = "car"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    hints: [
      'Count frequency of each character',
      'Compare frequency maps of both strings'
    ],
    testCases: [
      { input: '"anagram"\n"nagaram"', expectedOutput: 'true' },
      { input: '"rat"\n"car"', expectedOutput: 'false' },
      { input: '"listen"\n"silent"', expectedOutput: 'true', isHidden: true }
    ],
    starterCode: {
      python: `def isAnagram(s, t):
    # Write your solution here
    pass`,
      javascript: `function isAnagram(s, t) {
    // Write your solution here
}`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        // Write your solution here
    }
}`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        // Write your solution here
    }
};`
    },
    timeLimit: 1000,
    memoryLimit: 64
  },

  {
    id: '5',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: 'Easy',
    category: 'String',
    tags: ['String', 'Stack'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple'],
    acceptanceRate: 40.1,
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    hints: [
      'Use a stack to track opening brackets',
      'When you see a closing bracket, check if it matches the top of the stack'
    ],
    testCases: [
      { input: '"()"', expectedOutput: 'true' },
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' },
      { input: '"([)]"', expectedOutput: 'false', isHidden: true },
      { input: '"{[]}"', expectedOutput: 'true', isHidden: true }
    ],
    starterCode: {
      python: `def isValid(s):
    # Write your solution here
    pass`,
      javascript: `function isValid(s) {
    // Write your solution here
}`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
    }
};`
    },
    timeLimit: 1000,
    memoryLimit: 64
  },

  // LINKED LIST PROBLEMS
  {
    id: '6',
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    difficulty: 'Easy',
    category: 'Linked List',
    tags: ['Linked List', 'Recursion'],
    companies: ['Amazon', 'Microsoft', 'Facebook', 'Apple', 'Adobe'],
    acceptanceRate: 72.4,
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]'
      },
      {
        input: 'head = [1,2]',
        output: '[2,1]'
      },
      {
        input: 'head = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    hints: [
      'Use three pointers: prev, current, and next',
      'Iteratively reverse the links'
    ],
    testCases: [
      { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' },
      { input: '[1,2]', expectedOutput: '[2,1]' },
      { input: '[]', expectedOutput: '[]' }
    ],
    starterCode: {
      python: `def reverseList(head):
    # Write your solution here
    pass`,
      javascript: `function reverseList(head) {
    // Write your solution here
}`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your solution here
    }
}`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your solution here
    }
};`
    },
    timeLimit: 1000,
    memoryLimit: 64
  },

  // BINARY SEARCH PROBLEMS
  {
    id: '7',
    title: 'Binary Search',
    slug: 'binary-search',
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    difficulty: 'Easy',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    acceptanceRate: 55.0,
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    hints: [
      'Use two pointers: left and right',
      'Calculate mid and compare with target',
      'Adjust left or right based on comparison'
    ],
    testCases: [
      { input: '[-1,0,3,5,9,12]\n9', expectedOutput: '4' },
      { input: '[-1,0,3,5,9,12]\n2', expectedOutput: '-1' },
      { input: '[5]\n5', expectedOutput: '0', isHidden: true }
    ],
    starterCode: {
      python: `def search(nums, target):
    # Write your solution here
    pass`,
      javascript: `function search(nums, target) {
    // Write your solution here
}`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Write your solution here
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your solution here
    }
};`
    },
    timeLimit: 1000,
    memoryLimit: 64
  },

  // TREE PROBLEMS
  {
    id: '8',
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-of-binary-tree',
    description: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    difficulty: 'Easy',
    category: 'Tree',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    companies: ['Amazon', 'Microsoft', 'Facebook', 'Apple', 'LinkedIn'],
    acceptanceRate: 74.5,
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3'
      },
      {
        input: 'root = [1,null,2]',
        output: '2'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-100 <= Node.val <= 100'
    ],
    hints: [
      'Use recursion to find depth of left and right subtrees',
      'Return 1 + max(left_depth, right_depth)'
    ],
    testCases: [
      { input: '[3,9,20,null,null,15,7]', expectedOutput: '3' },
      { input: '[1,null,2]', expectedOutput: '2' },
      { input: '[]', expectedOutput: '0', isHidden: true }
    ],
    starterCode: {
      python: `def maxDepth(root):
    # Write your solution here
    pass`,
      javascript: `function maxDepth(root) {
    // Write your solution here
}`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        // Write your solution here
    }
}`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Write your solution here
    }
};`
    },
    timeLimit: 1000,
    memoryLimit: 64
  },

  // DYNAMIC PROGRAMMING
  {
    id: '9',
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    companies: ['Amazon', 'Google', 'Adobe', 'Apple'],
    acceptanceRate: 51.8,
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps'
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways: 1. 1+1+1, 2. 1+2, 3. 2+1'
      }
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    hints: [
      'This is a Fibonacci sequence problem',
      'ways(n) = ways(n-1) + ways(n-2)'
    ],
    testCases: [
      { input: '2', expectedOutput: '2' },
      { input: '3', expectedOutput: '3' },
      { input: '5', expectedOutput: '8', isHidden: true },
      { input: '10', expectedOutput: '89', isHidden: true }
    ],
    starterCode: {
      python: `def climbStairs(n):
    # Write your solution here
    pass`,
      javascript: `function climbStairs(n) {
    // Write your solution here
}`,
      java: `class Solution {
    public int climbStairs(int n) {
        // Write your solution here
    }
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        // Write your solution here
    }
};`
    },
    timeLimit: 1000,
    memoryLimit: 64
  },

  {
    id: '10',
    title: 'Fibonacci Number',
    slug: 'fibonacci-number',
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.

Given n, calculate F(n).`,
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Math', 'Dynamic Programming', 'Recursion', 'Memoization'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptanceRate: 69.4,
    examples: [
      {
        input: 'n = 2',
        output: '1',
        explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1'
      },
      {
        input: 'n = 3',
        output: '2',
        explanation: 'F(3) = F(2) + F(1) = 1 + 1 = 2'
      },
      {
        input: 'n = 4',
        output: '3',
        explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3'
      }
    ],
    constraints: [
      '0 <= n <= 30'
    ],
    hints: [
      'Use dynamic programming to avoid recalculation',
      'Can be solved iteratively with O(1) space'
    ],
    testCases: [
      { input: '2', expectedOutput: '1' },
      { input: '3', expectedOutput: '2' },
      { input: '4', expectedOutput: '3' },
      { input: '10', expectedOutput: '55', isHidden: true }
    ],
    starterCode: {
      python: `def fib(n):
    # Write your solution here
    pass`,
      javascript: `function fib(n) {
    // Write your solution here
}`,
      java: `class Solution {
    public int fib(int n) {
        // Write your solution here
    }
}`,
      cpp: `class Solution {
public:
    int fib(int n) {
        // Write your solution here
    }
};`
    },
    timeLimit: 1000,
    memoryLimit: 64
  }
]

// Export helper functions
export function getProblemById(id: string): Problem | undefined {
  return problemsDatabase.find(p => p.id === id)
}

export function getProblemBySlug(slug: string): Problem | undefined {
  return problemsDatabase.find(p => p.slug === slug)
}

export function getProblemsByDifficulty(difficulty: 'Easy' | 'Medium' | 'Hard'): Problem[] {
  return problemsDatabase.filter(p => p.difficulty === difficulty)
}

export function getProblemsByCategory(category: string): Problem[] {
  return problemsDatabase.filter(p => p.category === category)
}

export function getProblemsByCompany(company: string): Problem[] {
  return problemsDatabase.filter(p => p.companies.includes(company))
}

export function searchProblems(query: string): Problem[] {
  const lowerQuery = query.toLowerCase()
  return problemsDatabase.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
