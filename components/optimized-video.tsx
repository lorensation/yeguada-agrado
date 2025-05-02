"use client"

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface VideoProps {
  src: string
  poster?: string
  caption?: string
  className?: string
  aspectRatio?: "16:9" | "4:3" | "1:1" | "vertical" | "auto"
  autoPlay?: boolean
  controls?: boolean
  muted?: boolean
  loop?: boolean
  preload?: "auto" | "metadata" | "none"
}

export default function OptimizedVideo({
  src,
  poster,
  caption,
  className,
  aspectRatio = "16:9",
  autoPlay = false,
  controls = true,
  muted = true,
  loop = false,
  preload = "metadata",
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [showPoster, setShowPoster] = useState(true)

  // Get aspect ratio class
  const aspectRatioClass = {
    "16:9": "aspect-video", // 16:9
    "4:3": "aspect-[4/3]",  // 4:3
    "1:1": "aspect-square", // 1:1
    "vertical": "aspect-[9/16]", // 9:16 (vertical video)
    "auto": "aspect-auto",  // Original aspect ratio
  }[aspectRatio]

  // Handle intersection observer for lazy loading
  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If video is visible and not already loaded, load it
          if (entry.isIntersecting && !isLoaded) {
            const video = videoRef.current
            if (video) {
              video.src = src
              video.load()
              setIsLoaded(true)
              
              if (autoPlay) {
                video.play().catch(err => console.error("Autoplay failed:", err))
                setIsPlaying(true)
                setShowPoster(false)
              }
            }
            
            // Once loaded, no need to observe anymore
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 } // 10% of the video needs to be visible
    )

    observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [src, autoPlay, isLoaded])

  // Add event listeners to track video play state
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      setIsPlaying(true)
      setShowPoster(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (!loop) {
        setShowPoster(true)
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [loop])

  // Play/Pause toggle function
  const togglePlayPause = () => {
    if (!videoRef.current) return
    
    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setShowPoster(false)
        })
        .catch(err => console.error("Play failed:", err))
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className={cn("relative overflow-hidden rounded-lg bg-muted/20", aspectRatioClass)}>
        {/* Video placeholder/loader with Next.js Image */}
        {showPoster && poster && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-full h-full">
              <Image 
                src={poster} 
                alt="Video thumbnail" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div 
                  className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (isLoaded) {
                      togglePlayPause()
                    } else if (videoRef.current) {
                      videoRef.current.src = src
                      videoRef.current.load()
                      setIsLoaded(true)
                      videoRef.current.play()
                        .then(() => {
                          setIsPlaying(true)
                          setShowPoster(false)
                        })
                        .catch(err => console.error("Play failed:", err))
                    }
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-white"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={!isLoaded ? poster : undefined}
          controls={controls && isLoaded}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
          onClick={!controls && isLoaded ? togglePlayPause : undefined}
        />

        {/* Custom play button for videos without controls */}
        {!controls && isLoaded && isPlaying === false && (
          <button 
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/0 group"
            onClick={togglePlayPause}
            aria-label="Play video"
          >
            <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center opacity-70 group-hover:opacity-90 transition-opacity duration-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </button>
        )}
        
        {/* Custom pause button when hovering during playback */}
        {!controls && isLoaded && isPlaying && (
          <button 
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/0 group"
            onClick={togglePlayPause}
            aria-label="Pause video"
          >
            <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity duration-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </div>
          </button>
        )}
      </div>
      
      {/* Caption */}
      {caption && (
        <p className="mt-2 text-sm text-muted-foreground">{caption}</p>
      )}
    </div>
  )
}