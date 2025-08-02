"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Users, Clock, Play, BookOpen, Award, TrendingUp, Heart, Share2 } from "lucide-react"
import Link from "next/link"

// Mock course data
const mockCourses = [
  {
    id: "1",
    title: "Advanced React Patterns & Performance",
    description:
      "Master advanced React concepts including hooks, context, performance optimization, and modern patterns.",
    instructor: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.9,
    students: 12847,
    duration: "8h 30m",
    lessons: 42,
    level: "Advanced",
    category: "Web Development",
    tags: ["React", "JavaScript", "Performance"],
    bestseller: true,
    updated: "2024-01-15",
  },
  {
    id: "2",
    title: "AI & Machine Learning Fundamentals",
    description:
      "Complete introduction to AI and ML concepts with hands-on Python projects and real-world applications.",
    instructor: {
      name: "Dr. Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 79.99,
    originalPrice: null,
    rating: 4.8,
    students: 8934,
    duration: "12h 15m",
    lessons: 56,
    level: "Beginner",
    category: "Data Science",
    tags: ["Python", "AI", "Machine Learning"],
    bestseller: false,
    updated: "2024-01-20",
  },
  {
    id: "3",
    title: "Mobile App Design Masterclass",
    description: "Learn to design beautiful, user-friendly mobile apps using Figma and modern design principles.",
    instructor: {
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.7,
    students: 6521,
    duration: "6h 45m",
    lessons: 38,
    level: "Intermediate",
    category: "Design",
    tags: ["UI/UX", "Figma", "Mobile"],
    bestseller: false,
    updated: "2024-01-10",
  },
  {
    id: "4",
    title: "Blockchain & Web3 Development",
    description: "Build decentralized applications with Solidity, Ethereum, and modern Web3 technologies.",
    instructor: {
      name: "Alex Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    students: 4287,
    duration: "15h 20m",
    lessons: 67,
    level: "Advanced",
    category: "Blockchain",
    tags: ["Solidity", "Ethereum", "Web3"],
    bestseller: true,
    updated: "2024-01-25",
  },
  {
    id: "5",
    title: "Digital Marketing Strategy 2024",
    description: "Complete guide to modern digital marketing including SEO, social media, and conversion optimization.",
    instructor: {
      name: "Lisa Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 59.99,
    originalPrice: null,
    rating: 4.5,
    students: 15632,
    duration: "9h 10m",
    lessons: 45,
    level: "Beginner",
    category: "Marketing",
    tags: ["SEO", "Social Media", "Analytics"],
    bestseller: false,
    updated: "2024-01-18",
  },
  {
    id: "6",
    title: "3D Animation with Blender",
    description: "Create stunning 3D animations and visual effects using Blender from beginner to professional level.",
    instructor: {
      name: "David Park",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 94.99,
    originalPrice: 134.99,
    rating: 4.8,
    students: 7891,
    duration: "18h 30m",
    lessons: 78,
    level: "Intermediate",
    category: "3D & Animation",
    tags: ["Blender", "3D", "Animation"],
    bestseller: true,
    updated: "2024-01-12",
  },
]

export default function CoursesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [filteredCourses, setFilteredCourses] = useState(mockCourses)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const filtered = mockCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel

      return matchesSearch && matchesCategory && matchesLevel
    })

    // Sort courses
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.students - a.students)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
        break
    }

    setFilteredCourses(filtered)
  }, [searchQuery, selectedCategory, selectedLevel, sortBy])

  const categories = ["Web Development", "Data Science", "Design", "Blockchain", "Marketing", "3D & Animation"]
  const levels = ["Beginner", "Intermediate", "Advanced"]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dynamic background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
        <div
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-500/8 via-pink-500/8 to-blue-500/8 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-full px-6 py-3 mb-6">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Learn from the Best</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Discover Amazing
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Courses
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Master new skills with expert-led courses designed for the modern learner. From beginner to advanced
              levels.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { icon: BookOpen, value: "500+", label: "Courses" },
                { icon: Users, value: "50K+", label: "Students" },
                { icon: Award, value: "95%", label: "Success Rate" },
                { icon: TrendingUp, value: "4.8", label: "Avg Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-white/5 to-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <GlassCard className="mb-8">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Level Filter */}
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </GlassCard>

          {/* Results */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-400">
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <GlassCard className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="relative">
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {course.bestseller && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                            Bestseller
                          </Badge>
                        )}
                        {course.originalPrice && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Heart className="w-4 h-4 text-white" />
                        </button>
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Share2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category & Level */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                          {course.category}
                        </Badge>
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400/30">
                          {course.level}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                      {/* Instructor */}
                      <div className="flex items-center mb-4">
                        <img
                          src={course.instructor.avatar || "/placeholder.svg"}
                          alt={course.instructor.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                          <p className="text-white text-sm font-medium">{course.instructor.name}</p>
                          {course.instructor.verified && (
                            <div className="flex items-center">
                              <Award className="w-3 h-3 text-blue-400 mr-1" />
                              <span className="text-xs text-blue-400">Verified</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-white">${course.price}</span>
                          {course.originalPrice && (
                            <span className="text-lg text-gray-400 line-through">${course.originalPrice}</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">{course.lessons} lessons</div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          {/* Load More */}
          {filteredCourses.length > 0 && (
            <div className="text-center mt-12">
              <NeonButton variant="secondary" size="lg">
                Load More Courses
              </NeonButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
