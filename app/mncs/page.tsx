"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Briefcase, TrendingUp } from "lucide-react"

export default function MNCsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Top MNCs & Startups</h1>
          <p className="text-xl text-muted-foreground">
            Prepare for interviews at leading tech companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                FAANG
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Curated questions from Facebook, Amazon, Apple, Netflix, Google.
              </p>
              <div className="text-sm font-medium text-blue-600">Coming Soon</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-purple-600" />
                Service Based
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                TCS, Infosys, Wipro, Accenture specific preparation tracks.
              </p>
              <div className="text-sm font-medium text-purple-600">Coming Soon</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                Product Startups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                High-growth startups like Uber, Airbnb, Stripe, and more.
              </p>
              <div className="text-sm font-medium text-green-600">Coming Soon</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
