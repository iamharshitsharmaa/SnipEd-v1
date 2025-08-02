"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Play, Compass, User } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export function MobileBottomNav() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Feed", href: "/feed", icon: Play },
    { name: "Explore", href: "/explore", icon: Compass },
    {
      name: "Profile",
      href: user ? `/profile/${user.user_metadata?.username || user.id}` : "/auth",
      icon: User,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-white/10 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            onClick={() => router.push(item.href)}
            className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
              isActive(item.href) ? "text-purple-400" : "text-gray-400 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
