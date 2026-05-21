import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '../sections/Header'
import { Footer } from '../sections/Footer'

const ClientLayout = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-20 opacity-10 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div className="fixed inset-0 -z-10 bg-surface/40" />

      <Header />

      <main className="relative z-10 pt-28">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default ClientLayout