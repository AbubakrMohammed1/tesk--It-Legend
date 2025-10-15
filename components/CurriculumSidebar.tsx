// components/CurriculumSidebar.tsx
'use client'
import { useState } from 'react'
import { CurriculumSection, QuizMap } from '@/lib/types'
import { ProgressBar } from './ProgressBar'
import QuizModal from './QuizModal'

export function CurriculumSidebar({
  curriculum, progress, quizzes
}: { curriculum: CurriculumSection[]; progress: number; quizzes: QuizMap }) {
  const [open, setOpen] = useState(false)
  const [quizId, setQuizId] = useState<string | null>(null)
  const [limitCount, setLimitCount] = useState<number>(0)
  const [durationSec, setDurationSec] = useState<number>(600)

  const openQuiz = (qid: string, count?: number) => {
    const q = quizzes[qid]
    if (!q) return
    setQuizId(qid)
    setLimitCount(count ?? q.questions.length)
    setDurationSec(q.durationSec ?? 600)
    setOpen(true)
  }

  return (
    <div>
      <div className="mb-2 rounded-lg p-4"><ProgressBar value={progress} /></div>

      {curriculum.map(s => (
        <div key={s.id} className="mb-5 rounded-lg border bg-white">
          <div className="border-b p-4">
            <p className="text-lg font-medium">{s.title}</p>
            <p className="w-[75%] text-sm text-gray-500">{s.subtitle}</p>
          </div>

          <ol className="p-2">
            {s.items.map(it => (
              <li key={it.id} className="flex items-center justify-between rounded px-2 py-2 hover:bg-gray-50">
                <button
                  onClick={() => it.quizId && openQuiz(it.quizId, it.questions)}
                  className="flex items-center gap-2 text-left"
                >
               <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="w-5 h-5 text-gray-500"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M19.5 14.25v-6.637a1.5 1.5 0 0 0-.44-1.06l-4.613-4.613A1.5 1.5 0 0 0 13.387 1.5H6.75A1.5 1.5 0 0 0 5.25 3v18a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5v-6.75z"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M13.5 2.25V6a1.5 1.5 0 0 0 1.5 1.5h3.75"
  />
</svg>

                  <span className="p-2 text-sm">{it.title}</span>
                </button>

                <div className="flex items-center gap-2">
                  {it.questions && <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">{it.questions} QUESTION</span>}
                  {it.minutes && <span className="rounded bg-rose-50 px-2 py-0.5 text-[10px] text-rose-700">{it.minutes} MINUTES</span>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}

      {open && quizId && (
        <QuizModal
          open={open}
          onClose={() => setOpen(false)}
          quiz={quizzes[quizId]}
          limitCount={limitCount}
          durationSec={durationSec}
        />
      )}
    </div>
  )
}
