"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Copy } from "lucide-react"

const codeExample = `def two_sum(nums, target):
    """
    Find two numbers that add up to target
    Time: O(n), Space: O(n)
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test case
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Indices: {result}")  # Output: [0, 1]`

const languages = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "typescript", label: "TypeScript" },
]

export function CompilerPreview() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Code in <span className="text-primary">Any Language</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practice with our integrated compiler supporting 15+ programming languages
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-4">Two Sum Problem</span>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="python">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="code-editor p-6 text-sm font-mono">
                <pre className="text-green-400 whitespace-pre-wrap">{codeExample}</pre>
              </div>

              <div className="border-t bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button className="gap-2">
                      <Play className="h-4 w-4" />
                      Run Code
                    </Button>
                    <Badge variant="secondary">Python 3.9</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Runtime: 0.045s</span>
                    <span>•</span>
                    <span>Memory: 14.2MB</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-background rounded border">
                  <div className="text-sm font-medium mb-2">Output:</div>
                  <div className="font-mono text-sm text-green-600">Indices: [0, 1]</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline">
              Try the Compiler
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
