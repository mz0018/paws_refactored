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
    <div className="p-3 bg-white rounded-sm shadow-md">
      <Link to={`/detailed-product-overview/${product._id}`}>
        <Image
          src={product.images[0]?.url}
          alt={product.productName}
          className="w-full aspect-square object-cover"
        >
        </Image>
      </Link>

      <h3 className="mt-1 md:mt-2 uppercase text-text-body font-medium sm:font-semibold line-clamp-1 tracking-wide text-xs sm:text-sm md:text-base leading-none">
        {product.productName}
      </h3>
    </div>
  )
}