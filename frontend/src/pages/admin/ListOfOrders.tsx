import { useState, useEffect } from 'react'
import { RefreshCcw, Search, Camera } from 'lucide-react'

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
import { PaginationUI } from '../../ui/form/PaginationUI'

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

    const isMobile = useInMobileDevice()

    const [searchQuery, setSearchQuery] = useState('')
    const [filteredBy, setFilteredBy] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isScannerOpen, setIsScannerOpen] = useState(false)

    // Store only the order ID
    const [selectedOrderId, setSelectedOrderId] = useState<string>('')

    const debouncedSearchQuery = useDebounce(searchQuery, 600)
    const { data, isLoading, isFetching, isError, refetch, error } =
        useGetOrderByUserId(10, page, debouncedSearchQuery, filteredBy, sortBy)
    const orders: Order[] = data?.orders ?? []
    const totalPages = data?.totalPages ?? 1

    useEffect(() => {
        setPage(1)
    }, [debouncedSearchQuery, filteredBy, sortBy])

    if (isLoading) {
        return <Loader label="Loading orders..." />
    }

    if (isError) {
        return (
            <Error
                label={(error as Error)?.message ?? 'Failed to load orders'}
            />
        )
    }

    return (
        <section className="w-full">
            <div className="bg-white rounded-lg shadow-lg p-5">
                <h1 className="text-2xl font-bold text-text-body mb-4">
                    List of{' '}
                    <span className="text-btn-black-bg">Orders</span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-5">
                    {/* Search */}
                    <div className="sm:col-span-2 lg:col-span-4 xl:col-span-3 min-w-0">
                        <SearchBar
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            icon={<Search size={16} />}
                            placeholder="Search orders by Order ID"
                        />
                    </div>

                    {/* Filter */}
                    <div className="lg:col-span-2 min-w-0">
                        <FilterBy
                            value={filteredBy}
                            onChange={e => setFilteredBy(e.target.value)}
                            options={ORDER_CATEGORIES}
                        />
                    </div>

                    {/* Sort */}
                    <div className="lg:col-span-2 min-w-0">
                        <SortBy
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            options={ORDER_SORT_OPTIONS}
                        />
                    </div>

                    {/* Actions */}
                    <div className="sm:col-span-2 lg:col-span-4 xl:col-span-5">
                        <div className="flex items-center justify-end gap-2">
                            <PaginationUI
                                page={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />

                            <button
                                title="Refresh List"
                                onClick={() => refetch()}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-muted/10 text-gray-400 hover:text-btn-black-bg transition-colors cursor-pointer shrink-0"
                            >
                                <RefreshCcw size={16} />
                            </button>

                            {isMobile && (
                                <Button
                                    onClick={() => setIsScannerOpen(true)}
                                    className="bg-btn-black-bg hover:bg-btn-black-hover-header-bg transition-colors text-white shrink-0"
                                >
                                    <Camera />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {orders.length === 0 ? (
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
                                        <td
                                            colSpan={TABLE_HEADERS.length}
                                            className="text-center py-8"
                                        >
                                            <Loader
                                                label="Fetching Orders"
                                                size="sm"
                                                fullScreen={false}
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map(order => (
                                        <OrderTable
                                            key={order._id}
                                            order={order}
                                            onViewOrder={o => {
                                                setSelectedOrderId(o._id)
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
                orderId={selectedOrderId}
                onClose={() => {
                    setIsModalOpen(false)
                    setSelectedOrderId('')
                }}
            />

            <ScannerModal
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onOrderScanned={scanned => {
                    setSelectedOrderId(scanned.orderId)
                    setIsModalOpen(true)
                }}
            />
        </section>
    )
}

export default ListOfOrders