"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  TrendingUp,
  Clock,
  Users,
  Play,
  BookOpen,
  Star,
  Eye,
  Heart,
  Filter,
  FlameIcon as Fire,
} from "lucide-react"

const searchResults = {
  creators: [
    {
      id: "1",
      username: "alex_codes",
      name: "Alex Thompson",
      category: "Coding",
      followers: "1.2M",
      avatar: "/placeholder.svg?height=60&width=60&text=AT",
      verified: true,
      bio: "Full-stack developer sharing coding tips and tricks",
    },
    {
      id: "2",
      username: "sarah_skincare",
      name: "Sarah Johnson",
      category: "Skincare",
      followers: "890K",
      avatar: "/placeholder.svg?height=60&width=60&text=SJ",
      verified: true,
      bio: "Dermatologist-approved skincare routines",
    },
  ],
  reels: [
    {
      id: "1",
      title: "React Hooks Explained in 60 Seconds",
      creator: "alex_codes",
      views: "2.3M",
      likes: "145K",
      thumbnail: "/placeholder.svg?height=200&width=150&text=React+Hooks",
      duration: "0:58",
      category: "Coding",
    },
    {
      id: "2",
      title: "Morning Skincare Routine That Changed My Life",
      creator: "sarah_skincare",
      views: "1.8M",
      likes: "89K",
      thumbnail: "/placeholder.svg?height=200&width=150&text=Skincare",
      duration: "1:23",
      category: "Skincare",
    },
  ],
  courses: [
    {
      id: "1",
      title: "Complete JavaScript Mastery",
      creator: "alex_codes",
      price: "$99",
      rating: 4.9,
      students: "12.5K",
      thumbnail: "/placeholder.svg?height=120&width=200&text=JS+Course",
      duration: "24 hours",
      category: "Coding",
    },
    {
      id: "2",
      title: "Skincare Science Fundamentals",
      creator: "sarah_skincare",
      price: "$79",
      rating: 4.8,
      students: "8.2K",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Skincare+Course",
      duration: "18 hours",
      category: "Skincare",
    },
  ],
}

const trendingSearches = [
  "JavaScript tutorials",
  "Skincare routine",
  "React hooks",
  "Comedy skits",
  "Tech reviews",
  "Coding challenges",
  "Beauty tips",
  "Programming basics",
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Futuristic animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-black to-purple-900/10" />
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/3 via-purple-500/3 to-pink-500/3 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/2 to-teal-500/2 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/2 to-purple-500/2 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-full px-6 py-3 mb-8">
            <Search className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm font-medium text-cyan-300">Discover Everything</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Search &
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Discover
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find creators, reels, and courses across all categories. Your next favorite content is just a search away.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <Input
              placeholder="Search for creators, reels, courses, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-16 pr-20 py-6 text-lg bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <NeonButton variant="ghost" size="sm" className="rounded-full">
                <Filter className="w-4 h-4" />
              </NeonButton>
              <NeonButton variant="primary" size="sm" className="rounded-full px-6" glow>
                Search
              </NeonButton>
            </div>
          </div>
        </div>

        {/* Trending Searches */}
        {!searchQuery && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Fire className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Trending Searches</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <TrendingUp className="w-3 h-3 inline mr-2" />
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-2 mb-8">
                <TabsTrigger
                  value="all"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                >
                  All Results
                </TabsTrigger>
                <TabsTrigger
                  value="creators"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  Creators
                </TabsTrigger>
                <TabsTrigger
                  value="reels"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                >
                  Reels
                </TabsTrigger>
                <TabsTrigger
                  value="courses"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
                >
                  Courses
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-8">
                {/* Creators Section */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-blue-400" />
                    Creators
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {searchResults.creators.map((creator) => (
                      <GlassCard key={creator.id} variant="premium" className="group hover:scale-105 cursor-pointer">
                        <div className="p-6 flex items-center space-x-4">
                          <Avatar className="w-16 h-16 ring-4 ring-white/20 group-hover:ring-white/40 transition-all">
                            <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {creator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-lg font-bold text-white">{creator.name}</h4>
                              {creator.verified && <Star className="w-4 h-4 text-blue-400 fill-current" />}
                            </div>
                            <p className="text-purple-400 text-sm mb-2">@{creator.username}</p>
                            <p className="text-gray-400 text-sm mb-3">{creator.bio}</p>
                            <div className="flex items-center space-x-4">
                              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                                {creator.category}
                              </Badge>
                              <span className="text-sm text-gray-400">{creator.followers} followers</span>
                            </div>
                          </div>
                          <NeonButton variant="primary" size="sm" glow>
                            Follow
                          </NeonButton>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>

                {/* Reels Section */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Play className="w-6 h-6 mr-3 text-green-400" />
                    Reels
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {searchResults.reels.map((reel) => (
                      <GlassCard key={reel.id} variant="glow" className="group hover:scale-105 cursor-pointer">
                        <div className="relative">
                          <img
                            src={reel.thumbnail || "/placeholder.svg"}
                            alt={reel.title}
                            className="w-full h-48 object-cover rounded-t-xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl" />
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className="bg-black/50 text-white text-xs">{reel.duration}</Badge>
                              <div className="flex items-center space-x-1 text-white text-xs">
                                <Eye className="w-3 h-3" />
                                <span>{reel.views}</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2">{reel.title}</h4>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>@{reel.creator}</span>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{reel.likes}</span>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>

                {/* Courses Section */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-amber-400" />
                    Courses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {searchResults.courses.map((course) => (
                      <GlassCard key={course.id} variant="premium" className="group hover:scale-105 cursor-pointer">
                        <div className="p-6">
                          <div className="flex space-x-4">
                            <img
                              src={course.thumbnail || "/placeholder.svg"}
                              alt={course.title}
                              className="w-24 h-16 object-cover rounded-xl"
                            />
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-white mb-2">{course.title}</h4>
                              <p className="text-purple-400 text-sm mb-2">by @{course.creator}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span>{course.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{course.students}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{course.duration}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-green-400">{course.price}</span>
                                <NeonButton variant="secondary" size="sm" glow>
                                  Enroll Now
                                </NeonButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="creators">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.creators.map((creator) => (
                    <GlassCard key={creator.id} variant="premium" className="group hover:scale-105 cursor-pointer">
                      <div className="p-6 flex items-center space-x-4">
                        <Avatar className="w-16 h-16 ring-4 ring-white/20 group-hover:ring-white/40 transition-all">
                          <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {creator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-lg font-bold text-white">{creator.name}</h4>
                            {creator.verified && <Star className="w-4 h-4 text-blue-400 fill-current" />}
                          </div>
                          <p className="text-purple-400 text-sm mb-2">@{creator.username}</p>
                          <p className="text-gray-400 text-sm mb-3">{creator.bio}</p>
                          <div className="flex items-center space-x-4">
                            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                              {creator.category}
                            </Badge>
                            <span className="text-sm text-gray-400">{creator.followers} followers</span>
                          </div>
                        </div>
                        <NeonButton variant="primary" size="sm" glow>
                          Follow
                        </NeonButton>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reels">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {searchResults.reels.map((reel) => (
                    <GlassCard key={reel.id} variant="glow" className="group hover:scale-105 cursor-pointer">
                      <div className="relative">
                        <img
                          src={reel.thumbnail || "/placeholder.svg"}
                          alt={reel.title}
                          className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-black/50 text-white text-xs">{reel.duration}</Badge>
                            <div className="flex items-center space-x-1 text-white text-xs">
                              <Eye className="w-3 h-3" />
                              <span>{reel.views}</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2">{reel.title}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>@{reel.creator}</span>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{reel.likes}</span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="courses">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.courses.map((course) => (
                    <GlassCard key={course.id} variant="premium" className="group hover:scale-105 cursor-pointer">
                      <div className="p-6">
                        <div className="flex space-x-4">
                          <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            className="w-24 h-16 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-white mb-2">{course.title}</h4>
                            <p className="text-purple-400 text-sm mb-2">by @{course.creator}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span>{course.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{course.students}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-green-400">{course.price}</span>
                              <NeonButton variant="secondary" size="sm" glow>
                                Enroll Now
                              </NeonButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
