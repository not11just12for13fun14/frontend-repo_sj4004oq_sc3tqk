import { useEffect, useRef, useState } from 'react'

function AudioVisualizer({ size = 128, barWidth = 4, gap = 2, height = 80, color = '#60a5fa' }) {
  const canvasRef = useRef(null)
  const [audioContext, setAudioContext] = useState(null)
  const [analyser, setAnalyser] = useState(null)
  const [source, setSource] = useState(null)

  useEffect(() => {
    return () => {
      if (source) source.disconnect()
      if (analyser) analyser.disconnect()
      if (audioContext) audioContext.close()
    }
  }, [source, analyser, audioContext])

  const start = async () => {
    if (audioContext) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const src = ctx.createMediaStreamSource(stream)
      const an = ctx.createAnalyser()
      an.fftSize = size * 2
      src.connect(an)
      setAudioContext(ctx)
      setAnalyser(an)
      setSource(src)
      draw(an)
    } catch (e) {
      console.error('Microphone permission denied or unavailable', e)
    }
  }

  const draw = (an) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const bufferLength = an.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const render = () => {
      an.getByteFrequencyData(dataArray)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const fullBar = barWidth + gap
      const bars = Math.min(Math.floor(canvas.width / fullBar), bufferLength)
      for (let i = 0; i < bars; i++) {
        const v = dataArray[i] / 255
        const h = v * height
        const x = i * fullBar
        const y = canvas.height - h
        ctx.fillStyle = color
        ctx.fillRect(x, y, barWidth, h)
      }
      requestAnimationFrame(render)
    }
    render()
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={start} className="px-3 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium">
        Start Mic
      </button>
      <canvas ref={canvasRef} width={800} height={height} className="flex-1 rounded bg-black/30" />
    </div>
  )
}

export default AudioVisualizer
