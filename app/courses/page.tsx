import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Course data
const courses = [
  {
    id: 1,
    title: "C Programming Fundamentals",
    category: "Programming",
    level: "Beginner",
    price: "FREE",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400&text=C+Programming",
    description: "Master the fundamentals of C programming language with hands-on projects and exercises.",
    lessons: [
      {
        id: 1,
        title: "Introduction to C",
        duration: "45 mins",
        completed: true,
      },
      {
        id: 2,
        title: "Variables and Data Types",
        duration: "60 mins",
        completed: true,
      },
      {
        id: 3,
        title: "Control Flow",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 4,
        title: "Functions",
        duration: "120 mins",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "C++ Advanced Concepts",
    category: "Programming",
    level: "Intermediate",
    price: "FREE",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400&text=C%2B%2B+Programming",
    description: "Take your C++ skills to the next level with object-oriented programming and STL.",
  },
  // ... (rest of the courses)
]

// Course list page component
export default function CoursesPage({ params }: { params?: { id: string } }) {
  // If we have an ID parameter, show the course details page
  if (params?.id) {
    const course = courses.find(c => c.id.toString() === params.id) || courses[0]
    const completedLessons = course.lessons?.filter((lesson) => lesson.completed).length || 0
    const progress = course.lessons ? (completedLessons / course.lessons.length) * 100 : 0

    const handleEnroll = () => {
      alert("Welcome! All courses are now free to access. You can start learning immediately!")
    }

    return (
      <div className="container py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-2 text-muted-foreground">{course.description}</p>
            {course.lessons && (
              <>
                <div className="mt-4">
                  <Progress value={progress} />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {completedLessons} of {course.lessons.length} lessons completed
                  </p>
                </div>
                <Button className="mt-6 w-full bg-black" onClick={handleEnroll}>
                  Start Learning Free
                </Button>
              </>
            )}
          </div>
          {course.lessons && (
            <div className="grid gap-4">
              {course.lessons.map((lesson) => (
                <Card key={lesson.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {lesson.title}
                    </CardTitle>
                    <Button variant="link" className="h-auto p-0 text-black">
                      Start Free
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Duration: {lesson.duration}
                    </div>
                    {lesson.completed && (
                      <div className="mt-2">
                        <span className="text-sm font-medium text-green-600">
                          ✓ Completed
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Otherwise, show the course list page
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-purple-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Our Courses</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100 md:text-xl">
            Explore our wide range of programming and technology courses designed to help you achieve certification
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
                <option value="web">Web Development</option>
                <option value="security">Cyber Security</option>
                <option value="ai">AI & ML</option>
                <option value="mobile">Mobile Development</option>
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
      <section id="courses-list" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                <div className="relative h-48">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                      {course.category}
                    </span>
                    <span className="text-sm font-medium text-gray-600">{course.rating} ★★★★★</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
                  <p className="mb-4 text-gray-600">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">{course.price}</span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                    >
                      Start Free
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