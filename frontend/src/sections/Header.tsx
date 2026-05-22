import { Link } from 'react-router-dom'
import { Suspense, lazy, useState, useEffect, memo, useMemo } from 'react'
import { Menu, X, House, Info, MousePointer2 } from 'lucide-react'

type HeaderProps = {
  activeSection?: string
}

const SidebarUI = lazy(() => import('../ui/SidebarUI'))

export const Header = memo(({ activeSection }: HeaderProps = {}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)

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
        name: 'Contact',
        path: '/#contact-id',
        icon: <Info size={18} />,
      },
    ],
    []
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isProductSectionActive = activeSection === '/product-overview'

  useEffect(() => {
    console.log(`${activeSection} is active`)
  }, [isProductSectionActive])

  return (
    <>
      <header
        className={`${
          isProductSectionActive ? 'bg-surface' : 'bg-surface/50'
        } fixed top-0 left-0 z-50 w-full px-6 md:px-10 lg:px-16 backdrop-blur-md transition-shadow duration-300 ${
          scrolled && !isProductSectionActive ? 'shadow-md' : 'shadow-none'
        }`}
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
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="
                    relative
                    font-semibold text-sm tracking-wide
                    text-text-body
                    hover:text-text-hover
                    transition-colors duration-300

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
            ))}
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
              {/* <div className='bg-blue-500'>Hello</div> */}
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

            <Suspense fallback={null}>
              {/* <SidebarUI
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
              /> */}
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