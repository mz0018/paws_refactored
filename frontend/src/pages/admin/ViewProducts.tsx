import { useGetProduct } from '../../hooks/useGetProduct'
import { useEffect, useState } from 'react'
import { ProductContainer } from '../../ui/form/ProductContainer'
import { SearchBar } from '../../components/SearchBar'
import { FilterBy } from '../../components/FilterBy'
import { SortBy } from '../../components/SortBy'
import { useDebounce } from '../../hooks/useDebounce'
import { ButtonLoadMore } from '../../ui/form/ButtonLoadMore'
import { LinkUI } from '../../ui/form/LinkUI'

import { ClipLoader } from 'react-spinners'

const ViewProducts = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filteredBy, setFilteredBy] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('')

    const debouncedSearch = useDebounce(searchQuery, 300)
    const { isLoading, products, error, fetchProducts, nextCursor, hasNextPage, clearProducts } = useGetProduct()

    useEffect(() => {
        clearProducts()
        fetchProducts(undefined, debouncedSearch, filteredBy, sortBy)
    }, [debouncedSearch, filteredBy, sortBy])

    // if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <SearchBar
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />

                <FilterBy 
                    onChange={(e) => setFilteredBy(e.target.value)}
                    value={filteredBy} 
                />

                <SortBy 
                    onChange={(e) => setSortBy(e.target.value)}
                    value={sortBy}
                />

                <LinkUI to="add" title="Create a new product">
                    Go to Add Product
                </LinkUI>

            </div>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-6 gap-5">
                    {products.map((product) => (
                        <ProductContainer key={product._id} product={product} />
                    ))}
                </div>
            )}

             {hasNextPage && (
                <ButtonLoadMore onClick={() => fetchProducts(nextCursor, searchQuery, filteredBy, sortBy)}>
                    {isLoading ? <ClipLoader size={14} color='blue' /> : 'Load More'}
                </ButtonLoadMore>
            )}
        </>
    )
}
export default ViewProducts
