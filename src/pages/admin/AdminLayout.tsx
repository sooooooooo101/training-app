import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { showToast } from '../../components/ui/Toast'
import { LanguageSelector } from '../../components/ui/LanguageSelector'
import { useT } from '../../hooks/useT'

export function AdminLayout() {
  const { admin, clearAdmin } = useAuthStore()
  const navigate = useNavigate()
  const t = useT()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    clearAdmin()
    showToast(t('loggedOut'), 'info')
    navigate('/')
  }

  const navItems = [
    { to: '/admin/courses', label: t('navTrainings') },
    { to: '/admin/progress', label: t('navProgress') },
    { to: '/admin/employees', label: t('navEmployees') },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/admin/courses')}
            className="text-base font-bold text-primary hover:opacity-75 transition-opacity"
          >
            {t('appName')}
          </button>
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-input text-sm font-semibold transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <span className="text-sm text-gray-500">{admin?.name}</span>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-danger transition-colors">
            {t('logout')}
          </button>
        </div>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
