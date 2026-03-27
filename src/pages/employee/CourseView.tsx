import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { showToast } from '../../components/ui/Toast'
import { Button } from '../../components/ui/Button'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { VideoEmbed } from '../../components/VideoEmbed'
import { getSignedUrl } from '../../lib/imageUtils'
import { useT } from '../../hooks/useT'
import type { Course, Section } from '../../types'

export function CourseView() {
  const { id } = useParams<{ id: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [sections, setSections] = useState<(Section & { signedUrl?: string })[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [hasQuestions, setHasQuestions] = useState(false)
  const { tenantId } = useAuthStore()
  const navigate = useNavigate()
  const t = useT()

  useEffect(() => {
    const fetch = async () => {
      if (!id || !tenantId) return
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*, sections(*), questions(id)')
          .eq('id', id)
          .eq('tenant_id', tenantId)
          .single()
        if (error) throw error

        setCourse(data)
        setHasQuestions((data.questions ?? []).length > 0)

        const sorted: Section[] = (data.sections ?? []).sort((a: Section, b: Section) => a.order_index - b.order_index)
        const withUrls = await Promise.all(
          sorted.map(async (s: Section) => {
            let signedUrl: string | undefined
            if (s.image_path) {
              try { signedUrl = await getSignedUrl(s.image_path) } catch { /* ignore */ }
            }
            return { ...s, signedUrl }
          })
        )
        setSections(withUrls)
      } catch (e: unknown) {
        showToast(e instanceof Error ? e.message : t('courseFetchFailed'), 'error')
        navigate('/employee')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id, tenantId, navigate, t])

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-gray-400">{t('loading')}</div>
  if (!course) return null

  const section = sections[currentIndex]
  const progress = sections.length > 0 ? Math.round(((currentIndex + 1) / sections.length) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <button onClick={() => navigate('/employee')} className="text-primary text-sm font-semibold hover:underline">
          {t('backToList')}
        </button>
        <h1 className="text-base font-bold text-gray-800">{course.title}</h1>
        <span className="text-xs text-gray-400">{currentIndex + 1} / {sections.length}</span>
      </header>

      <div className="px-6 py-2">
        <ProgressBar value={progress} />
      </div>

      <main className="p-6 max-w-2xl mx-auto">
        {section ? (
          <div>
            {section.title && <h2 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h2>}
            {section.signedUrl && (
              <img src={section.signedUrl} alt="section" className="w-full rounded-card mb-4 object-cover max-h-64" />
            )}
            {section.video_url && (
              <div className="mb-4">
                <VideoEmbed url={section.video_url} />
              </div>
            )}
            {section.body && <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.body}</p>}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">{t('noSection')}</p>
        )}

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            {t('prev')}
          </Button>

          {currentIndex < sections.length - 1 ? (
            <Button onClick={() => setCurrentIndex((i) => i + 1)}>{t('next')}</Button>
          ) : (
            hasQuestions ? (
              <Button onClick={() => navigate(`/employee/courses/${id}/quiz`)}>
                {t('takeTest')}
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => navigate('/employee')}>
                {t('complete')}
              </Button>
            )
          )}
        </div>
      </main>
    </div>
  )
}
