import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toast } from './components/ui/Toast'
import { useAuthStore } from './stores/authStore'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { DemoPage } from './pages/DemoPage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { AdminLayout } from './pages/admin/AdminLayout'
import { CoursesPage } from './pages/admin/CoursesPage'
import { CourseEditPage } from './pages/admin/CourseEditPage'
import { ProgressPage } from './pages/admin/ProgressPage'
import { EmployeesPage } from './pages/admin/EmployeesPage'
import { EmployeeHome } from './pages/employee/EmployeeHome'
import { CourseView } from './pages/employee/CourseView'
import { QuizPage } from './pages/employee/QuizPage'
import { QuizResult } from './pages/employee/QuizResult'

function AdminRoute({ children }: { children: React.ReactNode }) {
  const admin = useAuthStore((s) => s.admin)
  return admin ? <>{children}</> : <Navigate to="/app" replace />
}

function EmployeeRoute({ children }: { children: React.ReactNode }) {
  const employee = useAuthStore((s) => s.employee)
  return employee ? <>{children}</> : <Navigate to="/app" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<LoginPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/courses" replace />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/new" element={<CourseEditPage />} />
          <Route path="courses/:id/edit" element={<CourseEditPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="employees" element={<EmployeesPage />} />
        </Route>
        <Route
          path="/employee"
          element={
            <EmployeeRoute>
              <EmployeeHome />
            </EmployeeRoute>
          }
        />
        <Route
          path="/employee/courses/:id"
          element={
            <EmployeeRoute>
              <CourseView />
            </EmployeeRoute>
          }
        />
        <Route
          path="/employee/courses/:id/quiz"
          element={
            <EmployeeRoute>
              <QuizPage />
            </EmployeeRoute>
          }
        />
        <Route
          path="/employee/courses/:id/result"
          element={
            <EmployeeRoute>
              <QuizResult />
            </EmployeeRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
