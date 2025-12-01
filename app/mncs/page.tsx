"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Briefcase, TrendingUp, Code, Target, Activity } from "lucide-react"
import Link from "next/link"

export default function MNCsPage() {
  const [problemCounts, setProblemCounts] = useState({
    faang: 0,
    serviceBased: 0,
    startups: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProblemCounts()
  }, [])

  const fetchProblemCounts = async () => {
    try {
      const response = await fetch('/api/problems')
      const data = await response.json()

      if (data.success) {
        const faangCompanies = ['Google', 'Amazon', 'Facebook', 'Apple', 'Netflix', 'Microsoft']
        const serviceCompanies = ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant']
        const startupCompanies = ['Uber', 'Airbnb', 'Stripe', 'Spotify', 'Slack']

        const faangProblems = data.problems.filter((p: any) =>
          p.companies.some((c: string) => faangCompanies.includes(c))
        )
        const serviceProblems = data.problems.filter((p: any) =>
          p.companies.some((c: string) => serviceCompanies.includes(c))
        )
        const startupProblems = data.problems.filter((p: any) =>
          p.companies.some((c: string) => startupCompanies.includes(c))
        )

        setProblemCounts({
          faang: faangProblems.length,
          serviceBased: serviceProblems.length,
          startups: startupProblems.length
        })
      }
    } catch (error) {
      console.error('Failed to fetch problem counts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const companyCategories = [
    {
      id: 'faang',
      title: 'FAANG',
      icon: Building2,
      color: 'blue',
      description: 'Curated questions from Facebook, Amazon, Apple, Netflix, Google, Microsoft.',
      companies: ['Google', 'Amazon', 'Facebook', 'Apple', 'Netflix', 'Microsoft'],
      count: problemCounts.faang
    },
    {
      id: 'service',
      title: 'Service Based',
      icon: Briefcase,
      color: 'purple',
      description: 'TCS, Infosys, Wipro, Accenture specific preparation tracks.',
      companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant'],
      count: problemCounts.serviceBased
    },
    {
      id: 'startups',
      title: 'Product Startups',
      icon: TrendingUp,
      color: 'green',
      description: 'High-growth startups like Uber, Airbnb, Stripe, and more.',
      companies: ['Uber', 'Airbnb', 'Stripe', 'Spotify', 'Slack'],
      count: problemCounts.startups
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Top MNCs & Startups</h1>
          <p className="text-xl text-muted-foreground">
            Prepare for interviews at leading tech companies with company-specific problem sets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companyCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className={`h-6 w-6 text-${category.color}-600`} />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {category.companies.slice(0, 3).map((company) => (
                    <Badge key={company} variant="outline" className="text-xs">
                      {company}
                    </Badge>
                  ))}
                  {category.companies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.companies.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code className="h-4 w-4" />
                    <span>{isLoading ? '...' : category.count} problems</span>
                  </div>
                  <Badge variant="secondary" className="animate-pulse">
                    <Activity className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                </div>

                <Link href={`/practice?company=${category.companies[0]}`}>
                  <Button className="w-full">
                    <Target className="h-4 w-4 mr-2" />
                    Start Practicing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Company Interview Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">FAANG Focus Areas</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• System Design & Scalability</li>
                    <li>• Advanced Data Structures</li>
                    <li>• Dynamic Programming</li>
                    <li>• Graph Algorithms</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Service-Based Focus</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Core Programming Concepts</li>
                    <li>• Basic Data Structures</li>
                    <li>• SQL & Database Queries</li>
                    <li>• Aptitude & Logical Reasoning</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
