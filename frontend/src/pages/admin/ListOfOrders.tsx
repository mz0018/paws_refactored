import { useGetOrderByUserId } from '../../hooks/useGetOrderbyUserId'
import { useEffect, useState } from 'react'

interface Order {
    _id: string
    product?: {
        productName: string
    }
    quantity: number
    price: number
    subtotal: number
    createdAt: string
}

const ListOfOrders = () => {
    const { handleGetOrderByUserId } = useGetOrderByUserId()

    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await handleGetOrderByUserId()
                setOrders(data.orders)
            } catch {
                setError('Failed to load orders')
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if (loading) return <div>Loading orders...</div>
    if (error) return <div>{error}</div>

    return (
        <div>
            {orders.length === 0 ? (
                <p>No orders found for your products.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order.product?.productName || 'N/A'}</td>
                                <td>{order.quantity}</td>
                                <td>${order.price}</td>
                                <td>${order.subtotal}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ListOfOrders