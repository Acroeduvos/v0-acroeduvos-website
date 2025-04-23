import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-purple-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Our Courses</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100 md:text-xl">
            Explore our wide range of courses designed to help you achieve your goals
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex w-full flex-wrap gap-4 md:w-auto">
              <select className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                <option value="">All Categories</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
              </select>

              <select className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <select className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=Course+${index + 1}`}
                    alt={`Course ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                      {index % 4 === 0
                        ? "Programming"
                        : index % 4 === 1
                          ? "Design"
                          : index % 4 === 2
                            ? "Business"
                            : "Marketing"}
                    </span>
                    <span className="text-sm font-medium text-gray-600">4.8 ★★★★★</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Course Title {index + 1}</h3>
                  <p className="mb-4 text-gray-600">A comprehensive course designed to help you master the subject.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">$49.99</span>
                    <Link
                      href={`/courses/${index + 1}`}
                      className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white">1</button>
              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                2
              </button>
              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                10
              </button>
              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}
