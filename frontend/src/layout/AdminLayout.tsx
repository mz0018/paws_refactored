import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'
import { MainLayoutUI } from '../ui/MainLayoutUI'
import { LayoutDashboard, Package, Settings, BringToFront } from 'lucide-react'

const SidebarUI = lazy(() => import('../ui/SidebarUI'))

const AdminLayout = () => {

  const navLinks = [
    { 
      name: 'Appointments',
      icon: <LayoutDashboard size={18} />,
      children: [
        { name: 'Appointment Overview', path: '/admin/dashboard' },
        { name: 'Follow-Up Checkups', path: '/admin/dashboard/follow-up' },
        { name: 'Logs', path: '/admin/dashboard/logs' }
      ]
    },
    {
      name: 'Products',
      icon: <Package size={18} />,
      children: [
        { name: 'Products Overview', path: '/admin/products' },
        { name: 'Add new product', path: '/admin/products/add' },
      ]
    },
    { name: 'Orders', path: '/admin/orders', icon: <BringToFront size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> }
  ]

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <div className="fixed inset-0 -z-20 opacity-10 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:16px_16px]" />

      <Suspense fallback={null}>
        <SidebarUI navLinks={navLinks} />
      </Suspense>

      <main className="flex-1 p-6 overflow-y-auto w-full">
        <MainLayoutUI>
          <Outlet />
        </MainLayoutUI>
      </main>

    </div>
  )
}

export default AdminLayout