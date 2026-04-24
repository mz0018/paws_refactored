import { NavLink } from 'react-router-dom'
import { useState } from 'react'

type NavItem = {
  name: string
  path?: string
  children?: NavItem[]
}

type Props = {
  item: NavItem
}

export const DropdownHelper = ({ item }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 rounded hover:bg-gray-800"
      >
        {item.name}
      </button>

      {open && (
        <div className="ml-4 space-y-1">
          {item.children?.map((child) => (
            <NavLink
              key={child.path}
              to={child.path || '#'}
              className={({ isActive }) =>
                `block px-4 py-2 rounded text-sm ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
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