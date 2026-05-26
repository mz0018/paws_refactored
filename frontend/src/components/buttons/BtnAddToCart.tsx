import { useState, useEffect } from 'react'
import { Button } from '../../ui/form/Buttons'
import { ShoppingCart } from 'lucide-react'

type Product = {
    _id?: string
    productName: string
    productPrice: number
}

type BtnAddToCartProps = {
    product: Product
}

export const BtnAddToCart = ({ product }: BtnAddToCartProps) => {
    const [cart, setCart] = useState<Product[]>(() => {
        const savedCart = localStorage.getItem('shopping_cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    const isInCart = product._id && cart.some((item) => item._id === product._id)

    const addProduct = () => {

        if (isInCart) return

        const updatedCart = [...cart, product]
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
            className="text-white font-semibold"
            onClick={addProduct}
            disabled={!!isInCart}
        >
            <ShoppingCart size={18} />
            {isInCart ? 'Already in cart' : 'Add to cart'}
        </Button>
    )
}