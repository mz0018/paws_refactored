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
  ]

  return (
    <>
      <header className="px-6 md:px-10 lg:px-16">
        <nav className="w-full flex items-center justify-between">
          <div className="flex-shrink-0">
            <img
              src="/img/logo.png"
              alt="Logo"
              className="h-24 w-auto"
            />
          </div>

          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.path}
                  className="text-[15px] font-medium border-b-2 border-transparent hover:border-black transition-all duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="/signin"
              className="bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white px-4 py-2 rounded-sm text-[15px] font-medium transition-all duration-200"
            >
              Get Started
            </a>
          </div>

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
              navLinks={[
                ...navLinks,
                {
                  name: 'Get Started',
                  path: '/signin',
                  icon: <Shield size={18} />,
                },
              ]}
              isClientMode={false}
              onLinkClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}