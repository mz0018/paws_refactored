import { Button } from '../form/Buttons'
import { SquareArrowOutUpRight } from 'lucide-react'

interface OrderItem {
    product: { productName: string } | string
    quantity: number
    price: number
    subtotal: number
    createdBy: string
}

interface Order {
    _id: string
    items: OrderItem[]
    createdAt: string
    status: string
}

type OrderTableProps = {
    order: Order
    onViewOrder: (order: Order) => void
}

export const OrderTable = ({ order, onViewOrder }: OrderTableProps) => {
    const totalQty = order.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalAmount = order.items.reduce((sum, item) => sum + item.subtotal, 0)

    return (
        <tr className="hover:bg-gray-50 transition">
            <td className="px-2 py-1 text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </td>
            <td className="px-2 py-1 text-sm text-gray-500">{totalQty} pcs.</td>
            <td className="px-2 py-1 text-sm text-btn-black-bg font-semibold">
                ₱{totalAmount.toFixed(2)}
            </td>
            <td className="px-2 py-1 text-sm text-gray-500 capitalize">{order.status}</td>
            <td className="px-2 py-1 text-sm">
                <Button
                    onClick={() => onViewOrder(order)}
                    className="bg-btn-black-bg text-white hover:bg-btn-black-hover-header-bg font-semibold transition"
                >
                    <SquareArrowOutUpRight size={16} />
                    View
                </Button>
            </td>
        </tr>
    )
}