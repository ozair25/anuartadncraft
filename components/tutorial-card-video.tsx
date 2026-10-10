"use client"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { Play, Pause, Volume2, VolumeX, Star, Palette, ArrowRight } from "lucide-react"
import { TutorialItem } from "@/lib/data/tutorials-data"

interface TutorialCardVideoProps {
  tutorial: TutorialItem
  onOpenTutorial: (tutorial: TutorialItem) => void
}

export function TutorialCardVideo({
  tutorial,
  onOpenTutorial,
}: TutorialCardVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handleTogglePlay = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const video = videoRef.current
      if (!video) return

      if (video.paused) {
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      } else {
        video.pause()
        setIsPlaying(false)
      }
    },
    []
  )

  const handleToggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    if (video.muted) {
      video.muted = false
      video.volume = 1.0
      setIsMuted(false)
      // If paused, also play when unmuting
      if (video.paused) {
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {})
      }
    } else {
      video.muted = true
      setIsMuted(true)
    }
  }, [])

  return (
    <article className="group bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 flex flex-col overflow-hidden">
      {/* 1. Playable Video Media Header (Native 9:16 Aspect Ratio, No Cropping) */}
      <div
        className="relative aspect-[9/16] overflow-hidden bg-stone-950 select-none cursor-pointer group/media"
        onClick={handleTogglePlay}
        role="region"
        aria-label={`${tutorial.title} video player`}
      >
        <video
          ref={videoRef}
          src={tutorial.videoUrl}
          poster={tutorial.posterUrl}
          playsInline
          loop
          muted={isMuted}
          preload="none"
          className="w-full h-full object-contain bg-black"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Clean Overlay: visible when paused for text legibility, fades out completely when playing for 100% original video quality */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/20 transition-opacity duration-300 pointer-events-none ${
            isPlaying ? "opacity-0" : "opacity-60"
          }`}
        />

        {/* Top-Left Category Badge */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span className="bg-white/95 backdrop-blur-sm text-stone-800 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-2xs">
            {tutorial.category}
          </span>
        </div>

        {/* Top-Right Mute / Unmute Button */}
        <button
          onClick={handleToggleMute}
          type="button"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
          title={isMuted ? "Unmute audio" : "Mute audio"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-white" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-white" />
          )}
        </button>

        {/* Center Play Button Overlay (when paused) */}
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#7c2d8a] to-[#d92672] text-white flex items-center justify-center shadow-2xl border-2 border-white/80 group-hover/media:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 fill-white ml-0.5 text-white" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover/media:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center shadow-lg border border-white/40">
              <Pause className="w-5 h-5 fill-white text-white" />
            </div>
          </div>
        )}

        {/* Bottom Overlay: Video Duration & Difficulty */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-white text-[11px] font-semibold pointer-events-none">
          <span className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-sm px-2.5 py-0.5 rounded shadow-xs">
            <Play className="h-3 w-3 fill-amber-300 text-amber-300" />
            <span>{tutorial.duration}</span>
          </span>
          <span className="bg-stone-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-stone-200 shadow-xs">
            {tutorial.difficulty}
          </span>
        </div>
      </div>

      {/* 2. Card Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Rating · Views · Steps (Hidden for Tutorials 1-3) */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-stone-500 mb-1.5">
            <span className="flex items-center gap-1 text-amber-600 font-bold">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              {tutorial.rating}
            </span>
            <span aria-hidden="true">·</span>
            <span>{tutorial.viewsCount}</span>
            {!tutorial.hideSteps && tutorial.steps.length > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span>{tutorial.steps.length} Steps</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenTutorial(tutorial)}
            className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#7c2d8a] transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {tutorial.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs text-stone-600 font-medium leading-relaxed line-clamp-2">
            {tutorial.shortDescription}
          </p>

          {/* Material Checklist Section */}
          <div className="mt-3.5 pt-3 border-t border-pink-100/60">
            <div className="flex items-center justify-between text-[11px] font-bold text-stone-700 mb-1.5">
              <span className="flex items-center gap-1.5 text-[#7c2d8a]">
                <Palette className="h-3.5 w-3.5 text-[#7c2d8a] shrink-0" />
                <span>Material Checklist {tutorial.materials.length > 0 ? `(${tutorial.materials.length})` : ""}</span>
              </span>
            </div>

            {tutorial.materials.length === 0 ? (
              <div className="text-[11px] text-stone-600 bg-purple-50/50 p-2 rounded-lg border border-purple-100/50 flex items-center justify-between">
                <span className="font-medium">Curated upcycling craft supplies</span>
                <Link
                  href="/shop"
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-[#7c2d8a] hover:underline ml-2 shrink-0"
                >
                  Shop →
                </Link>
              </div>
            ) : (
              <ul className="space-y-1.5 text-xs">
                {tutorial.materials.map((mat) => {
                  const targetLink = mat.shopLink
                  const isExternal = Boolean(targetLink && targetLink.startsWith("http"))

                  return (
                    <li
                      key={mat.name}
                      className="flex items-center justify-between gap-2 text-[11px] bg-stone-50/70 hover:bg-purple-50/60 p-1.5 rounded-lg border border-stone-100 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7c2d8a] shrink-0" />
                        {targetLink ? (
                          isExternal ? (
                            <a
                              href={targetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="font-semibold text-stone-800 hover:text-[#7c2d8a] hover:underline truncate"
                              title={`View ${mat.name}`}
                            >
                              {mat.name}
                            </a>
                          ) : (
                            <Link
                              href={targetLink}
                              onClick={(e) => e.stopPropagation()}
                              className="font-semibold text-stone-800 hover:text-[#7c2d8a] hover:underline truncate"
                              title={`View ${mat.name}`}
                            >
                              {mat.name}
                            </Link>
                          )
                        ) : (
                          <span className="font-semibold text-stone-800 truncate" title={mat.name}>
                            {mat.name}
                          </span>
                        )}
                      </div>

                      {targetLink ? (
                        isExternal ? (
                          <a
                            href={targetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#7c2d8a] hover:bg-purple-900 px-2.5 py-1 rounded-md shadow-2xs transition-colors shrink-0"
                          >
                            <span>Buy Product</span>
                            <ArrowRight className="h-2.5 w-2.5" />
                          </a>
                        ) : (
                          <Link
                            href={targetLink}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#7c2d8a] hover:bg-purple-900 px-2.5 py-1 rounded-md shadow-2xs transition-colors shrink-0"
                          >
                            <span>Buy Product</span>
                            <ArrowRight className="h-2.5 w-2.5" />
                          </Link>
                        )
                      ) : (
                        <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded shrink-0">
                          Link Pending
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-3.5 border-t border-pink-100/80 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-stone-500">
            By {tutorial.instructor}
          </span>

          <button
            type="button"
            onClick={() => onOpenTutorial(tutorial)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#7c2d8a] hover:text-[#d92672] transition-colors cursor-pointer group-hover:translate-x-0.5 duration-200"
          >
            <span>View Guide</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  )
}
