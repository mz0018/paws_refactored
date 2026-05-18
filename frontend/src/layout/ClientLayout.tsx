import { lazy, Suspense } from 'react'
import { Header } from '../sections/Header'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Footer } from '../sections/Footer'
import { useInView } from '../hooks/useInView'

const Appointments = lazy(() =>import('../sections/Appointment'))
const Products = lazy(() =>import('../sections/Products'))

const ClientLayout = () => {
  const { ref: appointmentsRef, inView: showAppointments } = useInView()
  const { ref: productsRef, inView: showProducts } = useInView()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28">
        <Hero />
        <About />
        <section ref={appointmentsRef} className="min-h-screen">
          {showAppointments && (
              <Suspense>
                <Appointments />
              </Suspense>
          )}
        </section>
        <section ref={productsRef} className="min-h-screen">
          {showProducts && (
              <Suspense>
                <Products />
              </Suspense>
          )}
        </section>
        <Footer />
      </main>
    </div>
  )
}

export default ClientLayout