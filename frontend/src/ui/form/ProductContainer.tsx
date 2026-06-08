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
    <div className="p-3 bg-white border border-gray-200 rounded-sm shadow-sm">
      <Link to={`/admin/products/${product._id}`}>
        <Image
          src={product.images[0]?.url}
          alt={product.productName}
          className="w-full aspect-square object-cover"
        >
          <span className="text-xs">View Details</span>
        </Image>
      </Link>

      <h3 className="mt-2 capitalize text-xs sm:text-sm text-text-body line-clamp-1">
        {product.productName}
      </h3>
    </div>
  )
}