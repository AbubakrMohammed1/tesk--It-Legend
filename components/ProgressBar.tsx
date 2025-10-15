export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full border-0 border-none">
      {/* العنوان */}
      <h2 className="mb-2 text-3xl font-semibold text-gray-900">
        Topics for This Course
      </h2>

      {/* الحاوية الكاملة للشريط */}
      <div className="relative w-full m-10 ml-0 ">
        {/* الخلفية */}
        <div className="h-[3px] w-full rounded-full bg-gray-200" />

        {/* الشريط الأخضر */}
        <div
          className="absolute left-0 top-0 h-[3px] rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${value}%` }}
        />

        {/* فقاعة You */}
        <div
          className="absolute -top-6 flex flex-col items-center "
          style={{ left: `calc(${value}% - 18px)` }}
        >
          <div className="rounded-full border border-gray-300 bg-white relative top-[-5] px-2 py-[1px] text-[10px] text-gray-600 shadow-sm">
            You
          </div>
          <div className="mt-[2px] h-[6px] w-[1px] bg-gray-400" />
        </div>
      {/* النسبة أسفل الشريط */}
      <p className="mt-1 text-center text-[15px] font-medium text-green-800">
        {value}%
      </p>
      </div>

    </div>
  )
}
