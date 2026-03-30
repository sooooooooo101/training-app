import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LanguageSelector } from '../components/ui/LanguageSelector'
import { useLpT } from '../lib/lpI18n'

type View = 'home' | 'course' | 'quiz' | 'result'

const DEMO_COURSES = [
  {
    id: 'hygiene',
    title: 'Restaurant hygiene basics',
    description: 'Essential food safety and hygiene practices for all restaurant staff.',
    emoji: '🧼',
    content: `**Why hygiene matters**

Food safety is the foundation of every restaurant. Poor hygiene can cause foodborne illness, health code violations, and permanent damage to your reputation.

**Key practices**

1. **Handwashing** — Wash hands for at least 20 seconds before handling food, after touching raw meat, and after using the restroom.

2. **Temperature control** — Keep hot foods above 60°C and cold foods below 5°C. Never leave food in the "danger zone" (5–60°C) for more than 2 hours.

3. **Cross-contamination prevention** — Use separate cutting boards and utensils for raw meat, vegetables, and ready-to-eat foods. Always store raw meat below ready-to-eat foods in the refrigerator.

4. **Surface sanitization** — Clean and sanitize all food-contact surfaces every 4 hours during service, and immediately after contact with raw meat.

5. **Personal hygiene** — Keep fingernails short and clean. Do not wear jewelry while handling food. Stay home when sick.`,
    quiz: [
      {
        id: 'q1',
        body: 'How long should you wash your hands before handling food?',
        choices: [
          { id: 'a', body: '5 seconds' },
          { id: 'b', body: '10 seconds' },
          { id: 'c', body: '20 seconds' },
          { id: 'd', body: '60 seconds' },
        ],
        correct: 'c',
      },
      {
        id: 'q2',
        body: 'What is the "danger zone" temperature range for food?',
        choices: [
          { id: 'a', body: '0°C – 10°C' },
          { id: 'b', body: '5°C – 60°C' },
          { id: 'c', body: '10°C – 70°C' },
          { id: 'd', body: '20°C – 80°C' },
        ],
        correct: 'b',
      },
      {
        id: 'q3',
        body: 'Where should raw meat be stored in the refrigerator?',
        choices: [
          { id: 'a', body: 'On the top shelf' },
          { id: 'b', body: 'Next to vegetables' },
          { id: 'c', body: 'Below ready-to-eat foods' },
          { id: 'd', body: 'It does not matter' },
        ],
        correct: 'c',
      },
    ],
  },
  {
    id: 'service',
    title: 'Customer service 101',
    description: 'How to deliver exceptional guest experiences every time.',
    emoji: '😊',
    content: `**The guest experience starts with you**

Every interaction with a guest shapes how they feel about your restaurant. Great service turns first-time visitors into loyal regulars.

**Core principles**

1. **Greet promptly** — Acknowledge guests within 30 seconds of arrival, even if you're busy. A simple "Welcome, I'll be right with you!" goes a long way.

2. **Listen actively** — Give guests your full attention when they're speaking. Repeat back their order to confirm accuracy.

3. **Know your menu** — Be prepared to explain every dish, including allergens and preparation methods. If you don't know, find out — don't guess.

4. **Handle complaints with HEAT**
   - **H**ear them out (let them finish)
   - **E**mpathize ("I completely understand")
   - **A**pologize sincerely
   - **T**ake action immediately

5. **The farewell matters** — Thank guests by name if you know it. Invite them to return. A warm goodbye is as important as the welcome.`,
    quiz: [
      {
        id: 'q1',
        body: 'How quickly should you acknowledge a guest who has arrived?',
        choices: [
          { id: 'a', body: 'Within 30 seconds' },
          { id: 'b', body: 'Within 2 minutes' },
          { id: 'c', body: 'When you finish your current task' },
          { id: 'd', body: 'After they sit down' },
        ],
        correct: 'a',
      },
      {
        id: 'q2',
        body: 'What should you do if a guest asks about a dish you are unsure about?',
        choices: [
          { id: 'a', body: 'Make your best guess' },
          { id: 'b', body: "Tell them it's delicious" },
          { id: 'c', body: 'Find out the correct information' },
          { id: 'd', body: 'Recommend a different dish' },
        ],
        correct: 'c',
      },
      {
        id: 'q3',
        body: 'What does the "A" in HEAT stand for when handling complaints?',
        choices: [
          { id: 'a', body: 'Ask questions' },
          { id: 'b', body: 'Apologize sincerely' },
          { id: 'c', body: 'Avoid escalation' },
          { id: 'd', body: 'Act quickly' },
        ],
        correct: 'b',
      },
    ],
  },
]

export function DemoPage() {
  const navigate = useNavigate()
  const t = useLpT()
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
