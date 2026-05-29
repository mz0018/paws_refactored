import { useState, useEffect } from 'react'
import { useGetClientProducts } from '../hooks/useClientGetProducts'
import { ClientProductContainer } from '../ui/form/ClientProductContainer'
import { SearchBar } from '../components/SearchBar'
import { FilterBy } from '../components/FilterBy'
import { SortBy } from '../components/SortBy'
import { NotFound } from '../components/NotFound'
import { Error } from '../components/Error'
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

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [debouncedSearch, filteredBy, sortBy])

    if (isError) {
        return (
            <Error label={error?.message} />
        )
    }

    return (
        <section className="w-full">

            <div className="bg-surface p-5 sticky top-28 z-40 shadow-lg">
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
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="p-3 animate-pulse">
                            <div className="w-full aspect-square bg-gray-200 rounded" />
                            <div className="mt-2 h-4 bg-gray-200 rounded w-3/4" />
                        </div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                <NotFound label='Products' />
            ) : (
                <div className="max-w-7xl mx-auto">
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map((product) => (
                            <div key={product._id}>
                                <ClientProductContainer key={product._id} product={product} />
                            </div>
                        ))}
                    </div>
                    {hasNextPage && (
                        <ButtonLoadMore onClick={() => fetchNextPage()}>
                            {isFetchingNextPage ? <ClipLoader size={14} color='blue' /> : 'Load More'}
                        </ButtonLoadMore>
                    )}
                </div>
            )}
        </section>
    )
}
export default ProductOverview