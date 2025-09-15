import { Suspense } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This is a server component that receives the search query from the URL
export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}

// This would fetch actual search results in a real application
function SearchResults({ query }: { query: string }) {
  // Mock search results
  const results = [
    {
      id: "1",
      type: "problem",
      title: "Two Sum",
      description: "Find two numbers that add up to a target",
      difficulty: "Easy",
    },
    {
      id: "2",
      type: "problem",
      title: "Three Sum",
      description: "Find three numbers that add up to zero",
      difficulty: "Medium",
    },
    {
      id: "3",
      type: "contest",
      title: "Weekly Contest 123",
      description: "Participate in our weekly coding contest",
      startDate: "2023-05-15",
    },
    {
      id: "4",
      type: "course",
      title: "Data Structures Masterclass",
      description: "Learn all about data structures",
      lessons: 24,
    },
  ].filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()),
  )

  if (results.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <Search className="mx-auto h-12 w-12 text-gray-300" />
        <h2 className="mt-4 text-xl font-medium">No results found</h2>
        <p className="mt-2 text-gray-500">Try different keywords or check your spelling</p>
      </div>
    )
  }

  return (
    <>
      {results.map((result) => (
        <Card key={result.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium uppercase text-gray-500">{result.type}</span>
              {result.type === "problem" && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    result.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : result.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.difficulty}
                </span>
              )}
            </div>
            <CardTitle className="text-lg">
              <Link href={`/${result.type}s/${result.id}`} className="hover:underline">
                {result.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">{result.description}</p>
            {result.type === "contest" && <p className="mt-2 text-xs text-gray-500">Starts on: {result.startDate}</p>}
            {result.type === "course" && <p className="mt-2 text-xs text-gray-500">{result.lessons} lessons</p>}
          </CardContent>
        </Card>
      ))}
    </>
  )
}

function SearchResultsSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded mt-2"></div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
