"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Settings,
  Plus,
  MoreHorizontal,
  Award,
  Target,
  BarChart3,
  Video,
  BookOpen,
  Star,
  Edit,
} from "lucide-react"

// Mock creator data
const mockCreatorData = {
  profile: {
    name: "Sarah Chen",
    username: "@sarahchen",
    avatar: "/placeholder.svg?height=80&width=80",
    verified: true,
    followers: 45000,
    following: 1200,
    totalStudents: 12847,
    totalRevenue: 89750,
    monthlyRevenue: 12500,
    revenueGrowth: 15.3,
    coursesPublished: 8,
    videosPublished: 156,
    avgRating: 4.9,
    totalReviews: 2847,
  },
  analytics: {
    thisMonth: {
      revenue: 12500,
      students: 1247,
      views: 45600,
      engagement: 8.7,
    },
    lastMonth: {
      revenue: 10850,
      students: 1089,
      views: 39200,
      engagement: 7.9,
    },
  },
  courses: [
    {
      id: 1,
      title: "Advanced React Patterns & Performance",
      thumbnail: "/placeholder.svg?height=120&width=200",
      status: "published",
      students: 12847,
      rating: 4.9,
      reviews: 2847,
      revenue: 45600,
      lastUpdated: "2024-01-15",
      price: 89.99,
    },
    {
      id: 2,
      title: "React Testing Masterclass",
      thumbnail: "/placeholder.svg?height=120&width=200",
      status: "published",
      students: 8934,
      rating: 4.8,
      reviews: 1456,
      revenue: 28900,
      lastUpdated: "2024-01-10",
      price: 79.99,
    },
    {
      id: 3,
      title: "Modern JavaScript Deep Dive",
      thumbnail: "/placeholder.svg?height=120&width=200",
      status: "draft",
      students: 0,
      rating: 0,
      reviews: 0,
      revenue: 0,
      lastUpdated: "2024-01-20",
      price: 69.99,
    },
  ],
  videos: [
    {
      id: 1,
      title: "React Hooks Explained in 5 Minutes",
      thumbnail: "/placeholder.svg?height=90&width=160",
      views: 25600,
      likes: 1240,
      comments: 89,
      duration: "5:23",
      uploadDate: "2024-01-18",
      monetized: true,
      revenue: 156.8,
    },
    {
      id: 2,
      title: "JavaScript Array Methods You Should Know",
      thumbnail: "/placeholder.svg?height=90&width=160",
      views: 18900,
      likes: 890,
      comments: 67,
      duration: "8:45",
      uploadDate: "2024-01-15",
      monetized: true,
      revenue: 98.5,
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox - When to Use What",
      thumbnail: "/placeholder.svg?height=90&width=160",
      views: 32100,
      likes: 1560,
      comments: 124,
      duration: "12:30",
      uploadDate: "2024-01-12",
      monetized: false,
      revenue: 0,
    },
  ],
}

export default function CreatorPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const { profile, analytics, courses, videos } = mockCreatorData

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
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
                className="w-16 h-16 rounded-full border-2 border-purple-500/30"
              />
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                  {profile.verified && <Award className="w-5 h-5 text-blue-400 ml-2" />}
                </div>
                <p className="text-gray-400">{profile.username}</p>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                  <span>{profile.followers.toLocaleString()} followers</span>
                  <span>•</span>
                  <span>{profile.totalStudents.toLocaleString()} students</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span>{profile.avgRating}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <NeonButton variant="secondary" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </NeonButton>
              <NeonButton variant="primary" size="sm" glow>
                <Plus className="w-4 h-4 mr-2" />
                Create Content
              </NeonButton>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GlassCard>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex items-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />+
                    {analytics.thisMonth.revenue > analytics.lastMonth.revenue
                      ? (
                          ((analytics.thisMonth.revenue - analytics.lastMonth.revenue) / analytics.lastMonth.revenue) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  ${analytics.thisMonth.revenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">This month</div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex items-center text-blue-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />+
                    {analytics.thisMonth.students > analytics.lastMonth.students
                      ? (
                          ((analytics.thisMonth.students - analytics.lastMonth.students) /
                            analytics.lastMonth.students) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {analytics.thisMonth.students.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">New students</div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex items-center text-purple-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />+
                    {analytics.thisMonth.views > analytics.lastMonth.views
                      ? (
                          ((analytics.thisMonth.views - analytics.lastMonth.views) / analytics.lastMonth.views) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{analytics.thisMonth.views.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total views</div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="flex items-center text-orange-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />+
                    {analytics.thisMonth.engagement > analytics.lastMonth.engagement
                      ? (analytics.thisMonth.engagement - analytics.lastMonth.engagement).toFixed(1)
                      : 0}
                    %
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{analytics.thisMonth.engagement}%</div>
                <div className="text-sm text-gray-400">Engagement rate</div>
              </div>
            </GlassCard>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-1 mb-8">
              <TabsTrigger
                value="overview"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="courses"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500"
              >
                Courses
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-gray-600"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Revenue Chart */}
              <GlassCard>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">${profile.totalRevenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Total earnings</div>
                    </div>
                  </div>
                  <div className="h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <p className="text-gray-400">Revenue chart visualization</p>
                      <p className="text-sm text-gray-500">70% creator share • 30% platform fee</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="hover:scale-105 transition-transform cursor-pointer">
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Create Course</h3>
                    <p className="text-gray-400 text-sm mb-4">Build a comprehensive course with multiple lessons</p>
                    <NeonButton variant="secondary" size="sm" className="w-full">
                      Get Started
                    </NeonButton>
                  </div>
                </GlassCard>

                <GlassCard className="hover:scale-105 transition-transform cursor-pointer">
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Video className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Upload Video</h3>
                    <p className="text-gray-400 text-sm mb-4">Share quick tips and tutorials with your audience</p>
                    <NeonButton variant="secondary" size="sm" className="w-full">
                      Upload Now
                    </NeonButton>
                  </div>
                </GlassCard>

                <GlassCard className="hover:scale-105 transition-transform cursor-pointer">
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Engage Students</h3>
                    <p className="text-gray-400 text-sm mb-4">Respond to comments and build your community</p>
                    <NeonButton variant="secondary" size="sm" className="w-full">
                      View Messages
                    </NeonButton>
                  </div>
                </GlassCard>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">My Courses ({courses.length})</h3>
                <NeonButton variant="primary" size="sm" glow>
                  <Plus className="w-4 h-4 mr-2" />
                  New Course
                </NeonButton>
              </div>

              <div className="space-y-4">
                {courses.map((course) => (
                  <GlassCard key={course.id}>
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={course.title}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-1">{course.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <Badge
                                  variant={course.status === "published" ? "default" : "secondary"}
                                  className={
                                    course.status === "published"
                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  }
                                >
                                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                </Badge>
                                <span>${course.price}</span>
                                <span>Updated {new Date(course.lastUpdated).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-white">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>

                          {course.status === "published" && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              <div className="text-center">
                                <div className="text-lg font-semibold text-white">
                                  {course.students.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-400">Students</div>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center">
                                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                  <span className="text-lg font-semibold text-white">{course.rating}</span>
                                </div>
                                <div className="text-xs text-gray-400">{course.reviews} reviews</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-semibold text-white">
                                  ${course.revenue.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-400">Revenue</div>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center space-x-2">
                                  <NeonButton variant="secondary" size="sm">
                                    <Edit className="w-3 h-3" />
                                  </NeonButton>
                                  <NeonButton variant="secondary" size="sm">
                                    <BarChart3 className="w-3 h-3" />
                                  </NeonButton>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">My Videos ({videos.length})</h3>
                <NeonButton variant="primary" size="sm" glow>
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Video
                </NeonButton>
              </div>

              <div className="space-y-4">
                {videos.map((video) => (
                  <GlassCard key={video.id}>
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-40 h-24 object-cover rounded-lg"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-1">{video.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>Uploaded {new Date(video.uploadDate).toLocaleDateString()}</span>
                                <div className="flex items-center">
                                  <span
                                    className={`w-2 h-2 rounded-full mr-2 ${video.monetized ? "bg-green-400" : "bg-gray-400"}`}
                                  />
                                  {video.monetized ? "Monetized" : "Not monetized"}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch checked={video.monetized} />
                              <button className="text-gray-400 hover:text-white">
                                <MoreHorizontal className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                            <div className="text-center">
                              <div className="flex items-center justify-center">
                                <Eye className="w-4 h-4 text-blue-400 mr-1" />
                                <span className="text-lg font-semibold text-white">{video.views.toLocaleString()}</span>
                              </div>
                              <div className="text-xs text-gray-400">Views</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center">
                                <Heart className="w-4 h-4 text-red-400 mr-1" />
                                <span className="text-lg font-semibold text-white">{video.likes.toLocaleString()}</span>
                              </div>
                              <div className="text-xs text-gray-400">Likes</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center">
                                <MessageCircle className="w-4 h-4 text-green-400 mr-1" />
                                <span className="text-lg font-semibold text-white">{video.comments}</span>
                              </div>
                              <div className="text-xs text-gray-400">Comments</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-white">${video.revenue.toFixed(2)}</div>
                              <div className="text-xs text-gray-400">Revenue</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-2">
                                <NeonButton variant="secondary" size="sm">
                                  <Edit className="w-3 h-3" />
                                </NeonButton>
                                <NeonButton variant="secondary" size="sm">
                                  <BarChart3 className="w-3 h-3" />
                                </NeonButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Revenue Breakdown</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Course Sales</span>
                        <span className="text-white font-semibold">
                          ${(profile.totalRevenue * 0.85).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Video Ad Revenue</span>
                        <span className="text-white font-semibold">
                          ${(profile.totalRevenue * 0.15).toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-semibold">Total Revenue</span>
                          <span className="text-white font-bold text-lg">${profile.totalRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-sm">
                          <span className="text-gray-400">Your Share (70%)</span>
                          <span className="text-green-400 font-semibold">
                            ${(profile.totalRevenue * 0.7).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Course Completion Rate</span>
                          <span className="text-white font-semibold">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Student Satisfaction</span>
                          <span className="text-white font-semibold">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Video Engagement</span>
                          <span className="text-white font-semibold">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Performing Content</h3>
                  <div className="space-y-4">
                    {courses
                      .filter((c) => c.status === "published")
                      .map((course, index) => (
                        <div key={course.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{course.title}</h4>
                              <p className="text-sm text-gray-400">{course.students.toLocaleString()} students</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">${course.revenue.toLocaleString()}</div>
                            <div className="text-sm text-gray-400">Revenue</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Creator Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Auto-monetize new videos</h4>
                        <p className="text-sm text-gray-400">Automatically enable monetization for new uploads</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Email notifications</h4>
                        <p className="text-sm text-gray-400">Receive notifications about new students and reviews</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Public profile</h4>
                        <p className="text-sm text-gray-400">Make your creator profile visible to all users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Course recommendations</h4>
                        <p className="text-sm text-gray-400">
                          Allow SnipEd to recommend your courses to relevant users
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Payout Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Payout Method</label>
                      <select className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white">
                        <option>PayPal</option>
                        <option>Bank Transfer</option>
                        <option>Stripe</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Minimum Payout Amount</label>
                      <select className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white">
                        <option>$50</option>
                        <option>$100</option>
                        <option>$250</option>
                        <option>$500</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Available for payout</span>
                        <span className="text-white font-semibold">
                          ${(profile.totalRevenue * 0.7 * 0.8).toLocaleString()}
                        </span>
                      </div>
                      <NeonButton variant="primary" size="sm">
                        Request Payout
                      </NeonButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
