import { Link } from 'react-router-dom'
import { Image } from './Image'

type Product = {
  _id: string
  productName: string
  productPrice: number
  images: { url: string }[]
}

type ProductContainerProps = {
  product: Product
}

export const ProductContainer = ({ product }: ProductContainerProps) => {
  return (
    <div className="p-3">
      <Link to={`/admin/products/${product._id}`}>
        <Image
          src={product.images[0]?.url}
          alt={product.productName}
          className="w-full h-74 object-cover"
        >
          View Details
        </Image>
      </Link>

      <h3 className="mt-2 capitalize font-medium">
        {product.productName}
      </h3>
    </div>
  )
}