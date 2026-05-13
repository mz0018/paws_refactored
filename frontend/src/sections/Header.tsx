import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, House, Info, Mail, Shield } from 'lucide-react'
import { SidebarUI } from '../ui/SidebarUI'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    {
      name: 'Home',
      path: '/',
      icon: <House size={18} />,
    },
    {
      name: 'About',
      path: '/about',
      icon: <Info size={18} />,
    },
    {
      name: 'Contact',
      path: '/contact',
      icon: <Mail size={18} />,
    },
    {
      name: 'Admin',
      path: '/signin',
      icon: <Shield size={18} />,
    },
  ]

  return (
    <>
      <header className="bg-header-bg text-white px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl font-bold">My App</h1>

          <ul className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path || '#'}
                  className="hover:text-gray-300 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-0 left-0 h-full">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-[60] text-white"
            >
              <X size={24} />
            </button>

            <SidebarUI navLinks={navLinks} isClientMode={false} />
          </div>
        </div>
      )}
    </>
  )
}