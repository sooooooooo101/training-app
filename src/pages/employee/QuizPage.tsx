import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { showToast } from '../../components/ui/Toast'
import { Button } from '../../components/ui/Button'
import { useT } from '../../hooks/useT'
import type { Question, Choice, SubmitQuizResponse } from '../../types'

type QuestionWithChoices = Question & { choices: Omit<Choice, 'is_correct'>[] }

export function QuizPage() {
  const { id } = useParams<{ id: string }>()
  const [questions, setQuestions] = useState<QuestionWithChoices[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { employee, tenantId } = useAuthStore()
  const navigate = useNavigate()
  const t = useT()

  useEffect(() => {
    const fetch = async () => {
      if (!id || !tenantId) return
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('id, course_id, order_index, body, choices(id, question_id, order_index, body)')
          .eq('course_id', id)
          .order('order_index')
        if (error) throw error
        const sorted = (data ?? []).map((q: QuestionWithChoices) => ({
          ...q,
          choices: (q.choices ?? []).sort((a, b) => a.order_index - b.order_index),
        }))
        setQuestions(sorted)
      } catch (e: unknown) {
        showToast(e instanceof Error ? e.message : t('questionsFetchFailed'), 'error')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id, tenantId, t])

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      showToast(t('answerAll'), 'error')
      return
    }
    if (!employee || !id) return
    setSubmitting(true)

    try {
      const submitUrl = import.meta.env.VITE_SUBMIT_QUIZ_URL as string
      const payload = {
        course_id: id,
        answers: Object.entries(answers).map(([question_id, choice_id]) => ({ question_id, choice_id })),
      }

      const resp = await fetch(submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-employee-id': employee.id,
          'x-employee-pin': sessionStorage.getItem(`pin_${employee.id}`) ?? '',
        },
        body: JSON.stringify(payload),
      })

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}))
        throw new Error(err.error ?? t('scoringFailed'))
      }

      const result: SubmitQuizResponse = await resp.json()
      navigate(`/employee/courses/${id}/result`, { state: { result, questions } })
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('scoringFailed'), 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-gray-400">{t('loading')}</div>

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-2 flex items-center justify-between gap-2">
        <button onClick={() => navigate(-1)} className="text-primary text-sm font-semibold hover:underline whitespace-nowrap shrink-0">
          {t('backToTraining')}
        </button>
        <h1 className="text-sm font-bold text-gray-800 truncate text-center">{t('quizTitle')}</h1>
        <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{Object.keys(answers).length} / {questions.length}</span>
      </header>

      <main className="p-4 sm:p-6 max-w-2xl mx-auto">
        <div className="flex flex-col gap-6">
          {questions.map((q, qi) => (
            <div key={q.id} className="bg-card border border-border rounded-card p-4">
              <p className="font-semibold text-gray-800 mb-3">Q{qi + 1}. {q.body}</p>
              <div className="flex flex-col gap-2">
                {q.choices.map((c) => (
                  <label key={c.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={c.id}
                      checked={answers[q.id] === c.id}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: c.id }))}
                      className="accent-primary"
                    />
                    <span className="text-sm text-gray-700">{c.body}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            loading={submitting}
            disabled={Object.keys(answers).length < questions.length}
            onClick={handleSubmit}
          >
            {t('submit')}
          </Button>
        </div>
      </main>
    </div>
  )
}
