import ClientLayout from './layout/ClientLayout'

const App = () => {
  return (
    <div className="relative min-h-screen">
      
      <div
        className="
          fixed inset-0
          -z-20
          opacity-10
          bg-[radial-gradient(circle,black_1px,transparent_1px)]
          bg-[size:16px_16px]
        "
      />

      <div className="fixed inset-0 -z-10 bg-surface/40" />

      <div className="relative z-10">
        <ClientLayout />
      </div>
    </div>
  )
}

export default App