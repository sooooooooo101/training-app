import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../stores/authStore'
import { useLanguageStore } from '../stores/languageStore'
import { showToast } from '../components/ui/Toast'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { LanguageSelector } from '../components/ui/LanguageSelector'
import { useT } from '../hooks/useT'
import { getLegalContent, REPORT_FORM_URL } from '../lib/legalContent'
import type { Employee } from '../types'

type Mode = 'admin-login' | 'admin-signup' | 'employee'

const normalizeTenantId = (value: string) => value.trim().replace(/\s+/g, '').toLowerCase()

export function LoginPage() {
  const [mode, setMode] = useState<Mode>('admin-login')
  const navigate = useNavigate()
  const { setAdmin, setEmployee, setTenantId } = useAuthStore()
  const { lang } = useLanguageStore()
  const lc = getLegalContent(lang)
  const t = useT()

  // Admin login state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminName, setAdminName] = useState('')
  const [tenantName, setTenantName] = useState('')
  const [loading, setLoading] = useState(false)

  // Employee state
  const [tenantIdInput, setTenantIdInput] = useState('')
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [pin, setPin] = useState('')
  const [empLoading, setEmpLoading] = useState(false)
  const [empFetched, setEmpFetched] = useState(false)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (adminError || !adminData) throw new Error(t('adminInfoFetchFailed'))

      setAdmin(adminData)
      showToast(t('loginSuccess'), 'success')
      navigate('/admin/courses')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('loginFailed'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleAdminSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      if (!data.user) throw new Error(t('signupFailed'))

      const { error: rpcError } = await supabase.rpc('create_tenant_and_admin', {
        p_tenant_name: tenantName,
        p_admin_name: adminName,
        p_user_id: data.user.id,
      })
      if (rpcError) throw rpcError

      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', data.user.id)
        .single()
      if (adminError || !adminData) throw new Error(t('adminInfoFetchFailed'))

      setAdmin(adminData)
      showToast(t('signupSuccess'), 'success')
      navigate('/admin/courses')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('signupFailed'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleFetchEmployees = async () => {
    const normalizedTenantId = normalizeTenantId(tenantIdInput)
    if (!normalizedTenantId) {
      showToast(t('tenantIdRequired'), 'error')
      return
    }

    setEmpLoading(true)
    try {
      const { data, error } = await supabase
        .rpc('get_employees_by_tenant', { p_tenant_id: normalizedTenantId })
      if (error) throw error
      setEmployees(data ?? [])
      setSelectedEmployee('')
      setPin('')
      setEmpFetched(true)
      if (!data?.length) showToast(t('noEmployeesFound'), 'info')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('employeeFetchFailed'), 'error')
    } finally {
      setEmpLoading(false)
    }
  }

  const handleEmployeeLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\d{4}$/.test(pin)) {
      showToast(t('pinFormatError'), 'error')
      return
    }
    setEmpLoading(true)
    try {
      const { data: ok, error } = await supabase.rpc('verify_employee_pin', {
        p_employee_id: selectedEmployee,
        p_pin: pin,
      })
      if (error) throw error
      if (!ok) throw new Error(t('pinWrong'))

      const emp = employees.find((e) => e.id === selectedEmployee)
      if (!emp) throw new Error(t('employeeNotFound'))
      sessionStorage.setItem(`pin_${emp.id}`, pin)
      setEmployee(emp)
      setTenantId(emp.tenant_id)
      showToast(t('loginSuccess'), 'success')
      navigate('/employee')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('loginFailed'), 'error')
    } finally {
      setEmpLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-2">
          <LanguageSelector />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{t('appName')}</h1>

        {/* Mode tabs */}
        <div className="flex mb-6 bg-white rounded-card border border-border overflow-hidden">
          <button
            onClick={() => setMode('admin-login')}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${mode === 'admin-login' || mode === 'admin-signup' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {t('adminTab')}
          </button>
          <button
            onClick={() => setMode('employee')}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${mode === 'employee' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {t('employeeTab')}
          </button>
        </div>

        <div className="bg-card border border-border rounded-card p-6">
          {mode === 'admin-login' && (
            <>
              <h2 className="text-lg font-bold mb-4">{t('adminLoginTitle')}</h2>
              <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                <Input label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input label={t('password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit" loading={loading}>{t('loginBtn')}</Button>
                <button type="button" onClick={() => setMode('admin-signup')} className="text-sm text-primary underline text-center">
                  {t('goToRegister')}
                </button>
              </form>
            </>
          )}

          {mode === 'admin-signup' && (
            <>
              <h2 className="text-lg font-bold mb-4">{t('signupTitle')}</h2>
              <form onSubmit={handleAdminSignup} className="flex flex-col gap-4">
                <Input label={t('storeName')} value={tenantName} onChange={(e) => setTenantName(e.target.value)} required />
                <Input label={t('adminName')} value={adminName} onChange={(e) => setAdminName(e.target.value)} required />
                <Input label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input label={t('passwordHint')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit" loading={loading}>{t('registerBtn')}</Button>
                <button type="button" onClick={() => setMode('admin-login')} className="text-sm text-primary underline text-center">
                  {t('goToLogin')}
                </button>
              </form>
            </>
          )}

          {mode === 'employee' && (
            <>
              <h2 className="text-lg font-bold mb-4">{t('employeeLoginTitle')}</h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Input
                    label={t('tenantId')}
                    value={tenantIdInput}
                    onChange={(e) => {
                      setTenantIdInput(e.target.value)
                      setEmpFetched(false)
                      setEmployees([])
                      setSelectedEmployee('')
                    }}
                    placeholder={t('tenantIdPlaceholder')}
                    className="flex-1"
                  />
                  <div className="flex items-end">
                    <Button type="button" variant="secondary" onClick={handleFetchEmployees} loading={empLoading} size="md">
                      {t('searchBtn')}
                    </Button>
                  </div>
                </div>

                {empFetched && employees.length > 0 && (
                  <form onSubmit={handleEmployeeLogin} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-gray-700">{t('selectEmployee')}</label>
                      <select
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        className="border border-border rounded-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        required
                      >
                        <option value="">{t('selectPlaceholder')}</option>
                        {employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label={t('pin')}
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required
                    />
                    <Button type="submit" loading={empLoading}>{t('loginBtn')}</Button>
                  </form>
                )}
              </div>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <a href="/terms" className="underline hover:text-gray-600">{lc.termsLink}</a>
          　・
          <a href="/privacy" className="underline hover:text-gray-600">{lc.privacyLink}</a>
          　・
          <a href={REPORT_FORM_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">{lc.reportLink}</a>
        </p>
      </div>
    </div>
  )
}
