"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ArrowRight, Sparkles, Users, BookOpen, Zap, Star, TrendingUp, Eye, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const categories = [
  {
    name: "Comedy",
    icon: "😂",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    count: "2.1M",
    description: "Laugh out loud",
  },
  {
    name: "Tech",
    icon: "⚡",
    gradient: "from-blue-400 via-cyan-500 to-teal-500",
    count: "1.8M",
    description: "Future is now",
  },
  {
    name: "Coding",
    icon: "💻",
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    count: "1.2M",
    description: "Build the future",
  },
  {
    name: "Education",
    icon: "🎓",
    gradient: "from-purple-400 via-violet-500 to-indigo-500",
    count: "950K",
    description: "Learn anything",
  },
  {
    name: "Skincare",
    icon: "✨",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    count: "1.5M",
    description: "Glow up journey",
  },
]

const creators = [
  {
    name: "Alex Chen",
    category: "Tech",
    followers: "2.3M",
    avatar: "/placeholder.svg?height=80&width=80&text=AC",
    verified: true,
  },
  {
    name: "Sarah Kim",
    category: "Skincare",
    followers: "1.8M",
    avatar: "/placeholder.svg?height=80&width=80&text=SK",
    verified: true,
  },
  {
    name: "Mike Johnson",
    category: "Comedy",
    followers: "3.1M",
    avatar: "/placeholder.svg?height=80&width=80&text=MJ",
    verified: true,
  },
]

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Live now: 50K+ creators online</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Snip.
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Learn.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Master.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The world's first distraction-free learning platform. Snip knowledge into bite-sized content, focus deeply,
            and master skills through vertical videos.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-12 py-6 rounded-2xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 group"
              >
                <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Start Learning Free
              </Button>
            </Link>
            <Link href="/categories">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/5 text-lg px-12 py-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Explore Categories
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Active Creators", value: "50K+", icon: Users },
              { label: "Video Hours", value: "2M+", icon: Play },
              { label: "Course Sales", value: "$10M+", icon: TrendingUp },
              { label: "Happy Learners", value: "1M+", icon: Heart },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform backdrop-blur-sm border border-white/10">
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Focus</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">One category. Zero distractions. Maximum learning.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer group hover:scale-105 hover:shadow-2xl"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${category.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {category.count}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">SnipEd</span>
            ?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Zap,
              title: "Distraction-Free",
              description: "One category at a time. No mixed feeds. Pure focus.",
              gradient: "from-yellow-400 to-orange-500",
            },
            {
              icon: Users,
              title: "Expert Creators",
              description: "Learn from specialists who master their craft.",
              gradient: "from-purple-400 to-pink-500",
            },
            {
              icon: BookOpen,
              title: "Premium Courses",
              description: "Structured learning paths with certification.",
              gradient: "from-blue-400 to-cyan-500",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 group hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Creators Spotlight */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Stars</span>
          </h2>
          <p className="text-xl text-gray-300">Top creators sharing their expertise</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {creators.map((creator, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 group hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <img
                    src={creator.avatar || "/placeholder.svg"}
                    alt={creator.name}
                    className="w-20 h-20 rounded-full mx-auto border-4 border-purple-500/50 group-hover:border-purple-400 transition-colors"
                  />
                  {creator.verified && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white fill-current" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{creator.name}</h3>
                <p className="text-purple-400 text-sm mb-2">{creator.category} Expert</p>
                <p className="text-gray-400 text-sm">{creator.followers} followers</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Learning?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the revolution of focused, distraction-free education. Your future self will thank you.
            </p>
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xl px-16 py-8 rounded-2xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 group"
              >
                <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Start Your Journey
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-white">SnipEd</span>
            </div>
            <div className="text-gray-400 text-sm">© 2025 SnipEd. Crafted with ❤️ for focused learners.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
