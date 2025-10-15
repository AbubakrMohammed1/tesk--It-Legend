export type Lesson = {
  id: string
  title: string
  videoUrl: string
  poster: string
}

export type Comment = {
  id: string
  author: string
  avatar: string
  date: string
  body: string
}

export type MaterialsStats = {
  duration: string
  lessons: number
  enrolled: string
  language: string
  durationAlt: string
  lessonsAlt: number
  enrolledAlt: string
  languageAlt: string
}

export type CurriculumItem = {
  id: string
  title: string
  minutes?: number
  questions?: number
  quizId?: string
  locked?: boolean
}

export type CurriculumSection = {
  id: string
  title: string
  subtitle: string
  items: CurriculumItem[]
}

export type QuizOption = { id: string; label: string }
export type QuizQuestion = { id: string; title: string; options: QuizOption[] }
export type Quiz = { id: string; questions: QuizQuestion[]; durationSec?: number }
export type QuizMap = Record<string, Quiz>

export type Course = {
  id: string
  title: string
  progress: number
  currentLesson: Lesson
  stats: MaterialsStats
  comments: Comment[]
  curriculum: CurriculumSection[]
  quizzes: QuizMap
}
