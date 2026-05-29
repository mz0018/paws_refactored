import { useState } from 'react'
import { Button } from '../../ui/form/Buttons'
import { useNavigate } from 'react-router-dom'

type Product = {
    _id?: string
    productName: string
    productPrice: number
    images?: { url: string }[]
}

type BtnBuyNowProps = {
    product: Product
    productQty: number
    selectedImageIndex?: number
}

export const BtnBuyNow = ({ product, productQty, selectedImageIndex = 0 }: BtnBuyNowProps) => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleClick = () => {
        setIsLoading(true)
        try {
            const item = {
                _id: product._id,
                productName: product.productName,
                productPrice: product.productPrice,
                quantity: productQty,
                images: product.images,
                selectedImageIndex,
            }
            sessionStorage.setItem('checkout_items', JSON.stringify([item]))
            navigate('/checkout')
        } catch (err) {
            console.error('Something went wrong', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            className="w-full border border-btn-black-bg font-semibold text-btn-black-bg hover:bg-btn-black-bg/10 transition"
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : 'Buy now'}
        </Button>
    )
}