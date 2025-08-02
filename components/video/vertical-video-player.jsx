"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Bookmark, Play, Volume2, VolumeX } from "lucide-react"
import { supabase } from "@/lib/mockData"
import { toast } from "@/hooks/use-toast"

export function VerticalVideoPlayer({ reel, isActive, onLike }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [isActive])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100
      setProgress(progress)
    }

    video.addEventListener("timeupdate", updateProgress)
    return () => video.removeEventListener("timeupdate", updateProgress)
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleLike = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        toast({ title: "Please sign in to like videos", variant: "destructive" })
        return
      }

      if (isLiked) {
        // Unlike
        await supabase.from("reel_likes").delete().eq("user_id", user.id).eq("reel_id", reel.id)
      } else {
        // Like
        await supabase.from("reel_likes").insert({
          user_id: user.id,
          reel_id: reel.id,
        })
      }

      setIsLiked(!isLiked)
      if (onLike) onLike(reel.id)
    } catch (error) {
      toast({
        title: "Error updating like",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: reel.title,
          text: reel.description,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({ title: "Link copied to clipboard!" })
    }
  }

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={reel.video_url}
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div className="h-full bg-white transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>

      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="lg"
            variant="ghost"
            className="w-20 h-20 rounded-full bg-black/50 hover:bg-black/70"
            onClick={togglePlay}
          >
            <Play className="w-8 h-8 text-white" />
          </Button>
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-4 right-4">
        <Button
          size="sm"
          variant="ghost"
          className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
        </Button>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-20 left-4 right-20 text-white">
        <div className="flex items-center mb-3">
          <Avatar className="w-10 h-10 mr-3">
            <AvatarImage src={reel.creator.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>{reel.creator.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">@{reel.creator.username}</p>
            <p className="text-sm text-gray-300">{reel.creator.full_name}</p>
          </div>
        </div>

        <h3 className="font-semibold mb-2 text-lg">{reel.title}</h3>
        {reel.description && <p className="text-sm text-gray-200 mb-4 line-clamp-3">{reel.description}</p>}
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-20 right-4 flex flex-col space-y-4">
        <Button
          size="sm"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex flex-col"
          onClick={handleLike}
        >
          <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
          <span className="text-xs text-white mt-1">
            {reel.like_count > 999 ? `${Math.floor(reel.like_count / 1000)}k` : reel.like_count}
          </span>
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex flex-col"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="text-xs text-white mt-1">
            {reel.comment_count > 999 ? `${Math.floor(reel.comment_count / 1000)}k` : reel.comment_count}
          </span>
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70"
          onClick={handleShare}
        >
          <Share className="w-6 h-6 text-white" />
        </Button>

        <Button size="sm" variant="ghost" className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70">
          <Bookmark className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  )
}
