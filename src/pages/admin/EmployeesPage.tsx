import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { showToast } from '../../components/ui/Toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'
import { useT } from '../../hooks/useT'
import type { Employee } from '../../types'

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [adding, setAdding] = useState(false)
  const [copying, setCopying] = useState(false)
  const { tenantId } = useAuthStore()
  const t = useT()

  const fetchEmployees = useCallback(async () => {
    if (!tenantId) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('name')
      if (error) throw error
      setEmployees(data ?? [])
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('employeeFetchFailed'), 'error')
    } finally {
      setLoading(false)
    }
  }, [tenantId, t])

  useEffect(() => { fetchEmployees() }, [fetchEmployees])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { showToast(t('adminNameRequired'), 'error'); return }
    if (!/^\d{4}$/.test(pin)) { showToast(t('adminPinFormatError'), 'error'); return }
    if (!tenantId) return
    setAdding(true)
    try {
      const { error } = await supabase.rpc('create_employee', {
        p_tenant_id: tenantId,
        p_name: name,
        p_pin: pin,
      })
      if (error) throw error
      showToast(t('adminAddSuccess'), 'success')
      setName('')
      setPin('')
      fetchEmployees()
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('adminAddFailed'), 'error')
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('adminDeleteEmployeeConfirm'))) return
    try {
      const { error } = await supabase.from('employees').delete().eq('id', id).eq('tenant_id', tenantId!)
      if (error) throw error
      showToast(t('adminDeleteSuccess'), 'success')
      fetchEmployees()
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('adminDeleteFailed'), 'error')
    }
  }

  const handleCopyTenantId = async () => {
    if (!tenantId) return
    setCopying(true)
    try {
      await navigator.clipboard.writeText(tenantId)
      showToast(t('adminCopySuccess'), 'success')
    } catch {
      showToast(t('adminCopyFailed'), 'error')
    } finally {
      setCopying(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6">{t('navEmployees')}</h2>

      {/* テナントID表示 */}
      <Card className="mb-6">
        <p className="text-sm text-gray-500 mb-1">{t('adminTenantIdLabel')}</p>
        <div className="flex items-center gap-2">
          <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded break-all flex-1">{tenantId}</code>
          <Button type="button" variant="secondary" size="sm" onClick={handleCopyTenantId} loading={copying}>
            {t('adminCopyBtn')}
          </Button>
        </div>
      </Card>

      {/* 追加フォーム */}
      <Card className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">{t('adminAddEmployeeTitle')}</h3>
        <form onSubmit={handleAdd} className="flex flex-col gap-3">
          <Input label={t('adminEmployeeName')} value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            label={t('adminEmployeePin')}
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
          <Button type="submit" loading={adding}>{t('adminAddBtn')}</Button>
        </form>
      </Card>

      {/* 一覧 */}
      {loading ? (
        <div className="text-center py-8 text-gray-400">{t('loading')}</div>
      ) : (
        <div className="flex flex-col gap-2">
          {employees.map((emp) => (
            <Card key={emp.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{emp.name}</p>
                <p className="text-xs text-gray-400">PIN: ****</p>
              </div>
              <Button variant="danger" size="sm" onClick={() => handleDelete(emp.id)}>{t('adminDelete')}</Button>
            </Card>
          ))}
          {employees.length === 0 && <p className="text-center text-gray-400 py-8">{t('adminNoEmployees')}</p>}
        </div>
      )}
    </div>
  )
}
