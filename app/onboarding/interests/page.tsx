"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Users, Play, TrendingUp, Star, Zap, Brain, Target } from "lucide-react"

const categories = [
  {
    id: "tech",
    name: "Technology",
    icon: "⚡",
    gradient: "from-blue-400 to-cyan-500",
    description: "Latest tech trends, gadgets, and innovations",
    creators: "8.9K",
    videos: "1.8M",
    trending: true,
  },
  {
    id: "coding",
    name: "Programming",
    icon: "💻",
    gradient: "from-green-400 to-emerald-500",
    description: "Learn to code with tutorials and tips",
    creators: "15.2K",
    videos: "1.2M",
    trending: true,
  },
  {
    id: "comedy",
    name: "Comedy",
    icon: "😂",
    gradient: "from-amber-400 to-orange-500",
    description: "Laugh and learn with entertaining content",
    creators: "12.5K",
    videos: "2.1M",
    trending: false,
  },
  {
    id: "skincare",
    name: "Beauty & Skincare",
    icon: "✨",
    gradient: "from-pink-400 to-rose-500",
    description: "Beauty tips, skincare routines, and wellness",
    creators: "9.3K",
    videos: "1.5M",
    trending: true,
  },
  {
    id: "education",
    name: "Education",
    icon: "🎓",
    gradient: "from-purple-400 to-indigo-500",
    description: "Academic subjects and general knowledge",
    creators: "6.7K",
    videos: "950K",
    trending: false,
  },
  {
    id: "business",
    name: "Business",
    icon: "💼",
    gradient: "from-gray-400 to-slate-500",
    description: "Entrepreneurship, marketing, and finance",
    creators: "4.2K",
    videos: "680K",
    trending: false,
  },
  {
    id: "fitness",
    name: "Health & Fitness",
    icon: "💪",
    gradient: "from-red-400 to-pink-500",
    description: "Workout routines, nutrition, and wellness",
    creators: "7.1K",
    videos: "890K",
    trending: false,
  },
  {
    id: "art",
    name: "Art & Design",
    icon: "🎨",
    gradient: "from-violet-400 to-purple-500",
    description: "Creative tutorials and design inspiration",
    creators: "5.8K",
    videos: "720K",
    trending: false,
  },
  {
    id: "music",
    name: "Music",
    icon: "🎵",
    gradient: "from-teal-400 to-cyan-500",
    description: "Music theory, instruments, and production",
    creators: "3.9K",
    videos: "540K",
    trending: false,
  },
]

export default function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const toggleInterest = (categoryId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleContinue = () => {
    if (selectedInterests.length >= 3) {
      router.push("/categories")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ultra-futuristic background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-black to-purple-900/10" />
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/4 via-purple-500/4 to-pink-500/4 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div className="absolute top-1/5 right-1/5 w-96 h-96 bg-gradient-to-r from-blue-500/2 to-teal-500/2 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/5 left-1/5 w-80 h-80 bg-gradient-to-r from-pink-500/2 to-purple-500/2 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-gray-400 font-bold text-sm">3</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-full px-6 py-3 mb-8">
            <Brain className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-sm font-medium text-indigo-300">Personalize Your Feed</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              What interests
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              you most?
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Select at least 3 categories to help us curate the perfect learning experience for you.
          </p>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Selected: {selectedInterests.length}/3 minimum</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>You can change these anytime</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <GlassCard
              key={category.id}
              variant={selectedInterests.includes(category.id) ? "glow" : "premium"}
              className={`cursor-pointer transition-all duration-500 hover:scale-105 ${
                selectedInterests.includes(category.id) ? "ring-2 ring-indigo-500/50 bg-white/10" : ""
              }`}
              onClick={() => toggleInterest(category.id)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {category.trending && (
                      <Badge className="bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                    {selectedInterests.includes(category.id) && (
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{category.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-indigo-400 mr-1" />
                      <span className="text-sm font-bold text-white">{category.creators}</span>
                    </div>
                    <div className="text-xs text-gray-400">Creators</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Play className="w-4 h-4 text-purple-400 mr-1" />
                      <span className="text-sm font-bold text-white">{category.videos}</span>
                    </div>
                    <div className="text-xs text-gray-400">Videos</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <NeonButton
            variant="primary"
            size="lg"
            onClick={handleContinue}
            disabled={selectedInterests.length < 3}
            glow={selectedInterests.length >= 3}
            className="px-12"
          >
            {selectedInterests.length >= 3 ? (
              <>
                Continue to SnipEd
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              `Select ${3 - selectedInterests.length} more to continue`
            )}
          </NeonButton>

          {selectedInterests.length >= 3 && (
            <p className="text-gray-400 text-sm mt-4">
              Great choices! We'll personalize your feed based on these interests
            </p>
          )}
        </div>

        {/* Bottom Stats */}
        <div className="max-w-4xl mx-auto mt-16">
          <GlassCard variant="default">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">50K+</div>
                  <div className="text-sm text-gray-400">Expert Creators</div>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">10M+</div>
                  <div className="text-sm text-gray-400">Learning Videos</div>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">4.9/5</div>
                  <div className="text-sm text-gray-400">User Rating</div>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">2.5M+</div>
                  <div className="text-sm text-gray-400">Active Learners</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
