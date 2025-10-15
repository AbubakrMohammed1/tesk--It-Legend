// components/QuizModal.tsx
'use client'
import { useEffect, useMemo, useState } from 'react'
import type { Quiz } from '@/lib/types'

export default function QuizModal({
  open, onClose, quiz, limitCount, durationSec
}: {
  open: boolean
  onClose: () => void
  quiz: Quiz
  limitCount: number
  durationSec: number
}) {
  const questions = useMemo(
    () => quiz.questions.slice(0, Math.max(1, Math.min(limitCount, quiz.questions.length))),
    [quiz.questions, limitCount]
  )
  const [i, setI] = useState(0)
  const [ans, setAns] = useState<Record<string, string>>({})
  const [sec, setSec] = useState(durationSec)

  useEffect(() => { if (open) { setI(0); setAns({}); setSec(durationSec) } }, [open, durationSec])
  useEffect(() => { if (!open) return; const id = setInterval(() => setSec(s => s > 0 ? s - 1 : 0), 1000); return () => clearInterval(id) }, [open])
  if (!open) return null

  const q = questions[i]
  const last = i === questions.length - 1
  const mmss = `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-[92%] max-w-md rounded-2xl bg-[#3B57C5] p-6 shadow-2xl">
        <div className="mx-auto mb-5 w-max rounded-lg bg-yellow-400/90 px-4 py-2 text-sm font-medium text-white">⏱ {mmss}</div>
        <div className="mb-5 flex items-center justify-center gap-4">
          {questions.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${idx===i?'bg-white text-[#3B57C5] border-white':'border-white text-white'}`}>
              {idx+1}
            </button>
          ))}
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-[0_15px_40px_rgba(59,87,197,0.35)]">
          <p className="mb-2 text-lg font-semibold">{i+1}.</p>
          <h3 className="mb-4 text-lg font-semibold text-gray-800">{q.title}</h3>
          <div className="space-y-3">
            {q.options.map(o => {
              const checked = ans[q.id] === o.id
              return (
                <label key={o.id} className={`flex cursor-pointer items-center gap-3 rounded-xl bg-gray-100 p-3 ${checked?'ring-2 ring-[#3B57C5]':''}`}>
                  <input type="radio" className="sr-only" name={q.id} checked={checked}
                    onChange={() => setAns(a => ({...a, [q.id]: o.id}))}/>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border bg-white">
                    <span className={`h-2.5 w-2.5 rounded-sm ${checked?'bg-[#3B57C5]':''}`} />
                  </span>
                  <span className="text-sm text-gray-800">{o.label}</span>
                </label>
              )
            })}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button disabled={i===0} onClick={() => setI(v=>Math.max(0,v-1))}
            className={`rounded-lg px-5 py-2 text-sm ${i===0?'bg-white/30 text-white/70':'bg-white text-[#3B57C5]'}`}>
            Previous
          </button>
          <button onClick={() => last ? onClose() : setI(v=>Math.min(questions.length-1,v+1))}
            className="rounded-lg bg-white px-6 py-2 text-sm text-[#3B57C5]">
            {last?'Submit':'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
