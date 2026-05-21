import { Link } from 'react-router-dom'
import { Image } from './Image'

type ClientProduct = {
  _id: string
  productName: string
  productPrice: number
  images: { url: string }[]
}

type ClientProductContainerProps = {
  product: ClientProduct
}

export const ClientProductContainer = ({ product }: ClientProductContainerProps) => {
  return (
    <div className="p-3">
      <Link to={`/admin/products/${product._id}`}>
        <Image
          src={product.images[0]?.url}
          alt={product.productName}
          className="w-full aspect-square object-cover"
        >
          View More
        </Image>
      </Link>

      <h3 className="mt-2 capitalize text-text-body font-semibold line-clamp-2 tracking-wide">
        {product.productName}
      </h3>
    </div>
  )
}