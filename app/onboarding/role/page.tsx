"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackButton } from "@/components/ui/back-button"
import { User, GraduationCap, Building, BookOpen, Video, Briefcase, Heart } from "lucide-react"

const roles = [
  {
    id: "student",
    title: "Student",
    description: "I want to learn new skills and advance my knowledge",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    features: ["Access to courses", "Track progress", "Join communities", "Get certificates"],
  },
  {
    id: "creator",
    title: "Content Creator",
    description: "I want to share my knowledge and create educational content",
    icon: Video,
    color: "from-purple-500 to-pink-500",
    features: ["Upload videos", "Create courses", "Build audience", "Monetize content"],
  },
  {
    id: "educator",
    title: "Educator",
    description: "I'm a teacher or instructor looking to reach more students",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
    features: ["Structured courses", "Student management", "Assessment tools", "Analytics"],
  },
  {
    id: "professional",
    title: "Professional",
    description: "I want to upskill for my career or business",
    icon: Briefcase,
    color: "from-orange-500 to-red-500",
    features: ["Industry courses", "Skill assessments", "Career guidance", "Networking"],
  },
  {
    id: "hobbyist",
    title: "Hobbyist",
    description: "I'm exploring new interests and creative pursuits",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    features: ["Creative courses", "Community projects", "Inspiration feed", "Skill sharing"],
  },
  {
    id: "organization",
    title: "Organization",
    description: "I represent a company or institution",
    icon: Building,
    color: "from-indigo-500 to-purple-500",
    features: ["Team management", "Custom content", "Progress tracking", "Bulk licensing"],
  },
]

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedRole) {
      // Store the selected role in localStorage or context
      localStorage.setItem("userRole", selectedRole)
      router.push("/onboarding/interests")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton
            href="/auth"
            label="Back to Sign In"
            className="bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80"
          />
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">What brings you to SnipEd?</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Help us personalize your experience by telling us your primary goal
            </p>
          </div>

          {/* Role Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-300 border-2 ${
                  selectedRole === role.id
                    ? "border-purple-500 bg-purple-500/10 scale-105"
                    : "border-white/10 bg-black/40 hover:border-white/20 hover:bg-black/60"
                } backdrop-blur-md`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{role.title}</CardTitle>
                  <CardDescription className="text-gray-400 text-center">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedRole}
              className="px-12 py-3 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </Button>
            <p className="text-gray-400 text-sm mt-4">Don't worry, you can change this later in your settings</p>
          </div>
        </div>
      </div>
    </div>
  )
}
