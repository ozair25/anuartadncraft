"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Volume2, VolumeX } from "lucide-react"

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
  const [isMuted, setIsMuted] = useState(true)
  const isInViewRef = useRef(false)
  const userWantsAudioRef = useRef(false)

  // Autoplay muted on mount (standard browser compliance)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }, [videoUrl])

  // Single Mute / Unmute Icon Toggle Handler
  const toggleMute = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const video = videoRef.current
    if (!video) return

    if (video.muted || video.volume === 0) {
      video.muted = false
      video.defaultMuted = false
      video.volume = 1.0
      setIsMuted(false)
      userWantsAudioRef.current = true
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {})
      }
    } else {
      video.muted = true
      video.defaultMuted = true
      setIsMuted(true)
      userWantsAudioRef.current = false
    }
  }, [])

  // Viewport intersection observer:
  // When scrolling away, IMMEDIATELY mute!
  // When scrolling back into screen, restore audio if user turned sound on.
  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isOnScreen = entry.isIntersecting && entry.intersectionRatio >= 0.3
          isInViewRef.current = isOnScreen

          if (isOnScreen) {
            // Video is visible on screen
            if (video.paused) {
              video.play().then(() => setIsPlaying(true)).catch(() => {})
            }

            // Restore sound if user turned sound on
            if (userWantsAudioRef.current) {
              video.muted = false
              video.volume = 1.0
              setIsMuted(false)
            }
          } else {
            // Scrolled away from screen: IMMEDIATELY MUTE!
            video.muted = true
            video.volume = 0
            setIsMuted(true)
          }
        })
      },
      {
        threshold: [0, 0.15, 0.3, 0.5, 0.75],
      }
    )

    observer.observe(container)

    // Handle tab switching / page visibility
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRef.current) {
          videoRef.current.muted = true
          setIsMuted(true)
        }
      } else if (isInViewRef.current && userWantsAudioRef.current && videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.volume = 1.0
        setIsMuted(false)
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

    if (video.paused) {
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
          muted={isMuted}
          preload="none"
          className="w-full h-full object-contain object-center bg-black"
        />

        {/* ONLY ONE OPTION: An Icon to Mute and Unmute in Top-Right Corner */}
        <button
          onClick={toggleMute}
          type="button"
          className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
          title={isMuted ? "Unmute sound" : "Mute sound"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>

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
