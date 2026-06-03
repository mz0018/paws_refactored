import { useGetOrderByUserId } from '../../hooks/useGetOrderbyUserId'
import { useEffect, useState } from 'react'
import { NotFound } from '../../components/NotFound'
import { Loader } from '../../components/Loader'
import { Error } from '../../components/Error'
import { OrderTable } from '../../ui/form/OrderTable'
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

    const th = [
        'Date',
        'Total Qty',
        'Total Amount',
        'Status',
        'Actions'
    ]

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
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="text-footer-bg bg-white min-w-full rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            {th.map((header, idx) => (
                                <th key={idx} className="text-left px-4 py-3 text-sm font-medium text-footer-bg capitalize">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length === 0 && !loading ? (
                            <NotFound label="No orders found" childLabel="You haven't made any orders yet." />
                        ) : (
                            <>
                            {orders.map((order) => (
                                <OrderTable 
                                key={order._id} 
                                order={order} 
                                onViewOrder={
                                    (o) => { 
                                        setSelectedOrder(o);    
                                        setIsModalOpen(true) 
                                    }
                                } 
                                />
                            ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
            <ViewOrderModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedOrder(null); }} order={selectedOrder} />
        </>
    )
}

export default ListOfOrders