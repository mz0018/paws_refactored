import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { lazy, Suspense } from 'react'
import { useInView } from './hooks/useInView'

const Appointments = lazy(() => import('./sections/Appointment'))
const Products = lazy(() => import('./sections/Products'))

const App = () => {
  const { ref: appointmentsRef, inView: showAppointments } = useInView()
  const { ref: productsRef, inView: showProducts } = useInView()

  return (
    <>
      <Hero />
      <About />

      <section ref={appointmentsRef} className="min-h-[250px]">
        {showAppointments && (
          <Suspense>
            <Appointments />
          </Suspense>
        )}
      </section>

      <section ref={productsRef} className="min-h-[250px]">
        {showProducts && (
          <Suspense>
            <Products />
          </Suspense>
        )}
      </section>
    </>
  )
}

export default App