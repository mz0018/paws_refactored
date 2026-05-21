import { useGetClientProducts } from '../hooks/useClientGetProducts'
import { useState } from 'react'
import { ClientProductContainer } from '../ui/form/ClientProductContainer'
import { SearchBar } from '../components/SearchBar'
import { FilterBy } from '../components/FilterBy'
import { SortBy } from '../components/SortBy'
import { useDebounce } from '../hooks/useDebounce'
import { ButtonLoadMore } from '../ui/form/ButtonLoadMore'
import { ClipLoader } from 'react-spinners'
import { Search } from 'lucide-react'
const ProductOverview = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredBy, setFilteredBy] = useState('')
    const [sortBy, setSortBy] = useState('')
    const debouncedSearch = useDebounce(searchQuery, 300)
    const { data, fetchNextPage, hasNextPage, isLoading, isError, error, isFetchingNextPage } =
        useGetClientProducts(debouncedSearch, filteredBy, sortBy)
    const products = data?.pages.flatMap(page => page.products) ?? []

    if (isError) return <p>{error?.message}</p>

    if (isLoading) {
        return (
            <section className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="p-3 animate-pulse">
                    <div className="w-full aspect-square bg-gray-200 rounded" />
                    <div className="mt-2 h-4 bg-gray-200 rounded w-3/4" />
                </div>
                ))}
            </div>
            </section>
        )
    }

    return (
        <section className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search product by name"
                        icon={<Search size={16} />}
                    />
                </div>
                <FilterBy onChange={(e) => setFilteredBy(e.target.value)} value={filteredBy} />
                <SortBy onChange={(e) => setSortBy(e.target.value)} value={sortBy} />
            </div>
            {products.length === 0 && !isLoading ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <ClientProductContainer key={product._id} product={product} />
                    ))}
                </div>
            )}
            {hasNextPage && (
                <ButtonLoadMore onClick={() => fetchNextPage()}>
                    {isFetchingNextPage ? <ClipLoader size={14} color='blue' /> : 'Load More'}
                </ButtonLoadMore>
            )}
        </section>
    )
}
export default ProductOverview