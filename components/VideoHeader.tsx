'use client'

import { Lesson } from '@/lib/types'
import Image from 'next/image'
import { useState, useRef, useMemo } from 'react'

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v')
    return null
  } catch {
    return null
  }
}

export function VideoHeader({ lesson }: { lesson: Lesson }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const ytId = useMemo(() => getYouTubeId(lesson.videoUrl), [lesson.videoUrl])

  const posterImage = lesson.poster || (ytId ? '/img.png' : '/default-poster.jpg')

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg border">
        {ytId ? (
          <>
            {!playing && (
              <div className="relative aspect-video w-full">
                <Image src={posterImage} alt="Video cover" fill className="object-cover" />
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-4 shadow"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}
            {playing && (
              <iframe
                className="aspect-video w-full"
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&controls=1`}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </>
        ) : (
          <video
            ref={videoRef}
            className="aspect-video w-full object-cover"
            src={lesson.videoUrl}
            poster={posterImage}
            controls
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        )}
      </div>

      {/* أيقونات التنقل داخل الصفحة */}
      <div className="mt-4 flex items-center gap-4">
        {[
          {
            href: '#materials',
            label: 'Materials',
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )
          },
          {
            href: '#comments',
            label: 'Comments',
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8m-8 4h5M4 19h16l-2-4V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14z" />
              </svg>
            )
          },
          {
            href: '#curriculum',
            label: 'Curriculum',
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            )
          },
          {
            href: '#top',
            label: 'Top',
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l8-6 8 6M4 14h16M4 18h16" />
              </svg>
            )
          }
        ].map(({ href, label, icon }) => (
          <a
            key={href}
            href={href}
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  )
}
