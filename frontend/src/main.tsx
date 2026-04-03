import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import ProtectedRoutes from './utils/ProtectedRoutes.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Signin = lazy(() => import('./pages/Signin.tsx'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard.tsx'))

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signin", element: <Signin /> },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "/admin/dashboard", element: <Dashboard /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)
