import { useGetOrderByUserId } from '../../hooks/useGetOrderbyUserId'
import { useEffect, useState } from 'react'
import { NotFound } from '../../components/NotFound'
import { Loader } from '../../components/Loader'
import { Error } from '../../components/Error'
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

    if (loading) {
        return (
            <Loader label="Loading orders..." />
        )
    }

    if (error) {
        return (
            <Error label={error as string} />
        )
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="text-footer-bg min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Date
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Total Qty
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Total Amount
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => {
                            const totalQty = order.items.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                            )

                            const totalAmount = order.items.reduce(
                                (sum, item) => sum + item.subtotal,
                                0
                            )

                            return (
                                <tr
                                    key={order._id}
                                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-4 py-3">
                                        {totalQty} pcs.
                                    </td>

                                    <td className="px-4 py-3 font-bold text-green-500">
                                         ₱{totalAmount.toFixed(2)}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <Button
                                            className="bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white"
                                            onClick={() => {
                                                setSelectedOrder(order)
                                                setIsModalOpen(true)
                                            }}
                                        >
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <ViewOrderModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedOrder(null); }} order={selectedOrder} />
        </>
    )
}

export default ListOfOrders