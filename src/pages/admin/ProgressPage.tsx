import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { showToast } from '../../components/ui/Toast'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { useT } from '../../hooks/useT'
import type { Employee, Course, Progress } from '../../types'

type EmployeeStats = Employee & {
  passCount: number
  avgScore: number
  achieveRate: number
  progressList: (Progress & { course: Course })[]
}

export function ProgressPage() {
  const [stats, setStats] = useState<EmployeeStats[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { tenantId } = useAuthStore()
  const t = useT()

  // DB上の日本語ステータス → 翻訳文字列
  const statusLabel = (status: string): string => {
    const map: Record<string, Parameters<typeof t>[0]> = {
      '未受講': 'statusNotStarted',
      '受講中': 'statusInProgress',
      '合格': 'statusPassed',
      '不合格': 'statusFailed',
    }
    const key = map[status]
    return key ? t(key) : status
  }

  useEffect(() => {
    const fetch = async () => {
      if (!tenantId) return
      setLoading(true)
      try {
        const { data: employees, error: empError } = await supabase
          .from('employees')
          .select('*')
          .eq('tenant_id', tenantId)
          .order('name')
        if (empError) throw empError

        const { data: courses, error: cError } = await supabase
          .from('courses')
          .select('*')
          .eq('tenant_id', tenantId)
        if (cError) throw cError

        const { data: progressData, error: pError } = await supabase
          .from('progress')
          .select('*')
          .in('employee_id', (employees ?? []).map((e: Employee) => e.id))
        if (pError) throw pError

        const mapped: EmployeeStats[] = (employees ?? []).map((emp: Employee) => {
          const empProgress = (progressData ?? [])
            .filter((p: Progress) => p.employee_id === emp.id)
            .map((p: Progress) => ({
              ...p,
              course: (courses ?? []).find((c: Course) => c.id === p.course_id) as Course,
            }))
            .filter((p: Progress & { course: Course }) => p.course)

          const passed = empProgress.filter((p) => p.status === '合格')
          const avgScore = passed.length > 0
            ? Math.round(passed.reduce((sum, p) => sum + (p.score ?? 0), 0) / passed.length)
            : 0
          const achieveRate = courses?.length
            ? Math.round((passed.length / courses.length) * 100)
            : 0

          return {
            ...emp,
            passCount: passed.length,
            avgScore,
            achieveRate,
            progressList: empProgress,
          }
        })

        setStats(mapped)
      } catch (e: unknown) {
        showToast(e instanceof Error ? e.message : t('dataFetchFailed'), 'error')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [tenantId, t])

  if (loading) return <div className="text-center py-12 text-gray-400">{t('loading')}</div>

  const selected = stats.find((s) => s.id === selectedId)

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">{t('navProgress')}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          {stats.map((emp) => (
            <Card
              key={emp.id}
              className={`cursor-pointer transition-colors hover:border-primary ${selectedId === emp.id ? 'border-primary bg-primary-light' : ''}`}
              onClick={() => setSelectedId(emp.id === selectedId ? null : emp.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">{emp.name}</span>
                <div className="flex gap-2">
                  <Badge label={t('adminPassedCount', { count: emp.passCount })} color="green" />
                  <Badge label={t('adminAvgScore', { score: emp.avgScore })} color="blue" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{t('adminAchievementRate', { rate: emp.achieveRate })}</span>
                <div className="flex-1">
                  <ProgressBar value={emp.achieveRate} />
                </div>
              </div>
            </Card>
          ))}
          {stats.length === 0 && <Card className="text-center py-8 text-gray-400">{t('adminNoEmployees')}</Card>}
        </div>

        {selected && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">{t('adminDetailTitle', { name: selected.name })}</h3>
            <div className="flex flex-col gap-2">
              {selected.progressList.map((p) => (
                <Card key={p.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{p.course.title}</p>
                    {p.attempted_at && (
                      <p className="text-xs text-gray-400">
                        {new Date(p.attempted_at).toLocaleDateString('ja-JP')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {p.score != null && <span className="text-sm font-bold">{t('scoreDisplay', { score: p.score })}</span>}
                    <Badge
                      label={statusLabel(p.status)}
                      color={p.status === '合格' ? 'green' : p.status === '不合格' ? 'red' : 'gray'}
                    />
                  </div>
                </Card>
              ))}
              {selected.progressList.length === 0 && (
                <Card className="text-center py-6 text-gray-400 text-sm">{t('adminNoProgress')}</Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
