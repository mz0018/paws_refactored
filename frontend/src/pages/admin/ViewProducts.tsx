import { Link } from 'react-router-dom'

const Products = () => {
    return (
        <>
            <h1>Products</h1>
            <p>This is the products page.</p>

            <Link to="add" className="text-blue-500 hover:underline">
                Add Product
            </Link>
        </>
    )
}

export default Products