import { useViewDetailedProduct } from '../../hooks/useViewDetailedProduct'
import { Image } from '../../ui/form/Image'

const ViewDetailedProduct = () => {
    const { product, loading } = useViewDetailedProduct()
    if (loading) return <p>Loading...</p>
    if (!product) return <p>Product not found</p>
    return (
        <div>
            <h1>Name: {product.productName}</h1>
            <p>Price: ${product.productPrice}</p>
            <p>Category: {product.productCategory}</p>
            <p>Description: {product.productDescription}</p>
            <p>Stock: {product.stock}</p>
            
            {product.images?.map((img, index) => (
                <Image className='h-32 w-32' key={index} src={img.url} alt={`Product image ${index + 1}`} />
            ))}

            <p>Created at: {product.createdAt}</p>
        </div>
    )
}

export default ViewDetailedProduct