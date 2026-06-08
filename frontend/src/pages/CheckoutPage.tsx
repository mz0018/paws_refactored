import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from '../ui/form/Image'
import { Button } from '../ui/form/Buttons'
import { NotFound } from '../components/NotFound'
import { useCheckoutItems } from '../hooks/useCheckoutItems'
import { ErrorText } from '../ui/form/ErrorText'
import { useQRGenerator } from '../hooks/useQRGenerator'
import { QRModal } from '../components/modals/QRModal'

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
  const [showQR, setShowQR] = useState<boolean>(false)

  const { qrValue, handleGenerate, closeQR } = useQRGenerator()
  const { loading, hasError, isRateLimit, handleSaveOrder, success, resetSuccess } = useCheckoutItems()
  const navigate = useNavigate()

  useEffect(() => {
    const stored = sessionStorage.getItem('checkout_items')
    if (stored) {
      setItems(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    if (success) {
      handleGenerate(items)
      setShowQR(true)
    }
  }, [success])

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

  const handleCancel = () => {
    sessionStorage.removeItem('checkout_items')
    navigate('/')
  }

  const handleCheckout = () => {
    handleSaveOrder(items)
  }
  
  return (
    <div className="min-h-dvh px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-footer-bg leading-tight">
            Order <span className="text-btn-black-bg">Summary</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">
            Review your items before placing your order
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div>
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 hover:bg-gray-50 transition-colors border-b border-gray-200"
              >
                <Link
                  to={`/detailed-product-overview/${item._id}`}
                  className="shrink-0"
                >
                  <Image
                    src={item.images?.[item.selectedImageIndex ?? 0]?.url}
                    alt={item.productName}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-gray-900 line-clamp-1 font-medium">
                    {item.productName}
                  </p>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                    <span>₱{item.productPrice.toLocaleString()}</span>
                    <span>×</span>
                    <span>{item.quantity}</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-sm sm:text-base text-gray-900 whitespace-nowrap">
                    ₱
                    {(item.productPrice * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 sm:mt-6 bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center text-sm sm:text-base text-gray-600 mb-3">
            <span>Subtotal</span>
            <span>₱{grandTotal.toLocaleString()}</span>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-gray-200">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              Total
            </span>

            <span className="text-xl sm:text-2xl font-bold text-footer-bg mb-3">
              ₱{grandTotal.toLocaleString()}
            </span>
          </div>

          <ErrorText message={hasError.general} />

          <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:mt-6">

            <QRModal 
              isOpen={showQR}
              qrValue={qrValue}
              onClose={() => {
                closeQR()
                resetSuccess()
                navigate('/')
              }} />

            <Button
              className="flex-1 h-11 sm:h-12 rounded-md border border-gray-400 bg-white hover:bg-gray-50 text-sm sm:text-base text-gray-700 font-semibold transition-all"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button onClick={handleCheckout} disabled={isRateLimit || loading} className="flex-1 h-11 sm:h-12 rounded-md bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-sm sm:text-base text-white font-semibold shadow-md transition-all">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckoutPage