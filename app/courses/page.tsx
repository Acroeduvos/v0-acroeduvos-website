import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CoursesPage() {
  // Define our programming courses
  const programmingCourses = [
    {
      id: 1,
      title: "C Programming Fundamentals",
      category: "Programming",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=C+Programming",
      description: "Master the fundamentals of C programming language with hands-on projects and exercises.",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "C Programming Advanced",
      category: "Programming",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=C+Programming+Advanced",
      description: "Take your C programming skills to the next level with advanced concepts and techniques.",
      difficulty: "Hard",
    },
    {
      id: 3,
      title: "C++ Fundamentals",
      category: "Programming",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=C%2B%2B+Programming",
      description: "Learn the basics of C++ programming with object-oriented concepts.",
      difficulty: "Easy",
    },
    {
      id: 4,
      title: "C++ Advanced Concepts",
      category: "Programming",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=C%2B%2B+Advanced",
      description: "Master advanced C++ concepts including STL, templates, and modern C++ features.",
      difficulty: "Hard",
    },
    {
      id: 5,
      title: "Java Development Basics",
      category: "Programming",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=Java+Development",
      description: "Learn Java programming from scratch and build cross-platform applications.",
      difficulty: "Easy",
    },
    {
      id: 6,
      title: "Advanced Java Programming",
      category: "Programming",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Advanced+Java",
      description: "Master advanced Java concepts including multithreading, collections, and design patterns.",
      difficulty: "Hard",
    },
    {
      id: 7,
      title: "Web Development Fundamentals",
      category: "Web",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=Web+Development",
      description: "Learn the basics of HTML, CSS, and JavaScript for web development.",
      difficulty: "Easy",
    },
    {
      id: 8,
      title: "Advanced Web Development",
      category: "Web",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Advanced+Web",
      description: "Master modern frameworks and advanced web development techniques.",
      difficulty: "Hard",
    },
    {
      id: 9,
      title: "Cyber Security Basics",
      category: "Security",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=Cyber+Security",
      description: "Learn essential cybersecurity concepts and best practices.",
      difficulty: "Medium",
    },
    {
      id: 10,
      title: "Advanced Cyber Security",
      category: "Security",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Advanced+Security",
      description: "Master advanced cybersecurity techniques and penetration testing.",
      difficulty: "Hard",
    },
    {
      id: 11,
      title: "Mobile App Development Basics",
      category: "Development",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=App+Development",
      description: "Learn the fundamentals of mobile app development for iOS and Android.",
      difficulty: "Medium",
    },
    {
      id: 12,
      title: "Advanced Mobile App Development",
      category: "Development",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Advanced+App+Dev",
      description: "Master advanced mobile app development techniques and frameworks.",
      difficulty: "Hard",
    },
    {
      id: 13,
      title: "AI & Machine Learning Fundamentals",
      category: "AI",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=AI+Fundamentals",
      description: "Introduction to artificial intelligence and machine learning concepts.",
      difficulty: "Medium",
    },
    {
      id: 14,
      title: "Advanced AI & Machine Learning",
      category: "AI",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Advanced+AI",
      description: "Master advanced AI algorithms and deep learning techniques.",
      difficulty: "Hard",
    },
  ]

  // Define problem-solving courses
  const problemSolvingCourses = [
    {
      id: 101,
      title: "Data Structures Basics",
      category: "Algorithms",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=Data+Structures",
      description: "Learn fundamental data structures for coding interviews and competitions.",
      difficulty: "Easy",
    },
    {
      id: 102,
      title: "Advanced Data Structures",
      category: "Algorithms",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Advanced+DS",
      description: "Master complex data structures for advanced problem solving.",
      difficulty: "Hard",
    },
    {
      id: 103,
      title: "Basic Algorithms",
      category: "Algorithms",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=Basic+Algorithms",
      description: "Learn fundamental algorithms and problem-solving techniques.",
      difficulty: "Easy",
    },
    {
      id: 104,
      title: "Competitive Programming",
      category: "Algorithms",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Competitive+Programming",
      description: "Master advanced techniques for solving complex algorithmic problems in coding competitions.",
      difficulty: "Hard",
    },
    {
      id: 105,
      title: "Problem Solving with Python",
      category: "Programming",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=Python+Problem+Solving",
      description: "Develop problem-solving skills using Python programming language.",
      difficulty: "Medium",
    },
    {
      id: 106,
      title: "Dynamic Programming Basics",
      category: "Algorithms",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=DP+Basics",
      description: "Learn the fundamentals of dynamic programming for solving optimization problems.",
      difficulty: "Medium",
    },
    {
      id: 107,
      title: "Dynamic Programming Mastery",
      category: "Algorithms",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Dynamic+Programming",
      description: "Master the art of dynamic programming for solving complex optimization problems.",
      difficulty: "Hard",
    },
    {
      id: 108,
      title: "Graph Algorithms Basics",
      category: "Algorithms",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=Graph+Basics",
      description: "Learn fundamental graph algorithms and their applications.",
      difficulty: "Medium",
    },
    {
      id: 109,
      title: "Advanced Graph Algorithms",
      category: "Algorithms",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Graph+Algorithms",
      description: "Master complex graph algorithms for solving advanced problems.",
      difficulty: "Hard",
    },
    {
      id: 110,
      title: "Interview Preparation Basics",
      category: "Career",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=Interview+Basics",
      description: "Learn fundamental concepts for technical interviews.",
      difficulty: "Easy",
    },
    {
      id: 111,
      title: "Advanced Interview Preparation",
      category: "Career",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Interview+Prep",
      description: "Master advanced techniques for technical interviews at top tech companies.",
      difficulty: "Hard",
    },
    {
      id: 112,
      title: "System Design Fundamentals",
      category: "Engineering",
      level: "Basic",
      image: "/placeholder.svg?height=200&width=400&text=System+Design+Basics",
      description: "Learn the basics of designing scalable systems.",
      difficulty: "Medium",
    },
    {
      id: 113,
      title: "Advanced System Design",
      category: "Engineering",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=System+Design",
      description: "Master complex system design principles for large-scale applications.",
      difficulty: "Hard",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-purple-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Our Free Courses</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100 md:text-xl">
            Explore our wide range of free programming and problem-solving courses designed to help you achieve
            certification
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
                <option value="algorithms">Algorithms</option>
              </select>

              <select className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                <option value="">All Levels</option>
                <option value="basic">Basic</option>
                <option value="advanced">Advanced</option>
              </select>

              <select className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="programming" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2">
              <TabsTrigger value="programming">Programming Courses</TabsTrigger>
              <TabsTrigger value="problem-solving">Problem Solving</TabsTrigger>
            </TabsList>

            <TabsContent value="programming">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {programmingCourses.map((course, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="relative h-48">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                          {course.category}
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                          {course.level}
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
                      <p className="mb-4 text-gray-600">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            course.difficulty === "Easy"
                              ? "bg-green-100 text-green-800"
                              : course.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {course.difficulty}
                        </span>
                        <Link
                          href={`/courses/${course.id}`}
                          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                        >
                          Start Learning
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="problem-solving">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {problemSolvingCourses.map((course, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="relative h-48">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                          {course.category}
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                          {course.level}
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
                      <p className="mb-4 text-gray-600">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            course.difficulty === "Easy"
                              ? "bg-green-100 text-green-800"
                              : course.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {course.difficulty}
                        </span>
                        <Link
                          href={`/courses/${course.id}`}
                          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                        >
                          Start Learning
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

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
