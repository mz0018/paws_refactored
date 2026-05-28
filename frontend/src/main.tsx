import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import ProtectedRoutes from './utils/ProtectedRoutes.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { Loader } from './components/Loader'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const ProductOverview = lazy(() => import('./pages/ProductOverview.tsx'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.tsx'))
const ClientDetailedProduct = lazy(() => import('./pages/ClientDetailedProduct.tsx'))
const Appointment = lazy(() => import('./pages/Appointment.tsx'))

const Signin = lazy(() => import('./pages/Signin.tsx'))
const AdminLayout = lazy(() => import('./layout/AdminLayout.tsx'))
const ClientLayout = lazy(() => import('./layout/ClientLayout.tsx'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard.tsx'))
const ViewProducts = lazy(() => import('./pages/admin/ViewProducts.tsx'))
const AddProducts = lazy(() => import('./pages/admin/AddProducts.tsx'))
const ViewDetailedProduct = lazy(() => import('./pages/admin/ViewDetailedProduct.tsx'))
const Settings = lazy(() => import('./pages/admin/Settings.tsx'))

const router = createBrowserRouter([
  {
    element: <ClientLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/signin", element: <Signin /> },
      { path: "/product-overview", element: <ProductOverview /> },
      { path: "/detailed-product-overview/:id", element: <ClientDetailedProduct /> },
      { path: "/appointment", element: <Appointment /> },
      { path: "/checkout", element: <CheckoutPage /> },
    ]
  },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "/admin", element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "products", element: <ViewProducts />},
          { path: "products/:id", element: <ViewDetailedProduct /> },
          { path: "products/add", element: <AddProducts /> },
          { path: "settings", element: <Settings /> }
        ]
       },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <Suspense fallback={<Loader label="Loading application..." />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
