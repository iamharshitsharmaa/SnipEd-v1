"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { VerticalVideoPlayer } from "@/components/video/vertical-video-player"
import { mockReels } from "@/lib/mockData"

export default function FeedPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in px)
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
    const isUpSwipe = distance > minSwipeDistance
    const isDownSwipe = distance < -minSwipeDistance

    if (isUpSwipe && currentIndex < mockReels.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (isDownSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Handle keyboard navigation
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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-screen overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex flex-col transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(-${currentIndex * 100}vh)`,
            height: `${mockReels.length * 100}vh`,
          }}
        >
          {mockReels.map((reel, index) => (
            <div key={reel.id} className="h-screen flex-shrink-0">
              <VerticalVideoPlayer
                reel={reel}
                isActive={index === currentIndex}
                onLike={(reelId) => {
                  console.log("Liked reel:", reelId)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Video Progress Indicators */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-2 md:right-4">
        {mockReels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1 h-8 md:w-1.5 md:h-12 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Swipe Hint - Only show on first load */}
      {currentIndex === 0 && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20 text-white/60 text-center animate-bounce md:hidden">
          <div className="text-xs">Swipe up for next video</div>
          <div className="text-2xl mt-1">↑</div>
        </div>
      )}
    </div>
  )
}
