"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth/auth-modal"
import { useAuth } from "@/components/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  ChevronDown,
  Home,
  Compass,
  BookOpen,
  Search,
  Upload,
  Settings,
  LogOut,
  Play,
  Star,
  Crown,
} from "lucide-react"

export function Navbar() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user, loading, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getUserStats = () => ({
    followers: 1234,
    following: 567,
    videos: 89,
  })

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <div className="text-white font-bold text-xl">SnipEd</div>
                <div className="text-gray-400 text-xs">Learn. Create. Master.</div>
              </div>
            </div>
            <div className="w-32 h-8 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="fixed left-0 right-0 z-50 backdrop-blur-md border-b bg-transparent text-transparent border-none text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <div className="text-white font-bold text-xl">SnipEd</div>
                <div className="text-gray-400 text-xs">Learn. Create. Master.</div>
              </div>
            </Link>

            {/* Navigation Links - Only show when logged in */}
            {user && (
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/explore"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore</span>
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Courses</span>
                </Link>
                <Link
                  href="/search"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </Link>
              </div>
            )}

            {/* Right Side - Auth buttons or User menu */}
            <div className="flex items-center space-x-4">
              {!user ? (
                // Show auth buttons when not logged in
                <>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                // Show My Account dropdown when logged in
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>My Account</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-80 bg-black/90 backdrop-blur-md border border-white/10 text-white"
                  >
                    {/* Profile Header */}
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={user.user_metadata?.avatar_url || "/placeholder.svg"}
                            alt={user.user_metadata?.full_name || "User"}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                            {getUserInitials(user.user_metadata?.full_name || "Demo User")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-white">{user.user_metadata?.full_name || "Demo User"}</h3>
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              <Star className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="bg-purple-500/20 text-purple-400 border-purple-500/30"
                            >
                              <Crown className="w-3 h-3 mr-1" />
                              Creator
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">@{user.user_metadata?.username || "demouser"}</p>
                        </div>
                      </div>

                      {/* User Stats */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">{getUserStats().followers}</div>
                          <div className="text-xs text-gray-400">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">{getUserStats().following}</div>
                          <div className="text-xs text-gray-400">Following</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">{getUserStats().videos}</div>
                          <div className="text-xs text-gray-400">Videos</div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-gray-300 mt-3">
                        🎓 Passionate educator sharing knowledge through bite-sized content
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/profile/${user.user_metadata?.username || "demouser"}`}
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 cursor-pointer"
                        >
                          <User className="w-4 h-4" />
                          <span>View Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/feed"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 cursor-pointer"
                        >
                          <Play className="w-4 h-4" />
                          <span>My Feed</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/upload"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 cursor-pointer"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Upload Content</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/creator"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 cursor-pointer"
                        >
                          <Crown className="w-4 h-4" />
                          <span>Creator Studio</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/settings"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 cursor-pointer"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                    </div>

                    <DropdownMenuSeparator className="bg-white/10" />

                    <div className="py-2">
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-red-500/10 text-red-400 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  )
}
