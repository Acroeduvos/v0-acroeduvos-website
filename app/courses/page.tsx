import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Star, Trophy } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master DSA with 200+ problems from Google, Microsoft, Amazon interviews",
    level: "Beginner to Advanced",
    duration: "12 weeks",
    students: "5.2k",
    rating: 4.8,
    progress: 0,
    problems: 247,
    topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "Greedy", "Backtracking"],
    companies: ["Google", "Microsoft", "Amazon", "Facebook", "Apple"],
    color: "bg-blue-500",
  },
  {
    id: "system-design",
    title: "System Design Mastery",
    description: "Learn to design scalable systems with real-world case studies",
    level: "Intermediate",
    duration: "8 weeks",
    students: "3.1k",
    rating: 4.9,
    progress: 0,
    problems: 89,
    topics: ["Scalability", "Load Balancing", "Databases", "Caching", "Microservices", "Message Queues"],
    companies: ["Netflix", "Uber", "Twitter", "LinkedIn", "Airbnb"],
    color: "bg-green-500",
  },
  {
    id: "web-development",
    title: "Full Stack Web Development",
    description: "Build modern web applications with React, Node.js, and cloud deployment",
    level: "Beginner",
    duration: "16 weeks",
    students: "7.8k",
    rating: 4.7,
    progress: 0,
    problems: 156,
    topics: ["React", "Node.js", "MongoDB", "AWS", "Docker", "GraphQL", "TypeScript"],
    companies: ["Shopify", "Stripe", "Vercel", "Netlify", "GitHub"],
    color: "bg-purple-500",
  },
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    description: "Dive into AI/ML with hands-on projects and real datasets",
    level: "Intermediate",
    duration: "10 weeks",
    students: "2.9k",
    rating: 4.6,
    progress: 0,
    problems: 78,
    topics: ["Python", "TensorFlow", "Neural Networks", "NLP", "Computer Vision", "Deep Learning"],
    companies: ["OpenAI", "Tesla", "NVIDIA", "DeepMind", "Anthropic"],
    color: "bg-orange-500",
  },
  {
    id: "competitive-programming",
    title: "Competitive Programming",
    description: "Master algorithmic thinking with CodeChef and Codeforces style problems",
    level: "Advanced",
    duration: "14 weeks",
    students: "1.8k",
    rating: 4.9,
    progress: 0,
    problems: 312,
    topics: ["Number Theory", "Combinatorics", "Graph Theory", "String Algorithms", "Geometry"],
    companies: ["CodeChef", "Codeforces", "AtCoder", "TopCoder", "HackerRank"],
    color: "bg-red-500",
  },
  {
    id: "database-design",
    title: "Database Design & SQL",
    description: "Master database concepts with real-world schema design",
    level: "Beginner to Intermediate",
    duration: "6 weeks",
    students: "4.3k",
    rating: 4.5,
    progress: 0,
    problems: 134,
    topics: ["SQL", "NoSQL", "Database Design", "Indexing", "Transactions", "Performance Tuning"],
    companies: ["Oracle", "MongoDB", "PostgreSQL", "Redis", "Elasticsearch"],
    color: "bg-cyan-500",
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Master Programming with <span className="text-primary">Expert Courses</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn from industry experts with curated problems from top companies. Each course includes hands-on coding
              practice and real interview questions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className={`h-1 ${course.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{course.level}</Badge>
                        <Badge variant="secondary" className="gap-1">
                          <Trophy className="h-3 w-3" />
                          {course.problems} Problems
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{course.description}</CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Key Topics</div>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.slice(0, 4).map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {course.topics.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{course.topics.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm font-medium">Featured Companies</div>
                    <div className="flex flex-wrap gap-2">
                      {course.companies.slice(0, 3).map((company, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                      {course.companies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.companies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <Link href={`/courses/${course.id}`}>
                    <Button className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start Course
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
