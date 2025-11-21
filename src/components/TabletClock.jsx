import { useEffect, useState } from 'react'

function pad(n) { return n.toString().padStart(2, '0') }

function TabletClock({ format = '24h', showDate = true, accent = '#60a5fa' }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const hours = now.getHours()
  const displayHour = format === '12h' ? ((hours + 11) % 12 + 1) : hours
  const ampm = format === '12h' ? (hours >= 12 ? 'PM' : 'AM') : ''

  const time = `${pad(displayHour)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const date = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="select-none">
      <div className="flex items-end gap-3">
        <span className="font-bold leading-none" style={{
          fontSize: '10rem',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'white',
          textShadow: '0 8px 30px rgba(0,0,0,0.5)'
        }}>{time}</span>
        {ampm && <span className="mb-6 text-white/80 font-semibold" style={{ color: accent }}>{ampm}</span>}
      </div>
      {showDate && (
        <div className="mt-4 text-2xl font-medium text-white/90" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.35)' }}>
          {date}
        </div>
      )}
    </div>
  )
}

export default TabletClock
