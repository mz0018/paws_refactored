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
    <Link
      to={`/admin/products/${product._id}`}
      className="border p-3 rounded-md hover:shadow"
    >
      <Image
        src={product.images[0]?.url}
        alt={product.productName}
        className="w-full h-32 object-cover"
      />
      <h3 className="mt-2 font-medium">{product.productName}</h3>
      <p className="text-sm text-gray-500">${product.productPrice}</p>
    </Link>
  )
}