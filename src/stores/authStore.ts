import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Admin, Employee } from '../types'

type AuthStore = {
  admin: Admin | null
  employee: Employee | null
  tenantId: string | null
  setAdmin: (admin: Admin | null) => void
  setEmployee: (employee: Employee | null) => void
  setTenantId: (id: string | null) => void
  clearAdmin: () => void
  clearEmployee: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      admin: null,
      employee: null,
      tenantId: null,
      setAdmin: (admin) => set({ admin, tenantId: admin?.tenant_id ?? null }),
      setEmployee: (employee) => set({ employee }),
      setTenantId: (id) => set({ tenantId: id }),
      clearAdmin: () => set({ admin: null, tenantId: null }),
      clearEmployee: () => set({ employee: null, tenantId: null }),
    }),
    {
      name: 'training-auth',
      partialize: (state) => ({
        admin: state.admin,
        employee: state.employee,
        tenantId: state.tenantId,
      }),
    }
  )
)
