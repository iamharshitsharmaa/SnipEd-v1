"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navigation/navbar"
import { MobileBottomNav } from "@/components/navigation/mobile-bottom-nav"
import { mockCourses, mockCategories } from "@/lib/mockData"
import {
  Search,
  Star,
  Users,
  Clock,
  BookOpen,
  Play,
  ChevronRight,
  Grid3X3,
  List,
  ArrowLeft, // Import the ArrowLeft icon
} from "lucide-react"

export default function CoursesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter courses based on search query
    console.log("Searching for:", searchQuery)
  }

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatDuration = (hours: number, minutes: number) => {
    if (hours === 0) return `${minutes}m`
    if (minutes === 0) return `${hours}h`
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Header */}
        <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Back to Home Button */}
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              className="mb-6 text-white hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Discover Amazing{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Courses
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Learn from industry experts and advance your career with our comprehensive course library
              </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search courses, instructors, topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </form>

              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="text-white hover:bg-white/10"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="text-white hover:bg-white/10"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Courses Grid/List */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group backdrop-blur-sm overflow-hidden ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                  onClick={() => router.push(`/courses/${course.id}`)}
                >
                  <div className={`relative ${viewMode === "list" ? "w-80 flex-shrink-0" : ""}`}>
                    <img
                      src={course.thumbnail_url || "/placeholder.svg"}
                      alt={course.title}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === "list" ? "w-full h-full" : "w-full h-48"
                      }`}
                    />
                    <Badge className="absolute top-3 left-3 bg-purple-600 text-white">{course.category}</Badge>
                    <Badge variant="secondary" className="absolute top-3 right-3 bg-black/50 text-white">
                      {course.level}
                    </Badge>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={course.instructor.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback>
                            {course.instructor.full_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-gray-400 text-sm">{course.instructor.full_name}</span>
                      </div>

                      <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.student_count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(course.duration_hours, course.duration_minutes)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lesson_count} lessons</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-bold text-xl">{formatPrice(course.price)}</span>
                          {course.original_price && (
                            <span className="text-gray-400 line-through text-sm">
                              {formatPrice(course.original_price)}
                            </span>
                          )}
                        </div>
                        {course.original_price && (
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                            {Math.round(((course.original_price - course.price) / course.original_price) * 100)}% OFF
                          </Badge>
                        )}
                      </div>

                      {viewMode === "list" && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="space-y-2">
                            <h4 className="text-white font-medium text-sm">What you'll learn:</h4>
                            <ul className="space-y-1">
                              {course.what_you_learn.slice(0, 3).map((item, index) => (
                                <li key={index} className="text-gray-400 text-sm flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search criteria or browse all courses</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedLevel("all")
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredCourses.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Load More Courses
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <MobileBottomNav />
      </div>
    </div>
  )
}