import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = {
    id: params.id,
    title: "C Programming Fundamentals",
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
  }

  const completedLessons = course.lessons.filter((lesson) => lesson.completed).length
  const progress = (completedLessons / course.lessons.length) * 100

  const handleEnroll = () => {
    alert("Welcome! All courses are now free to access. You can start learning immediately!")
  }

  return (
    <div className="container py-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-2 text-muted-foreground">{course.description}</p>
          <div className="mt-4">
            <Progress value={progress} />
            <p className="mt-2 text-sm text-muted-foreground">
              {completedLessons} of {course.lessons.length} lessons completed
            </p>
          </div>
          <Button className="mt-6 w-full bg-black" onClick={handleEnroll}>
            Start Learning Free
          </Button>
        </div>
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
      </div>
    </div>
  )
}
