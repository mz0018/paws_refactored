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

      <section ref={appointmentsRef}>
        <div className="min-h-[700px] md:min-h-[450px]">
          {showAppointments && (
            <Suspense>
              <Appointments />
            </Suspense>
          )}
        </div>
      </section>
      <section ref={productsRef}>
        <div className="min-h-[800px] md:min-h-[550px]">
          {showProducts && (
            <Suspense>
              <Products />
            </Suspense>
          )}
        </div>
      </section>
    </>
  )
}

export default App