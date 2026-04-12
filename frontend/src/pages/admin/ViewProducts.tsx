import { Link } from 'react-router-dom'
import { useGetProduct } from '../../hooks/useGetProduct'
import { useEffect } from 'react'
import { ProductContainer } from '../../ui/form/ProductContainer'

const ViewProducts = () => {
    const { isLoading, products, error, fetchProducts, nextCursor, hasNextPage } = useGetProduct()
    useEffect(() => {
        fetchProducts()
    }, [])
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    return (
        <div>
            <h1>My Products</h1>
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
        </div>
    )
}
export default ViewProducts