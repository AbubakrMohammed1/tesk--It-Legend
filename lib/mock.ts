import { Course } from './types'

export function getCourse(id: string): Course {
  return {
    id,
    title: 'Starting SEO as your Home',
    progress: 63,
    currentLesson: {
      id: 'l1',
      title: 'Course Overview',
      videoUrl: 'https://www.youtube.com/watch?v=re1T8kk3pz4&t=10s',
      poster: '/img.png'
    },
    stats: {
      duration: '3 weeks',
      lessons: 8,
      enrolled: '615 students',
      language: 'English',
      durationAlt: '3 weeks',
      lessonsAlt: 8,
      enrolledAlt: '615 students',
      languageAlt: 'English'
    },
comments: [
  {
    id: 'c1',
    author: 'Osama Elzero',
    avatar: 'https://i.pravatar.cc/80?u=1',
    date: 'Oct 12, 2021',
    body:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  },
  {
    id: 'c2',
    author: 'Ghareeb Elsheikh',
    avatar: 'https://i.pravatar.cc/80?u=2',
    date: 'Oct 12, 2021',
    body:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  },
  {
    id: 'c3',
    author: 'Mohamed Gamal',
    avatar: 'https://i.pravatar.cc/80?u=8',
    date: 'Oct 12, 2021',
    body:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  }
],

    curriculum: [
      {
        id: 's1',
        title: 'Week 1-4',
        subtitle: 'Advanced story telling techniques for writers personas, characters & plots',
        items: [
          { id: 'i1', title: 'Introduction' },
          { id: 'i4', title: 'Editor installation', locked: true },
          { id: 'i5', title: 'Embedding PHP in HTML', locked: true },
          { id: 'i6', title: 'Course Reference' },
          { id: 'i2', title: 'Course Overview', questions: 3, minutes: 10, quizId: 'q-i2' },
          { id: 'i7', title: 'Editor installation', locked: true },
          { id: 'i8', title: 'Embedding PHP in HTML', locked: true }
        ]
      },
      {
        id: 's2',
        title: 'Week 5-8',
        subtitle: 'Advanced story telling techniques for writers personas, characters & plots',
        items: [
          { id: 'i9', title: 'Defining Functions' },
          { id: 'i10', title: 'Function Parameters' },
          { id: 'i11', title: 'Return Values from Functions', questions: 3, minutes: 11, quizId: 'q-i11' },
          { id: 'i12', title: 'Global Variable and Scope', locked: true }
        ]
      },
      {
        id: 's3',
        title: 'Week 9-12',
        subtitle: 'Advanced story telling techniques for writers personas, characters & plots',
        items: [
          { id: 'i13', title: 'Defining Functions' },
          { id: 'i14', title: 'Function Parameters' },
          { id: 'i15', title: 'Return Values from Functions', questions: 3, minutes: 12, locked: true, quizId: 'q-i15' }
        ]
      }
    ],
    quizzes: {
      'q-i2': {
        id: 'q-i2',
        durationSec: 600,
        questions: [
          {
            id: 'q1',
            title: 'What is the capital of France?',
            options: [
              { id: 'a', label: 'Paris' },
              { id: 'b', label: 'London' },
              { id: 'c', label: 'Berlin' },
              { id: 'd', label: 'Madrid' }
            ]
          },
          {
            id: 'q2',
            title: 'HTTP stands for?',
            options: [
              { id: 'a', label: 'HyperText Transfer Protocol' },
              { id: 'b', label: 'High Transfer Text Program' },
              { id: 'c', label: 'Home Tool Transfer Page' },
              { id: 'd', label: 'None' }
            ]
          },
          {
            id: 'q3',
            title: 'CSS is used for?',
            options: [
              { id: 'a', label: 'Styling pages' },
              { id: 'b', label: 'Database' },
              { id: 'c', label: 'Server logic' },
              { id: 'd', label: 'Version control' }
            ]
          }
        ]
      },
      'q-i11': {
        id: 'q-i11',
        durationSec: 660,
        questions: [
          { id: 'q1', title: '2 + 2 = ?', options: [{ id: 'a', label: '4' }, { id: 'b', label: '22' }, { id: 'c', label: '3' }, { id: 'd', label: '5' }] },
          { id: 'q2', title: 'Capital of India?', options: [{ id: 'a', label: 'Delhi' }, { id: 'b', label: 'Mumbai' }, { id: 'c', label: 'Kolkata' }, { id: 'd', label: 'Chennai' }] },
          { id: 'q3', title: 'HTML stands for?', options: [{ id: 'a', label: 'HyperText Markup Language' }, { id: 'b', label: 'Home Tool Markup Language' }, { id: 'c', label: 'Hyperlinks and Text Markup Language' }, { id: 'd', label: 'None' }] }
        ]
      },
      'q-i15': {
        id: 'q-i15',
        durationSec: 720,
        questions: [
          { id: 'q1', title: 'Which is not a JS framework?', options: [{ id: 'a', label: 'React' }, { id: 'b', label: 'Angular' }, { id: 'c', label: 'Vue' }, { id: 'd', label: 'Laravel' }] },
          { id: 'q2', title: 'Tailwind is a?', options: [{ id: 'a', label: 'CSS framework' }, { id: 'b', label: 'DB' }, { id: 'c', label: 'Language' }, { id: 'd', label: 'Server' }] },
          { id: 'q3', title: 'TypeScript adds?', options: [{ id: 'a', label: 'Types' }, { id: 'b', label: 'Styles' }, { id: 'c', label: 'Routing' }, { id: 'd', label: 'Images' }] }
        ]
      }
    }
  }
}
