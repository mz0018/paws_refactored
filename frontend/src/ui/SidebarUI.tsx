import { NavLink } from 'react-router-dom'
import { BtnSignout } from '../components/buttons/BtnSignout'
import { DropdownHelper } from '../helper/DropdownHelper'
import { useState } from 'react'
import { PanelLeft } from 'lucide-react'

type NavItem = {
  name: string
  path?: string
  children?: NavItem[]
  icon?: React.ReactNode
}

type SidebarUIProps = {
  navLinks: NavItem[]
}

export const SidebarUI = ({ navLinks }: SidebarUIProps) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-84'} bg-[#28282B] text-white flex flex-col transition-all duration-300`}>
      
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <span className={`${collapsed ? 'hidden' : 'block'} font-bold`}>
          Logo
        </span>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer flex items-center justify-center p-2 rounded hover:bg-white/10"
        >
          <PanelLeft size={18}/>
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navLinks.map((item) =>
          item.children ? (
            <DropdownHelper
              key={item.name}
              item={item}
              collapsed={collapsed}
            />
          ) : (
            <NavLink
              key={item.path}
              to={item.path || '#'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded ${
                  isActive ? 'bg-white/10' : 'hover:bg-white/10'
                }`
              }
            >
              <span>{item.icon}</span>

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          )
        )}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <BtnSignout collapsed={collapsed} />
      </div>

    </aside>
  )
}