"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Search, Bell, Settings, User, BookOpen, Video, TrendingUp, Award, LogOut, Plus } from "lucide-react"

interface MobileNavbarProps {
  user?: {
    name: string
    username: string
    avatar: string
    followers: number
    following: number
    courses: number
  }
}

export function MobileNavbar({ user }: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">SnipEd</span>
          </Link>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-white">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500" />
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-white">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slide-out Menu */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleMenu} />

        {/* Menu Content */}
        <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-l border-white/10">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-white font-semibold text-lg">Menu</h2>
              <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-white">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* User Profile Section */}
            {user && (
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold">{user.name}</h3>
                    <p className="text-gray-400 text-sm">@{user.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white font-semibold">{user.followers}</p>
                    <p className="text-gray-400 text-xs">Followers</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{user.following}</p>
                    <p className="text-gray-400 text-xs">Following</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{user.courses}</p>
                    <p className="text-gray-400 text-xs">Courses</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex-1 p-4 space-y-2">
              <Link href="/profile" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </Button>
              </Link>

              <Link href="/courses" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  <BookOpen className="w-5 h-5 mr-3" />
                  My Courses
                </Button>
              </Link>

              <Link href="/courses/create" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  <Plus className="w-5 h-5 mr-3" />
                  Create Course
                </Button>
              </Link>

              <Link href="/feed" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  <Video className="w-5 h-5 mr-3" />
                  Video Feed
                </Button>
              </Link>

              <Link href="/explore" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  Explore
                </Button>
              </Link>

              <Link href="/achievements" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  <Award className="w-5 h-5 mr-3" />
                  Achievements
                </Button>
              </Link>

              <Link href="/settings" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Button>
              </Link>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-red-900/20">
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
