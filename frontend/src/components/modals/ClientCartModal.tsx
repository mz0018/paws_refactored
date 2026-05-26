import { NotFound } from '../NotFound'
import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'

type ClientCartModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const ClientCartModal = ({ isOpen, onClose }: ClientCartModalProps) => {

    const cart = JSON.parse(localStorage.getItem('shopping_cart') ?? '[]')

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false} className="w-full sm:max-w-lg">
            <h2 className="text-lg font-bold mb-4">Cart</h2>
            
            {cart.length === 0 ? (
                <NotFound label="Your Cart is Empty" childLabel="Browse products and add items to your cart."  />
            ) : (
                <ul>
                    {cart.map((item: any, i: number) => (
                        <li key={i} className="text-text-body">
                            {item.productName} - ₱{item.productPrice}
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