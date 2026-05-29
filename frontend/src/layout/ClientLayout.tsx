import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '../sections/Header'
import { Footer } from '../sections/Footer'

const ClientLayout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const scrollToHash = (hash: string) => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    scrollToHash(window.location.hash)

    const onHashChange = () => scrollToHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="/#"]')
      if (link) {
        const hash = '#' + link.getAttribute('href')?.split('#')[1]
        if (hash) requestAnimationFrame(() => scrollToHash(hash))
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-20 opacity-10 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div className="fixed inset-0 -z-10 bg-surface/40" />

      <Header activeSection={pathname} />

      <main className="relative z-10 pt-28">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default ClientLayout