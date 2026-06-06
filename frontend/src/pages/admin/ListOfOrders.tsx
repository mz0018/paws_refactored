import { useGetOrderByUserId } from '../../hooks/useGetOrderbyUserId'
import { useEffect, useState } from 'react'
import { NotFound } from '../../components/NotFound'
import { Loader } from '../../components/Loader'
import { Error } from '../../components/Error'
import { OrderTable } from '../../ui/form/OrderTable'
import { ViewOrderModal } from '../../components/modals/ViewOrderModal'
import { SearchBar } from '../../components/SearchBar'
import { FilterBy } from '../../components/FilterBy'
import { SortBy } from '../../components/SortBy'
import { ORDER_CATEGORIES } from '../../mocks/orderCategories'
import { ORDER_SORT_OPTIONS } from '../../mocks/orderSortOptions'
import { Search } from 'lucide-react'
import { useDebounce } from '../../hooks/useDebounce'

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
    const [searchQuery, setSearchQuery] = useState<string>('')
    const debouncedSearchQuery = useDebounce(searchQuery, 600)
    const [filteredBy, setFilteredBy] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('')
    const { handleGetOrderByUserId } = useGetOrderByUserId()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [orders, setOrders] = useState<Order[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const th = [
        'Order ID',
        'Date',
        'Quantity',
        'Total',
        'Status',
        'Actions'
    ]

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await handleGetOrderByUserId({ limit: 10, page })
                setOrders(data.orders)
                setTotalPages(data.totalPages || 1)
            } catch {
                setError('Failed to load orders')
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [page])

    const filteredOrders = filteredBy ? orders.filter(order => order.status === filteredBy) : orders

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        switch (sortBy) {
            case 'date_desc':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            case 'date_asc':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            default:
                return 0
        }
    })

    const searchedOrders = debouncedSearchQuery.trim()
        ? sortedOrders.filter(order =>
            order._id.toLowerCase().includes(debouncedSearchQuery.trim().toLowerCase())
        ) : sortedOrders  

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
            <div className="bg-white rounded-lg shadow-lg p-5">
                <h1 className="text-2xl font-bold text-text-body mb-4">List of <span className="text-btn-black-bg">Orders</span></h1>
                
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                    <div className="col-span-2 md:col-span-2 lg:col-span-1">
                        <SearchBar
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={<Search size={16} />}
                            placeholder="Search orders by Order ID"
                        />
                    </div>
                    <FilterBy onChange={(e) => setFilteredBy(e.target.value)} value={filteredBy} options={ORDER_CATEGORIES} />
                    <SortBy onChange={(e) => setSortBy(e.target.value)} value={sortBy} options={ORDER_SORT_OPTIONS} />
                </div>


                {searchedOrders.length === 0 && !loading ? (
                    <NotFound label="No orders found" childLabel="You haven't made any orders yet." />
                ) : (
                    <div className="overflow-x-auto">
                    <table className="text-footer-bg min-w-full rounded-sm overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                {th.map((header, idx) => (
                                    <th
                                        key={idx}
                                        className={`text-left px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 font-medium text-text-body capitalize ${
                                            header === 'Quantity' || header === 'Total' ? 'hidden sm:table-cell' : ''
                                        }`}
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {searchedOrders.map((order) => (
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
                        </tbody>
                    </table>
                    {totalPages > 1 && (
                        <div>
                            <button 
                            className='bg-blue-500'
                            onClick={() => setPage(prev => Math.max(1, prev - 1))}
                            disabled={page === 1}
                            >Previous</button>
                            
                            <button 
                            className='bg-red-500'
                            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={page === totalPages}
                            >Next</button>
                        </div>
                    )}
                    </div>
                )}
            </div>
            <ViewOrderModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedOrder(null); }} order={selectedOrder} />
        </section>
    )
}

export default ListOfOrders