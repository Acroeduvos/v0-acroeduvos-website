"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Code, Trophy, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            <Trophy className="mr-2 h-4 w-4" />
            Master Programming & Crack MNC Interviews
          </Badge>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance">
              Learn to Code with <span className="text-primary">Real Interview</span> Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Practice with curated problems from CodeChef, LeetCode, and real MNC interviews. Code in multiple
              languages with our integrated compiler.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/courses">Start Learning Free</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
              <a href="/compiler">
                <Play className="mr-2 h-5 w-5" />
                Try Compiler
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>10+ Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>500+ Problems</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>10k+ Students</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
