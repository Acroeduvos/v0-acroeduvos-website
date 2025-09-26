"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"

export default function PracticeByDifficultyPage({ searchParams }: { searchParams: { page?: string; level?: string } }) {
  const page = Number(searchParams.page || 1)
  const level = (searchParams.level || "easy").toLowerCase()
  const levels = ["easy", "medium", "hard"]
  const [searchQuery, setSearchQuery] = useState("")

  const problems = useMemo(() => {
    const all = [
      // Easy Problems
      { id: 1, title: "Two Sum", level: "easy", slug: "two-sum", description: "Find two numbers in an array that add up to a target sum.", topics: ["Arrays", "Hash Table"] },
      { id: 2, title: "Valid Parentheses", level: "easy", slug: "valid-parentheses", description: "Determine if a string of parentheses is valid.", topics: ["Stack", "String"] },
      // Medium Problems
      { id: 3, title: "LRU Cache", level: "medium", slug: "lru-cache", description: "Design and implement a Least Recently Used (LRU) cache.", topics: ["Hash Table", "Linked List"] },
      { id: 4, title: "Binary Tree Level Order Traversal", level: "medium", slug: "binary-tree-level-order", description: "Return level-order traversal of binary tree nodes' values.", topics: ["Tree", "BFS"] },
      // Hard Problems
      { id: 5, title: "Median of Two Sorted Arrays", level: "hard", slug: "median-sorted-arrays", description: "Find the median of two sorted arrays.", topics: ["Array", "Binary Search"] },
    ]

    // Generate more problems programmatically
    const generateProblems = (baseProblems: typeof all) => {
      const result = [...baseProblems]
      const templates = {
        easy: [
          "Find Maximum in Array",
          "Count Characters",
          "Binary Search Implementation",
          "Implement Queue using Stack",
          "First Non-Repeating Character",
          "Valid Anagram",
          "Merge Sorted Arrays",
          "Reverse Linked List",
          "Balanced Binary Tree",
          "Path Sum in Binary Tree"
        ],
        medium: [
          "Longest Common Subsequence",
          "Number of Islands",
          "Minimum Path Sum",
          "Validate Binary Search Tree",
          "Word Break Problem",
          "Course Schedule",
          "Container With Most Water",
          "Generate Parentheses",
          "Rotate Image",
          "Longest Palindromic Substring"
        ],
        hard: [
          "Shortest Path in Graph",
          "Maximum Flow in Network",
          "Longest Valid Parentheses",
          "Word Search II",
          "N-Queens Problem",
          "Regular Expression Matching",
          "Merge k Sorted Lists",
          "Sliding Window Maximum",
          "Trapping Rain Water",
          "Serialize and Deserialize Binary Tree"
        ],
      }

      let id = 1000
      for (const difficulty of Object.keys(templates) as Array<keyof typeof templates>) {
        for (let i = 0; i < 160; i++) { // Generates ~480 additional problems
          const template = templates[difficulty][i % templates[difficulty].length]
          result.push({
            id: id++,
            title: `${template} ${Math.floor(i / templates[difficulty].length) + 1}`,
            level: difficulty,
            slug: template.toLowerCase().replace(/\s+/g, '-') + `-${Math.floor(i / templates[difficulty].length) + 1}`,
            description: `Solve the ${template.toLowerCase()} problem with optimal time and space complexity.`,
            topics: ["Algorithms", "Data Structures"],
          })
        }
      }
      return result
    }

    const allProblems = generateProblems(all)
    return allProblems.filter((p) => p.level === level)
  }, [level])

  const filteredProblems = useMemo(() => {
    if (!searchQuery) return problems
    const query = searchQuery.toLowerCase()
    return problems.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.topics.some((t) => t.toLowerCase().includes(query))
    )
  }, [problems, searchQuery])

  const pageSize = 25
  const totalPages = Math.ceil(filteredProblems.length / pageSize)
  const start = (page - 1) * pageSize
  const pageItems = filteredProblems.slice(start, start + pageSize)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold capitalize">{level} Problems</h1>
          <div className="space-x-2 text-sm">
            {levels.map((lvl) => (
              <Link
                key={lvl}
                href={`/practice/difficulty?level=${lvl}`}
                className={`rounded border px-3 py-1 ${
                  lvl === level
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {lvl}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search problems by title, description, or topic..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2"
              size="sm"
              variant="ghost"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {pageItems.map((p) => (
          <Link
            key={p.id}
            href={`/practice/difficulty/${p.slug}`}
            className="group rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">#{p.id}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      p.level === "easy"
                        ? "bg-green-100 text-green-700"
                        : p.level === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.level}
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-bold group-hover:text-purple-600">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{p.description}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="flex flex-wrap gap-2">
                  {p.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center space-x-2">
        <Link
          href={`/practice/difficulty?level=${level}&page=${Math.max(1, page - 1)}`}
          className={`rounded border px-3 py-2 text-sm ${
            page <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Previous
        </Link>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <Link
          href={`/practice/difficulty?level=${level}&page=${Math.min(
            totalPages,
            page + 1
          )}`}
          className={`rounded border px-3 py-2 text-sm ${
            page >= totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  )
}