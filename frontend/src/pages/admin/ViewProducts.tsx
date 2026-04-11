import { Link } from 'react-router-dom'
import { useGetProduct } from '../../hooks/useGetProduct'
import { useEffect } from 'react'
import { Image } from '../../ui/form/Image'

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
                <div className="grid">
                    {products.map((product) => (
                        <Link key={product._id} to={`/admin/products/${product._id}`}>
                            <Image
                                src={product.images[0]?.url} 
                                alt={product.productName} 
                                className='w-12 h-12'
                            />
                            <h3>{product.productName}</h3>
                            <p>${product.productPrice}</p>
                        </Link>
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