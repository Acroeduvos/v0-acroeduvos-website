'use client'

import { useState } from "react"

// Force dynamic rendering
export const dynamic = 'force-dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Book, 
  Code, 
  Users, 
  Settings, 
  Play, 
  Download, 
  Upload,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Info,
  Lightbulb,
  Zap,
  Mail
} from "lucide-react"
import Link from "next/link"

interface GuideSection {
  id: string
  title: string
  description: string
  icon: any
  items: GuideItem[]
}

interface GuideItem {
  title: string
  description: string
  steps?: string[]
  tips?: string[]
  warnings?: string[]
}

export default function HelpPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const guideSections: GuideSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of using AcroEduvos",
      icon: Play,
      items: [
        {
          title: "Creating Your Account",
          description: "Set up your AcroEduvos account to access all features",
          steps: [
            "Click 'Get Started' in the header or visit /register",
            "Fill in your name, email, and password",
            "Click 'Create Account' to register",
            "Check your email for confirmation (if applicable)",
            "Log in with your credentials"
          ],
          tips: [
            "Use a strong password with at least 8 characters",
            "Keep your email address up to date for important notifications"
          ]
        },
        {
          title: "First Login",
          description: "Access your dashboard and explore the platform",
          steps: [
            "Visit /login or click 'Login' in the header",
            "Enter your email and password",
            "Click 'Sign In' to access your account",
            "You'll be redirected to your dashboard",
            "Explore the navigation menu to discover features"
          ],
          tips: [
            "Bookmark your dashboard for quick access",
            "Try the demo account: demo@acroeduvos.in / demo123"
          ]
        }
      ]
    },
    {
      id: "compiler",
      title: "Code Compiler",
      description: "Master the multi-language code compiler",
      icon: Code,
      items: [
        {
          title: "Running Your First Code",
          description: "Learn how to write and execute code in different languages",
          steps: [
            "Visit /compiler or click 'Compiler' in the navigation",
            "Select your programming language from the dropdown",
            "Write your code in the editor (or use the provided examples)",
            "Add input data if your program requires it",
            "Click 'Run Code' to execute your program",
            "View the output in the results panel"
          ],
          tips: [
            "Start with the provided example code to understand the syntax",
            "Use the sample input/output as a reference",
            "Save your code using 'Save to File' for future reference"
          ],
          warnings: [
            "Code execution has time and memory limits",
            "Some system functions may be restricted for security"
          ]
        },
        {
          title: "Supported Languages",
          description: "Overview of all supported programming languages",
          steps: [
            "Python - Great for beginners and data science",
            "JavaScript - Web development and scripting",
            "TypeScript - Type-safe JavaScript development",
            "Java - Enterprise applications and Android development",
            "C++ - High-performance applications and competitive programming",
            "C - Systems programming and embedded development",
            "Go - Modern concurrent programming",
            "Rust - Memory-safe systems programming",
            "PHP - Web development and server-side scripting",
            "Ruby - Web development with Rails framework",
            "C# - Microsoft ecosystem development",
            "Kotlin - Android development and JVM applications"
          ],
          tips: [
            "Each language has specific syntax and features",
            "Check the language examples for proper formatting",
            "Some languages require specific file extensions"
          ]
        },
        {
          title: "File Operations",
          description: "Save and load your code projects",
          steps: [
            "Save Code: Click 'Save to File' to download your code",
            "Load Code: Click 'Load from File' to upload existing code",
            "Supported formats: .py, .js, .ts, .java, .cpp, .c, .go, .rs, .php, .rb, .cs, .kt",
            "File names are automatically generated based on language"
          ],
          tips: [
            "Regularly save your work to avoid losing progress",
            "Use descriptive file names when saving locally",
            "Keep backup copies of important code projects"
          ]
        }
      ]
    },
    {
      id: "courses",
      title: "Courses & Learning",
      description: "Navigate through programming courses and tutorials",
      icon: Book,
      items: [
        {
          title: "Accessing Courses",
          description: "Find and enroll in programming courses",
          steps: [
            "Click 'Courses' in the navigation menu",
            "Browse available programming languages and topics",
            "Select a course that matches your skill level",
            "Click on a course to view its content",
            "Follow the structured learning path",
            "Complete exercises and projects"
          ],
          tips: [
            "Start with beginner courses if you're new to programming",
            "Complete courses in order for the best learning experience",
            "Practice regularly to reinforce concepts"
          ]
        },
        {
          title: "Tracking Progress",
          description: "Monitor your learning journey",
          steps: [
            "Visit your dashboard to see overall progress",
            "Check course completion percentages",
            "View your solved problems count",
            "Monitor your learning streak",
            "Track your ranking and points"
          ],
          tips: [
            "Set learning goals and track your progress",
            "Maintain a consistent learning schedule",
            "Celebrate milestones and achievements"
          ]
        }
      ]
    },
    {
      id: "network",
      title: "Network Access",
      description: "Access AcroEduvos from your local network",
      icon: Settings,
      items: [
        {
          title: "Local Network Access",
          description: "Access AcroEduvos from devices on your local network",
          steps: [
            "Ensure your device is on the same network as the server",
            "Use the IP address instead of localhost",
            "Access via: http://172.16.20.X:3000 (where X is any IP 1-255)",
            "Example: http://172.16.20.100:3000",
            "Login and use normally - all features work the same"
          ],
          tips: [
            "Network access works for all supported IPs in the range",
            "Mobile devices can also access via network IP",
            "Bookmark the network URL for easy access"
          ],
          warnings: [
            "Network access is only available within the specified IP range",
            "Ensure firewall settings allow connections on port 3000"
          ]
        },
        {
          title: "Domain Access",
          description: "Access AcroEduvos using the domain name",
          steps: [
            "Use the domain: http://acroeduvos.in:3000",
            "All features work identically to localhost access",
            "Login with your regular credentials",
            "Access from anywhere the domain is reachable"
          ],
          tips: [
            "Domain access provides consistent URLs",
            "Useful for sharing links with others",
            "Bookmark the domain URL for easy access"
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 rounded-full flex items-center justify-center">
              <Book className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Help & Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete guides and tutorials to help you get the most out of AcroEduvos
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/support">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Get Support
                </CardTitle>
                <CardDescription>
                  Contact our support team or browse FAQs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Need help? Our support team is here to assist you.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/compiler">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Try Compiler
                </CardTitle>
                <CardDescription>
                  Start coding right away with our compiler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Practice coding in 12 different programming languages.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  View Dashboard
                </CardTitle>
                <CardDescription>
                  Track your learning progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monitor your achievements and learning statistics.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Guide Sections */}
        <div className="space-y-12">
          {guideSections.map((section) => {
            const IconComponent = section.icon
            return (
              <div key={section.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <p className="text-muted-foreground">{section.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {section.items.map((item, index) => (
                    <Card key={index} className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {item.steps && (
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <ChevronRight className="w-4 h-4" />
                              Steps
                            </h4>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                              {item.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="pl-2">{step}</li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {item.tips && (
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-yellow-500" />
                              Tips
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {item.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start gap-2">
                                  <Zap className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.warnings && (
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-orange-500" />
                              Important Notes
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {item.warnings.map((warning, warningIndex) => (
                                <li key={warningIndex} className="flex items-start gap-2">
                                  <Info className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                                  {warning}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Code Examples */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Quick Code Examples</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Python Hello World
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard('print("Hello, AcroEduvos!")', 'python-hello')}
                  >
                    {copiedCode === 'python-hello' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <pre>print("Hello, AcroEduvos!")</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  JavaScript Function
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard('function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("AcroEduvos"));', 'js-greet')}
                  >
                    {copiedCode === 'js-greet' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <pre>{`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("AcroEduvos"));`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Still Need Help?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Our support team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/support">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Users className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
                <a href="mailto:support@acroeduvos.in">
                  <Button className="w-full sm:w-auto">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us
                  </Button>
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                support@acroeduvos.in • Response within 24 hours
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
