"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function PracticePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const sections = [
    {
      href: "/practice/difficulty",
      title: "By Difficulty Level",
      desc: "Problems categorized by difficulty - Easy, Medium, and Hard",
      stats: {
        total: 500,
        categories: [
          { name: "Easy", count: 200, color: "bg-green-100 text-green-700" },
          { name: "Medium", count: 200, color: "bg-yellow-100 text-yellow-700" },
          { name: "Hard", count: 100, color: "bg-red-100 text-red-700" },
        ],
      },
    },
    {
      href: "/practice/mncs",
      title: "MNC Interview Questions",
      desc: "Real interview questions from top tech companies",
      stats: {
        total: 500,
        companies: [
          { name: "Google", count: 100 },
          { name: "Microsoft", count: 100 },
          { name: "Amazon", count: 100 },
          { name: "Meta", count: 100 },
          { name: "Others", count: 100 },
        ],
      },
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-gradient-to-b from-purple-700 to-purple-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Practice Problems</h1>
          <p className="mx-auto mt-4 max-w-2xl text-purple-100">
            Sharpen your skills with 1000+ curated problems from real interviews and coding challenges.
          </p>
          <div className="mx-auto mt-8 max-w-lg">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search problems by name, topic, or company..."
                className="w-full rounded-full bg-white/10 px-6 py-3 text-white placeholder-purple-200 backdrop-blur-sm focus:bg-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white px-6 text-purple-700 hover:bg-purple-50"
                size="sm"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-purple-600">{section.title}</h3>
                  <p className="mt-2 text-gray-600">{section.desc}</p>
                </div>

                <div className="mt-6 rounded-lg bg-gray-50 p-4">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500">Total Problems:</span>
                    <span className="ml-2 text-lg font-bold text-purple-600">{section.stats.total}</span>
                  </div>

                  <div className="grid gap-2">
                    {section.stats.categories ? (
                      section.stats.categories.map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between">
                          <span className={`rounded-full px-2 py-1 text-sm font-medium ${cat.color}`}>
                            {cat.name}
                          </span>
                          <span className="text-sm text-gray-500">{cat.count} problems</span>
                        </div>
                      ))
                    ) : (
                      section.stats.companies?.map((company) => (
                        <div key={company.name} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{company.name}</span>
                          <span className="text-sm text-gray-500">{company.count} problems</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="absolute bottom-6 right-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-transform group-hover:scale-110">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )