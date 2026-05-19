import type { ModuleId } from '@/content/manifest'
import type { Question } from './types'
import { QUIZ_FOUNDATIONS } from './foundations'
import { QUIZ_POWER_COOLING } from './power-cooling'
import { QUIZ_NETWORK } from './network'
import { QUIZ_STORAGE } from './storage'
import { QUIZ_COMPUTE } from './compute'
import { QUIZ_VIRT_CLOUD } from './virt-cloud'

export const QUIZZES: Record<ModuleId, Question[]> = {
  foundations: QUIZ_FOUNDATIONS,
  'power-cooling': QUIZ_POWER_COOLING,
  network: QUIZ_NETWORK,
  storage: QUIZ_STORAGE,
  compute: QUIZ_COMPUTE,
  'virt-cloud': QUIZ_VIRT_CLOUD,
}
