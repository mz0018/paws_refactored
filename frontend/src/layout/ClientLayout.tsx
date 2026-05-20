import { Outlet } from "react-router-dom"
import { Header } from "../sections/Header"
import { Footer } from "../sections/Footer"

const ClientLayout = () => {
  return (
    <div className="relative min-h-screen">
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