import { Link } from 'react-router-dom'
import { useGetProduct } from '../../hooks/useGetProduct'
import { useEffect, useState } from 'react'
import { ProductContainer } from '../../ui/form/ProductContainer'
import { SearchBar } from '../../components/SearchBar'
import { FilterBy } from '../../components/FilterBy'
import { useDebounce } from '../../hooks/useDebounce'

const ViewProducts = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filteredBy, setFilteredBy] = useState<string>('')

    const debouncedSearch = useDebounce(searchQuery, 300)
    const { isLoading, products, error, fetchProducts, nextCursor, hasNextPage } = useGetProduct()

    useEffect(() => {
        fetchProducts(undefined, debouncedSearch, filteredBy)
    }, [debouncedSearch, filteredBy])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <h1>My Products</h1>

            <SearchBar
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
            />

            <FilterBy 
                onChange={(e) => setFilteredBy(e.target.value)}
                value={filteredBy} 
            />

            <Link to="add" className="text-blue-500 hover:underline">
                Go to Add Product
            </Link>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-5 gap-5">
                    {products.map((product) => (
                        <ProductContainer key={product._id} product={product} />
                    ))}
                </div>
            )}

             {hasNextPage && (
                <button onClick={() => fetchProducts(nextCursor)}>
                    {isLoading ? 'Loading...' : 'Load More'}
                </button>
            )}
        </>
    )
}
export default ViewProducts