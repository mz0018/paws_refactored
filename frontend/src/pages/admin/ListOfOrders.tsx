import { useState } from 'react'
import { ChevronLeft, ChevronRight, RefreshCcw, Search, Camera } from 'lucide-react'

import { useGetOrderByUserId } from '../../hooks/useGetOrderbyUserId'
import { useInMobileDevice } from '../../hooks/useInMobileDevice'
import { useDebounce } from '../../hooks/useDebounce'

import { Button } from '../../ui/form/Buttons'
import { NotFound } from '../../components/NotFound'
import { Loader } from '../../components/Loader'
import { Error } from '../../components/Error'
import { SearchBar } from '../../components/SearchBar'
import { FilterBy } from '../../components/FilterBy'
import { SortBy } from '../../components/SortBy'

import { ViewOrderModal } from '../../components/modals/ViewOrderModal'
import { ScannerModal } from '../../components/modals/ScannerModal'

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
    const { data, isLoading, isFetching, isError, refetch, error } = useGetOrderByUserId(10, page)

    const isMobile = useInMobileDevice()
    const orders: Order[] = data?.orders ?? []

    const [searchQuery, setSearchQuery] = useState('')
    const [filteredBy, setFilteredBy] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isScannerOpen, setIsScannerOpen] = useState(false)
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <SearchBar
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            icon={<Search size={16} />}
                            placeholder="Search orders by Order ID"
                        />
                        
                        {isMobile && (
                            <Button onClick={() => setIsScannerOpen(true)} className='bg-btn-black-bg text-white p-2'><Camera /></Button>
                        )}
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

                    <div className="justify-self-end flex items-center rounded-sm overflow-hidden w-fit">
                        <span className="px-3 py-1 text-sm text-text-body whitespace-nowrap">
                            Page {page} of {totalPages}
                        </span>

                        {totalPages > 1 && (
                            <>
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-2 py-1 cursor-pointer"
                                >
                                    <ChevronLeft size={16} color="gray" />
                                </button>

                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-2 py-1 cursor-pointer"
                                >
                                    <ChevronRight size={16} color="gray" />
                                </button>
                            </>
                        )}

                        <button
                            title="Refresh List"
                            onClick={() => refetch()}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-muted/10 text-gray-400 hover:text-btn-black-bg transition-colors cursor-pointer"
                        >
                            <RefreshCcw size={16} />
                        </button>
                    </div>
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
                                {isFetching && orders.length > 0 ? (
                                    <tr>
                                        <td colSpan={TABLE_HEADERS.length} className="text-center  py-8">
                                            <Loader label="Fetching Orders" size="sm" fullScreen={false} />
                                        </td>
                                    </tr>
                                ) : (
                                    searchedOrders.map(order => (
                                    <OrderTable
                                        key={order._id}
                                        order={order}
                                        onViewOrder={o => {
                                            setSelectedOrder(o)
                                            setIsModalOpen(true)
                                        }}
                                    />
                                ))
                                )}
                            </tbody>
                        </table>
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

            <ScannerModal 
                isOpen={isScannerOpen}
                onClose={() => {
                    setIsScannerOpen(false)
                }}
            />
        </section>
    )
}

export default ListOfOrders