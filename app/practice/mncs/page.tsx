"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"

export default function PracticeMNCsPage({ searchParams }: { searchParams: { page?: string; company?: string } }) {
  const page = Number(searchParams.page || 1)
  const companies = ["Google", "Amazon", "Microsoft", "Meta", "Adobe", "Uber", "Flipkart", "Paytm"]
  const company = searchParams.company || "Google"
  const [searchQuery, setSearchQuery] = useState("")

  const problems = useMemo(() => {
    const all = [
      // Google Interview Questions
      {
        id: 1,
        title: "Design Google Calendar",
        company: "Google",
        slug: "design-google-calendar",
        description: "Design a scalable calendar system with support for events, reminders, and recurring meetings.",
        topics: ["System Design", "Scalability"],
        difficulty: "hard",
      },
      // Amazon Interview Questions
      {
        id: 2,
        title: "Amazon Shopping Cart",
        company: "Amazon",
        slug: "amazon-shopping-cart",
        description: "Design a scalable shopping cart system with real-time inventory management.",
        topics: ["System Design", "Database"],
        difficulty: "medium",
      },
    ]

    // Generate more problems programmatically
    const generateProblems = (baseProblems: typeof all) => {
      const result = [...baseProblems]
      const templates = {
        Google: [
          "Design Google Drive",
          "Implement Search Autocomplete",
          "YouTube Video Recommendation",
          "Gmail Spam Filter",
          "Google Maps Navigation",
          "Chrome Browser Architecture",
          "Google Docs Collaboration",
          "Google Photos Storage",
          "Google Meet Streaming",
          "Google Pay Transaction"
        ],
        Amazon: [
          "Product Recommendation System",
          "Delivery Route Optimization",
          "Prime Video Streaming",
          "Inventory Management",
          "Dynamic Pricing System",
          "AWS Auto Scaling",
          "Amazon S3 Design",
          "Amazon Cart System",
          "Prime Music Player",
          "Alexa Voice Processing"
        ],
        Microsoft: [
          "Teams Video Conferencing",
          "OneDrive File Sync",
          "Azure Load Balancer",
          "Xbox Game Matchmaking",
          "Office365 Collaboration",
          "Windows Update System",
          "Visual Studio IDE",
          "Outlook Email Client",
          "Azure DevOps Pipeline",
          "Microsoft Store"
        ],
        Meta: [
          "News Feed Algorithm",
          "Messenger Chat System",
          "Instagram Story Feature",
          "WhatsApp End-to-End Encryption",
          "Virtual Reality Platform",
          "Facebook Groups",
          "Instagram Reels",
          "Meta Quest Store",
          "Facebook Marketplace",
          "Oculus Guardian System"
        ],
        Adobe: [
          "PDF Document Processing",
          "Image Editing System",
          "Cloud Storage Integration",
          "Creative Suite Plugins",
          "Digital Asset Management",
          "Adobe XD Prototyping",
          "Photoshop Filters",
          "Adobe Font Service",
          "Creative Cloud Sync",
          "Adobe Analytics"
        ],
        Uber: [
          "Ride Matching Algorithm",
          "Surge Pricing System",
          "Driver Location Tracking",
          "Payment Processing",
          "Route Optimization",
          "Uber Eats Delivery",
          "Driver Incentives",
          "Safety Monitoring",
          "Fare Calculation",
          "UberPool Matching"
        ],
        Flipkart: [
          "Product Catalog System",
          "Order Management",
          "Delivery Tracking",
          "Customer Review System",
          "Flash Sale Management",
          "Wishlist Service",
          "Price Comparison",
          "Seller Dashboard",
          "Return Processing",
          "Payment Gateway"
        ],
        Paytm: [
          "Payment Gateway",
          "Wallet System",
          "Transaction Processing",
          "Fraud Detection",
          "QR Code Generation",
          "UPI Integration",
          "Bill Payment System",
          "Rewards Program",
          "KYC Verification",
          "Payment Analytics"
        ],
      }

      let id = 1000
      for (const comp of Object.keys(templates) as Array<keyof typeof templates>) {
        for (let i = 0; i < 60; i++) { // Generates ~480 additional problems
          const template = templates[comp][i % templates[comp].length]
          const difficulty = i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard"
          result.push({
            id: id++,
            title: `${template} ${Math.floor(i / templates[comp].length) + 1}`,
            company: comp,
            slug: template.toLowerCase().replace(/\s+/g, '-') + `-${Math.floor(i / templates[comp].length) + 1}`,
            description: `Design and implement a solution for ${template.toLowerCase()}.`,
            topics: ["System Design", "Algorithms"],
            difficulty,
          })
        }
      }
      return result
    }

    const allProblems = generateProblems(all)
    return allProblems.filter((p) => p.company === company)
  }, [company])

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
          <h1 className="text-2xl font-bold">{company} Interview Questions</h1>
          <div className="space-x-2 text-sm">
            {companies.map((c) => (
              <Link
                key={c}
                href={`/practice/mncs?company=${encodeURIComponent(c)}`}
                className={`rounded border px-3 py-1 ${
                  c === company
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {c}
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
            href={`/practice/mncs/${p.slug}`}
            className="group rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">#{p.id}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      p.difficulty === "easy"
                        ? "bg-green-100 text-green-700"
                        : p.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.difficulty}
                  </span>
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    {p.company}
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
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
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
          href={`/practice/mncs?company=${encodeURIComponent(company)}&page=${Math.max(
            1,
            page - 1
          )}`}
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
          href={`/practice/mncs?company=${encodeURIComponent(company)}&page=${Math.min(
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