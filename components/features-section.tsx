"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, BookOpen, Trophy, Zap, Users, Target } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Courses",
    description: "From basics to advanced topics with structured learning paths",
    badge: "50+ Courses",
  },
  {
    icon: Trophy,
    title: "MNC Interview Prep",
    description: "Real questions from Google, Microsoft, Amazon, and more",
    badge: "500+ Problems",
  },
  {
    icon: Code2,
    title: "Multi-Language Compiler",
    description: "Practice in Python, Java, C++, JavaScript, and more",
    badge: "10+ Languages",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get immediate results and detailed explanations",
    badge: "Real-time",
  },
  {
    icon: Target,
    title: "Skill Assessment",
    description: "Track your progress and identify areas for improvement",
    badge: "AI-Powered",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Learn with peers and get help from mentors",
    badge: "10k+ Members",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need to <span className="text-primary">succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform combines the best of CodeChef, LeetCode, and TutorialsPoint with an integrated development
            environment.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
