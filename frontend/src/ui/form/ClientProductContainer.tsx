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

export const ClientProductContainer = ({
  product,
}: ClientProductContainerProps) => {
  return (
    <div className="group bg-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <Link to={`/detailed-product-overview/${product._id}`}>
        <div className="overflow-hidden bg-gray-50">
          <Image
            src={product.images[0]?.url}
            alt={product.productName}
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <h3 className="capitalize text-text-body font-medium sm:font-semibold line-clamp-2 text-sm sm:text-base leading-5 min-h-[2.5rem]">
          {product.productName}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg sm:text-xl font-bold text-btn-black-bg">
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(product.productPrice)}
          </span>

          <Link
            to={`/detailed-product-overview/${product._id}`}
            className="
              relative
              inline-flex
              text-xs sm:text-sm
              font-medium
              text-text-body
              hover:text-text-hover
              transition-colors
              duration-300

              after:absolute
              after:left-0
              after:-bottom-0.5
              after:h-[2px]
              after:w-full
              after:bg-text-hover
              after:scale-x-0
              after:origin-left
              after:transition-transform
              after:duration-300
              after:content-['']

              hover:after:scale-x-100
            "
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}