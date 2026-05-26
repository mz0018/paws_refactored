import { useState, useEffect } from 'react'
import { NotFound } from '../NotFound'
import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'

type ClientCartModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const ClientCartModal = ({ isOpen, onClose }: ClientCartModalProps) => {

    const [selectedItems, setSelectedItems] = useState<number[]>([])

    const [cart, setCart] = useState(() => {
        const stored = JSON.parse(localStorage.getItem('shopping_cart') ?? '[]')

        return stored.map((item: any) => ({
            ...item,
            quantity: item.quantity ?? 1
        }))
    })

    const handleRemoveItem = (index: number) => {
        const updatedCart = cart.filter((_: any, i: number) => i !== index)
        setCart(updatedCart)
        localStorage.setItem('shopping_cart', JSON.stringify(updatedCart))
        window.dispatchEvent(new Event('cart-updated'))
    }

    const handleAdjustQuantity = (index: number, action: 'increase' | 'decrease') => {
        const updatedCart = [...cart]

        const currentQty = updatedCart[index].quantity ?? 1

        if (action === 'increase') {
            updatedCart[index].quantity = currentQty + 1
        }

        if (action === 'decrease' && currentQty > 1) {
            updatedCart[index].quantity = currentQty - 1
        }

        setCart(updatedCart)
        localStorage.setItem('shopping_cart', JSON.stringify(updatedCart))
        window.dispatchEvent(new Event('cart-updated'))
    }

    const handleCheckboxChange = (index: number) => {
        setSelectedItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            alert('please select a product to checkout')
            return
        }
        console.log('=== CHECKOUT ITEMS ===')
        selectedItems.forEach(index => {
            const item = cart[index]
            console.log(`Product: ${item.productName}, Price: ₱${item.productPrice}, Quantity: ${item.quantity}`)
        })
    }

    useEffect(() => {
        if (isOpen) {
            queueMicrotask(() => {
                const stored = JSON.parse(localStorage.getItem('shopping_cart') ?? '[]')

                setCart(
                    stored.map((item: any) => ({
                        ...item,
                        quantity: item.quantity ?? 1
                    }))
                )
            })
        }
    }, [isOpen])

    useEffect(() => {
        const sync = () => setCart(JSON.parse(localStorage.getItem('shopping_cart') ?? '[]'))
        window.addEventListener('cart-updated', sync)
        return () => window.removeEventListener('cart-updated', sync)
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false} className="w-full sm:max-w-lg">
            <h2 className="text-lg font-bold mb-4">Cart</h2>
            
            {cart.length === 0 ? (
                <NotFound label="Your Cart is Empty" childLabel="Browse products and add items to your cart."  />
            ) : (
                <ul className="space-y-2">
                    {cart.map((item: any, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-text-body">
                            <input type="checkbox" checked={selectedItems.includes(i)} onChange={() => handleCheckboxChange(i)} className="h-4 w-4 accent-btn-black-bg"/>

                            <label className="flex-1">
                                {item.productName} - ₱{item.productPrice}
                            </label>

                            <div className="flex items-center gap-2">
                                <button onClick={() => handleAdjustQuantity(i, 'decrease')}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleAdjustQuantity(i, 'increase')}>+</button>
                            </div>

                            <button
                                onClick={() => handleRemoveItem(i)}
                                className="bg-red-500 text-white px-2 rounded"
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-4">
                <Button className="text-white w-full" onClick={onClose}>Cancel</Button>
                <Button className="text-white w-full" onClick={handleCheckout}>Checkout</Button>
            </div>
            
        </Modal>
    )
}