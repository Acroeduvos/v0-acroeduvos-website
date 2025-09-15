import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

export default function CoursesPage() {
  // Define our programming courses
  const courses = [
    {
      id: 1,
      title: "C Programming Fundamentals",
      category: "Programming",
      level: "Beginner",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
      description: "Master the fundamentals of C programming language with hands-on projects and exercises.",
    },
    {
      id: 2,
      title: "C++ Advanced Concepts",
      category: "Programming",
      level: "Intermediate",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop",
      description: "Take your C++ skills to the next level with object-oriented programming and STL.",
    },
    {
      id: 3,
      title: "Java Development",
      category: "Programming",
      level: "Beginner",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1526379095098-e40fd0b8f26e?w=400&h=200&fit=crop",
      description: "Learn Java programming from scratch and build cross-platform applications.",
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      category: "Web",
      level: "Beginner",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      description: "Comprehensive course covering HTML, CSS, JavaScript, and modern frameworks.",
    },
    {
      id: 5,
      title: "Cyber Security Essentials",
      category: "Security",
      level: "Intermediate",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
      description: "Learn essential cybersecurity concepts, tools, and best practices.",
    },
    {
      id: 6,
      title: "Mobile App Development",
      category: "Development",
      level: "Intermediate",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
      description: "Build native mobile applications for iOS and Android platforms.",
    },
    {
      id: 7,
      title: "AI & Machine Learning",
      category: "AI",
      level: "Advanced",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
      description: "Dive into artificial intelligence and machine learning algorithms and applications.",
    },
    {
      id: 8,
      title: "Python for Data Science",
      category: "Data Science",
      level: "Intermediate",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      description: "Learn Python programming for data analysis, visualization, and machine learning.",
    },
    {
      id: 9,
      title: "Ethical Hacking & Penetration Testing",
      category: "Security",
      level: "Advanced",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
      description: "Master ethical hacking techniques and penetration testing methodologies.",
    },
    {
      id: 10,
      title: "Full Stack Development",
      category: "Web",
      level: "Intermediate",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      description: "Complete full-stack development with frontend, backend, and database technologies.",
    },
    {
      id: 11,
      title: "Software Testing & QA",
      category: "Testing",
      level: "Intermediate",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop",
      description: "Learn comprehensive software testing strategies and quality assurance practices.",
    },
    {
      id: 12,
      title: "Red Hat Linux Administration",
      category: "System Administration",
      level: "Intermediate",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop",
      description: "Master Red Hat Linux system administration and enterprise solutions.",
    },
    {
      id: 13,
      title: "Bug Bounty Hunting",
      category: "Security",
      level: "Advanced",
      price: "FREE",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
      description: "Learn bug bounty hunting techniques and vulnerability discovery methods.",
    },
  ]

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
                <option value="testing">Testing & QA</option>
                <option value="system">System Administration</option>
                <option value="data">Data Science</option>
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
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      {course.level}
                    </span>
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
