"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Code, 
  Brain, 
  Clock, 
  Star, 
  BookOpen, 
  PlayCircle,
  CheckCircle2,
  Target,
  TrendingUp,
  Award,
  Calendar
} from "lucide-react"

export default function InterviewPrepPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const preparationTracks = [
    {
      id: "software-engineer",
      title: "Software Engineer",
      description: "Full-stack development and system design",
      duration: "8 weeks",
      difficulty: "Intermediate",
      progress: 65,
      modules: 12,
      color: "bg-blue-50 border-blue-200"
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      description: "Machine learning and statistical analysis",
      duration: "10 weeks",
      difficulty: "Advanced",
      progress: 45,
      modules: 15,
      color: "bg-green-50 border-green-200"
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Specialist",
      description: "Security analysis and penetration testing",
      duration: "12 weeks",
      difficulty: "Advanced",
      progress: 30,
      modules: 18,
      color: "bg-red-50 border-red-200"
    },
    {
      id: "product-manager",
      title: "Product Manager",
      description: "Product strategy and stakeholder management",
      duration: "6 weeks",
      difficulty: "Intermediate",
      progress: 80,
      modules: 10,
      color: "bg-purple-50 border-purple-200"
    }
  ]

  const interviewTypes = [
    {
      id: "technical",
      title: "Technical Interviews",
      description: "Coding challenges, system design, and technical concepts",
      icon: <Code className="h-6 w-6" />,
      questions: 150,
      practiceTime: "20 hours",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: "behavioral",
      title: "Behavioral Interviews",
      description: "STAR method, leadership, and teamwork scenarios",
      icon: <Users className="h-6 w-6" />,
      questions: 80,
      practiceTime: "15 hours",
      color: "bg-green-100 text-green-800"
    },
    {
      id: "case-study",
      title: "Case Study Interviews",
      description: "Problem-solving and analytical thinking",
      icon: <Brain className="h-6 w-6" />,
      questions: 45,
      practiceTime: "12 hours",
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: "system-design",
      title: "System Design",
      description: "Large-scale system architecture and design",
      icon: <Target className="h-6 w-6" />,
      questions: 25,
      practiceTime: "18 hours",
      color: "bg-orange-100 text-orange-800"
    }
  ]

  const mockInterviews = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      type: "Technical",
      duration: "45 min",
      difficulty: "Hard",
      status: "completed",
      score: 85,
      date: "2024-01-15"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Product Manager",
      type: "Behavioral",
      duration: "30 min",
      difficulty: "Medium",
      status: "scheduled",
      score: null,
      date: "2024-01-20"
    },
    {
      id: 3,
      company: "Amazon",
      position: "Data Scientist",
      type: "Case Study",
      duration: "60 min",
      difficulty: "Hard",
      status: "in-progress",
      score: null,
      date: "2024-01-18"
    }
  ]

  const resources = [
    {
      title: "Cracking the Coding Interview",
      type: "Book",
      description: "Comprehensive guide to technical interviews",
      rating: 4.8,
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      title: "System Design Interview",
      type: "Book",
      description: "Master system design concepts",
      rating: 4.7,
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      title: "LeetCode Premium",
      type: "Platform",
      description: "Practice coding problems",
      rating: 4.6,
      icon: <Code className="h-5 w-5" />
    },
    {
      title: "Pramp Mock Interviews",
      type: "Platform",
      description: "Practice with real interviewers",
      rating: 4.5,
      icon: <Users className="h-5 w-5" />
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Preparation</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Comprehensive interview preparation for tech roles. Practice coding, system design, 
          behavioral questions, and more with our structured learning paths.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tracks">Learning Tracks</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-600">Learning Tracks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Code className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">300+</p>
                    <p className="text-sm text-gray-600">Practice Questions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">50+</p>
                    <p className="text-sm text-gray-600">Mock Interviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Award className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interview Types */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Interview Types</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {interviewTypes.map(type => (
                <Card key={type.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg ${type.color}`}>
                        {type.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{type.title}</h3>
                        <p className="text-sm text-gray-600">{type.questions} questions</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{type.practiceTime}</span>
                      <Button size="sm">Start</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tracks" className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Learning Tracks</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {preparationTracks.map(track => (
                <Card key={track.id} className={`${track.color} hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{track.title}</h3>
                        <p className="text-gray-600 mb-4">{track.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{track.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{track.modules} modules</span>
                          </span>
                        </div>
                      </div>
                      <Badge variant={track.difficulty === 'Beginner' ? 'default' : track.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {track.difficulty}
                      </Badge>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-gray-600">{track.progress}%</span>
                      </div>
                      <Progress value={track.progress} className="h-2" />
                    </div>
                    <Button className="w-full">Continue Track</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Mock Interviews</h2>
            <div className="space-y-4">
              {mockInterviews.map(interview => (
                <Card key={interview.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-semibold">{interview.company}</h3>
                          <p className="text-gray-600">{interview.position} - {interview.type}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{interview.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{interview.date}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={interview.difficulty === 'Easy' ? 'default' : interview.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                          {interview.difficulty}
                        </Badge>
                        {interview.score && (
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Score</p>
                            <p className="text-lg font-semibold text-green-600">{interview.score}%</p>
                          </div>
                        )}
                        <Button variant={interview.status === 'completed' ? 'outline' : 'default'}>
                          {interview.status === 'completed' ? 'Review' : 
                           interview.status === 'scheduled' ? 'Join' : 'Resume'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Recommended Resources</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                        <p className="text-gray-600 mb-3">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{resource.rating}</span>
                          </div>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

