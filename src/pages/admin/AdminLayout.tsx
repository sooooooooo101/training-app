import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { showToast } from '../../components/ui/Toast'
import { LanguageSelector } from '../../components/ui/LanguageSelector'
import { LegalFooter } from '../../components/LegalFooter'
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
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border">
        {/* 上段: アプリ名 + ユーザー情報 */}
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => navigate('/admin/courses')}
            className="text-base font-bold text-primary hover:opacity-75 transition-opacity whitespace-nowrap"
          >
            {t('appName')}
          </button>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <span className="text-sm text-gray-500 whitespace-nowrap hidden sm:inline">{admin?.name}</span>
            <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-danger transition-colors whitespace-nowrap">
              {t('logout')}
            </button>
          </div>
        </div>
        {/* 下段: ナビゲーション */}
        <div className="px-4 pb-2 flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-input text-sm font-semibold transition-colors whitespace-nowrap ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <span className="text-sm text-gray-500 ml-auto pl-2 whitespace-nowrap sm:hidden">{admin?.name}</span>
        </div>
      </header>
      <main className="p-4 sm:p-6 flex-1">
        <Outlet />
      </main>
      <footer className="px-4 sm:px-6 pb-8 pt-4 border-t border-border mt-auto">
        <LegalFooter />
      </footer>
    </div>
  )
}
