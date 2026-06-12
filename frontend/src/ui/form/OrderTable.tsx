import { Button } from '../form/Buttons'
import { SquareArrowOutUpRight, Copy } from 'lucide-react'
interface Order {
    _id: string
    createdAt: string
    status: string
    totalAmount: number
}

type OrderTableProps = {
    order: Order
    onViewOrder: (order: Order) => void
}

export const OrderTable = ({ order, onViewOrder }: OrderTableProps) => {
    const totalAmount = order.totalAmount

    const handleCopy = async () => {
        await navigator.clipboard.writeText(order._id)
    }

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 tracking-wide">
                <div className="flex items-center gap-2 whitespace-nowrap">
                    <div className="relative group">
                        <button
                            onClick={handleCopy}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer transition-colors"
                        >
                            <Copy size={14} />
                        </button>

                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                            Copy
                        </span>
                    </div>

                    <span>{order._id}</span>
                </div>
            </td>
            <td className="px-2 py-2 text-xs text-gray-500 sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3">
            <span className="block truncate sm:hidden">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                })}
            </span>

            <span className="hidden sm:block truncate">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                })}
            </span>
            </td>
            <td className="hidden sm:table-cell px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-btn-black-bg font-semibold">
                {totalAmount.toLocaleString('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                })}
            </td>
            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 capitalize whitespace-nowrap">- {order.status}</td>
            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3">
                <Button
                    onClick={() => onViewOrder(order)}
                    className="
                        bg-btn-black-bg text-white hover:bg-btn-black-hover-header-bg
                        font-semibold transition
                        px-2 py-1 text-xs gap-1
                        sm:px-3 sm:py-2 sm:text-sm sm:gap-2
                        md:px-4 md:py-2
                    "
                >
                    <SquareArrowOutUpRight
                        size={14}
                        className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]"
                    />
                    <span className="hidden sm:inline">View</span>
                </Button>
            </td>
        </tr>
    )
}