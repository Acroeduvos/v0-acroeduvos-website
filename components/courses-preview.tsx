"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Star } from "lucide-react"

const courses = [
  {
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals with hands-on coding practice",
    level: "Beginner to Advanced",
    duration: "12 weeks",
    students: "5.2k",
    rating: 4.8,
    progress: 0,
    topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "DP"],
    color: "bg-blue-500",
  },
  {
    title: "System Design Mastery",
    description: "Learn to design scalable systems like the pros",
    level: "Intermediate",
    duration: "8 weeks",
    students: "3.1k",
    rating: 4.9,
    progress: 0,
    topics: ["Scalability", "Databases", "Caching", "Load Balancing"],
    color: "bg-green-500",
  },
  {
    title: "Full Stack Web Development",
    description: "Build modern web applications from scratch",
    level: "Beginner",
    duration: "16 weeks",
    students: "7.8k",
    rating: 4.7,
    topics: ["React", "Node.js", "MongoDB", "AWS"],
    color: "bg-purple-500",
  },
  {
    title: "Machine Learning Fundamentals",
    description: "Dive into AI and ML with practical projects",
    level: "Intermediate",
    duration: "10 weeks",
    students: "2.9k",
    rating: 4.6,
    topics: ["Python", "TensorFlow", "Neural Networks", "NLP"],
    color: "bg-orange-500",
  },
]

export function CoursesPreview() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Popular <span className="text-primary">Courses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start your journey with our most loved courses, designed by industry experts
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {courses.map((course, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-2 ${course.color}`} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge variant="outline">{course.level}</Badge>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription className="text-base">{course.description}</CardDescription>
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

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <Button className="w-full" asChild>
                  <a href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Learning Free
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="/courses">Browse All Free Courses</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
