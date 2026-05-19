import type { ModuleId } from '@/content/manifest'

export const STORAGE_KEY = 'ddo-study:state'

export type LessonProgress = {
  viewedAt: string
  quickCheckScore?: number
  quickCheckTotal?: number
}

export type QuizProgress = {
  score: number
  attempts: number
  bestAt: string
}

export type LabStat = {
  uses: number
  lastAt: string
}

export type ProgressState = {
  lessonsViewed: Record<string, LessonProgress>
  moduleQuizzes: Partial<Record<ModuleId, QuizProgress>>
  xp: number
  badges: string[]
  labStats: Record<string, LabStat>
  lastVisited: { moduleId: ModuleId; lessonSlug: string } | null
}

export const INITIAL_PROGRESS: ProgressState = {
  lessonsViewed: {},
  moduleQuizzes: {},
  xp: 0,
  badges: [],
  labStats: {},
  lastVisited: null,
}

export type Badge = {
  id: string
  title: string
  description: string
  icon: string
}

export const BADGE_CATALOG: Badge[] = [
  {
    id: 'first-step',
    title: 'Primo passo',
    description: 'Apri la tua prima lezione.',
    icon: '🚀',
  },
  {
    id: 'foundations-done',
    title: 'Foundations Expert',
    description: 'Quiz Foundations superato ≥80%.',
    icon: '🏛️',
  },
  {
    id: 'power-cooling-done',
    title: 'Power & Cooling Pro',
    description: 'Quiz Power & Cooling superato ≥80%.',
    icon: '❄️',
  },
  {
    id: 'network-done',
    title: 'Network Architect',
    description: 'Quiz Network superato ≥80%.',
    icon: '🌐',
  },
  {
    id: 'storage-done',
    title: 'Storage Guru',
    description: 'Quiz Storage superato ≥80%.',
    icon: '💾',
  },
  {
    id: 'compute-done',
    title: 'Compute Master',
    description: 'Quiz Compute superato ≥80%.',
    icon: '🧠',
  },
  {
    id: 'virt-cloud-done',
    title: 'Cloud Operator',
    description: 'Quiz Virtualization & Cloud superato ≥80%.',
    icon: '☁️',
  },
  {
    id: 'lab-pue',
    title: 'PUE Tuner',
    description: 'Hai sperimentato con il PUE calculator.',
    icon: '⚡',
  },
  {
    id: 'lab-fat-tree',
    title: 'Fabric Designer',
    description: 'Hai esplorato la topologia fat-tree.',
    icon: '🕸️',
  },
  {
    id: 'lab-migration',
    title: 'Live Migrator',
    description: 'Hai simulato una VM live migration.',
    icon: '🔁',
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Tutti e 6 i quiz superati ≥80%.',
    icon: '🏆',
  },
]

export const BADGES_BY_ID: Record<string, Badge> = Object.fromEntries(
  BADGE_CATALOG.map((b) => [b.id, b]),
)

export const MODULE_BADGE: Record<ModuleId, string> = {
  foundations: 'foundations-done',
  'power-cooling': 'power-cooling-done',
  network: 'network-done',
  storage: 'storage-done',
  compute: 'compute-done',
  'virt-cloud': 'virt-cloud-done',
}

export function xpForQuiz(score: number): number {
  if (score >= 1) return 150
  if (score >= 0.8) return 100
  if (score >= 0.6) return 50
  return 10
}
