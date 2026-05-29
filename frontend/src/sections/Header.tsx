import { Link } from 'react-router-dom'
import { ClientCartModal } from '../components/modals/ClientCartModal'
import { Suspense, lazy, useState, useMemo, memo } from 'react'
import { Menu, X, House, Info, MousePointer2, ShoppingCart, ChevronDown } from 'lucide-react'

type HeaderProps = {
  activeSection?: string
}

const SidebarUI = lazy(() => import('../ui/SidebarUI'))

export const Header = memo(({ activeSection }: HeaderProps = {}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const navLinks = useMemo(
    () => [
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
        name: 'Feature',
        icon: <ChevronDown size={18} />,
        children: [
          { name: 'Appointment', path: '/appointment' },
          { name: 'Products', path: '/product-overview' },
        ],
      },
      {
        name: 'Contact',
        path: '/#contact-id',
        icon: <Info size={18} />,
      },
    ],
    []
  )

  const isProductSectionActive = activeSection === '/product-overview'

  return (
    <>
      <header
        className={`${
          isProductSectionActive ? 'bg-surface' : 'bg-surface/50'
        } fixed top-0 left-0 z-50 w-full px-6 md:px-10 lg:px-16 backdrop-blur-md shadow-sm`}
      >
        <nav className="w-full flex items-center justify-between h-30">
          <div className="flex-shrink-0">
            <img
              src="/img/paws.png"
              alt="Logo"
              className="h-24 w-auto"
            />
          </div>

          <ul className="hidden md:flex items-center gap-10 lg:gap-12">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.name} className="relative group">
                  
                  <button
                    className="
                      relative
                      font-semibold text-sm tracking-wide
                      text-text-body
                      hover:text-text-hover
                      transition-colors duration-300
                      flex items-center gap-1 cursor-pointer
                      p-4
                    "
                  >
                    {link.name}
                    <ChevronDown
                      size={16}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </button>

                  <div
                    className="
                      absolute top-full left-0 mt-1
                      min-w-[180px]
                      bg-white rounded-lg shadow-lg
                      opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-200
                      z-50 overflow-hidden
                    "
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.path!}
                        className="
                          block px-4 py-3 text-sm font-medium
                          text-gray-700 hover:text-text-hover
                          hover:bg-gray-50
                          transition-colors duration-200
                        "
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={link.name}>
                  <Link
                    to={link.path!}
                    className="
                      relative
                      font-semibold text-sm tracking-wide
                      text-text-body
                      hover:text-text-hover
                      transition-colors duration-300
                      inline-flex items-center

                      after:absolute
                      after:left-0
                      after:bottom-0
                      after:h-[2px]
                      after:w-full
                      after:scale-x-0
                      after:origin-left
                      after:bg-text-hover
                      after:transition-transform
                      after:duration-300
                      after:content-['']

                      hover:after:scale-x-100
                      p-4
                    "
                  >
                    {link.name}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="hidden md:block">
            <Link
              to="/signin"
              className="flex items-center justify-center gap-2 min-w-[140px] bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white px-4 py-2 rounded-sm text-[15px] font-medium transition-all duration-200"
            >
              <MousePointer2 className="rotate-90 w-4 h-4" />
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden text-text-body flex items-center justify-center p-2 rounded-md"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={30} />
          </button>
        </nav>
      </header>

      {activeSection !== '/checkout' && (
        <button
          className="
            fixed bottom-4 right-4 z-40
            w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
            flex items-center justify-center
            bg-btn-black-bg hover:bg-btn-black-hover-header-bg
            text-white rounded-full shadow-xl cursor-pointer
          "   
          onClick={() => setIsModalOpen(true)}
        >
          <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" />
        </button>
      )}

      <ClientCartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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

            <Suspense fallback={null}>
              <SidebarUI
                navLinks={navLinks}
                isClientMode={false}
                onLinkClick={() => setIsOpen(false)}
              />
            </Suspense>
          </div>
        </div>
      )}
    </>
  )
})