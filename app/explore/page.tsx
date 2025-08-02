"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  TrendingUp,
  Star,
  Users,
  Play,
  Eye,
  Filter,
  Sparkles,
  Crown,
  Zap,
  FlameIcon as Fire,
} from "lucide-react"

const trendingCreators = [
  {
    id: "1",
    username: "techguru_alex",
    name: "Alex Chen",
    category: "Tech",
    followers: "3.2M",
    avatar: "/placeholder.svg?height=80&width=80&text=AC",
    verified: true,
    tier: "diamond",
    gradient: "from-blue-400 to-cyan-500",
    totalViews: "45M",
    engagement: "12.5%",
  },
  {
    id: "2",
    username: "skincare_sarah",
    name: "Sarah Kim",
    category: "Skincare",
    followers: "2.8M",
    avatar: "/placeholder.svg?height=80&width=80&text=SK",
    verified: true,
    tier: "gold",
    gradient: "from-pink-400 to-rose-500",
    totalViews: "38M",
    engagement: "15.2%",
  },
  {
    id: "3",
    username: "code_master_mike",
    name: "Mike Rodriguez",
    category: "Coding",
    followers: "1.9M",
    avatar: "/placeholder.svg?height=80&width=80&text=MR",
    verified: true,
    tier: "platinum",
    gradient: "from-green-400 to-emerald-500",
    totalViews: "29M",
    engagement: "18.7%",
  },
  {
    id: "4",
    username: "funny_jenny",
    name: "Jenny Wilson",
    category: "Comedy",
    followers: "4.1M",
    avatar: "/placeholder.svg?height=80&width=80&text=JW",
    verified: true,
    tier: "diamond",
    gradient: "from-amber-400 to-orange-500",
    totalViews: "67M",
    engagement: "22.1%",
  },
]

const categories = [
  { name: "All", count: "∞", active: true },
  { name: "Tech", count: "1.2M", active: false },
  { name: "Comedy", count: "2.1M", active: false },
  { name: "Coding", count: "950K", active: false },
  { name: "Skincare", count: "1.5M", active: false },
  { name: "Education", count: "800K", active: false },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "diamond":
        return <Crown className="w-4 h-4 text-cyan-400" />
      case "platinum":
        return <Star className="w-4 h-4 text-gray-300" />
      case "gold":
        return <Zap className="w-4 h-4 text-yellow-400" />
      default:
        return <Fire className="w-4 h-4 text-orange-400" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ultra-modern animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
        <div
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-gradient-to-r from-cyan-500/3 to-teal-500/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-r from-pink-500/3 to-purple-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-purple-300">Discover Amazing Creators</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Explore
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Creators
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover the most talented creators across all categories. Find your next favorite content creator.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search creators, categories, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>
            <NeonButton variant="ghost" className="px-6 py-4">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </NeonButton>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/5 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/10"
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-70">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Trending Now</h2>
                <p className="text-gray-400">Hottest creators this week</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2">
              <Fire className="w-4 h-4 mr-2" />
              Hot
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCreators.map((creator, index) => (
              <GlassCard key={creator.id} variant="premium" className="group hover:scale-105 cursor-pointer">
                <div className="p-6">
                  {/* Creator Avatar and Tier */}
                  <div className="relative mb-6">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${creator.gradient} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity`}
                    />
                    <Avatar className="relative w-20 h-20 mx-auto ring-4 ring-white/20 group-hover:ring-white/40 transition-all">
                      <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg font-bold">
                        {creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      {getTierIcon(creator.tier)}
                    </div>
                    {creator.verified && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Creator Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">{creator.name}</h3>
                    <p className="text-purple-400 text-sm mb-2">@{creator.username}</p>
                    <Badge
                      className={`bg-gradient-to-r ${creator.gradient.replace("to-", "to-").replace("from-", "from-")}/20 text-white border-0 text-xs`}
                    >
                      {creator.category}
                    </Badge>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-4 h-4 text-purple-400 mr-1" />
                        <span className="text-sm font-bold text-white">{creator.followers}</span>
                      </div>
                      <div className="text-xs text-gray-400">Followers</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Eye className="w-4 h-4 text-pink-400 mr-1" />
                        <span className="text-sm font-bold text-white">{creator.totalViews}</span>
                      </div>
                      <div className="text-xs text-gray-400">Views</div>
                    </div>
                  </div>

                  {/* Engagement Rate */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Engagement</span>
                      <span className="text-xs font-bold text-green-400">{creator.engagement}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: creator.engagement }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <NeonButton variant="primary" size="sm" className="flex-1" glow>
                      <Users className="w-4 h-4 mr-2" />
                      Follow
                    </NeonButton>
                    <NeonButton variant="ghost" size="sm" className="px-3">
                      <Play className="w-4 h-4" />
                    </NeonButton>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
              <p className="text-gray-400">Find creators in your favorite topics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Tech", icon: "⚡", count: "1.2M", gradient: "from-blue-400 to-cyan-500" },
              { name: "Comedy", icon: "😂", count: "2.1M", gradient: "from-amber-400 to-orange-500" },
              { name: "Coding", icon: "💻", count: "950K", gradient: "from-green-400 to-emerald-500" },
              { name: "Skincare", icon: "✨", count: "1.5M", gradient: "from-pink-400 to-rose-500" },
              { name: "Education", icon: "🎓", count: "800K", gradient: "from-purple-400 to-indigo-500" },
            ].map((category) => (
              <GlassCard key={category.name} variant="glow" className="group hover:scale-105 cursor-pointer">
                <div className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm">{category.count} creators</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <NeonButton variant="outline" size="lg" className="px-12">
            Load More Creators
            <TrendingUp className="w-5 h-5 ml-2" />
          </NeonButton>
        </div>
      </div>
    </div>
  )
}
