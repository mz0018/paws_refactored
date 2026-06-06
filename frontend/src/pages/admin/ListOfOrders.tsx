import { useGetOrderByUserId } from '../../hooks/useGetOrderbyUserId'
import { useEffect, useState } from 'react'
import { NotFound } from '../../components/NotFound'
import { Loader } from '../../components/Loader'
import { Error } from '../../components/Error'
import { OrderTable } from '../../ui/form/OrderTable'
import { ViewOrderModal } from '../../components/modals/ViewOrderModal'
import { FilterBy } from '../../components/FilterBy'
import { ORDER_CATEGORIES } from '../../mocks/orderCategories'

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
    const [filteredBy, setFilteredBy] = useState<string>('')
    const { handleGetOrderByUserId } = useGetOrderByUserId()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [orders, setOrders] = useState<Order[]>([])
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const th = [
        'Date',
        'Total Qty',
        'Total',
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
        <section className="w-full">
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-5">
                <h1 className="text-2xl font-bold text-text-body mb-4">List of <span className="text-btn-black-bg">Orders</span></h1>
                <FilterBy onChange={(e) => setFilteredBy(e.target.value)} value={filteredBy} options={ORDER_CATEGORIES} />
                <table className="text-footer-bg min-w-full rounded-sm overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            {th.map((header, idx) => (
                                <th
                                    key={idx}
                                    className={`text-left px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 font-medium text-text-body capitalize ${
                                        header === 'Total Qty' ? 'hidden sm:table-cell' : ''
                                    }`}
                                >
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
        </section>
    )
}

export default ListOfOrders