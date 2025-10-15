'use client'

import { Comment } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'

export function Comments({ thread }: { thread: Comment[] }) {
  const [items, setItems] = useState<Comment[]>(thread)
  const [text, setText] = useState('')

  return (
    <div className="rounded-lg border bg-white p-4">
      <h2 className="mb-4 text-base font-medium">Comments</h2>

      <ul className="space-y-4">
        {items.map((c) => (
          <li key={c.id} className="flex gap-3">
            <Image
              className="h-15 w-15 rounded-full object-cover"
              src={c.avatar}
              width={100}
              height={100}

              alt="asd"
            />
            <div className="grow">
              <div className="mb-1 flex flex-col items-start gap-2 text-xs text-gray-500">
                <h3 className="block text-gray-700">{c.author} </h3>
                <div className='block'>{c.date}</div>
              </div>
              <p className="text-sm text-gray-700">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!text.trim()) return
          setItems((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              author: 'You',
              avatar: 'https://i.pravatar.cc/80?u=you',
              date: new Date().toLocaleDateString(),
              body: text.trim(),
            },
          ])
          setText('')
        }}
        className="mt-4 space-y-3"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment"
          className="min-h-[110px] w-full resize-none rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-sm text-white"
        >
          Submit Review
        </button>
      </form>
    </div>
  )
}
