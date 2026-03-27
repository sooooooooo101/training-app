export type Tenant = {
  id: string
  name: string
  created_at: string
}

export type Admin = {
  id: string
  tenant_id: string
  name: string
}

export type Employee = {
  id: string
  tenant_id: string
  name: string
  created_at: string
}

export type Course = {
  id: string
  tenant_id: string
  title: string
  category: string
  description: string | null
  pass_score: number
  created_at: string
  sections?: Section[]
  questions?: Question[]
}

export type Section = {
  id: string
  course_id: string
  order_index: number
  title: string | null
  body: string | null
  image_path: string | null
  image_url?: string | null
  video_url: string | null
}

export type Question = {
  id: string
  course_id: string
  order_index: number
  body: string
  choices: Choice[]
}

export type Choice = {
  id: string
  question_id: string
  order_index: number
  body: string
  is_correct?: boolean
}

export type Progress = {
  id: string
  employee_id: string
  course_id: string
  status: '未受講' | '受講中' | '合格' | '不合格'
  score: number | null
  attempted_at: string | null
}

export type SubmitQuizResponse = {
  score: number
  passed: boolean
  total: number
  correct: number
  details: { question_id: string; is_correct: boolean }[]
}
