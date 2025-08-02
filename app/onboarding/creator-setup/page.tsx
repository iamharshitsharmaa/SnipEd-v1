"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Check, Upload, Camera, Star, Users, DollarSign, TrendingUp, Crown, Target } from "lucide-react"

const categories = [
  { id: "tech", name: "Technology", icon: "⚡", gradient: "from-blue-400 to-cyan-500" },
  { id: "coding", name: "Programming", icon: "💻", gradient: "from-green-400 to-emerald-500" },
  { id: "comedy", name: "Comedy", icon: "😂", gradient: "from-amber-400 to-orange-500" },
  { id: "skincare", name: "Beauty & Skincare", icon: "✨", gradient: "from-pink-400 to-rose-500" },
  { id: "education", name: "Education", icon: "🎓", gradient: "from-purple-400 to-indigo-500" },
  { id: "business", name: "Business", icon: "💼", gradient: "from-gray-400 to-slate-500" },
  { id: "fitness", name: "Health & Fitness", icon: "💪", gradient: "from-red-400 to-pink-500" },
  { id: "art", name: "Art & Design", icon: "🎨", gradient: "from-violet-400 to-purple-500" },
]

export default function CreatorSetupPage() {
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    category: "",
    website: "",
    instagram: "",
    youtube: "",
    twitter: "",
  })
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push("/upload")
  }

  const isFormValid = formData.displayName && formData.bio && formData.category

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ultra-futuristic background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10" />
        <div
          className="absolute w-[700px] h-[700px] bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 350,
            top: mousePosition.y - 350,
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/3 to-red-500/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/3 to-purple-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
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
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-full px-6 py-3 mb-8">
            <Crown className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-purple-300">Creator Profile Setup</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Build your
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Creator Profile
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Set up your creator profile to start sharing your expertise and building your audience on SnipEd.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <GlassCard variant="premium">
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Profile Image */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                        {profileImage ? (
                          <img
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profile-image"
                      />
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Upload className="w-5 h-5 text-white" />
                      </label>
                    </div>
                    <p className="text-gray-400 text-sm">Upload your profile picture</p>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="displayName" className="text-white font-medium">
                        Display Name *
                      </Label>
                      <Input
                        id="displayName"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        placeholder="Your creator name"
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white font-medium">
                        Primary Category *
                      </Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white"
                        required
                      >
                        <option value="">Select your main category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white font-medium">
                      Bio *
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell your audience about yourself and what you create..."
                      rows={4}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl"
                      required
                    />
                    <p className="text-gray-400 text-sm">{formData.bio.length}/500 characters</p>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Social Links (Optional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="website" className="text-white font-medium">
                          Website
                        </Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://yourwebsite.com"
                          className="bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instagram" className="text-white font-medium">
                          Instagram
                        </Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleInputChange}
                          placeholder="@yourusername"
                          className="bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="youtube" className="text-white font-medium">
                          YouTube
                        </Label>
                        <Input
                          id="youtube"
                          name="youtube"
                          value={formData.youtube}
                          onChange={handleInputChange}
                          placeholder="@yourchannel"
                          className="bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter" className="text-white font-medium">
                          Twitter/X
                        </Label>
                        <Input
                          id="twitter"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleInputChange}
                          placeholder="@yourusername"
                          className="bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <NeonButton variant="ghost" onClick={() => router.back()}>
                      Back
                    </NeonButton>
                    <NeonButton type="submit" variant="primary" disabled={!isFormValid} glow={isFormValid}>
                      Complete Setup
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </NeonButton>
                  </div>
                </form>
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Benefits */}
            <GlassCard variant="glow">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Creator Benefits</h3>
                    <p className="text-gray-400 text-sm">What you get as a SnipEd creator</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                    <span className="text-gray-300 text-sm">Monetize through courses and tips</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full" />
                    <span className="text-gray-300 text-sm">Advanced analytics and insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                    <span className="text-gray-300 text-sm">Creator fund opportunities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
                    <span className="text-gray-300 text-sm">Direct fan engagement tools</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Creator Stats */}
            <GlassCard variant="default">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Creator Success Stats</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">$10K+</div>
                    <div className="text-xs text-gray-400">Avg Monthly Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">100K+</div>
                    <div className="text-xs text-gray-400">Avg Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">85%</div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Tips */}
            <GlassCard variant="default">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Pro Tips</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>• Use a clear, high-quality profile picture</p>
                  <p>• Write a compelling bio that shows your expertise</p>
                  <p>• Choose your primary category carefully</p>
                  <p>• Link your social accounts to build trust</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
