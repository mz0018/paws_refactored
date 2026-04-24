import { NavLink } from 'react-router-dom'
import { BtnSignout } from '../components/buttons/BtnSignout'
import { DropdownHelper } from '../helper/DropdownHelper'

type NavItem = {
  name: string
  path?: string
  children?: NavItem[]
}

type SidebarUIProps = {
  navLinks: NavItem[]
}

export const SidebarUI = ({ navLinks }: SidebarUIProps) => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        Admin
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navLinks.map((item) =>
          item.children ? (
            <DropdownHelper key={item.name} item={item} />
          ) : (
            <NavLink
              key={item.path}
              to={item.path || '#'}
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`
              }
            >
              {item.name}
            </NavLink>
          )
        )}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <BtnSignout />
      </div>

    </aside>
  )
}