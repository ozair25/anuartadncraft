"use client"

import { useState, useRef, useEffect } from "react"
import { Play } from "lucide-react"

const DEFAULT_VIDEO_URL =
  "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791472095/anuarts.vid1_1_o3f0w5.mp4"
const DEFAULT_POSTER_URL =
  "https://res.cloudinary.com/dtrvyelcg/video/upload/v1791472095/anuarts.vid1_1_o3f0w5.jpg"

interface StudioPromoVideoProps {
  className?: string
  videoUrl?: string
  posterUrl?: string
  title?: string
  subtitle?: string
  compact?: boolean
  priority?: boolean
}

export function StudioPromoVideo({
  className = "",
  videoUrl = DEFAULT_VIDEO_URL,
  posterUrl = DEFAULT_POSTER_URL,
  title = "Inside Anu Arts & Craft Studio",
  subtitle = "Glimpse our Indore studio, live workshops & handcrafted creations",
  compact = false,
}: StudioPromoVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const isInViewRef = useRef(false)
  const userInteractedRef = useRef(false)

  // Listen for initial user interaction (click/touch/scroll) to unlock audio playback in browser
  useEffect(() => {
    const handleUserGesture = () => {
      userInteractedRef.current = true
      // If currently on this screen in viewport, activate sound now!
      if (isInViewRef.current && videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.volume = 1.0
        if (videoRef.current.paused) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
        }
      }
    }

    window.addEventListener("click", handleUserGesture, { passive: true })
    window.addEventListener("touchstart", handleUserGesture, { passive: true })
    window.addEventListener("keydown", handleUserGesture, { passive: true })
    window.addEventListener("scroll", handleUserGesture, { passive: true })

    return () => {
      window.removeEventListener("click", handleUserGesture)
      window.removeEventListener("touchstart", handleUserGesture)
      window.removeEventListener("keydown", handleUserGesture)
      window.removeEventListener("scroll", handleUserGesture)
    }
  }, [])

  // Viewport intersection observer:
  // Sound is audible ONLY when the user is on this very screen!
  // Upon scrolling away, it IMMEDIATELY mutes!
  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Consider "on screen" if >= 30% visible in viewport
          const isOnScreen = entry.isIntersecting && entry.intersectionRatio >= 0.3
          isInViewRef.current = isOnScreen

          if (isOnScreen) {
            // USER IS ON THIS VERY SCREEN:
            // Ensure video is playing
            if (video.paused) {
              video.play().then(() => setIsPlaying(true)).catch(() => {})
            }

            // Unmute sound
            video.muted = false
            video.volume = 1.0

            // If browser autoplay policy blocks unmuted audio before user interaction,
            // fall back to muted until the first gesture (handled by the window listener)
            const playPromise = video.play()
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                video.muted = true
                video.play().catch(() => {})
              })
            }
          } else {
            // USER HAS SCROLLED AWAY:
            // Immediately mute sound!
            video.muted = true
            video.volume = 0
          }
        })
      },
      {
        threshold: [0, 0.15, 0.3, 0.5, 0.75],
      }
    )

    observer.observe(container)

    // Handle tab switching / page visibility: mute if user changes tabs
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRef.current) {
          videoRef.current.muted = true
        }
      } else if (isInViewRef.current && videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.volume = 1.0
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [videoUrl])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    userInteractedRef.current = true

    if (video.paused) {
      if (isInViewRef.current) {
        video.muted = false
        video.volume = 1.0
      }
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Video Frame */}
      <div
        ref={containerRef}
        className={`relative w-full ${
          compact ? "max-w-[320px] sm:max-w-[350px]" : "max-w-[360px] sm:max-w-[390px]"
        } aspect-[9/16] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border-4 border-white/90 bg-stone-950 select-none transition-all duration-300 hover:shadow-purple-900/30 cursor-pointer`}
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault()
            togglePlay()
          }
        }}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          playsInline
          loop
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover object-center"
        />

        {/* Play Icon Overlay Feedback when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-black/30">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7c2d8a] to-[#d92672] text-white flex items-center justify-center shadow-2xl border-2 border-white/70">
              <Play className="w-8 h-8 fill-white ml-1 text-white" />
            </div>
          </div>
        )}

        {/* Bottom Overlay: Title & Subtitle Only */}
        {(title || subtitle) && (
          <div className="absolute bottom-0 inset-x-0 p-4 pt-12 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-transparent z-20 pointer-events-none text-left">
            {title && (
              <p className="text-white font-serif font-bold text-sm sm:text-base leading-snug drop-shadow-md">
                {title}
              </p>
            )}
            {subtitle && (
              <p className="text-stone-300 text-[11px] sm:text-xs mt-0.5 leading-relaxed line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
