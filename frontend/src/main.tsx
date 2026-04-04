import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import ProtectedRoutes from './utils/ProtectedRoutes.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'

const Signin = lazy(() => import('./pages/Signin.tsx'))
const AdminLayout = lazy(() => import('./layout/AdminLayout.tsx'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard.tsx'))
const Settings = lazy(() => import('./pages/admin/Settings.tsx'))

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signin", element: <Signin /> },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "/admin", element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "settings", element: <Settings /> }
        ]
       },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  </StrictMode>,
)
