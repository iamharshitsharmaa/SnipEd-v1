"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Video, TrendingUp, Clock, Star } from "lucide-react"

const categories = [
  {
    id: "1",
    name: "Comedy",
    icon: "😂",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    count: "2.1M",
    creators: "12.5K",
    description: "Laugh, learn, and lighten up with the funniest creators",
    trending: true,
    avgTime: "3.2min",
  },
  {
    id: "2",
    name: "Tech",
    icon: "⚡",
    gradient: "from-blue-400 via-cyan-500 to-teal-500",
    count: "1.8M",
    creators: "8.9K",
    description: "Stay ahead with cutting-edge technology insights",
    trending: true,
    avgTime: "4.1min",
  },
  {
    id: "3",
    name: "Coding",
    icon: "💻",
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    count: "1.2M",
    creators: "15.2K",
    description: "Master programming through bite-sized tutorials",
    trending: false,
    avgTime: "5.8min",
  },
  {
    id: "4",
    name: "Education",
    icon: "🎓",
    gradient: "from-purple-400 via-violet-500 to-indigo-500",
    count: "950K",
    creators: "6.7K",
    description: "Expand your knowledge across all subjects",
    trending: false,
    avgTime: "6.2min",
  },
  {
    id: "5",
    name: "Skincare",
    icon: "✨",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    count: "1.5M",
    creators: "9.3K",
    description: "Glow up with expert beauty and skincare tips",
    trending: true,
    avgTime: "2.9min",
  },
]

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    // Simulate loading
    setTimeout(() => {
      router.push("/feed")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden pb-20 md:pb-0">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div
          className="absolute w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 144,
            top: mousePosition.y - 144,
            transition: "all 0.3s ease-out",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-gray-300">Choose your learning path</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Pick Your</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Focus Zone
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
            Select one category to unlock distraction-free learning. Switch anytime, but focus on one genre for maximum
            impact.
          </p>

          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 px-4 py-2 md:px-6 text-xs md:text-sm">
            🎯 One category, deeper mastery
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer group hover:scale-105 hover:shadow-2xl ${
                selectedCategory === category.id ? "ring-2 ring-purple-500 bg-white/10" : ""
              }`}
              onClick={() => selectCategory(category.id)}
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${category.gradient} rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <span className="text-xl md:text-2xl">{category.icon}</span>
                  </div>
                  {category.trending && (
                    <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{category.name}</h3>
                <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  {category.description}
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="bg-white/5 rounded-lg md:rounded-xl p-2 md:p-3 text-center">
                    <div className="flex items-center justify-center mb-1 md:mb-2">
                      <Video className="w-3 h-3 md:w-4 md:h-4 text-purple-400 mr-1 md:mr-2" />
                      <span className="text-xs md:text-sm text-gray-300">{category.count}</span>
                    </div>
                    <div className="text-xs text-gray-500">Videos</div>
                  </div>
                  <div className="bg-white/5 rounded-lg md:rounded-xl p-2 md:p-3 text-center">
                    <div className="flex items-center justify-center mb-1 md:mb-2">
                      <Users className="w-3 h-3 md:w-4 md:h-4 text-pink-400 mr-1 md:mr-2" />
                      <span className="text-xs md:text-sm text-gray-300">{category.creators}</span>
                    </div>
                    <div className="text-xs text-gray-500">Creators</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center text-gray-400 text-xs md:text-sm">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    Avg {category.avgTime}
                  </div>
                  <div className="flex items-center text-yellow-400 text-xs md:text-sm">
                    <Star className="w-3 h-3 md:w-4 md:h-4 mr-1 fill-current" />
                    4.8
                  </div>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${category.gradient} hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl text-white font-semibold py-2 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base ${
                    selectedCategory === category.id ? "animate-pulse" : ""
                  }`}
                  disabled={selectedCategory === category.id}
                >
                  {selectedCategory === category.id ? (
                    "Loading..."
                  ) : (
                    <>
                      Start Watching
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Ready to Create?</h3>
            <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
              Share your expertise and build your audience in your chosen category
            </p>
            <Button
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/5 transition-all duration-300 hover:scale-105 bg-transparent rounded-lg md:rounded-xl px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
              onClick={() => router.push("/creator-signup")}
            >
              Become a Creator
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
