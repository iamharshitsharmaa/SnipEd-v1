"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, Clock, Users, Star, Globe, Award, CheckCircle, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function PreviewCoursePage() {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishProgress, setPublishProgress] = useState(0)

  // Mock course data (would come from form state in real app)
  const courseData = {
    title: "Complete React Development Course",
    subtitle: "Learn React from basics to advanced concepts with hands-on projects",
    description:
      "Master React development with this comprehensive course covering everything from basic components to advanced patterns, state management, and real-world project building.",
    instructor: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=60&width=60&text=JD",
      rating: 4.8,
      students: 15420,
      courses: 12,
    },
    price: 89.99,
    originalPrice: 129.99,
    category: "Web Development",
    level: "Beginner to Advanced",
    language: "English",
    duration: "42 hours",
    lessons: 156,
    rating: 4.9,
    students: 0,
    lastUpdated: "January 2024",
    thumbnail: "/placeholder.svg?height=300&width=500&text=React+Course+Thumbnail",
    learningOutcomes: [
      "Build modern React applications from scratch",
      "Master React hooks and state management",
      "Implement routing with React Router",
      "Work with APIs and handle asynchronous data",
      "Deploy React applications to production",
    ],
    requirements: ["Basic JavaScript knowledge", "HTML and CSS fundamentals", "A computer with internet connection"],
    targetAudience: [
      "Beginner developers wanting to learn React",
      "Frontend developers looking to upgrade skills",
      "Anyone interested in modern web development",
    ],
    curriculum: [
      {
        title: "Getting Started",
        lessons: 8,
        duration: "2h 15m",
        lessons_detail: [
          { title: "Welcome to the Course", duration: "5m", isPreview: true },
          { title: "Setting Up Your Environment", duration: "15m", isPreview: false },
          { title: "Your First React Component", duration: "20m", isPreview: true },
        ],
      },
      {
        title: "React Fundamentals",
        lessons: 12,
        duration: "4h 30m",
        lessons_detail: [
          { title: "Understanding JSX", duration: "25m", isPreview: false },
          { title: "Props and State", duration: "30m", isPreview: false },
          { title: "Event Handling", duration: "20m", isPreview: false },
        ],
      },
      {
        title: "Advanced React Concepts",
        lessons: 15,
        duration: "6h 45m",
        lessons_detail: [
          { title: "React Hooks Deep Dive", duration: "45m", isPreview: false },
          { title: "Context API", duration: "35m", isPreview: false },
          { title: "Performance Optimization", duration: "40m", isPreview: false },
        ],
      },
    ],
  }

  const handlePublish = () => {
    setIsPublishing(true)
    setPublishProgress(0)

    // Simulate publishing process
    const interval = setInterval(() => {
      setPublishProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsPublishing(false)
          // Redirect to course page or success page
          setTimeout(() => {
            router.push("/courses")
          }, 1000)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const discount = Math.round(((courseData.originalPrice - courseData.price) / courseData.originalPrice) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.back()}
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-white">Course Preview</h1>
                  <p className="text-sm text-gray-400">Step 3 of 3: Review and publish your course</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => router.push("/courses/create/curriculum")}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      Publish Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-white/20">
                    <DialogHeader>
                      <DialogTitle className="text-white">Publish Your Course</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-gray-300">
                        Are you ready to publish your course? Once published, students will be able to enroll and access
                        your content.
                      </p>
                      {isPublishing ? (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                            <span className="text-white">Publishing course... {publishProgress}%</span>
                          </div>
                          <Progress value={publishProgress} className="w-full" />
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-3">
                          <Button
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handlePublish}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          >
                            Publish Now
                          </Button>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Course Preview */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Header */}
              <div className="space-y-6">
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                  <img
                    src={courseData.thumbnail || "/placeholder.svg"}
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                      <Play className="h-6 w-6 mr-2" />
                      Preview Course
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                      {courseData.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                      {courseData.level}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                      New Course
                    </Badge>
                  </div>

                  <h1 className="text-3xl font-bold text-white">{courseData.title}</h1>
                  <p className="text-xl text-gray-300">{courseData.subtitle}</p>
                  <p className="text-gray-400 leading-relaxed">{courseData.description}</p>

                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white">{courseData.rating}</span>
                      <span>({courseData.students} students)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{courseData.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="h-4 w-4" />
                      <span>{courseData.lessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{courseData.language}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseData.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Content */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Course content</CardTitle>
                  <p className="text-gray-400">
                    {courseData.curriculum.length} sections • {courseData.lessons} lessons • {courseData.duration} total
                    length
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courseData.curriculum.map((section, index) => (
                    <div key={index} className="border border-white/10 rounded-lg">
                      <div className="p-4 bg-white/5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-medium">{section.title}</h3>
                          <div className="text-sm text-gray-400">
                            {section.lessons} lessons • {section.duration}
                          </div>
                        </div>
                      </div>
                      <div className="divide-y divide-white/10">
                        {section.lessons_detail.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="p-3 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Play className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-300">{lesson.title}</span>
                              {lesson.isPreview && (
                                <Badge variant="outline" className="border-green-500/50 text-green-400">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Preview
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-gray-400">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {courseData.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Target Audience */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Who this course is for</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {courseData.targetAudience.map((audience, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{audience}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Pricing Card */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold text-white">${courseData.price}</span>
                        <span className="text-lg text-gray-400 line-through">${courseData.originalPrice}</span>
                        <Badge variant="secondary" className="bg-red-600/20 text-red-300">
                          {discount}% off
                        </Badge>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        Enroll Now
                      </Button>

                      <p className="text-center text-sm text-gray-400">30-Day Money-Back Guarantee</p>

                      <Separator className="bg-white/10" />

                      <div className="space-y-3">
                        <h4 className="text-white font-medium">This course includes:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-3">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300">{courseData.duration} on-demand video</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300">Full lifetime access</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Award className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300">Certificate of completion</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Instructor Card */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={courseData.instructor.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-600 text-white">
                          {courseData.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="text-white font-medium">{courseData.instructor.name}</h3>
                        <div className="space-y-1 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{courseData.instructor.rating} instructor rating</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{courseData.instructor.students.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Play className="h-3 w-3" />
                            <span>{courseData.instructor.courses} courses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
