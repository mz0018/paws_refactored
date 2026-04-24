import { Outlet } from 'react-router-dom'
import { SidebarUI } from '../ui/SidebarUI'

const AdminLayout = () => {
  const navLinks = [
    { name: 'Appointments', path: '/admin/dashboard' },
    {
      name: 'Products',
      children: [
        { name: 'Product Overview', path: '/admin/products' },
        { name: 'Add new product', path: '/admin/products/add' },
      ]
    },
    { name: 'Settings', path: '/admin/settings' }
  ]

  return (
    <div className="flex h-screen bg-gray-100">

      <SidebarUI navLinks={navLinks} />

      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default AdminLayout