import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LanguageSelector } from '../components/ui/LanguageSelector'
import { useLpT, getDemoCourses } from '../lib/lpI18n'
import { useLanguageStore } from '../stores/languageStore'

type View = 'home' | 'course' | 'quiz' | 'result'

export function DemoPage() {
  const navigate = useNavigate()
  const t = useLpT()
  const { lang } = useLanguageStore()
  const DEMO_COURSES = getDemoCourses(lang)
  const [view, setView] = useState<View>('home')
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [score, setScore] = useState(0)

  const course = DEMO_COURSES.find((c) => c.id === activeCourseId) ?? null

  const handleStartCourse = (id: string) => {
    setActiveCourseId(id)
    setAnswers({})
    setView('course')
  }

  const handleStartQuiz = () => {
    setAnswers({})
    setView('quiz')
  }

  const handleSubmitQuiz = () => {
    if (!course) return
    const correct = course.quiz.filter((q) => answers[q.id] === q.correct).length
    setScore(correct)
    setView('result')
  }

  const handleBack = () => {
    if (view === 'result' || view === 'quiz') {
      setView('course')
    } else {
      setView('home')
      setActiveCourseId(null)
    }
  }

  /* ── Home ── */
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between gap-3">
          <button onClick={() => navigate('/')} className="text-primary font-semibold text-sm hover:underline shrink-0">
            {t('demoBackHome')}
          </button>
          <span className="font-bold text-gray-800 text-sm truncate">Demo — {t('demoTenantName')}</span>
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSelector />
            <button
              onClick={() => navigate('/app')}
              className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-input hover:bg-primary-dark transition-colors whitespace-nowrap"
            >
              {t('startFree')}
            </button>
          </div>
        </header>

        <div className="max-w-lg mx-auto px-4 py-8">
          <div className="bg-primary-light border border-primary/20 rounded-card px-4 py-3 mb-6 text-sm text-primary-dark font-medium">
            {t('demoBanner')}
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-1">{t('demoMyTraining')}</h1>
          <p className="text-sm text-gray-500 mb-6">{t('demoHello')}</p>

          <div className="flex flex-col gap-4">
            {DEMO_COURSES.map((c) => (
              <div key={c.id} className="bg-white border border-border rounded-card p-4 flex items-start gap-4">
                <span className="text-3xl">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-gray-900 text-sm mb-1">{c.title}</h2>
                  <p className="text-xs text-gray-500 mb-3">{c.description}</p>
                  <button
                    onClick={() => handleStartCourse(c.id)}
                    className="bg-primary text-white text-xs font-semibold px-4 py-1.5 rounded-input hover:bg-primary-dark transition-colors"
                  >
                    {t('demoStart')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 mb-3">{t('demoCtaSub')}</p>
            <button
              onClick={() => navigate('/app')}
              className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-input hover:bg-primary-dark transition-colors"
            >
              {t('startFree')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Course View ── */
  if (view === 'course' && course) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={handleBack} className="text-primary font-semibold text-sm hover:underline shrink-0">
            {t('demoBack')}
          </button>
          <h1 className="font-bold text-gray-800 text-sm truncate flex-1">{course.title}</h1>
          <LanguageSelector />
        </header>

        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="bg-white border border-border rounded-card p-6 mb-6">
            <div className="text-4xl mb-3">{course.emoji}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{course.title}</h2>
            <div className="text-sm text-gray-700 leading-relaxed">
              {course.content.trim().split('\n').map((line, i) => {
                if (line === '') return <div key={i} className="h-2" />
                if (/^\*\*.+\*\*$/.test(line)) {
                  return <p key={i} className="font-bold text-gray-900 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>
                }
                return <p key={i} className="mb-1">{line}</p>
              })}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartQuiz}
              className="bg-primary text-white text-base font-semibold px-8 py-3 rounded-input hover:bg-primary-dark transition-colors"
            >
              {t('demoTakeQuiz', { n: course.quiz.length })}
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Quiz ── */
  if (view === 'quiz' && course) {
    const answered = Object.keys(answers).length
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white border-b border-border px-4 py-2 flex items-center justify-between gap-2">
          <button onClick={handleBack} className="text-primary text-sm font-semibold hover:underline shrink-0">
            {t('demoBack')}
          </button>
          <h1 className="text-sm font-bold text-gray-800 truncate">Quiz</h1>
          <span className="text-xs text-gray-400 shrink-0">
            {t('demoAnswered', { answered, total: course.quiz.length })}
          </span>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
          {course.quiz.map((q, qi) => (
            <div key={q.id} className="bg-white border border-border rounded-card p-4">
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

          <div className="flex justify-center mt-2">
            <button
              onClick={handleSubmitQuiz}
              disabled={answered < course.quiz.length}
              className="bg-primary text-white text-base font-semibold px-8 py-3 rounded-input hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t('demoSubmit')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Result ── */
  if (view === 'result' && course) {
    const total = course.quiz.length
    const pct = Math.round((score / total) * 100)
    const passed = pct >= 70

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setView('home')} className="text-primary font-semibold text-sm hover:underline">
            {t('demoBackCourses')}
          </button>
          <LanguageSelector />
        </header>

        <div className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="bg-white border border-border rounded-card p-8 max-w-sm w-full text-center">
            <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {passed ? t('demoWellDone') : t('demoKeepPracticing')}
            </h2>
            <p className="text-4xl font-bold text-primary my-4">{pct}%</p>
            <p className="text-sm text-gray-500 mb-6">
              {t('demoCorrect', { score, total })}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setView('home')}
                className="bg-primary text-white text-sm font-semibold py-2.5 rounded-input hover:bg-primary-dark transition-colors w-full"
              >
                {t('demoBackCourses')}
              </button>
              <button
                onClick={() => navigate('/app')}
                className="bg-primary-light text-primary text-sm font-semibold py-2.5 rounded-input hover:bg-green-100 transition-colors w-full"
              >
                {t('demoCta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
