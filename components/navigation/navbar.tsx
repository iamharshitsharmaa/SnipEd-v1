"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { AuthModal } from "@/components/auth/auth-modal"
import { Search, Menu, Bell, Settings, User, LogOut, BookOpen, Play, Upload, Home, Compass } from "lucide-react"

export function Navbar() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Feed", href: "/feed", icon: Play },
    { name: "Explore", href: "/explore", icon: Compass },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">SnipEd</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search courses, videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </form>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search Button - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => router.push("/search")}
              >
                <Search className="w-5 h-5" />
              </Button>

              {user ? (
                <>
                  {/* Upload Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex text-white hover:bg-white/10"
                    onClick={() => router.push("/upload")}
                  >
                    <Upload className="w-5 h-5" />
                  </Button>

                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="hidden sm:flex text-white hover:bg-white/10 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback className="bg-purple-600 text-white">
                            {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700" align="end">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium text-white">{user.user_metadata?.full_name || "User"}</p>
                          <p className="w-[200px] truncate text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem
                        className="text-gray-300 hover:text-white hover:bg-gray-800"
                        onClick={() => router.push(`/profile/${user.user_metadata?.username || user.id}`)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-gray-300 hover:text-white hover:bg-gray-800"
                        onClick={() => router.push("/settings")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-gray-300 hover:text-white hover:bg-gray-800"
                        onClick={() => router.push("/upload")}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem
                        className="text-red-400 hover:text-red-300 hover:bg-gray-800"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => setShowAuthModal(true)}
                    className="text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Get Started
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-gray-900 border-gray-700 w-80">
                  <div className="flex flex-col space-y-6 mt-6">
                    {/* User Info - Mobile */}
                    {user && (
                      <div className="flex items-center space-x-3 pb-4 border-b border-gray-700">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback className="bg-purple-600 text-white">
                            {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{user.user_metadata?.full_name || "User"}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    )}

                    {/* Navigation Links */}
                    <div className="space-y-3">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>

                    {user ? (
                      <div className="space-y-3 pt-4 border-t border-gray-700">
                        <Link
                          href="/upload"
                          className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Upload className="w-5 h-5" />
                          <span>Upload</span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Settings className="w-5 h-5" />
                          <span>Settings</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleSignOut()
                            setMobileMenuOpen(false)
                          }}
                          className="flex items-center space-x-3 text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-white/10 w-full text-left"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-4 border-t border-gray-700">
                        <Button
                          onClick={() => {
                            setShowAuthModal(true)
                            setMobileMenuOpen(false)
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        >
                          Get Started
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  )
}
