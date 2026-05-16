import { lazy, Suspense } from 'react'
import { Header } from '../sections/Header'
import { Hero } from '../sections/Hero'
import { useInView } from '../hooks/useInView'

const Appointments = lazy(() =>import('../sections/Appointment').then(m => ({ default: m.Appointments })))
const Products = lazy(() =>import('../sections/Products').then(m => ({ default: m.Products })))
const Footer = lazy(() => import('../sections/Footer').then(m => ({ default: m.Footer })))

const ClientLayout = () => {
  const { ref: appointmentsRef, inView: showAppointments } = useInView()
  const { ref: productsRef, inView: showProducts } = useInView()
  const { ref: footerRef, inView: showFooter } = useInView()

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-1">
        <Hero />
        <section ref={appointmentsRef} className="min-h-screen">
          {showAppointments && (
            <Suspense fallback={<div className="p-4">Loading appointments...</div>}>
              <Appointments />
            </Suspense>
          )}
        </section>
        <section ref={productsRef} className="min-h-screen">
          {showProducts && (
            <Suspense fallback={<div className="p-4">Loading products...</div>}>
              <Products />
            </Suspense>
          )}
        </section>
        <section ref={footerRef} className="min-h-screen">
          {showFooter && (
            <Suspense fallback={<div className="p-4">Loading products...</div>}>
              <Footer />
            </Suspense>
          )}
        </section>
      </main>
    </div>
  )
}

export default ClientLayout