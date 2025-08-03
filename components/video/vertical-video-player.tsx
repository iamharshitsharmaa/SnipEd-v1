"use client";

import { useState, useRef, useEffect } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal, Play, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface VideoPlayerProps {
  reel: {
    id: string
    title: string
    description: string
    video_url: string
    creator: {
      username: string
      full_name: string
      avatar_url: string
    }
    like_count: number
    comment_count: number
    view_count: number
  }
  isActive: boolean
  onLike?: (reelId: string) => void
}

export function VerticalVideoPlayer({ reel, isActive, onLike }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setIsLoading(false);
    const onError = () => { setIsLoading(false); setHasError(true); };
    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    if (isActive) {
      video.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive, hasError]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [isPlaying, hasError]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleLike = useCallback(() => {
    setIsLiked(prev => !prev);
    onLike?.(reel.id);
  }, [onLike, reel.id]);

  if (!reel) {
    return (
      <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="mt-4">Loading video...</p>
        </div>
      </div>
    );
  }
  
  if (hasError) {
    return (
      <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">📹</div>
          <p className="text-lg mb-2">Video unavailable</p>
          <p className="text-sm text-gray-400">Could not load the video content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden" onClick={togglePlay}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        poster={reel.thumbnail_url || "/placeholder.svg?height=800&width=450&text=Loading"}
        src={reel.video_url}
      />

      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Button variant="ghost" size="icon" className="h-20 w-20 rounded-full bg-black/40 hover:bg-black/60 text-white">
            <Play className="h-10 w-10 ml-1" />
          </Button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div className="h-full bg-white transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex">
        {/* Left side - Video info */}
        <div className="flex-1 flex flex-col justify-end p-4 pb-20">
          <div className="space-y-3">
            {/* Creator info */}
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={reel.creator?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="bg-purple-600 text-white">
                  {reel.creator?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-semibold text-sm">@{reel.creator?.username || "unknown"}</p>
                <p className="text-white/80 text-xs">{reel.creator?.full_name || "Unknown User"}</p>
              </div>
            </div>

            {/* Video title and description */}
            <div className="space-y-1">
              <h3 className="text-white font-semibold text-base leading-tight">{reel.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{reel.description}</p>
            </div>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex flex-col justify-end items-center space-y-6 p-4 pb-20">
          {/* Like button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-12 w-12 rounded-full ${
                isLiked ? "bg-red-500 hover:bg-red-600 text-white" : "bg-black/30 hover:bg-black/50 text-white"
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <span className="text-white text-xs font-medium">{formatCount(reel.like_count + (isLiked ? 1 : 0))}</span>
          </div>

          {/* Comment button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <span className="text-white text-xs font-medium">{formatCount(reel.comment_count)}</span>
          </div>

          {/* Share button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
            >
              <Share className="h-6 w-6" />
            </Button>
            <span className="text-white text-xs font-medium">Share</span>
          </div>

          {/* More options */}
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
          >
            <MoreHorizontal className="h-6 w-6" />
          </Button>

          {/* Volume control */}
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
        </div>
      </div>
    </div>
  );
}