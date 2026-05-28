import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image } from '../ui/form/Image'
import { NotFound } from '../components/NotFound'
type CheckoutItem = {
  _id: string
  productName: string
  productPrice: number
  quantity: number
  images?: { url: string }[]
  selectedImageIndex?: number
}
const CheckoutPage = () => {
  const [items, setItems] = useState<CheckoutItem[]>([])
  useEffect(() => {
    const stored = sessionStorage.getItem('checkout_items')
    if (stored) {
      setItems(JSON.parse(stored))
    }
  }, [])
  if (items.length === 0) {
    return (
      <NotFound
        label="Nothing to checkout"
        childLabel="Go back and select products from your cart."
      />
    )
  }
  const grandTotal = items.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  )
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            <Link to={`/detailed-product-overview/${item._id}`}>
              <Image
                src={item.images?.[item.selectedImageIndex ?? 0]?.url}
                alt={item.productName}
                className="w-20 h-20 object-cover rounded-md"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{item.productName}</p>
              <p className="text-sm text-gray-500">
                ₱{item.productPrice} × {item.quantity}
              </p>
            </div>
            <p className="font-semibold whitespace-nowrap">
              ₱{(item.productPrice * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t flex justify-between items-center text-lg font-bold">
        <span>Total</span>
        <span>₱{grandTotal.toLocaleString()}</span>
      </div>
    </div>
  )
}
export default CheckoutPage