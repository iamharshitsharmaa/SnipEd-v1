"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/navigation/navbar"
import { MobileBottomNav } from "@/components/navigation/mobile-bottom-nav"
import { AuthModal } from "@/components/auth/auth-modal"
import { useAuth } from "@/components/auth-provider"
import {
  Play,
  Search,
  Star,
  Users,
  BookOpen,
  Award,
  Clock,
  ChevronRight,
  Zap,
  Target,
  Globe,
  Heart,
} from "lucide-react"

const categories = [
  { name: "Technology", icon: "⚡", color: "bg-blue-500", count: "2.5K courses" },
  { name: "Design", icon: "🎨", color: "bg-purple-500", count: "1.8K courses" },
  { name: "Business", icon: "💼", color: "bg-green-500", count: "3.2K courses" },
  { name: "Programming", icon: "💻", color: "bg-orange-500", count: "4.1K courses" },
  { name: "Marketing", icon: "📈", color: "bg-pink-500", count: "1.5K courses" },
  { name: "Photography", icon: "📸", color: "bg-indigo-500", count: "980 courses" },
]

const featuredCourses = [
  {
    id: 1,
    title: "Complete React Development",
    instructor: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    rating: 4.9,
    students: 12500,
    price: 89.99,
    originalPrice: 149.99,
    image: "/placeholder.svg?height=200&width=300&text=React+Course",
    category: "Programming",
    level: "Intermediate",
    duration: "12 hours",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    rating: 4.8,
    students: 8900,
    price: 79.99,
    originalPrice: 129.99,
    image: "/placeholder.svg?height=200&width=300&text=Design+Course",
    category: "Design",
    level: "Beginner",
    duration: "8 hours",
  },
  {
    id: 3,
    title: "Digital Marketing Strategy",
    instructor: "Emma Davis",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
    rating: 4.7,
    students: 15200,
    price: 69.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=200&width=300&text=Marketing+Course",
    category: "Marketing",
    level: "Advanced",
    duration: "10 hours",
  },
]

const creators = [
  {
    id: 1,
    name: "Alex Rivera",
    username: "alexcodes",
    avatar: "/placeholder.svg?height=60&width=60&text=AR",
    followers: "125K",
    courses: 23,
    specialty: "Full Stack Development",
    verified: true,
  },
  {
    id: 2,
    name: "Maya Patel",
    username: "designwithmaya",
    avatar: "/placeholder.svg?height=60&width=60&text=MP",
    followers: "89K",
    courses: 18,
    specialty: "UI/UX Design",
    verified: true,
  },
  {
    id: 3,
    name: "David Kim",
    username: "marketingdave",
    avatar: "/placeholder.svg?height=60&width=60&text=DK",
    followers: "156K",
    courses: 31,
    specialty: "Digital Marketing",
    verified: true,
  },
]

const trendingVideos = [
  {
    id: 1,
    title: "React Hooks in 60 Seconds",
    creator: "CodeMaster",
    avatar: "/placeholder.svg?height=32&width=32&text=CM",
    views: "2.1M",
    likes: "89K",
    thumbnail: "/placeholder.svg?height=120&width=80&text=React+Video",
  },
  {
    id: 2,
    title: "CSS Grid Layout Tricks",
    creator: "DesignPro",
    avatar: "/placeholder.svg?height=32&width=32&text=DP",
    views: "1.8M",
    likes: "76K",
    thumbnail: "/placeholder.svg?height=120&width=80&text=CSS+Video",
  },
  {
    id: 3,
    title: "JavaScript ES6 Features",
    creator: "JSNinja",
    avatar: "/placeholder.svg?height=32&width=32&text=JN",
    views: "3.2M",
    likes: "125K",
    thumbnail: "/placeholder.svg?height=120&width=80&text=JS+Video",
  },
]

export default function HomePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleGetStarted = () => {
    if (user) {
      router.push("/courses")
    } else {
      setShowAuthModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              {/* Hero Badge */}
              <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                <Star className="w-4 h-4" />
                <span>Join 2.5M+ learners worldwide</span>
              </div>

              {/* Hero Title */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Learn. Create.{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Master.
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Master new skills through bite-sized, focused learning. Join millions of learners and creators shaping
                  the future of education.
                </p>
              </div>

              {/* Hero Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <Button
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/feed")}
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Videos
                </Button>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="What do you want to learn today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                  />
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4 mx-auto">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">2.5M+</div>
                <div className="text-gray-400">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-2xl mb-4 mx-auto">
                  <BookOpen className="w-8 h-8 text-pink-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-gray-400">Courses</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-4 mx-auto">
                  <Play className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">1M+</div>
                <div className="text-gray-400">Videos</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-2xl mb-4 mx-auto">
                  <Award className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-400">Creators</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Explore Categories</h2>
              <p className="text-gray-400 text-lg">Discover courses in your area of interest</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group backdrop-blur-sm"
                  onClick={() => router.push(`/categories?category=${encodeURIComponent(category.name)}`)}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-400 text-sm">{category.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Featured Courses</h2>
                <p className="text-gray-400 text-lg">Hand-picked courses from top instructors</p>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/courses")}
                className="border-white/20 text-white hover:bg-white/10"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group backdrop-blur-sm overflow-hidden"
                  onClick={() => router.push(`/courses/${course.id}`)}
                >
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-purple-600 text-white">{course.category}</Badge>
                    <Badge variant="secondary" className="absolute top-3 right-3 bg-black/50 text-white">
                      {course.level}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={course.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {course.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-400 text-sm">{course.instructor}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-purple-400 transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-lg">${course.price}</span>
                        <span className="text-gray-400 line-through text-sm">${course.originalPrice}</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Videos */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Trending Videos</h2>
                <p className="text-gray-400 text-lg">Popular short-form learning content</p>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/feed")}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Feed
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingVideos.map((video) => (
                <Card
                  key={video.id}
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group backdrop-blur-sm overflow-hidden"
                  onClick={() => router.push("/feed")}
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={video.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{video.creator.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 group-hover:text-purple-400 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-gray-400 text-xs mb-2">{video.creator}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-400">
                          <span>{video.views} views</span>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{video.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Creators */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Top Creators</h2>
              <p className="text-gray-400 text-lg">Learn from industry experts and thought leaders</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {creators.map((creator) => (
                <Card
                  key={creator.id}
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group backdrop-blur-sm"
                  onClick={() => router.push(`/profile/${creator.username}`)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <Avatar className="w-20 h-20 mx-auto">
                        <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-600 text-white text-xl">
                          {creator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {creator.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-1">{creator.name}</h3>
                    <p className="text-purple-400 text-sm mb-2">@{creator.username}</p>
                    <p className="text-gray-400 text-sm mb-4">{creator.specialty}</p>
                    <div className="flex items-center justify-center space-x-6 mb-4 text-sm">
                      <div className="text-center">
                        <div className="text-white font-semibold">{creator.followers}</div>
                        <div className="text-gray-400">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold">{creator.courses}</div>
                        <div className="text-gray-400">Courses</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Follow
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Why Choose SnipEd?</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Experience the future of learning with our innovative platform designed for modern learners
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">Bite-sized Learning</h3>
                  <p className="text-gray-400">
                    Learn complex topics through short, focused videos that fit into your busy schedule.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">Personalized Path</h3>
                  <p className="text-gray-400">
                    AI-powered recommendations help you discover content tailored to your learning goals.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">Global Community</h3>
                  <p className="text-gray-400">
                    Connect with learners and creators from around the world in our vibrant community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Learning Journey?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join millions of learners who are already mastering new skills with SnipEd. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
                >
                  Start Learning Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/about")}
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/courses" className="hover:text-white transition-colors">
                      Courses
                    </a>
                  </li>
                  <li>
                    <a href="/feed" className="hover:text-white transition-colors">
                      Video Feed
                    </a>
                  </li>
                  <li>
                    <a href="/categories" className="hover:text-white transition-colors">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a href="/creators" className="hover:text-white transition-colors">
                      Creators
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/about" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="/careers" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/help" className="hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="/community" className="hover:text-white transition-colors">
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="/guidelines" className="hover:text-white transition-colors">
                      Guidelines
                    </a>
                  </li>
                  <li>
                    <a href="/safety" className="hover:text-white transition-colors">
                      Safety
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/terms" className="hover:text-white transition-colors">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="hover:text-white transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="/cookies" className="hover:text-white transition-colors">
                      Cookies
                    </a>
                  </li>
                  <li>
                    <a href="/dmca" className="hover:text-white transition-colors">
                      DMCA
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-white font-semibold">SnipEd</span>
              </div>
              <p className="text-gray-400 text-sm">© 2024 SnipEd. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <MobileBottomNav />
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  )
}
