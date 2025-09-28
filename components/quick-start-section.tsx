"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, BookOpen, Trophy, Zap } from "lucide-react"

const quickStartOptions = [
  {
    title: "Practice Problems",
    description: "Jump straight into coding with 500+ interview questions",
    icon: Code,
    href: "/practice",
    badge: "500+ Problems",
    color: "bg-blue-500",
  },
  {
    title: "Browse Courses",
    description: "Explore structured learning paths for all skill levels",
    icon: BookOpen,
    href: "/courses",
    badge: "20+ Courses",
    color: "bg-green-500",
  },
  {
    title: "Try Compiler",
    description: "Code in 10+ languages with our online compiler",
    icon: Trophy,
    href: "/compiler",
    badge: "10+ Languages",
    color: "bg-purple-500",
  },
]

export function QuickStartSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-primary">Quick Start</span> Your Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No registration, no barriers. Choose your path and start learning immediately.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {quickStartOptions.map((option, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className={`h-2 ${option.color}`} />
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  <option.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <CardDescription className="text-base">{option.description}</CardDescription>
                <Badge variant="secondary" className="mx-auto mt-2">
                  {option.badge}
                </Badge>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <a href={option.href}>
                    <Zap className="mr-2 h-4 w-4" />
                    Start Now - Free
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">100% Free • No Registration • Instant Access</span>
          </div>
        </div>
      </div>
    </section>
  )
}
