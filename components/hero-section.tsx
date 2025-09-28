"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Code, Trophy, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center space-y-8 min-h-[60vh]">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <div className="text-4xl font-bold text-primary">A</div>
            </div>
            <div className="text-2xl font-bold text-white/90 tracking-wider">ACROEDUVOS</div>
          </div>

          <Badge variant="secondary" className="px-4 py-2">
            <Trophy className="mr-2 h-4 w-4" />
            Master Programming & Crack MNC Interviews
          </Badge>

          <div className="space-y-6 max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance leading-tight">
              Learn to Code with <span className="text-primary">Real Interview</span> Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              learn code create certify
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>15+ Languages</span>
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
