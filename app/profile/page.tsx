"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<{
    username: string
    name: string
    profileImage?: string
    bio?: string
  } | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }

    // Load user data
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) {
    return <div className="container py-10 text-center">Loading profile...</div>
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
          <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-200">
            {user.profileImage ? (
              <Image src={user.profileImage || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="mt-2">{user.bio || "No bio provided"}</p>

            <div className="mt-4">
              <Link href="/settings/profile">
                <Button variant="outline">Edit Profile</Button>
              </Link>
            </div>
          </div>
        </div>

        <Tabs defaultValue="submissions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="mt-6">
            <Card>
              <CardHeader className="border-b pb-3">
                <h3 className="text-lg font-medium">Recent Submissions</h3>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-center py-10 text-muted-foreground">
                  No submissions yet. Start solving problems to see your submissions here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="mt-6">
            <Card>
              <CardHeader className="border-b pb-3">
                <h3 className="text-lg font-medium">Your Certificates</h3>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-center py-10 text-muted-foreground">
                  No certificates earned yet. Complete courses to earn certificates.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader className="border-b pb-3">
                <h3 className="text-lg font-medium">Recent Activity</h3>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-center py-10 text-muted-foreground">
                  No recent activity. Start interacting with the platform to see your activity here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
