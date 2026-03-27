import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { showToast } from '../../components/ui/Toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Card } from '../../components/ui/Card'
import { ImageUploader } from '../../components/ImageUploader'
import { VideoEmbed } from '../../components/VideoEmbed'
import { AiQuizGenerator } from '../../components/AiQuizGenerator'
import { uploadImage, getSignedUrl } from '../../lib/imageUtils'
import { useT } from '../../hooks/useT'
import type { Section, Question, Choice } from '../../types'

// カテゴリはDBに日本語で保存されているためそのまま維持
const CATEGORIES = ['接客', '調理', '衛生', '安全', 'その他']

type SectionDraft = Omit<Section, 'id' | 'course_id'> & {
  id?: string
  _imageBlob?: Blob
  _imagePreview?: string
}

type QuestionDraft = {
  id?: string
  order_index: number
  body: string
  choices: ChoiceDraft[]
}

type ChoiceDraft = {
  id?: string
  order_index: number
  body: string
  is_correct: boolean
}

export function CourseEditPage() {
  const { id } = useParams<{ id: string }>()
  const isNew = !id
  const navigate = useNavigate()
  const { tenantId } = useAuthStore()
  const t = useT()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('接客')
  const [description, setDescription] = useState('')
  const [passScore, setPassScore] = useState(70)
  const [sections, setSections] = useState<SectionDraft[]>([])
  const [questions, setQuestions] = useState<QuestionDraft[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!isNew)

  const fetchCourse = useCallback(async () => {
    if (!id || !tenantId) return
    setLoading(true)
    try {
      const { data: course, error } = await supabase
        .from('courses')
        .select(`*, sections(*), questions(*, choices(*))`)
        .eq('id', id)
        .eq('tenant_id', tenantId)
        .single()

      if (error) throw error

      setTitle(course.title)
      setCategory(course.category)
      setDescription(course.description ?? '')
      setPassScore(course.pass_score)

      const rawSections: Section[] = (course.sections ?? []).sort((a: Section, b: Section) => a.order_index - b.order_index)

      const sectionsWithUrls = await Promise.all(
        rawSections.map(async (s: Section) => {
          let image_url: string | null = null
          if (s.image_path) {
            try { image_url = await getSignedUrl(s.image_path) } catch { /* ignore */ }
          }
          return { ...s, image_url } as SectionDraft
        })
      )
      setSections(sectionsWithUrls)

      const rawQuestions = (course.questions ?? []).sort((a: Question, b: Question) => a.order_index - b.order_index)
      setQuestions(rawQuestions.map((q: Question) => ({
        ...q,
        choices: (q.choices ?? []).sort((a: Choice, b: Choice) => a.order_index - b.order_index),
      })))
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('adminEditFetchFailed'), 'error')
    } finally {
      setLoading(false)
    }
  }, [id, tenantId, t])

  useEffect(() => { if (!isNew) fetchCourse() }, [isNew, fetchCourse])

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { order_index: prev.length, title: null, body: null, image_path: null, video_url: null },
    ])
  }

  const updateSection = (index: number, updates: Partial<SectionDraft>) => {
    setSections((prev) => prev.map((s, i) => i === index ? { ...s, ...updates } : s))
  }

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, order_index: i })))
  }

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        order_index: prev.length,
        body: '',
        choices: [0, 1, 2, 3].map((i) => ({ order_index: i, body: '', is_correct: i === 0 })),
      },
    ])
  }

  const updateQuestion = (qi: number, body: string) => {
    setQuestions((prev) => prev.map((q, i) => i === qi ? { ...q, body } : q))
  }

  const updateChoice = (qi: number, ci: number, updates: Partial<ChoiceDraft>) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qi
          ? {
              ...q,
              choices: q.choices.map((c, j) =>
                j === ci ? { ...c, ...updates } : updates.is_correct ? { ...c, is_correct: false } : c
              ),
            }
          : q
      )
    )
  }

  const removeQuestion = (qi: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== qi).map((q, i) => ({ ...q, order_index: i })))
  }

  const handleSave = async () => {
    if (!title.trim()) { showToast(t('adminTitleRequired'), 'error'); return }
    if (!tenantId) return
    setSaving(true)
    try {
      let courseId = id

      if (isNew) {
        const { data, error } = await supabase
          .from('courses')
          .insert({ tenant_id: tenantId, title, category, description: description || null, pass_score: passScore })
          .select('id')
          .single()
        if (error) throw error
        courseId = data.id
      } else {
        const { error } = await supabase
          .from('courses')
          .update({ title, category, description: description || null, pass_score: passScore })
          .eq('id', courseId!)
          .eq('tenant_id', tenantId)
        if (error) throw error
      }

      for (let i = 0; i < sections.length; i++) {
        const s = sections[i]
        let image_path = s.image_path

        if (s._imageBlob) {
          image_path = await uploadImage(s._imageBlob, tenantId)
        }

        const payload = {
          course_id: courseId!,
          order_index: i,
          title: s.title || null,
          body: s.body || null,
          image_path,
          video_url: s.video_url || null,
        }

        if (s.id) {
          const { error } = await supabase.from('sections').update(payload).eq('id', s.id)
          if (error) throw error
        } else {
          const { error } = await supabase.from('sections').insert(payload)
          if (error) throw error
        }
      }

      if (!isNew) {
        const existingIds = sections.filter((s) => s.id).map((s) => s.id!)
        const { data: dbSections } = await supabase.from('sections').select('id').eq('course_id', courseId!)
        const toDelete = (dbSections ?? []).filter((s: { id: string }) => !existingIds.includes(s.id)).map((s: { id: string }) => s.id)
        if (toDelete.length > 0) {
          await supabase.from('sections').delete().in('id', toDelete)
        }
      }

      for (let qi = 0; qi < questions.length; qi++) {
        const q = questions[qi]
        if (!q.body.trim()) continue

        let qId = q.id
        const qPayload = { course_id: courseId!, order_index: qi, body: q.body }

        if (q.id) {
          const { error } = await supabase.from('questions').update(qPayload).eq('id', q.id)
          if (error) throw error
        } else {
          const { data, error } = await supabase.from('questions').insert(qPayload).select('id').single()
          if (error) throw error
          qId = data.id
        }

        for (let ci = 0; ci < q.choices.length; ci++) {
          const c = q.choices[ci]
          const cPayload = { question_id: qId!, order_index: ci, body: c.body, is_correct: c.is_correct }
          if (c.id) {
            const { error } = await supabase.from('choices').update(cPayload).eq('id', c.id)
            if (error) throw error
          } else {
            const { error } = await supabase.from('choices').insert(cPayload)
            if (error) throw error
          }
        }
      }

      if (!isNew) {
        const existingQIds = questions.filter((q) => q.id).map((q) => q.id!)
        const { data: dbQuestions } = await supabase.from('questions').select('id').eq('course_id', courseId!)
        const toDelete = (dbQuestions ?? []).filter((q: { id: string }) => !existingQIds.includes(q.id)).map((q: { id: string }) => q.id)
        if (toDelete.length > 0) {
          await supabase.from('questions').delete().in('id', toDelete)
        }
      }

      showToast(t('adminSaveSuccess'), 'success')
      navigate('/admin/courses')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('adminSaveFailed'), 'error')
    } finally {
      setSaving(false)
    }
  }

  const sectionBodiesText = sections.map((s) => `${s.title ?? ''}\n${s.body ?? ''}`).join('\n\n')

  if (loading) return <div className="text-center py-12 text-gray-400">{t('loading')}</div>

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">{isNew ? t('adminNewCourseTitle') : t('adminEditCourseTitle')}</h2>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate('/admin/courses')}>{t('adminCancel')}</Button>
          <Button loading={saving} onClick={handleSave}>{t('adminSave')}</Button>
        </div>
      </div>

      {/* Basic info */}
      <Card className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-4">{t('adminBasicInfo')}</h3>
        <div className="flex flex-col gap-4">
          <Input label={t('adminCourseTitleLabel')} value={title} onChange={(e) => setTitle(e.target.value)} required />
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-semibold text-gray-700">{t('adminCategoryLabel')}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-border rounded-input px-3 py-2 text-sm focus:outline-none"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1 w-32">
              <label className="text-sm font-semibold text-gray-700">{t('adminPassScoreLabel')}</label>
              <input
                type="number"
                min={0}
                max={100}
                value={passScore}
                onChange={(e) => setPassScore(Number(e.target.value))}
                className="border border-border rounded-input px-3 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>
          <Textarea label={t('adminDescriptionLabel')} value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
        </div>
      </Card>

      {/* Sections */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700">{t('adminSectionsTitle')}</h3>
          <Button variant="secondary" size="sm" onClick={addSection}>{t('adminAddSection')}</Button>
        </div>
        <div className="flex flex-col gap-4">
          {sections.map((section, i) => (
            <div key={i} className="border border-border rounded-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-600">{t('adminSectionLabel', { n: i + 1 })}</span>
                <Button variant="danger" size="sm" onClick={() => removeSection(i)}>{t('adminDelete')}</Button>
              </div>
              <div className="flex flex-col gap-3">
                <Input
                  label={t('adminSectionTitleLabel')}
                  value={section.title ?? ''}
                  onChange={(e) => updateSection(i, { title: e.target.value })}
                />
                <Textarea
                  label={t('adminSectionBodyLabel')}
                  value={section.body ?? ''}
                  onChange={(e) => updateSection(i, { body: e.target.value })}
                  rows={4}
                />
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">{t('adminSectionImageLabel')}</label>
                  <ImageUploader
                    currentUrl={section.image_url ?? section._imagePreview}
                    onUpload={(blob, preview) => updateSection(i, { _imageBlob: blob, _imagePreview: preview })}
                  />
                </div>
                <Input
                  label={t('adminSectionVideoLabel')}
                  value={section.video_url ?? ''}
                  onChange={(e) => updateSection(i, { video_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                {section.video_url && (
                  <VideoEmbed url={section.video_url} />
                )}
              </div>
            </div>
          ))}
          {sections.length === 0 && <p className="text-sm text-gray-400 text-center py-4">{t('adminNoSections')}</p>}
        </div>
      </Card>

      {/* Questions */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700">{t('adminQuizSectionTitle')}</h3>
          <div className="flex gap-2">
            <AiQuizGenerator
              sectionText={sectionBodiesText}
              onGenerate={(qs) => {
                const mapped: QuestionDraft[] = qs.map((q, i) => ({
                  order_index: questions.length + i,
                  body: q.body,
                  choices: q.choices.map((c, ci) => ({ order_index: ci, body: c.body, is_correct: c.is_correct })),
                }))
                setQuestions((prev) => [...prev, ...mapped])
              }}
            />
            <Button variant="secondary" size="sm" onClick={addQuestion}>{t('adminAddQuestion')}</Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {questions.map((q, qi) => (
            <div key={qi} className="border border-border rounded-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-600">{t('adminQuestionLabel', { n: qi + 1 })}</span>
                <Button variant="danger" size="sm" onClick={() => removeQuestion(qi)}>{t('adminDelete')}</Button>
              </div>
              <div className="flex flex-col gap-3">
                <Textarea
                  label={t('adminQuestionBodyLabel')}
                  value={q.body}
                  onChange={(e) => updateQuestion(qi, e.target.value)}
                  rows={2}
                />
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">{t('adminChoicesLabel')}</label>
                  {q.choices.map((c, ci) => (
                    <div key={ci} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${qi}`}
                        checked={c.is_correct}
                        onChange={() => updateChoice(qi, ci, { is_correct: true })}
                        className="accent-primary"
                      />
                      <input
                        type="text"
                        value={c.body}
                        onChange={(e) => updateChoice(qi, ci, { body: e.target.value })}
                        placeholder={t('adminChoicePlaceholder', { n: ci + 1 })}
                        className="flex-1 border border-border rounded-input px-3 py-1.5 text-sm focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {questions.length === 0 && <p className="text-sm text-gray-400 text-center py-4">{t('adminNoQuestions')}</p>}
        </div>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={() => navigate('/admin/courses')}>{t('adminCancel')}</Button>
        <Button loading={saving} onClick={handleSave}>{t('adminSave')}</Button>
      </div>
    </div>
  )
}
