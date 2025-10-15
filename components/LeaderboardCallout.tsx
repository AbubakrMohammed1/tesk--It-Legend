export function LeaderboardCallout({
  percent = 63
}: {
  courseName?: string
  percent?: number
}) {
  return (
    <div className="rounded-xl border bg-white p-4 m-2">
      <p className="-mt-0.5 text-center text-base font-semibold text-indigo-900">
        Leaderboard
      </p>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-indigo-50 px-4 py-3 text-indigo-900">
        <p className="text-[13px] leading-6">
          عظيم يا صديقي.. أداؤك في الكورس ده
          <br />
          أفضل من {percent}% من باقي الطلبة.. كمل
          <br />
          عايز أشوف اسمك في الليدربورد هنا
        </p>
        <span className="ml-3 text-3xl leading-none">💪</span>
      </div>
    </div>
  )
}
