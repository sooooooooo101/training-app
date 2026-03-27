import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { useT } from '../../hooks/useT'
import type { SubmitQuizResponse, Question } from '../../types'

export function QuizResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const t = useT()
  const { result, questions } = (location.state ?? {}) as {
    result?: SubmitQuizResponse
    questions?: Question[]
  }

  if (!result) {
    navigate('/employee')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-3">
        <h1 className="text-base font-bold text-gray-800">{t('resultTitle')}</h1>
      </header>

      <main className="p-6 max-w-2xl mx-auto">
        {/* Score card */}
        <Card className={`text-center py-8 mb-6 ${result.passed ? 'border-primary' : 'border-danger'}`}>
          <div className={`text-6xl font-bold mb-2 ${result.passed ? 'text-primary' : 'text-danger'}`}>
            {t('scoreDisplay', { score: result.score })}
          </div>
          <Badge
            label={result.passed ? t('statusPassed') : t('statusFailed')}
            color={result.passed ? 'green' : 'red'}
          />
          <p className="text-sm text-gray-500 mt-3">
            {t('correctCount', { correct: result.correct, total: result.total })}
          </p>
        </Card>

        {/* Question details */}
        <div className="flex flex-col gap-3 mb-8">
          {(questions ?? []).map((q, qi) => {
            const detail = result.details.find((d) => d.question_id === q.id)
            return (
              <Card key={q.id} className={`border ${detail?.is_correct ? 'border-primary' : 'border-danger'}`}>
                <div className="flex items-start gap-2">
                  <span className={`text-sm font-bold ${detail?.is_correct ? 'text-primary' : 'text-danger'}`}>
                    {detail?.is_correct ? '○' : '✗'}
                  </span>
                  <p className="text-sm text-gray-700">Q{qi + 1}. {q.body}</p>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="flex flex-col gap-3">
          {!result.passed && (
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => navigate(`/employee/courses/${id}`)}
            >
              {t('reviewTraining')}
            </Button>
          )}
          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate('/employee')}
          >
            {t('backToCourseList')}
          </Button>
        </div>
      </main>
    </div>
  )
}
