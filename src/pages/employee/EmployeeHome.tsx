import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { showToast } from '../../components/ui/Toast'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { LanguageSelector } from '../../components/ui/LanguageSelector'
import { LegalFooter } from '../../components/LegalFooter'
import { useT } from '../../hooks/useT'
import type { Course, Progress } from '../../types'

const STATUS_COLORS: Record<string, 'green' | 'red' | 'blue' | 'gray'> = {
  合格: 'green',
  不合格: 'red',
  受講中: 'blue',
  未受講: 'gray',
}

export function EmployeeHome() {
  const [courses, setCourses] = useState<(Course & { progress?: Progress })[]>([])
  const [loading, setLoading] = useState(true)
  const { employee, tenantId, clearEmployee } = useAuthStore()
  const navigate = useNavigate()
  const t = useT()

  const statusLabel = (status?: string): string => {
    const map: Record<string, Parameters<typeof t>[0]> = {
      '未受講': 'statusNotStarted',
      '受講中': 'statusInProgress',
      '合格': 'statusPassed',
      '不合格': 'statusFailed',
    }
    const key = status ? map[status] : 'statusNotStarted'
    return key ? t(key) : (status ?? t('statusNotStarted'))
  }

  useEffect(() => {
    const fetch = async () => {
      if (!tenantId || !employee) {
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const { data: coursesData, error: cError } = await supabase
          .from('courses')
          .select('*')
          .eq('tenant_id', tenantId)
          .order('created_at', { ascending: false })
        if (cError) throw cError

        const { data: progressData } = await supabase
          .from('progress')
          .select('*')
          .eq('employee_id', employee.id)

        const merged = (coursesData ?? []).map((c: Course) => ({
          ...c,
          progress: (progressData ?? []).find((p: Progress) => p.course_id === c.id),
        }))

        setCourses(merged)
      } catch (e: unknown) {
        showToast(e instanceof Error ? e.message : t('dataFetchFailed'), 'error')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [tenantId, employee, t])

  const handleLogout = () => {
    clearEmployee()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
        <h1 className="text-base font-bold text-primary whitespace-nowrap">{t('appName')}</h1>
        <div className="flex items-center gap-2 min-w-0">
          <LanguageSelector />
          <span className="text-sm text-gray-500 whitespace-nowrap truncate max-w-[6rem]">{employee?.name}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="whitespace-nowrap">{t('logout')}</Button>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">{t('courseList')}</h2>

        {loading ? (
          <div className="text-center py-12 text-gray-400">{t('loading')}</div>
        ) : courses.length === 0 ? (
          <Card className="text-center py-12 text-gray-400">{t('noCourses')}</Card>
        ) : (
          <div className="flex flex-col gap-3">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => navigate(`/employee/courses/${course.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">{course.title}</span>
                      <Badge label={course.category} color="green" />
                      <Badge
                        label={statusLabel(course.progress?.status)}
                        color={STATUS_COLORS[course.progress?.status ?? '未受講']}
                      />
                    </div>
                    {course.description && <p className="text-xs text-gray-400">{course.description}</p>}
                    {course.progress?.score != null && (
                      <p className="text-xs text-gray-500 mt-1">{t('lastScore', { score: course.progress.score })}</p>
                    )}
                  </div>
                  <span className="text-primary text-sm font-semibold">→</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="px-4 pb-8 max-w-2xl mx-auto w-full">
        <LegalFooter className="mt-4 pt-6 border-t border-border" />
      </footer>
    </div>
  )
}
