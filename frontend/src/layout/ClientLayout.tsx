import { Header } from '../sections/Header'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Footer } from '../sections/Footer'

const ClientLayout = () => {

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
      </main>
      <Footer />
    </div>
  )
}
export default ClientLayout