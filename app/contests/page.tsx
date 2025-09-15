import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Calendar } from "lucide-react"

export default function ContestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Contests</h1>
        <p className="mt-2 text-gray-600">
          Participate in coding competitions to test your skills and compete with others.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Weekly Challenge #42",
                date: "Apr 15, 2025",
                time: "8:00 PM - 11:00 PM",
                duration: "3 hours",
                difficulty: "Medium",
                participants: 1240,
                description:
                  "Solve algorithmic problems covering data structures, dynamic programming, and graph algorithms.",
              },
              {
                title: "Data Structures Marathon",
                date: "Apr 20, 2025",
                time: "9:00 AM - 9:00 PM",
                duration: "12 hours",
                difficulty: "Hard",
                participants: 856,
                description:
                  "A day-long contest focused on advanced data structures with complex problem-solving scenarios.",
              },
              {
                title: "Beginner's Coding Contest",
                date: "Apr 25, 2025",
                time: "6:00 PM - 8:00 PM",
                duration: "2 hours",
                difficulty: "Easy",
                participants: 2150,
                description:
                  "Perfect for newcomers to competitive programming with approachable problems and detailed explanations.",
              },
              {
                title: "Algorithm Showdown",
                date: "May 1, 2025",
                time: "7:00 PM - 10:00 PM",
                duration: "3 hours",
                difficulty: "Medium",
                participants: 1876,
                description:
                  "Test your algorithmic thinking with problems that require efficient and optimized solutions.",
              },
              {
                title: "Code Sprint Challenge",
                date: "May 8, 2025",
                time: "5:00 PM - 8:00 PM",
                duration: "3 hours",
                difficulty: "Medium",
                participants: 1543,
                description: "A fast-paced contest with a focus on speed and accuracy in problem-solving.",
              },
              {
                title: "Grand Coding Championship",
                date: "May 15-16, 2025",
                time: "48-hour window",
                duration: "48 hours",
                difficulty: "Expert",
                participants: 742,
                description:
                  "Our premier annual contest with challenging problems across all domains of competitive programming.",
              },
            ].map((contest, index) => (
              <Card key={index} className="overflow-hidden border-gray-200">
                <CardHeader className="bg-[#f5f2ee] pb-2">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-white">
                      {contest.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="mr-1 h-4 w-4" />
                      {contest.participants}
                    </div>
                  </div>
                  <CardTitle className="mt-2 text-xl">{contest.title}</CardTitle>
                  <CardDescription className="mt-2">{contest.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      {contest.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-2 h-4 w-4" />
                      {contest.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-2 h-4 w-4" />
                      Duration: {contest.duration}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-[#f5f2ee] px-6 py-3">
                  <Button variant="link" className="ml-auto p-0 text-black">
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ongoing">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden border-gray-200">
              <CardHeader className="bg-[#f5f2ee] pb-2">
                <div className="flex justify-between">
                  <Badge variant="outline" className="bg-white">
                    Hard
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="mr-1 h-4 w-4" />
                    1892
                  </div>
                </div>
                <CardTitle className="mt-2 text-xl">Monthly Coding Challenge</CardTitle>
                <CardDescription className="mt-2">
                  Our monthly contest featuring a mix of algorithmic problems across various domains.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    Apr 13, 2025
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-2 h-4 w-4" />
                    Ends in: 5h 23m 12s
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-2 h-4 w-4" />
                    Duration: 24 hours
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-[#f5f2ee] px-6 py-3">
                <Button className="ml-auto bg-black text-white hover:bg-gray-800">Enter Contest</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f5f2ee]">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contest</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Participants</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Winner</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    title: "Weekly Challenge #41",
                    date: "Apr 8, 2025",
                    duration: "3 hours",
                    participants: 1356,
                    winner: "codemaster42",
                  },
                  {
                    title: "Algorithm Showdown",
                    date: "Apr 1, 2025",
                    duration: "3 hours",
                    participants: 1245,
                    winner: "algorithmPro",
                  },
                  {
                    title: "Beginner's Coding Contest",
                    date: "Mar 25, 2025",
                    duration: "2 hours",
                    participants: 2034,
                    winner: "newcoder123",
                  },
                  {
                    title: "Data Structures Challenge",
                    date: "Mar 18, 2025",
                    duration: "4 hours",
                    participants: 987,
                    winner: "datastructguru",
                  },
                  {
                    title: "Weekly Challenge #40",
                    date: "Mar 11, 2025",
                    duration: "3 hours",
                    participants: 1289,
                    winner: "codingNinja",
                  },
                ].map((contest, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href="#" className="text-sm font-medium text-gray-900 hover:underline">
                        {contest.title}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{contest.date}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{contest.duration}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{contest.participants}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{contest.winner}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Problems
                        </Button>
                        <Button variant="outline" size="sm">
                          Leaderboard
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
