import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import '@fontsource-variable/inter/index.css'
import 'katex/dist/katex.min.css'
import './styles/global.css'
import './styles/markdown.css'
import './styles/labs.css'
import './styles/quiz.css'

import { ProgressProvider } from './hooks/useProgress'
import { Layout } from './components/Layout'
import { Home } from './routes/Home'
import { ModulePage } from './routes/ModulePage'
import { LessonPage } from './routes/LessonPage'
import { QuizPage } from './routes/QuizPage'
import { LabIndex, LabPage } from './routes/LabPage'
import { ProgressPage } from './routes/ProgressPage'
import { NotFound } from './routes/NotFound'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'modulo/:moduleId', element: <ModulePage /> },
        { path: 'modulo/:moduleId/lezione/:lessonSlug', element: <LessonPage /> },
        { path: 'modulo/:moduleId/quiz', element: <QuizPage /> },
        { path: 'lab', element: <LabIndex /> },
        { path: 'lab/:slug', element: <LabPage /> },
        { path: 'progressi', element: <ProgressPage /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProgressProvider>
      <RouterProvider router={router} />
    </ProgressProvider>
  </StrictMode>,
)
