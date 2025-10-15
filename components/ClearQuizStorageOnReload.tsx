'use client'
import { useEffect } from 'react'

export default function ClearQuizStorageOnReload() {
  useEffect(() => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    const isReload = nav?.type === 'reload'

    if (!isReload) return

    const toDelete: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith('quiz:')) toDelete.push(k)
    }
    toDelete.forEach((k) => localStorage.removeItem(k))
  }, [])

  return null
}
