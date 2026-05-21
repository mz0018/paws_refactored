import { useParams } from 'react-router-dom'

const ClientDetailedProduct = () => {
  const { id } = useParams()

  return (
    <section className="min-h-dvh">
      Client detailed product: {id}
    </section>
  )
}

export default ClientDetailedProduct