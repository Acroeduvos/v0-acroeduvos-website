import { Card, CardContent } from "@/components/ui/card"

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Leaderboard</h1>
      <p className="mt-2 text-gray-600">Top performers across problems and contests.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Overall Rankings</h2>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-2 border-b bg-gray-50 p-3 text-sm font-medium">
                <div>Rank</div>
                <div>User</div>
                <div>Score</div>
                <div>Country</div>
              </div>
              {[1, 2, 3, 4, 5].map((rank) => (
                <div key={rank} className="grid grid-cols-4 gap-2 p-3 text-sm">
                  <div>#{rank}</div>
                  <div>User {rank}</div>
                  <div>{1000 - rank * 10}</div>
                  <div>IN</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Monthly Rankings</h2>
            <p className="text-gray-600">Coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

