import React, { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent } from 'framer-motion'

interface ScrollScrubberProps {
  totalFrames: number
  baseUrl: string
  progress: any 
  onLoadProgress?: (progress: number) => void
}

const ScrollScrubber: React.FC<ScrollScrubberProps> = ({ totalFrames, baseUrl, progress, onLoadProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => { isMounted.current = false }
  }, [])

  // Preload all images
  useEffect(() => {
    let loadedCount = 0
    const loadedImages: HTMLImageElement[] = []

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image()
      const frameIndex = i.toString().padStart(3, '0')
      img.src = `${baseUrl}/ezgif-frame-${frameIndex}.jpg`
      img.onload = () => {
        if (!isMounted.current) return
        loadedCount++
        if (onLoadProgress) onLoadProgress(loadedCount / totalFrames)
        if (loadedCount === totalFrames) {
          setIsLoaded(true)
        }
      }
      img.onerror = () => {
        console.warn(`Failed to load frame ${i}`)
        loadedCount++ 
      }
      loadedImages.push(img)
    }
    setImages(loadedImages)
  }, [totalFrames, baseUrl])

  const updateCanvas = (scrollVal: number) => {
    if (!isMounted.current || !canvasRef.current || !isLoaded || images.length === 0) return
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(scrollVal * totalFrames)
    )
    
    const img = images[frameIndex]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const imgWidth = img.width
    const imgHeight = img.height
    const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight)
    const newWidth = imgWidth * ratio
    const newHeight = imgHeight * ratio
    const x = (canvasWidth - newWidth) / 2
    const y = (canvasHeight - newHeight) / 2

    requestAnimationFrame(() => {
      if (!context) return
      context.clearRect(0, 0, canvasWidth, canvasHeight)
      context.drawImage(img, x, y, newWidth, newHeight)
    })
  }

  // Subscribe to progress changes using modern Event hook
  useMotionValueEvent(progress, "change", (latest) => {
    updateCanvas(latest as number)
  })

  // Initial draw and Resize Handling
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return
      const canvas = canvasRef.current
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      updateCanvas(progress.get())
    }

    if (isLoaded) {
      window.addEventListener('resize', handleResize)
      handleResize()
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [isLoaded, images])

  return (
    <div className="scrubber-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block', 
          width: '100%', 
          height: '100%', 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out'
        }} 
      />
      {!isLoaded && (
        <div className="scrubber-loader">
          <div className="loader-text">PREPARING CINEMATIC EXPERIENCE...</div>
        </div>
      )}
    </div>
  )
}

export default ScrollScrubber
