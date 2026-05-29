import { useState, useEffect } from 'react'
import { Button } from '../../ui/form/Buttons'
import { ShoppingCart } from 'lucide-react'

type Product = {
    _id?: string
    productName: string
    productPrice: number
    images?: { url: string }[]
    selectedImageIndex?: number
}

type BtnAddToCartProps = {
    product: Product
    selectedImageIndex?: number
}

export const BtnAddToCart = ({ product, selectedImageIndex = 0 }: BtnAddToCartProps) => {
    const [cart, setCart] = useState<Product[]>(() => {
        const savedCart = localStorage.getItem('shopping_cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    const isInCart = product._id && cart.some((item) => item._id === product._id)

    const addProduct = () => {

        if (isInCart) return

        const itemToAdd = { ...product, selectedImageIndex }
        const updatedCart = [...cart, itemToAdd]

        setCart(updatedCart)
        localStorage.setItem('shopping_cart', JSON.stringify(updatedCart))
        window.dispatchEvent(new Event('cart-updated'))
        console.log(updatedCart)
    }

    useEffect(() => {
        const sync = () => {
            const saved = JSON.parse(localStorage.getItem('shopping_cart') ?? '[]')
            setCart(prev => {
                if (prev.length === saved.length &&
                    prev.every((item, i) => item._id === saved[i]?._id)) {
                    return prev
                }
                return saved
            })
        }
        window.addEventListener('cart-updated', sync)
        return () => window.removeEventListener('cart-updated', sync)
    }, [])

    return (
        <Button
            className="w-full text-white font-semibold bg-btn-black-bg hover:bg-btn-black-hover-header-bg transition"
            onClick={addProduct}
            disabled={!!isInCart}
        >
            <ShoppingCart size={18} />
            {isInCart ? 'Already in cart' : 'Add to cart'}
        </Button>
    )
}