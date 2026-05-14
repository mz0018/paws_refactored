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
      <header className="bg-header-bg text-white px-6 md:px-10 lg:px-16 shadow-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <img
              src="/img/logo.png"
              alt="Logo"
              className="h-18 w-auto filter invert"
            />

          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.path}
                  className={`text-[15px] font-medium transition-all duration-200 ${
                    link.name === 'Get Started'
                      ? 'bg-[#FFB162] text-white px-4 py-2 rounded-lg hover:bg-[#cc8b40]'
                      : 'hover:text-gray-300'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden flex items-center justify-center p-2 rounded-md"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={30} />
          </button>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-0 left-0 h-full">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 z-[60] text-white p-1"
            >
              <X size={26} />
            </button>

            <SidebarUI
              navLinks={navLinks}
              isClientMode={false}
              onLinkClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}