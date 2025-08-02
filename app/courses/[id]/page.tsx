"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackButton } from "@/components/ui/back-button"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Clock,
  Star,
  BookOpen,
  Download,
  Share,
  Heart,
  CheckCircle,
  PlayCircle,
  Lock,
  Trophy,
  BadgeIcon as Certificate,
} from "lucide-react"

// Mock course data
const courseData = {
  id: "1",
  title: "Complete React Development Bootcamp",
  description: "Master React from basics to advanced concepts with hands-on projects and real-world applications.",
  instructor: {
    name: "Sarah Chen",
    username: "codewithsarah",
    avatar: "/placeholder.svg?height=50&width=50&text=SC",
    verified: true,
    followers: "2.3M",
    rating: 4.9,
    courses: 12,
  },
  thumbnail: "/placeholder.svg?height=400&width=600&text=React+Course",
  price: 89.99,
  originalPrice: 199.99,
  rating: 4.8,
  students: 45230,
  duration: "12 hours",
  lessons: 48,
  level: "Beginner to Advanced",
  category: "Programming",
  tags: ["React", "JavaScript", "Frontend", "Web Development"],
  lastUpdated: "2024-01-15",
  language: "English",
  features: [
    "48 hours of on-demand video",
    "15 coding exercises",
    "5 real-world projects",
    "Certificate of completion",
    "Lifetime access",
    "30-day money-back guarantee",
  ],
  curriculum: [
    {
      id: 1,
      title: "Getting Started with React",
      lessons: 8,
      duration: "2h 15m",
      completed: true,
      topics: [
        { id: 1, title: "What is React?", duration: "15m", completed: true },
        { id: 2, title: "Setting up Development Environment", duration: "20m", completed: true },
        { id: 3, title: "Your First React Component", duration: "25m", completed: true },
        { id: 4, title: "JSX Fundamentals", duration: "30m", completed: true },
        { id: 5, title: "Props and State", duration: "35m", completed: true },
        { id: 6, title: "Event Handling", duration: "20m", completed: true },
        { id: 7, title: "Conditional Rendering", duration: "25m", completed: true },
        { id: 8, title: "Lists and Keys", duration: "25m", completed: true },
      ],
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      lessons: 12,
      duration: "3h 45m",
      completed: false,
      topics: [
        { id: 9, title: "Introduction to Hooks", duration: "20m", completed: true },
        { id: 10, title: "useState Hook", duration: "30m", completed: true },
        { id: 11, title: "useEffect Hook", duration: "35m", completed: false },
        { id: 12, title: "useContext Hook", duration: "25m", completed: false },
        { id: 13, title: "useReducer Hook", duration: "40m", completed: false },
        { id: 14, title: "Custom Hooks", duration: "45m", completed: false },
        { id: 15, title: "useCallback and useMemo", duration: "30m", completed: false },
        { id: 16, title: "useRef Hook", duration: "20m", completed: false },
        { id: 17, title: "Advanced Hook Patterns", duration: "35m", completed: false },
        { id: 18, title: "Hook Testing", duration: "25m", completed: false },
        { id: 19, title: "Performance Optimization", duration: "30m", completed: false },
        { id: 20, title: "Hook Best Practices", duration: "30m", completed: false },
      ],
    },
    {
      id: 3,
      title: "State Management with Redux",
      lessons: 10,
      duration: "2h 30m",
      completed: false,
      topics: [
        { id: 21, title: "Why Redux?", duration: "15m", completed: false },
        { id: 22, title: "Redux Core Concepts", duration: "20m", completed: false },
        { id: 23, title: "Actions and Action Creators", duration: "18m", completed: false },
        { id: 24, title: "Reducers", duration: "22m", completed: false },
        { id: 25, title: "Store and Dispatch", duration: "15m", completed: false },
        { id: 26, title: "React-Redux Integration", duration: "25m", completed: false },
        { id: 27, title: "Middleware and Thunks", duration: "20m", completed: false },
        { id: 28, title: "Redux Toolkit", duration: "30m", completed: false },
        { id: 29, title: "Async Actions", duration: "20m", completed: false },
        { id: 30, title: "Redux DevTools", duration: "15m", completed: false },
      ],
    },
    {
      id: 4,
      title: "Building Real-World Projects",
      lessons: 18,
      duration: "4h 30m",
      completed: false,
      topics: [
        { id: 31, title: "Project Planning", duration: "20m", completed: false },
        { id: 32, title: "Setting up the Project", duration: "15m", completed: false },
        { id: 33, title: "Building a Todo App", duration: "45m", completed: false },
        { id: 34, title: "Weather App with API", duration: "60m", completed: false },
        { id: 35, title: "E-commerce Cart", duration: "90m", completed: false },
        { id: 36, title: "User Authentication", duration: "40m", completed: false },
        { id: 37, title: "Deployment Strategies", duration: "30m", completed: false },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=AJ",
      },
      rating: 5,
      comment: "Excellent course! Sarah explains everything clearly and the projects are really helpful.",
      date: "2024-01-10",
    },
    {
      id: 2,
      user: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40&text=MG",
      },
      rating: 5,
      comment: "Best React course I've taken. The hands-on approach really works!",
      date: "2024-01-08",
    },
    {
      id: 3,
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40&text=DK",
      },
      rating: 4,
      comment: "Great content, though I wish there were more advanced topics covered.",
      date: "2024-01-05",
    },
  ],
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [progress, setProgress] = useState(25)

  const togglePlay = () => setIsPlaying(!isPlaying)
  const toggleMute = () => setIsMuted(!isMuted)
  const handleEnroll = () => setIsEnrolled(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <BackButton
            href="/courses"
            label="Back to Courses"
            className="bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 mb-6"
          />
        </div>

        {/* Video Player Section */}
        <div className="container mx-auto px-4 mb-8">
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
            <img
              src={courseData.thumbnail || "/placeholder.svg"}
              alt={courseData.title}
              className="w-full h-full object-cover"
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button
                size="lg"
                variant="ghost"
                className="w-20 h-20 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-300"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-10 h-10 text-white" /> : <Play className="w-10 h-10 text-white" />}
              </Button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button size="sm" variant="ghost" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                </Button>
                <span className="text-white text-sm">2:15 / 15:30</span>
              </div>
              <Button size="sm" variant="ghost">
                <Maximize className="w-5 h-5 text-white" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-1/6 transition-all duration-100" />
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Info */}
              <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-white mb-2">{courseData.title}</CardTitle>
                      <CardDescription className="text-gray-300 text-base leading-relaxed">
                        {courseData.description}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{courseData.rating}</span>
                      <span className="text-gray-400">({courseData.students.toLocaleString()} students)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">{courseData.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{courseData.lessons} lessons</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                      {courseData.level}
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {courseData.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>

              {/* Instructor Info */}
              <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={courseData.instructor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-bold text-lg">{courseData.instructor.name}</h3>
                        {courseData.instructor.verified && <Star className="w-4 h-4 text-blue-400 fill-current" />}
                      </div>
                      <p className="text-gray-400">@{courseData.instructor.username}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-300">
                        <span>{courseData.instructor.followers} followers</span>
                        <span>•</span>
                        <span>{courseData.instructor.courses} courses</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{courseData.instructor.rating} rating</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Course Content Tabs */}
              <Tabs defaultValue="curriculum" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/10">
                  <TabsTrigger value="curriculum" className="text-gray-300 data-[state=active]:text-white">
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-gray-300 data-[state=active]:text-white">
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="text-gray-300 data-[state=active]:text-white">
                    Resources
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="curriculum" className="mt-6">
                  <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Course Curriculum</CardTitle>
                      <CardDescription className="text-gray-400">
                        {courseData.lessons} lessons • {courseData.duration} total length
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {courseData.curriculum.map((section) => (
                        <div key={section.id} className="border border-gray-700 rounded-lg overflow-hidden">
                          <div className="bg-gray-800/50 p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  section.completed ? "bg-green-600" : "bg-gray-600"
                                }`}
                              >
                                {section.completed ? (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                ) : (
                                  <span className="text-white text-sm font-bold">{section.id}</span>
                                )}
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{section.title}</h4>
                                <p className="text-sm text-gray-400">
                                  {section.lessons} lessons • {section.duration}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost">
                              <PlayCircle className="w-4 h-4 text-purple-400" />
                            </Button>
                          </div>

                          <div className="p-4 space-y-2">
                            {section.topics.map((topic) => (
                              <div
                                key={topic.id}
                                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-800/30 transition-colors"
                              >
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                      topic.completed ? "bg-green-600" : "bg-gray-600"
                                    }`}
                                  >
                                    {topic.completed ? (
                                      <CheckCircle className="w-3 h-3 text-white" />
                                    ) : isEnrolled ? (
                                      <PlayCircle className="w-3 h-3 text-white" />
                                    ) : (
                                      <Lock className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  <span className="text-gray-300 text-sm">{topic.title}</span>
                                </div>
                                <span className="text-gray-400 text-xs">{topic.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Student Reviews</CardTitle>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-white text-xl font-bold">{courseData.rating}</span>
                        </div>
                        <span className="text-gray-400">({courseData.students.toLocaleString()} reviews)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {courseData.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-700 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{review.user.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-white font-medium">{review.user.name}</span>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-gray-400 text-sm">{review.date}</span>
                              </div>
                              <p className="text-gray-300">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources" className="mt-6">
                  <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Course Resources</CardTitle>
                      <CardDescription className="text-gray-400">Additional materials and downloads</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <Download className="w-5 h-5 text-purple-400" />
                            <span className="text-white font-medium">Source Code</span>
                          </div>
                          <p className="text-gray-400 text-sm mb-3">Complete project files and code examples</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                          >
                            Download
                          </Button>
                        </div>

                        <div className="p-4 border border-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <Certificate className="w-5 h-5 text-green-400" />
                            <span className="text-white font-medium">Certificate</span>
                          </div>
                          <p className="text-gray-400 text-sm mb-3">Completion certificate upon finishing</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                          >
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enrollment Card */}
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 sticky top-6">
                <CardContent className="p-6">
                  {!isEnrolled ? (
                    <>
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-3xl font-bold text-white">${courseData.price}</span>
                          <span className="text-lg text-gray-400 line-through">${courseData.originalPrice}</span>
                        </div>
                        <Badge className="bg-red-600 text-white">
                          {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>

                      <Button
                        onClick={handleEnroll}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mb-4"
                      >
                        Enroll Now
                      </Button>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <Share className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">You're Enrolled!</h3>
                        <p className="text-gray-400">Continue your learning journey</p>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mb-4">
                        Continue Learning
                      </Button>
                    </>
                  )}

                  {/* Course Features */}
                  <div className="space-y-3 pt-4 border-t border-gray-700">
                    <h4 className="text-white font-medium">This course includes:</h4>
                    {courseData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Stats */}
              <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Course Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Students</span>
                    <span className="text-white font-medium">{courseData.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Language</span>
                    <span className="text-white font-medium">{courseData.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-white font-medium">{courseData.lastUpdated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Category</span>
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                      {courseData.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
