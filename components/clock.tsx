'use client'

import { useState, useEffect, memo } from 'react'

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-3xl font-bold" aria-live="polite">
      {currentTime.toLocaleTimeString()}
    </div>
  )
}

export const MemoizedClock = memo(Clock)

