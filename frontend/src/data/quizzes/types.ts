export type MCQuestion = {
  kind: 'mc'
  question: string
  choices: { id: string; text: string }[]
  correctId: string
  explanation?: string
}

export type TFQuestion = {
  kind: 'tf'
  question: string
  answer: boolean
  explanation?: string
}

export type Question = MCQuestion | TFQuestion
