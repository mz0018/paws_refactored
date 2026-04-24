import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

type NavItem = {
  name: string
  path?: string
  children?: NavItem[]
  icon?: React.ReactNode
}

type Props = {
  item: NavItem
  collapsed: boolean
}

export const DropdownHelper = ({ item, collapsed }: Props) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (collapsed) {
      setOpen(false)
    }
  }, [collapsed])

  return (
    <div>
      <button
        onClick={() => !collapsed && setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10"
      >
        <span>{item.icon}</span>

        {!collapsed && <span>{item.name}</span>}
      </button>

      {!collapsed && open && (
        <div className="ml-4 space-y-1">
          {item.children?.map((child) => (
            <NavLink
              key={child.path}
              to={child.path || '#'}
              className={({ isActive }) =>
                `block px-4 py-2 rounded text-sm ${
                  isActive ? 'bg-white/10' : 'hover:bg-white/10'
                }`
              }
            >
              {child.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}