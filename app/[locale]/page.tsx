import Lang from '@/components/lang/Lang'
import {useTranslations} from 'next-intl'
import Link from 'next/link'
import CoursePage from '../course/[id]/course'
import "./globals.css"

export default function Home() {
  const t = useTranslations('home')
  return (
    <div>


<CoursePage params={{
        id: '1'
      }}/>
        {/* <Lang/> */}


    </div>
  )
}
