"use client"

import { BackButton } from "@/components/ui/back-button"
import { VerticalVideoPlayer } from "@/components/video/vertical-video-player"

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <BackButton href="/" label="Back to Home" />
      </div>

      {/* Video Player */}
      <VerticalVideoPlayer />
    </div>
  )
}
