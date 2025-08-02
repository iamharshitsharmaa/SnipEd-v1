"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Target,
  Users,
  BookOpen,
  Zap,
  Heart,
  Globe,
  Award,
  TrendingUp,
  Star,
  Rocket,
  Brain,
  Eye,
  Clock,
} from "lucide-react"

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    avatar: "/placeholder.svg?height=80&width=80&text=AC",
    bio: "Former educator turned tech entrepreneur, passionate about revolutionizing online learning.",
  },
  {
    name: "Sarah Kim",
    role: "Head of Product",
    avatar: "/placeholder.svg?height=80&width=80&text=SK",
    bio: "UX designer with 8+ years creating intuitive learning experiences for millions of users.",
  },
  {
    name: "Mike Rodriguez",
    role: "CTO",
    avatar: "/placeholder.svg?height=80&width=80&text=MR",
    bio: "Full-stack engineer who built scalable platforms for top tech companies.",
  },
  {
    name: "Jenny Wilson",
    role: "Head of Community",
    avatar: "/placeholder.svg?height=80&width=80&text=JW",
    bio: "Community builder who grew creator ecosystems from zero to millions of users.",
  },
]

const stats = [
  { label: "Active Learners", value: "2.5M+", icon: Users, color: "from-blue-400 to-cyan-500" },
  { label: "Expert Creators", value: "50K+", icon: Star, color: "from-purple-400 to-pink-500" },
  { label: "Learning Hours", value: "100M+", icon: Clock, color: "from-green-400 to-emerald-500" },
  { label: "Success Stories", value: "500K+", icon: Award, color: "from-amber-400 to-orange-500" },
]

const values = [
  {
    title: "Focus First",
    description: "We believe distraction-free learning leads to deeper understanding and faster skill acquisition.",
    icon: Target,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Creator Empowerment",
    description: "We provide creators with tools and monetization opportunities to share their expertise globally.",
    icon: Rocket,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Bite-sized Brilliance",
    description: "Complex topics broken down into digestible, engaging short-form content that sticks.",
    icon: Brain,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Community Driven",
    description: "Learning is social. We foster connections between learners and creators worldwide.",
    icon: Heart,
    gradient: "from-red-500 to-pink-500",
  },
]

export default function AboutPage() {
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
      {/* Ultra-futuristic background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-black to-purple-900/10" />
        <div
          className="absolute w-[900px] h-[900px] bg-gradient-to-r from-purple-500/2 via-pink-500/2 to-blue-500/2 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 450,
            top: mousePosition.y - 450,
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div className="absolute top-1/6 right-1/6 w-96 h-96 bg-gradient-to-r from-cyan-500/2 to-teal-500/2 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/6 left-1/6 w-80 h-80 bg-gradient-to-r from-pink-500/2 to-purple-500/2 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-purple-300">Our Story</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              About
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              SnipEd
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            We're revolutionizing education by making learning focused, engaging, and accessible through bite-sized
            vertical content. Join millions who are mastering new skills, one snip at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <NeonButton variant="primary" size="lg" glow>
              <Users className="w-5 h-5 mr-2" />
              Join Our Community
            </NeonButton>
            <NeonButton variant="outline" size="lg">
              <BookOpen className="w-5 h-5 mr-2" />
              Learn More
            </NeonButton>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-20">
          <GlassCard variant="premium">
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                To democratize education by creating a distraction-free learning environment where knowledge is
                delivered in perfectly crafted, bite-sized content that maximizes retention and engagement.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Focus</h3>
                  <p className="text-gray-400 text-sm">One category, zero distractions</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Engage</h3>
                  <p className="text-gray-400 text-sm">Interactive, bite-sized learning</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Master</h3>
                  <p className="text-gray-400 text-sm">Accelerated skill acquisition</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              SnipEd by the{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Numbers</span>
            </h2>
            <p className="text-xl text-gray-300">Our impact on the global learning community</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <GlassCard key={index} variant="glow" className="group hover:scale-105 cursor-pointer">
                <div className="p-8 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <GlassCard key={index} variant="premium" className="group hover:scale-105">
                <div className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet the{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-gray-300">The passionate minds behind SnipEd</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <GlassCard key={index} variant="premium" className="group hover:scale-105">
                <div className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                    <Avatar className="relative w-20 h-20 mx-auto ring-4 ring-white/20 group-hover:ring-white/40 transition-all">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg font-bold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 mb-4">
                    {member.role}
                  </Badge>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Join Us Section */}
        <div className="text-center">
          <GlassCard variant="premium">
            <div className="p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join the{" "}
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Revolution
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to transform how the world learns? Whether you're a creator, learner, or educator, there's a place
                for you in the SnipEd community.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <NeonButton variant="primary" size="lg" glow>
                  <Rocket className="w-5 h-5 mr-2" />
                  Become a Creator
                </NeonButton>
                <NeonButton variant="secondary" size="lg" glow>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Learning
                </NeonButton>
                <NeonButton variant="outline" size="lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Join Our Team
                </NeonButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
