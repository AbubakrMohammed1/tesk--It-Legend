import { getCourse } from '@/lib/mock'
import { VideoHeader } from '@/components/VideoHeader'
import { MaterialsCard } from '@/components/MaterialsCard'
import { Comments } from '@/components/Comments'
import { CurriculumSidebar } from '@/components/CurriculumSidebar'
import ClearQuizStorageOnReload from '@/components/ClearQuizStorageOnReload'

type Props = { params: { id: string } }

export default function CoursePage({ params }: Props) {
  const course = getCourse(params.id)

  return (
    <main className="mx-auto max-w-screen-xl py-6 px-2">
      <nav className="mb-4 text-xs text-gray-500">Home › Courses › Course Details</nav>
      <h1 className="mb-4 text-2xl font-semibold">{course.title}</h1>
      <ClearQuizStorageOnReload />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* القسم الأيسر */}
        <section className="space-y-6 lg:col-span-2">
          {/* الفيديو */}
          <div id="top">
            <VideoHeader lesson={course.currentLesson} />
          </div>

          {/* المواد */}
          <div id="materials">
            <MaterialsCard stats={course.stats} />
          </div>

          {/* التعليقات */}
          <div id="comments">
            <Comments thread={course.comments} />
          </div>
        </section>

        {/* الشريط الجانبي */}
        <aside className="space-y-6 lg:col-span-1 lg:sticky lg:top-6 h-fit">
          <div id="curriculum">
            <CurriculumSidebar
              curriculum={course.curriculum}
              progress={course.progress}
              quizzes={course.quizzes}
            />
          </div>
        </aside>
      </div>
    </main>
  )
}
