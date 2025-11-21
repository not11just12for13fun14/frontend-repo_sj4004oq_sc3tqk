import { useState } from 'react'
import VideoWallpaper from './components/VideoWallpaper'
import AudioVisualizer from './components/AudioVisualizer'
import TabletClock from './components/TabletClock'

function App() {
  const [videoUrl, setVideoUrl] = useState('https://cdn.coverr.co/videos/coverr-aurora-at-night-6943/1080p.mp4')
  const [dim, setDim] = useState(0.25)
  const [blur, setBlur] = useState(0)
  const [rate, setRate] = useState(1)
  const [paused, setPaused] = useState(false)
  const [format, setFormat] = useState('24h')

  return (
    <div className="min-h-screen text-white">
      <VideoWallpaper src={videoUrl} dim={dim} blur={blur} playbackRate={rate} paused={paused} />

      <div className="relative min-h-screen p-6 md:p-10 lg:p-16">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center font-bold">TL</div>
            <div>
              <div className="text-xl font-semibold">Tablet Launcher</div>
              <div className="text-white/70 text-sm">Audio visualizer • Video wallpaper • Custom clock</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-black/30 backdrop-blur rounded-xl p-2">
            <input
              className="px-3 py-2 rounded-lg bg-white/10 placeholder-white/60 focus:outline-none"
              placeholder="Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              style={{ minWidth: 260 }}
            />
            <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
              <span className="text-sm">Dim</span>
              <input type="range" min="0" max="0.8" step="0.05" value={dim} onChange={(e)=>setDim(parseFloat(e.target.value))} />
            </label>
            <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
              <span className="text-sm">Blur</span>
              <input type="range" min="0" max="20" step="1" value={blur} onChange={(e)=>setBlur(parseInt(e.target.value))} />
            </label>
            <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
              <span className="text-sm">Speed</span>
              <input type="range" min="0.25" max="2" step="0.25" value={rate} onChange={(e)=>setRate(parseFloat(e.target.value))} />
            </label>
            <button onClick={()=>setPaused(p=>!p)} className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium">
              {paused ? 'Play' : 'Pause'}
            </button>
          </div>
        </div>

        {/* Center clock */}
        <div className="mt-14 md:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="order-2 lg:order-1 bg-black/30 backdrop-blur rounded-2xl p-4 lg:p-6">
            <div className="text-white/80 mb-2">Audio Visualizer</div>
            <AudioVisualizer />
          </div>

          <div className="order-1 lg:order-2 flex items-center justify-center">
            <TabletClock format={format} />
          </div>

          <div className="order-3 lg:order-3 bg-black/30 backdrop-blur rounded-2xl p-4 lg:p-6 flex items-center justify-center gap-3">
            <button onClick={()=>setFormat('24h')} className={`px-3 py-2 rounded-lg text-sm font-medium ${format==='24h'?'bg-white/20':'bg-white/10 hover:bg-white/20'}`}>24h</button>
            <button onClick={()=>setFormat('12h')} className={`px-3 py-2 rounded-lg text-sm font-medium ${format==='12h'?'bg-white/20':'bg-white/10 hover:bg-white/20'}`}>12h</button>
          </div>
        </div>

        {/* Dock */}
        <div className="fixed left-1/2 -translate-x-1/2 bottom-6 md:bottom-10 bg-black/30 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-3">
          <a href="/test" className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">Backend Test</a>
          <a href="https://example.com" className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">Docs</a>
        </div>
      </div>
    </div>
  )
}

export default App
