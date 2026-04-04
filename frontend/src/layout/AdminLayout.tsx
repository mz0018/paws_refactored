import { Outlet, NavLink } from 'react-router-dom'
import { BtnSignout } from '../components/buttons/BtnSignout'

const AdminLayout = () => {

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Settings', path: '/admin/settings' }
  ]

  return (
    <div className="flex h-screen bg-gray-100">

      <aside className="w-64 bg-gray-900 text-white flex flex-col">

        <div className="p-4 text-lg font-bold border-b border-gray-700">
          Admin
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition ${
                  isActive
                    ? 'bg-blue-600'
                    : 'hover:bg-gray-800'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <BtnSignout />
        </div>

      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default AdminLayout