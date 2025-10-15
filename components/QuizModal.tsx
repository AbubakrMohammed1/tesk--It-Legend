'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Quiz } from '@/lib/types'

type Props = {
  open: boolean
  onClose: () => void
  quiz: Quiz
  limitCount: number
  durationSec: number
}

export default function QuizModal({
  open,
  onClose,
  quiz,
  limitCount,
  durationSec
}: Props) {
  const keyRemain = `quiz:${quiz.id}:remain:${limitCount}`
  const keyIndex  = `quiz:${quiz.id}:index:${limitCount}`
  const keyAns    = `quiz:${quiz.id}:answers:${limitCount}`

  const questions = useMemo(
    () => quiz.questions.slice(0, Math.max(1, Math.min(limitCount, quiz.questions.length))),
    [quiz.questions, limitCount]
  )

  // حالة العرض فقط
  const [i, setI] = useState(0)
  const [ans, setAns] = useState<Record<string, string>>({})
  const [displayRemain, setDisplayRemain] = useState<number>(durationSec)

  // حساب دقيق: المتبقي = baseRemain - floor(elapsed)
  const baseRemainRef = useRef<number>(durationSec) // المتبقي وقت الفتح
  const startMsRef    = useRef<number>(0)           // وقت بداية هذه الجلسة
  const rafRef        = useRef<number | null>(null)

  // استرجاع الحالة عند الفتح
  useEffect(() => {
    if (!open) return

    // المتبقي المخزن أو المدة الافتراضية
    const saved = Number(localStorage.getItem(keyRemain))
    baseRemainRef.current =
      Number.isFinite(saved) && saved >= 0 ? Math.min(durationSec, saved) : durationSec

    // السؤال الحالي
    const savedIndex = Number(localStorage.getItem(keyIndex))
    setI(Number.isFinite(savedIndex) && savedIndex >= 0 ? Math.min(savedIndex, questions.length - 1) : 0)

    // الإجابات
    try {
      const savedAns = localStorage.getItem(keyAns)
      setAns(savedAns ? JSON.parse(savedAns) : {})
    } catch {
      setAns({})
    }

    // ابدأ جلسة جديدة
    startMsRef.current = Date.now()

    const tick = () => {
      const elapsedSec = Math.floor((Date.now() - startMsRef.current) / 1000)
      const remain = Math.max(0, baseRemainRef.current - elapsedSec)
      setDisplayRemain(remain)
      if (remain > 0) {
        rafRef.current = window.setTimeout(tick, 200) as unknown as number
      } else {
        // انتهى الوقت
        localStorage.removeItem(keyRemain)
      }
    }

    // أول تحديث
    setDisplayRemain(baseRemainRef.current)
    rafRef.current = window.setTimeout(tick, 200) as unknown as number

    // عند الإغلاق: احسب المتبقي بدقة واحفظه ثم أوقف المؤقت
    return () => {
      if (rafRef.current) {
        clearTimeout(rafRef.current)
        rafRef.current = null
      }
      const elapsedSec = Math.floor((Date.now() - startMsRef.current) / 1000)
      const remain = Math.max(0, baseRemainRef.current - elapsedSec)
      localStorage.setItem(keyRemain, String(remain))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // حفظ فوري للمؤشر والإجابات أثناء الفتح
  useEffect(() => {
    if (open) localStorage.setItem(keyIndex, String(i))
  }, [i, open, keyIndex])
  useEffect(() => {
    if (open) localStorage.setItem(keyAns, JSON.stringify(ans))
  }, [ans, open, keyAns])

  if (!open) return null

  const q = questions[i]
  const last = i === questions.length - 1
  const secs = Math.max(0, Math.floor(displayRemain))
  const mmss = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`

  const submitAndClose = () => {
    // مسح التقدم نهائيًا
    localStorage.removeItem(keyRemain)
    localStorage.removeItem(keyIndex)
    localStorage.removeItem(keyAns)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-[92%] max-w-md rounded-2xl bg-[#3B57C5] p-6 shadow-2xl">
        <div className="mx-auto mb-5 w-max rounded-lg bg-yellow-400/90 px-4 py-2 text-sm font-medium text-white">
          ⏱ {mmss}
        </div>

        <div className="mb-5 flex items-center justify-center gap-4">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                idx === i ? 'bg-white text-[#3B57C5] border-white' : 'border-white text-white'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[0_15px_40px_rgba(59,87,197,0.35)]">
          <p className="mb-2 text-lg font-semibold">{i + 1}.</p>
          <h3 className="mb-4 text-lg font-semibold text-gray-800">{q.title}</h3>

          <div className="space-y-3">
            {q.options.map((o) => {
              const checked = ans[q.id] === o.id
              return (
                <label
                  key={o.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl bg-gray-100 p-3 ${
                    checked ? 'ring-2 ring-[#3B57C5]' : ''
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name={q.id}
                    checked={checked}
                    onChange={() => setAns((a) => ({ ...a, [q.id]: o.id }))}
                  />
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border bg-white">
                    <span className={`h-2.5 w-2.5 rounded-sm ${checked ? 'bg-[#3B57C5]' : ''}`} />
                  </span>
                  <span className="text-sm text-gray-800">{o.label}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            disabled={i === 0}
            onClick={() => setI((v) => Math.max(0, v - 1))}
            className={`rounded-lg px-5 py-2 text-sm ${
              i === 0 ? 'bg-white/30 text-white/70' : 'bg-white text-[#3B57C5]'
            }`}
          >
            Previous
          </button>

          <button
            onClick={() => {
              if (!last) {
                setI((v) => Math.min(questions.length - 1, v + 1))
                return
              }
              submitAndClose()
            }}
            className="rounded-lg bg-white px-6 py-2 text-sm text-[#3B57C5]"
          >
            {last ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
