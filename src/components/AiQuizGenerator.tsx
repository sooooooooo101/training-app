import { useState } from 'react'
import { Button } from './ui/Button'
import { showToast } from './ui/Toast'
import { useT } from '../hooks/useT'

type GeneratedQuestion = {
  body: string
  choices: { body: string; is_correct: boolean }[]
}

type Props = {
  sectionText: string
  onGenerate: (questions: GeneratedQuestion[]) => void
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined

export function AiQuizGenerator({ sectionText, onGenerate }: Props) {
  const [count, setCount] = useState<3 | 5 | 7 | 10>(5)
  const [generating, setGenerating] = useState(false)
  const t = useT()

  if (!GEMINI_API_KEY) return null

  const handleGenerate = async () => {
    if (!sectionText.trim()) {
      showToast(t('aiNoContent'), 'error')
      return
    }

    setGenerating(true)

    try {
      const prompt = `以下の研修テキストを読んで、4択問題を${count}問生成してください。
必ず以下のJSON形式のみで返答してください（他のテキストは不要）:
[
  {
    "body": "問題文",
    "choices": [
      {"body": "選択肢1", "is_correct": true},
      {"body": "選択肢2", "is_correct": false},
      {"body": "選択肢3", "is_correct": false},
      {"body": "選択肢4", "is_correct": false}
    ]
  }
]

研修テキスト:
${sectionText.slice(0, 4000)}`

      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      )

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}))
        throw new Error(err.error?.message ?? t('aiGenerateFailed'))
      }

      const data = await resp.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (!jsonMatch) throw new Error(t('aiGenerateFailed'))

      const parsed: GeneratedQuestion[] = JSON.parse(jsonMatch[0])
      onGenerate(parsed)
      showToast(t('aiGenerated', { count: parsed.length }), 'success')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('aiGenerateFailed'), 'error')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={count}
        onChange={(e) => setCount(Number(e.target.value) as 3 | 5 | 7 | 10)}
        className="border border-border rounded-input px-2 py-1.5 text-sm"
      >
        {([3, 5, 7, 10] as const).map((n) => (
          <option key={n} value={n}>{t('nQuestions', { n })}</option>
        ))}
      </select>
      <Button variant="secondary" size="sm" loading={generating} onClick={handleGenerate}>
        {t('aiGenerate')}
      </Button>
    </div>
  )
}
