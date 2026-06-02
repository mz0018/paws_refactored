import { useGetOrderByUserId } from '../../hooks/useGetOrderbyUserId'
import { useEffect, useState } from 'react'
import { NotFound } from '../../components/NotFound'
import { Button } from '../../ui/form/Buttons'
import { ViewOrderModal } from '../../components/modals/ViewOrderModal'

interface OrderItem {
    product: { productName: string } | string
    quantity: number
    price: number
    subtotal: number
    createdBy: string
}

interface Order {
    _id: string
    items: OrderItem[]
    createdAt: string
    status: string
}

const ListOfOrders = () => {
    const { handleGetOrderByUserId } = useGetOrderByUserId()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [orders, setOrders] = useState<Order[]>([])
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

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
        <>
            <div>
                {orders.length === 0 ? (
                    <NotFound label="" childLabel="No orders found for your products." />
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Total Qty</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {orders.map(order => {
                                const totalQty = order.items.reduce((sum, item) => sum + item.quantity, 0)
                                const totalAmount = order.items.reduce((sum, item) => sum + item.subtotal, 0)

                                return (
                                    <tr key={order._id}>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>{totalQty}pcs.</td>
                                        <td className="font-bold text-green-500">${totalAmount.toFixed(2)}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <Button className="bg-blue-500 text-white" onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }}>View</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <ViewOrderModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedOrder(null); }} order={selectedOrder} />
        </>
    )
}

export default ListOfOrders