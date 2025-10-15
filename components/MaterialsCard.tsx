import { MaterialsStats } from '@/lib/types'
import { JSX } from 'react';

const Icon = {
  clock: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  lessons: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path d="M2.05 12h19.9M12 2.05a15.3 15.3 0 0 1 0 19.9M12 2.05a15.3 15.3 0 0 0 0 19.9" />
    </svg>
  )
}

type RowProps = { icon: JSX.Element; label: string; value: string; withDivider?: boolean }

function Row({ icon, label, value, withDivider }: RowProps) {
  return (
    <div className={withDivider ? 'flex items-center justify-between py-3 border-b border-gray-200/70 last:border-b-0' : 'flex items-center justify-between py-3'}>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-700 ring-1 ring-gray-200">
          {icon}
        </span>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  )
}

export function MaterialsCard({ stats }: { stats: MaterialsStats }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold">Course Materials</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* العمود الأيسر */}
        <div className="rounded-lg bg-white">
          <Row icon={Icon.clock} label="Duration" value={stats.duration} withDivider />
          <Row icon={Icon.lessons} label="Lessons" value={String(stats.lessons)} withDivider />
          <Row icon={Icon.users} label="Enrolled" value={stats.enrolled} withDivider />
          <Row icon={Icon.globe} label="Language" value={stats.language} />
        </div>

        {/* العمود الأيمن */}
        <div className="rounded-lg bg-white">
          <Row icon={Icon.clock} label="Duration" value={stats.durationAlt} withDivider />
          <Row icon={Icon.lessons} label="Lessons" value={String(stats.lessonsAlt)} withDivider />
          <Row icon={Icon.users} label="Enrolled" value={stats.enrolledAlt} withDivider />
          <Row icon={Icon.globe} label="Language" value={stats.languageAlt} />
        </div>
      </div>
    </div>
  )
}
