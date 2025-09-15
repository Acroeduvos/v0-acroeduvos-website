import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProblemsPage({
  searchParams,
}: {
  searchParams: { difficulty?: string; tag?: string }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Problems</h1>
          <p className="text-gray-600 mt-2">Solve algorithmic problems to improve your coding skills</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/problems/random">
            <Button>Random Problem</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <ProblemFilters />
        </div>
        <div className="md:col-span-9">
          <Suspense fallback={<ProblemListSkeleton />}>
            <ProblemList difficulty={searchParams.difficulty} tag={searchParams.tag} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ProblemFilters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Difficulty</h3>
        <div className="space-y-2">
          <Link href="/problems?difficulty=easy" className="block text-sm hover:text-black">
            Easy
          </Link>
          <Link href="/problems?difficulty=medium" className="block text-sm hover:text-black">
            Medium
          </Link>
          <Link href="/problems?difficulty=hard" className="block text-sm hover:text-black">
            Hard
          </Link>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Tags</h3>
        <div className="space-y-2">
          <Link href="/problems?tag=arrays" className="block text-sm hover:text-black">
            Arrays
          </Link>
          <Link href="/problems?tag=strings" className="block text-sm hover:text-black">
            Strings
          </Link>
          <Link href="/problems?tag=dynamic-programming" className="block text-sm hover:text-black">
            Dynamic Programming
          </Link>
          <Link href="/problems?tag=graphs" className="block text-sm hover:text-black">
            Graphs
          </Link>
          <Link href="/problems?tag=trees" className="block text-sm hover:text-black">
            Trees
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProblemList({ difficulty, tag }: { difficulty?: string; tag?: string }) {
  // Mock problems data
  const problems = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["Arrays", "Hash Table"],
      solvedCount: 12500,
      submissionCount: 15000,
    },
    {
      id: "2",
      title: "Add Two Numbers",
      difficulty: "Medium",
      tags: ["Linked List", "Math"],
      solvedCount: 8900,
      submissionCount: 12000,
    },
    {
      id: "3",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      tags: ["String", "Sliding Window"],
      solvedCount: 7800,
      submissionCount: 11000,
    },
    {
      id: "4",
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      tags: ["Arrays", "Binary Search"],
      solvedCount: 4500,
      submissionCount: 9000,
    },
    {
      id: "5",
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      tags: ["String", "Dynamic Programming"],
      solvedCount: 6700,
      submissionCount: 10000,
    },
  ].filter((problem) => {
    if (difficulty && problem.difficulty.toLowerCase() !== difficulty.toLowerCase()) {
      return false
    }
    if (tag && !problem.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tag.toLowerCase())) {
      return false
    }
    return true
  })

  if (problems.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <h2 className="text-xl font-medium mb-2">No problems found</h2>
        <p className="text-gray-600">Try changing your filters or check back later</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <Card key={problem.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">
                <Link href={`/problems/${problem.id}`} className="hover:underline">
                  {problem.title}
                </Link>
              </CardTitle>
              <Badge
                className={
                  problem.difficulty === "Easy"
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : problem.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                }
              >
                {problem.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/problems?tag=${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex justify-between items-center w-full">
              <div className="text-xs text-gray-500">
                {((problem.solvedCount / problem.submissionCount) * 100).toFixed(1)}% success rate
              </div>
              <Link href={`/problems/${problem.id}/solve`}>
                <Button variant="outline" size="sm">
                  Solve
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function ProblemListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex justify-between items-center w-full">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
