"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Sparkles } from "lucide-react"

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
  badgeText?: string
  compact?: boolean
  priority?: boolean
}

export function StudioPromoVideo({
  className = "",
  videoUrl = DEFAULT_VIDEO_URL,
  posterUrl = DEFAULT_POSTER_URL,
  title = "Inside Anu Arts & Craft Studio",
  subtitle = "Glimpse our Indore studio, live workshops & handcrafted creations",
  badgeText = "Studio Reel • Indore",
  compact = false,
}: StudioPromoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showCenterIcon, setShowCenterIcon] = useState(false)

  // Autoplay muted on mount (standard browser compliance)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    }
  }, [videoUrl])

  // Track fullscreen changes from ESC key or browser exit
  useEffect(() => {
    const handleFsChange = () => {
      const fsElement =
        document.fullscreenElement ||
        (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement
      setIsFullscreen(!!fsElement)
    }

    document.addEventListener("fullscreenchange", handleFsChange)
    document.addEventListener("webkitfullscreenchange", handleFsChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange)
      document.removeEventListener("webkitfullscreenchange", handleFsChange)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
    setShowCenterIcon(true)
    setTimeout(() => setShowCenterIcon(false), 700)
  }

  // Reliable Sound Toggle (Unmute / Mute)
  const toggleSound = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const video = videoRef.current
    if (!video) return

    if (video.muted || video.volume === 0) {
      video.muted = false
      video.defaultMuted = false
      video.volume = 1.0
      setIsMuted(false)
      // Guarantee playback continues with sound
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {})
      }
    } else {
      video.muted = true
      video.defaultMuted = true
      setIsMuted(true)
    }
  }, [])

  // Reliable Fullscreen Toggle
  const toggleFullscreen = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const container = containerRef.current
    const video = videoRef.current
    if (!container && !video) return

    const isCurrentlyFs =
      document.fullscreenElement ||
      (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement

    if (isCurrentlyFs) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      } else if ((document as unknown as { webkitExitFullscreen?: () => void }).webkitExitFullscreen) {
        (document as unknown as { webkitExitFullscreen: () => void }).webkitExitFullscreen()
      }
      setIsFullscreen(false)
    } else {
      // First attempt container fullscreen to preserve overlay controls
      if (container && container.requestFullscreen) {
        container.requestFullscreen().catch(() => {
          if (video?.requestFullscreen) {
            video.requestFullscreen().catch(() => {})
          }
        })
      } else if (video && (video as unknown as { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen) {
        // Standard iOS Safari video element fullscreen
        (video as unknown as { webkitEnterFullscreen: () => void }).webkitEnterFullscreen()
      } else if (container && (container as unknown as { webkitRequestFullscreen?: () => void })?.webkitRequestFullscreen) {
        (container as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen()
      }
      setIsFullscreen(true)
    }
  }, [])

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration) return
    setProgress((video.currentTime / video.duration) * 100)
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Outer Video Card Frame */}
      <div
        ref={containerRef}
        className={`relative w-full ${
          compact ? "max-w-[320px] sm:max-w-[350px]" : "max-w-[360px] sm:max-w-[390px]"
        } aspect-[9/16] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border-4 border-white/90 bg-stone-950 group select-none transition-all duration-300 hover:shadow-purple-900/30`}
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? "Pause promo video" : "Play promo video"}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault()
            togglePlay()
          }
        }}
      >
        {/* Soft top and bottom gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-transparent to-stone-950/80 pointer-events-none z-10" />

        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          playsInline
          loop
          muted={isMuted}
          autoPlay
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onVolumeChange={() => {
            if (videoRef.current) {
              setIsMuted(videoRef.current.muted || videoRef.current.volume === 0)
            }
          }}
          className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-700 group-hover:scale-[1.01]"
        />

        {/* TOP BAR: Badge + Sound Button + Full Screen Button */}
        <div className="absolute top-3 inset-x-3 sm:top-3.5 sm:inset-x-3.5 flex items-center justify-between z-30 pointer-events-auto gap-2">
          {/* Reel Category Pill */}
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold tracking-wide shadow-md border border-white/20 shrink-0">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span className="truncate max-w-[130px] sm:max-w-[160px]">{badgeText}</span>
          </span>

          {/* Action Buttons: Sound Toggle + Fullscreen */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Prominent Sound Mute / Unmute Button */}
            <button
              onClick={toggleSound}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md text-white text-[11px] font-bold shadow-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                isMuted
                  ? "bg-rose-600/90 hover:bg-rose-600 border-rose-300/40 text-white animate-pulse"
                  : "bg-emerald-600/90 hover:bg-emerald-600 border-emerald-300/40 text-white"
              }`}
              title={isMuted ? "Click to enable audio" : "Click to mute audio"}
              aria-label={isMuted ? "Enable sound" : "Mute sound"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Audio On</span>
                </>
              )}
            </button>

            {/* Top Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              type="button"
              className="w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white flex items-center justify-center shadow-xl border border-white/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Open Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Open Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 text-amber-300" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* FLOATING UNMUTE CALLOUT (Visible when muted to make audio discoverability 100% clear) */}
        {isMuted && (
          <div className="absolute top-14 sm:top-16 inset-x-0 flex justify-center z-25 pointer-events-auto">
            <button
              onClick={toggleSound}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 hover:bg-black/90 text-amber-300 border border-amber-300/40 shadow-lg text-[10px] font-bold backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <VolumeX className="w-3 h-3 text-rose-400" />
              <span>Tap here for Sound 🔊</span>
            </button>
          </div>
        )}

        {/* Center Animated Play/Pause Feedback on click */}
        {showCenterIcon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-black/75 backdrop-blur-md text-white flex items-center justify-center shadow-xl border border-white/30 transform scale-110">
              {isPlaying ? (
                <Play className="w-8 h-8 fill-white ml-1 text-white" />
              ) : (
                <Pause className="w-8 h-8 fill-white text-white" />
              )}
            </div>
          </div>
        )}

        {/* When paused, persistent big play button */}
        {!isPlaying && !showCenterIcon && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7c2d8a] to-[#d92672] text-white flex items-center justify-center shadow-2xl border-2 border-white/70 transform hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-white ml-1 text-white" />
            </div>
          </div>
        )}

        {/* Bottom Overlay Info & Controls */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 pt-10 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent z-20 pointer-events-auto">
          <div className="space-y-0.5 text-left">
            <p className="text-white font-serif font-bold text-sm sm:text-base leading-snug drop-shadow-md">
              {title}
            </p>
            <p className="text-stone-300 text-[11px] leading-relaxed line-clamp-2">
              {subtitle}
            </p>
          </div>

          {/* Bottom Controls Bar */}
          <div className="mt-2.5 flex items-center justify-between gap-2 text-white/90">
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlay()
                }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5 text-white" />
                )}
              </button>

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                className={`h-7 sm:h-8 px-2.5 rounded-full backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer text-[10px] font-bold ${
                  isMuted
                    ? "bg-rose-600/80 hover:bg-rose-600 text-white"
                    : "bg-emerald-600/80 hover:bg-emerald-600 text-white"
                }`}
                title={isMuted ? "Unmute sound" : "Mute sound"}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-white" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-white" />
                    <span>Sound On</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="h-7 sm:h-8 px-2.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center gap-1 transition-all cursor-pointer text-[10px] font-bold text-white"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3 h-3 text-amber-300" />
                  <span>Exit</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3 text-white" />
                  <span>Full Screen</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 w-full bg-white/20 h-1 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 h-full transition-all duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Frame Subtitle Badge Below Card */}
      <div className="mt-2.5 flex items-center gap-2 text-[11px] text-stone-600 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-[#7c2d8a]" />
        <span>Tap Sound button to hear audio • Tap Full Screen to expand</span>
      </div>
    </div>
  )
}
