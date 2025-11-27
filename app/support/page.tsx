'use client'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  Phone, 
  Clock, 
  CheckCircle, 
  Send,
  Loader2,
  Search,
  ChevronDown,
  ChevronUp,
  Book,
  Code,
  Users,
  Settings,
  CreditCard,
  Shield,
  Zap
} from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

interface SupportForm {
  name: string
  email: string
  subject: string
  message: string
  category: string
}

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const [formData, setFormData] = useState<SupportForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general"
  })

  const categories = [
    { value: "all", label: "All Categories", icon: Book },
    { value: "account", label: "Account & Login", icon: Users },
    { value: "compiler", label: "Code Compiler", icon: Code },
    { value: "courses", label: "Courses & Learning", icon: Book },
    { value: "billing", label: "Billing & Payments", icon: CreditCard },
    { value: "technical", label: "Technical Issues", icon: Settings },
    { value: "security", label: "Security & Privacy", icon: Shield },
    { value: "performance", label: "Performance", icon: Zap }
  ]

  const faqData: FAQItem[] = [
    {
      id: "1",
      question: "How do I create an account on AcroEduvos?",
      answer: "To create an account, click on 'Get Started' in the header or visit the registration page. Fill in your details including name, email, and password. You'll receive a confirmation and can start using the platform immediately.",
      category: "account"
    },
    {
      id: "2",
      question: "How does the code compiler work?",
      answer: "Our compiler supports 12 programming languages including Python, JavaScript, Java, C++, C, Go, Rust, TypeScript, PHP, Ruby, C#, and Kotlin. Simply select your language, write your code, provide input if needed, and click 'Run Code' to see the output instantly.",
      category: "compiler"
    },
    {
      id: "3",
      question: "What programming languages are supported?",
      answer: "We support Python, JavaScript, TypeScript, Java, C++, C, Go, Rust, PHP, Ruby, C#, and Kotlin. Each language comes with syntax highlighting, example code, and sample input/output.",
      category: "compiler"
    },
    {
      id: "4",
      question: "How do I access my dashboard?",
      answer: "After logging in, you can access your dashboard by clicking 'Dashboard' in the navigation menu or visiting /dashboard directly. Your dashboard shows your learning progress, statistics, and recent activity.",
      category: "account"
    },
    {
      id: "5",
      question: "Can I save my code projects?",
      answer: "Yes! You can save your code to your local machine using the 'Save to File' button in the compiler. The system also maintains your session data during your browser session.",
      category: "compiler"
    },
    {
      id: "6",
      question: "How do I reset my password?",
      answer: "Currently, password reset functionality is being developed. For now, please contact our support team at support@acroeduvos.in for password assistance.",
      category: "account"
    },
    {
      id: "7",
      question: "Is my code execution secure?",
      answer: "Yes, we prioritize security. Code execution happens in isolated environments with time and memory limits. We don't store your code permanently and follow industry best practices for secure code execution.",
      category: "security"
    },
    {
      id: "8",
      question: "How do I contact support?",
      answer: "You can reach our support team at support@acroeduvos.in or use the contact form on this page. We typically respond within 24 hours during business days.",
      category: "general"
    },
    {
      id: "9",
      question: "What are the system requirements?",
      answer: "AcroEduvos works on any modern web browser including Chrome, Firefox, Safari, and Edge. No additional software installation is required - everything runs in your browser.",
      category: "technical"
    },
    {
      id: "10",
      question: "How do I report a bug?",
      answer: "To report a bug, please use our contact form with category 'Technical Issues' or email support@acroeduvos.in. Include details about what happened, what you expected, and steps to reproduce the issue.",
      category: "technical"
    },
    {
      id: "11",
      question: "Can I use AcroEduvos on mobile devices?",
      answer: "Yes! AcroEduvos is fully responsive and works on mobile devices, tablets, and desktops. The interface adapts to your screen size for the best experience.",
      category: "technical"
    },
    {
      id: "12",
      question: "How do I access the network features?",
      answer: "AcroEduvos supports network access for IP range 172.16.20.0 to 172.16.20.255. You can access the platform from any device in this range using the IP address instead of localhost.",
      category: "technical"
    }
  ]

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/support/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          category: "general"
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof SupportForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 rounded-full flex items-center justify-center">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Support Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get help with AcroEduvos. Find answers to common questions or contact our support team.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Email Support</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Get help via email
              </p>
              <a 
                href="mailto:support@acroeduvos.in" 
                className="text-blue-600 hover:underline font-medium"
              >
                support@acroeduvos.in
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-lg">Response Time</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Typical response time
              </p>
              <p className="font-medium">Within 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Live Chat</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Coming soon
              </p>
              <Badge variant="secondary">In Development</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              <Badge variant="secondary">{filteredFAQs.length} questions</Badge>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => {
                const isExpanded = expandedItems.includes(faq.id)
                const IconComponent = categories.find(cat => cat.value === faq.category)?.icon || Book
                
                return (
                  <Card key={faq.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader 
                      className="pb-3"
                      onClick={() => toggleExpanded(faq.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-lg">{faq.question}</CardTitle>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {categories.find(cat => cat.value === faq.category)?.label}
                      </Badge>
                    </CardHeader>
                    {isExpanded && (
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>

            {filteredFAQs.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No FAQs found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or category filter.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Contact Support
                </CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Send us a message.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      disabled={isSubmitting}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="account">Account & Login</option>
                      <option value="compiler">Code Compiler</option>
                      <option value="courses">Courses & Learning</option>
                      <option value="technical">Technical Issues</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="security">Security & Privacy</option>
                      <option value="performance">Performance</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief description of your issue"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide detailed information about your question or issue..."
                      rows={5}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Your message has been sent successfully! We'll get back to you within 24 hours.
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === 'error' && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        There was an error sending your message. Please try again or email us directly at support@acroeduvos.in
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-2">Direct Email</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    You can also email us directly:
                  </p>
                  <a 
                    href="mailto:support@acroeduvos.in" 
                    className="text-blue-600 hover:underline font-medium text-sm"
                  >
                    support@acroeduvos.in
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
