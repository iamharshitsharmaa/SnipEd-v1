"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { VerticalVideoPlayer } from "@/components/video/vertical-video-player"
import { mockReels } from "@/lib/mockData"
import {
  ArrowLeft,
  Camera,
  Home,
  Search,
  Compass,
  PlaySquare,
  MessageCircle,
  Bell,
  CircleUserRound,
  PlusSquare,
  Menu, // New icon for the "More" option
} from "lucide-react"
import { MessageOverlay } from "@/components/messages/message-overlay"
import { ShareOverlay } from "@/components/share/share-overlay"

// Sidebar navigation items with functional links
const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: PlaySquare, label: "Feed", href: "/feed" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: PlusSquare, label: "Create", href: "/create" },
  { icon: CircleUserRound, label: "Profile", href: "/profile" },
]

export default function FeedPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [activeMessageReelId, setActiveMessageReelId] = useState<string | null>(null)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [activeShareReelId, setActiveShareReelId] = useState<string | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance && currentIndex < mockReels.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (distance < -minSwipeDistance && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (e.key === "ArrowDown" && currentIndex < mockReels.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  const handleMessage = (reelId: string) => {
    setActiveMessageReelId(reelId)
    setIsMessageOpen(true)
  }

  const handleShare = (reelId: string) => {
    setActiveShareReelId(reelId)
    setIsShareOpen(true)
  }

  const Sidebar = () => (
    <aside className="hidden md:flex flex-col w-64 border-r border-neutral-800 p-4">
      <div className="text-3xl font-black mb-10 pl-3 pt-3 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
        SnipEd
      </div>
      <nav className="flex flex-col space-y-2 flex-grow">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => {
              e.preventDefault()
              router.push(item.href)
            }}
            className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-neutral-800/60 transition-colors cursor-pointer ${
              item.label === "Feed" ? "font-extrabold bg-neutral-800" : "font-medium"
            }`}
          >
            <item.icon size={28} strokeWidth={item.label === "Feed" ? 2.5 : 2} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      {/* "More" option at the bottom */}
      <div className="mt-auto">
        <a
          href="/settings"
          onClick={(e) => {
            e.preventDefault()
            router.push("/settings")
          }}
          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-neutral-800/60 transition-colors cursor-pointer font-medium"
        >
          <Menu size={28} strokeWidth={2} />
          <span>More</span>
        </a>
      </div>
    </aside>
  )

  return (
    <div className="flex flex-row h-screen bg-black text-white">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center items-center overflow-hidden">
        {/* Feed Container */}
        <div className="h-full w-full max-w-lg bg-black relative overflow-hidden">
          {/* Header for Mobile */}
          <header className="absolute md:hidden top-0 left-0 right-0 z-30 p-4 bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex justify-between items-center">
              <button onClick={() => router.push("/")} className="text-white p-2">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-white text-xl font-bold">Feed</h1>
              <button className="text-white p-2">
                <Camera size={24} />
              </button>
            </div>
          </header>

          {/* Video Container */}
          <div
            className="h-full overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex flex-col transition-transform duration-300 ease-out h-full"
              style={{ transform: `translateY(-${currentIndex * 100}%)` }}
            >
              {mockReels.map((reel, index) => (
                <div key={reel.id} className="h-full flex-shrink-0" >
                  <VerticalVideoPlayer
                    reel={reel}
                    isActive={index === currentIndex}
                    onLike={(reelId) => console.log("Liked reel:", reelId)}
                    onMessage={handleMessage}
                    onShare={handleShare}  // Add this prop
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-y-2">
            {mockReels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-10 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white" : "bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          {currentIndex === 0 && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-white/60 text-center animate-bounce md:hidden">
              <div className="text-xs">Swipe up</div>
              <svg className="w-6 h-6 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
              </svg>
            </div>
          )}
        </div>
      </main>

      {/* Add MessageOverlay */}
      <MessageOverlay
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        reelId={activeMessageReelId || ""}
      />

      {/* Add ShareOverlay */}
      <ShareOverlay
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        reelId={activeShareReelId || ""}
      />
    </div>
  )
}