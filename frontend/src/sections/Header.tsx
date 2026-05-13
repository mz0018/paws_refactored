import { useState } from 'react'
import { Menu, X, House, Info, Shield } from 'lucide-react'
import { SidebarUI } from '../ui/SidebarUI'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    {
      name: 'Home',
      path: '/#hero-id',
      icon: <House size={18} />,
    },
    {
      name: 'About',
      path: '/#about-id',
      icon: <Info size={18} />,
    },
    {
      name: 'Contact',
      path: '/#contact-id',
      icon: <Info size={18} />,
    },
    {
      name: 'Get Started',
      path: '/signin',
      icon: <Shield size={18} />,
    },
  ]

  return (
    <>
      <header className="bg-header-bg text-white px-6 py-4">
        <nav className="flex items-center justify-between">
          <h1 className="text-xl font-bold">My App</h1>

          <ul className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.path} className="hover:text-gray-300">
                  {link.name}
                </a>
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

            <SidebarUI navLinks={navLinks} isClientMode={false} onLinkClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}