import { useState } from 'react'
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

    const addProduct = () => {
        const updatedCart = [...cart, product]
        
        setCart(updatedCart)
        
        localStorage.setItem('shopping_cart', JSON.stringify(updatedCart))

        console.log(updatedCart)
    }

    return (
        <Button
            className="text-white font-semibold"
            onClick={addProduct}
        >
            <ShoppingCart size={18} />
            Add to cart {cart.length > 0 && `(${cart.length})`}
        </Button>
    )
}