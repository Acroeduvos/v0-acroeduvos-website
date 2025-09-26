"use client"

import Link from "next/link"
import { useMemo } from "react"

export default function PracticeMNCsPage({ searchParams }: { searchParams: { page?: string; company?: string } }) {
  const page = Number(searchParams.page || 1)
  const companies = ["Google", "Amazon", "Microsoft", "Meta", "Adobe", "Uber", "Flipkart", "Paytm"]
  const company = searchParams.company || "Google"

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
      {
        id: 2,
        title: "LRU Cache Implementation",
        company: "Google",
        slug: "lru-cache",
        description: "Implement a Least Recently Used (LRU) cache with O(1) operations.",
        topics: ["Data Structures", "Hash Table"],
        difficulty: "medium",
      },
      // Amazon Interview Questions
      {
        id: 101,
        title: "Design Amazon Shopping Cart",
        company: "Amazon",
        slug: "design-shopping-cart",
        description: "Design a scalable shopping cart system with inventory management.",
        topics: ["System Design", "Database"],
        difficulty: "hard",
      },
      {
        id: 102,
        title: "Warehouse Path Optimization",
        company: "Amazon",
        slug: "warehouse-path",
        description: "Find the optimal path for robots in a warehouse to collect items.",
        topics: ["Graphs", "Dynamic Programming"],
        difficulty: "hard",
      },
      // Microsoft Interview Questions
      {
        id: 201,
        title: "Design Word Auto-Complete",
        company: "Microsoft",
        slug: "word-autocomplete",
        description: "Implement an efficient auto-complete system for word suggestions.",
        topics: ["Trie", "System Design"],
        difficulty: "medium",
      },
      {
        id: 202,
        title: "Collaborative Document Editor",
        company: "Microsoft",
        slug: "collaborative-editor",
        description: "Design a system for real-time collaborative document editing.",
        topics: ["System Design", "Concurrency"],
        difficulty: "hard",
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
        ],
        Amazon: [
          "Product Recommendation System",
          "Delivery Route Optimization",
          "Prime Video Streaming",
          "Inventory Management",
          "Dynamic Pricing System",
        ],
        Microsoft: [
          "Teams Video Conferencing",
          "OneDrive File Sync",
          "Azure Load Balancer",
          "Xbox Game Matchmaking",
          "Office365 Collaboration",
        ],
        Meta: [
          "News Feed Algorithm",
          "Messenger Chat System",
          "Instagram Story Feature",
          "WhatsApp End-to-End Encryption",
          "Virtual Reality Platform",
        ],
        Adobe: [
          "PDF Document Processing",
          "Image Editing System",
          "Cloud Storage Integration",
          "Creative Suite Plugins",
          "Digital Asset Management",
        ],
        Uber: [
          "Ride Matching Algorithm",
          "Surge Pricing System",
          "Driver Location Tracking",
          "Payment Processing",
          "Route Optimization",
        ],
        Flipkart: [
          "Product Catalog System",
          "Order Management",
          "Delivery Tracking",
          "Customer Review System",
          "Flash Sale Management",
        ],
        Paytm: [
          "Payment Gateway",
          "Wallet System",
          "Transaction Processing",
          "Fraud Detection",
          "QR Code Generation",
        ],
      }

      let id = 1000
      for (const comp of Object.keys(templates) as Array<keyof typeof templates>) {
        for (let i = 0; i < 60; i++) {
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

  const pageSize = 25
  const totalPages = Math.ceil(problems.length / pageSize)
  const start = (page - 1) * pageSize
  const pageItems = problems.slice(start, start + pageSize)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{company} Problems</h1>
        <div className="space-x-2 text-sm">
          {companies.map((c) => (
            <Link key={c} href={`/practice/mncs?company=${encodeURIComponent(c)}`} className={`rounded border px-3 py-1 ${c === company ? "bg-black text-white" : "bg-white"}`}>
              {c}
            </Link>
          ))}
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
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    p.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    p.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {p.difficulty}
                  </span>
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    {p.company}
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-bold group-hover:text-purple-600">{p.title}</h3>
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
        <Link href={`/practice/mncs?company=${encodeURIComponent(company)}&page=${Math.max(1, page - 1)}`} className="rounded border px-3 py-2 text-sm">Previous</Link>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <Link href={`/practice/mncs?company=${encodeURIComponent(company)}&page=${Math.min(totalPages, page + 1)}`} className="rounded border px-3 py-2 text-sm">Next</Link>
      </div>
    </div>
  )
}
