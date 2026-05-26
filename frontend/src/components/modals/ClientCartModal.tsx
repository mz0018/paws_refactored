import { useState } from 'react'
import { NotFound } from '../NotFound'
import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'

type ClientCartModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const ClientCartModal = ({ isOpen, onClose }: ClientCartModalProps) => {

    const [cart, setCart] = useState(() =>
        JSON.parse(localStorage.getItem('shopping_cart') ?? '[]')
    )

    const handleRemoveItem = (index: number) => {
        const updatedCart = cart.filter((_: any, i: number) => i !== index)
        setCart(updatedCart)
        localStorage.setItem('shopping_cart', JSON.stringify(updatedCart))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false} className="w-full sm:max-w-lg">
            <h2 className="text-lg font-bold mb-4">Cart</h2>
            
            {cart.length === 0 ? (
                <NotFound label="Your Cart is Empty" childLabel="Browse products and add items to your cart."  />
            ) : (
                <ul className="space-y-2">
                    {cart.map((item: any, i: number) => (
                        <li
                        key={i}    
                        className="flex items-center gap-3 text-text-body"
                        >
                        <input
                            type="checkbox"
                            className="h-4 w-4 accent-btn-black-bg"
                        />

                        <label className="flex-1">
                            {item.productName} - ₱{item.productPrice}
                        </label>

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
                <Button className="text-white w-full">Checkout</Button>
            </div>
            
        </Modal>
    )
}