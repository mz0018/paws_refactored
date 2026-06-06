import { useState } from 'react'
import { Search } from 'lucide-react'

import { useGetOrderByUserId } from '../../hooks/useGetOrderbyUserId'
import { useDebounce } from '../../hooks/useDebounce'

import { NotFound } from '../../components/NotFound'
import { Loader } from '../../components/Loader'
import { Error } from '../../components/Error'
import { ViewOrderModal } from '../../components/modals/ViewOrderModal'
import { SearchBar } from '../../components/SearchBar'
import { FilterBy } from '../../components/FilterBy'
import { SortBy } from '../../components/SortBy'

import { OrderTable } from '../../ui/form/OrderTable'

import { ORDER_CATEGORIES } from '../../mocks/orderCategories'
import { ORDER_SORT_OPTIONS } from '../../mocks/orderSortOptions'

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

const TABLE_HEADERS = [
    'Order ID',
    'Date',
    'Quantity',
    'Total',
    'Status',
    'Actions'
]

const ListOfOrders = () => {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError, error } = useGetOrderByUserId(10, page)

    const orders: Order[] = data?.orders ?? []

    const [searchQuery, setSearchQuery] = useState('')
    const [filteredBy, setFilteredBy] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const debouncedSearchQuery = useDebounce(searchQuery, 600)
    const totalPages = data?.totalPages ?? 1

    const filteredOrders = filteredBy
        ? orders.filter(order => order.status === filteredBy)
        : orders

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        switch (sortBy) {
            case 'date_desc':
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )

            case 'date_asc':
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )

            default:
                return 0
        }
    })

    const searchedOrders = debouncedSearchQuery.trim()
        ? sortedOrders.filter(order =>
              order._id
                  .toLowerCase()
                  .includes(debouncedSearchQuery.trim().toLowerCase())
          )
        : sortedOrders

    if (isLoading) {
        return <Loader label="Loading orders..." />
    }

    if (isError) {
        return <Error label={(error as Error)?.message ?? 'Failed to load orders'} />
    }

    return (
        <section className="w-full">
            <div className="bg-white rounded-lg shadow-lg p-5">
                <h1 className="text-2xl font-bold text-text-body mb-4">
                    List of{' '}
                    <span className="text-btn-black-bg">Orders</span>
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                    <div className="col-span-2 md:col-span-2 lg:col-span-1">
                        <SearchBar
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            icon={<Search size={16} />}
                            placeholder="Search orders by Order ID"
                        />
                    </div>

                    <FilterBy
                        value={filteredBy}
                        onChange={e => setFilteredBy(e.target.value)}
                        options={ORDER_CATEGORIES}
                    />

                    <SortBy
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        options={ORDER_SORT_OPTIONS}
                    />
                </div>

                {searchedOrders.length === 0 ? (
                    <NotFound
                        label="No orders found"
                        childLabel="You haven't made any orders yet."
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="text-footer-bg min-w-full rounded-sm overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    {TABLE_HEADERS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className={`text-left px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 font-medium text-text-body capitalize ${
                                                header === 'Quantity' ||
                                                header === 'Total'
                                                    ? 'hidden sm:table-cell'
                                                    : ''
                                            }`}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {searchedOrders.map(order => (
                                    <OrderTable
                                        key={order._id}
                                        order={order}
                                        onViewOrder={o => {
                                            setSelectedOrder(o)
                                            setIsModalOpen(true)
                                        }}
                                    />
                                ))}
                            </tbody>
                        </table>

                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className='bg-red-500 p-4 text-white'
                                >
                                    Previous
                                </button>

                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className='bg-red-500 p-4 text-white'
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ViewOrderModal
                isOpen={isModalOpen}
                order={selectedOrder}
                onClose={() => {
                    setIsModalOpen(false)
                    setSelectedOrder(null)
                }}
            />
        </section>
    )
}

export default ListOfOrders