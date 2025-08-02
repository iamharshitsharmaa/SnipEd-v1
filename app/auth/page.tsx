"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/ui/back-button"
import { useAuth } from "@/components/auth-provider"
import { toast } from "@/hooks/use-toast"
import { Eye, EyeOff, Mail, Lock, User, AtSign, Star, Users, BookOpen, Play } from "lucide-react"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  const [signUpData, setSignUpData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  })

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(signInData.email, signInData.password)
      toast({ title: "Welcome back!", description: "You've been signed in successfully." })
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signUp(signUpData.email, signUpData.password, {
        full_name: signUpData.fullName,
        username: signUpData.username,
      })
      toast({
        title: "Account created!",
        description: "Welcome to SnipEd! Your account has been created successfully.",
      })
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again with different details.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex flex-col">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10 md:top-6 md:left-6">
        <BackButton href="/" label="Back to Home" />
      </div>

      {/* Mobile Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Branding (Hidden on mobile, shown on desktop) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  SnipEd
                </h1>
                <p className="text-gray-400 text-sm">Learn. Create. Master.</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm mb-6">
                <Star className="w-4 h-4" />
                <span>Join the Learning Revolution</span>
              </div>

              <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                Welcome to <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SnipEd
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Master new skills through bite-sized, focused learning. Join millions of learners and creators shaping
                the future of education.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-xl mb-3 mx-auto">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">2.5M+</div>
                <div className="text-sm text-gray-400">Learners</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500/20 rounded-xl mb-3 mx-auto">
                  <Star className="w-6 h-6 text-pink-400" />
                </div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Creators</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl mb-3 mx-auto">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-gray-400">Courses</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-xl mb-3 mx-auto">
                  <Play className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-sm text-gray-400">Videos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Header (Only shown on mobile) */}
            <div className="text-center mb-8 lg:hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">SnipEd</h1>
              <p className="text-gray-400 text-sm">Learn. Create. Master.</p>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-6 lg:mb-8">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg lg:text-2xl">S</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">Get Started</h2>
                <p className="text-gray-400 text-sm lg:text-base">Create your account or sign in</p>
              </div>

              {/* Toggle Buttons */}
              <div className="flex bg-white/10 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    isSignUp ? "bg-purple-500 text-white shadow-lg" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    !isSignUp ? "bg-purple-500 text-white shadow-lg" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
              </div>

              {/* Forms */}
              {isSignUp ? (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white text-sm">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white text-sm">
                      Username
                    </Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        placeholder="your_username"
                        value={signUpData.username}
                        onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white text-sm">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account →"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-white text-sm">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-white text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In →"}
                  </Button>
                </form>
              )}

              {/* Footer */}
              <div className="mt-6 text-center">
                {!isSignUp && (
                  <a href="#" className="text-sm text-blue-400 hover:underline mb-4 block">
                    Forgot your password?
                  </a>
                )}
                <p className="text-xs lg:text-sm text-gray-400">
                  By continuing, you agree to our{" "}
                  <a href="/terms" className="text-blue-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
