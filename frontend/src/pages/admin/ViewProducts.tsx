import { useGetProduct } from '../../hooks/useGetProduct'
import { useState } from 'react'
import { ProductContainer } from '../../ui/form/ProductContainer'
import { SearchBar } from '../../components/SearchBar'
import { FilterBy } from '../../components/FilterBy'
import { SortBy } from '../../components/SortBy'
import { useDebounce } from '../../hooks/useDebounce'
import { ButtonLoadMore } from '../../ui/form/ButtonLoadMore'
import { NotFound } from '../../components/NotFound'
import { PRODUCT_CATEGORIES } from '../../mocks/categories'
import { SORT_OPTIONS } from '../../mocks/sortOptions'

import { ClipLoader } from 'react-spinners'
import { Search } from 'lucide-react'

const ViewProducts = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filteredBy, setFilteredBy] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('')

    const debouncedSearch = useDebounce(searchQuery, 300)
    
    const { data, fetchNextPage, hasNextPage, isLoading, isError, error, isFetchingNextPage } = useGetProduct(debouncedSearch, filteredBy, sortBy)

    const products = data?.pages.flatMap(page => page.products) ?? []

    if (isError) return <p>{error?.message}</p>

    return (
        <div className="bg-white p-4 shadow-lg">
            <h1 className="text-2xl font-bold text-text-body mb-4">List of <span className="text-btn-black-bg">Products</span></h1>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
    
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search product by name"
                        icon={<Search size={16} />}
                    />
                </div>

                <FilterBy 
                    onChange={(e) => setFilteredBy(e.target.value)}
                    value={filteredBy} 
                    options={PRODUCT_CATEGORIES}
                    placeholder="All Categories"
                />

                <SortBy 
                    onChange={(e) => setSortBy(e.target.value)}
                    value={sortBy}
                    options={SORT_OPTIONS}
                    placeholder="Default"
                />

            </div>

            {products.length === 0 && !isLoading ? (
                <NotFound label='Product not found' childLabel="We couldn't find any products matching your search." />
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <ProductContainer key={product._id} product={product} />
                    ))}
                </div>
            )}

             {hasNextPage && (
                <ButtonLoadMore onClick={() => fetchNextPage()}>
                    {isFetchingNextPage ? <ClipLoader size={14} color='blue' /> : 'Load More'}
                </ButtonLoadMore>
            )}
        </div>
    )
}
export default ViewProducts
