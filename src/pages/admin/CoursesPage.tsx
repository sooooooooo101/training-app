

















import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { showToast } from '../../components/ui/Toast'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { useT } from '../../hooks/useT'
import type { Course } from '../../types'

const CATEGORY_COLORS: Record<string, 'green' | 'blue' | 'yellow' | 'red' | 'gray'> = {
  接客: 'green',
  調理: 'blue',
  衛生: 'yellow',
  安全: 'red',
}

export function CoursesPage() {
  const [courses, setCourses] = useState<(Course & { section_count: number; question_count: number })[]>([])
  const [loading, setLoading] = useState(true)
  const { tenantId } = useAuthStore()
  const navigate = useNavigate()
  const t = useT()

  const fetchCourses = useCallback(async () => {
    if (!tenantId) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          sections(id, image_path, video_url),
          questions(id)
        `)
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false })

      if (error) throw error

      const mapped = (data ?? []).map((c: Record<string, unknown>) => ({
        ...c,
        section_count: Array.isArray(c.sections) ? (c.sections as unknown[]).length : 0,
        question_count: Array.isArray(c.questions) ? (c.questions as unknown[]).length : 0,
        has_image: Array.isArray(c.sections) && (c.sections as Record<string, unknown>[]).some((s) => s.image_path),
        has_video: Array.isArray(c.sections) && (c.sections as Record<string, unknown>[]).some((s) => s.video_url),
      })) as (Course & { section_count: number; question_count: number; has_image: boolean; has_video: boolean })[]

      setCourses(mapped)
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('adminCourseFetchFailed'), 'error')
    } finally {
      setLoading(false)
    }
  }, [tenantId, t])

  useEffect(() => { fetchCourses() }, [fetchCourses])

  const handleDelete = async (id: string) => {
    if (!confirm(t('adminDeleteCourseConfirm'))) return
    try {
      const { error } = await supabase.from('courses').delete().eq('id', id).eq('tenant_id', tenantId!)
      if (error) throw error
      showToast(t('adminDeleteCourseSuccess'), 'success')
      fetchCourses()
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('adminDeleteFailed'), 'error')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">{t('adminCourseListTitle')}</h2>
        <Button onClick={() => navigate('/admin/courses/new')}>{t('adminNewCourse')}</Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">{t('loading')}</div>
      ) : courses.length === 0 ? (
        <Card className="text-center py-12 text-gray-400">{t('adminNoCoursesHint')}</Card>
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">{course.title}</span>
                  <Badge label={course.category} color={CATEGORY_COLORS[course.category] ?? 'gray'} />
                  {(course as unknown as Record<string, boolean>).has_image && <Badge label={t('adminLabelImage')} color="blue" />}
                  {(course as unknown as Record<string, boolean>).has_video && <Badge label={t('adminLabelVideo')} color="yellow" />}
                </div>
                <div className="text-xs text-gray-500 flex gap-3">
                  <span>{t('adminSectionCount', { count: course.section_count })}</span>
                  <span>{t('adminQuestionCount', { count: course.question_count })}</span>
                  <span>{t('adminPassScoreCount', { score: course.pass_score })}</span>
                </div>
                {course.description && <p className="text-xs text-gray-400 mt-1">{course.description}</p>}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => navigate(`/admin/courses/${course.id}/edit`)}>{t('adminEdit')}</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(course.id)}>{t('adminDelete')}</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
