'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number        // 0..100
  durationMs?: number  // مدة الأنيميشن بالمللي ثانية، افتراضي 1200
}

export function ProgressBar({ value, durationMs = 1200 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const startedRef = useRef(false)          // حتى لا يعيد الأنيميشن
  const [progress, setProgress] = useState(0)

  // مراقبة الظهور في الشاشة
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          animate()
        }
      },
      { threshold: 0.4 }
    )

    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // أنيميشن من 0 -> value
  const animate = () => {
    const start = performance.now()
    const target = Math.max(0, Math.min(100, value))

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / durationMs)
      const eased = easeOutCubic(t)
      const current = eased * target
      setProgress(current)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const pct = Math.round(progress)
  const barWidth = `${progress}%`
  const bubbleLeft = `calc(${progress}% - 18px)`

  return (
    <div className="w-full">
      <h2 className="mb-2 text-3xl font-semibold text-gray-900">
        Topics for This Course
      </h2>

      <div ref={containerRef} className="relative w-full m-10 ml-0">
        {/* الخلفية */}
        <div className="h-[3px] w-full rounded-full bg-gray-200" />

        {/* الشريط الأخضر المتحرك */}
        <div
          className="absolute left-0 top-0 h-[3px] rounded-full bg-green-500"
          style={{ width: barWidth }}
        />

        {/* فقاعة You تتحرك مع الشريط */}
        <div
          className="absolute -top-6 flex flex-col items-center"
          style={{ left: bubbleLeft }}
        >
          <div className="rounded-full border border-gray-200 bg-white px-2 py-[1px] text-[10px] text-gray-600 shadow-sm">
            You
          </div>
          <div className="mt-[2px] h-[6px] w-[1px] bg-gray-400" />
        </div>

        {/* النسبة */}
        <p className="mt-1 text-center text-[15px] font-medium text-green-800">
          {pct}%
        </p>
      </div>
    </div>
  )
}
