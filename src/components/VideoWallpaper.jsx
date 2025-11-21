import { useEffect, useRef } from 'react'

function VideoWallpaper({ src, blur = 0, dim = 0.2, playbackRate = 1, paused = false }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = playbackRate
    if (paused) {
      v.pause()
    } else {
      const play = async () => {
        try {
          await v.play()
        } catch (_) {
          // Autoplay might be blocked until user interaction
        }
      }
      play()
    }
  }, [playbackRate, paused, src])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: `blur(${blur}px)`,
          background: `rgba(0,0,0,${dim})`
        }}
      />
    </div>
  )
}

export default VideoWallpaper
