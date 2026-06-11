import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'
import { MarkCompletedUI } from '../../ui/form/MarkCompletedUI'
import { useMarkAsComplete } from '../../hooks/useMarkAsComplete'

type ViewOrderModalProps = {
    isOpen: boolean
    onClose: () => void
    order: {
        _id: string
        items: { product: { productName: string } | string; quantity: number; price: number; subtotal: number }[]
        createdAt: string
        updatedAt: string
        status: string
    } | null
}

export const ViewOrderModal = ({ isOpen, onClose, order }: ViewOrderModalProps) => {

    const th = ['Product', 'Qty', 'Price', 'Subtotal']

    const { handleMarkAsComplete, isLoading } = useMarkAsComplete(order?._id as string)

    if (!order) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false}>
            <div className="p-3 sm:p-4 text-text-body">

                <h2 className="text-xl font-bold mb-2 text-footer-bg leading-tight">
                Order <span className="text-btn-black-bg">Details</span>
                </h2>

                <div className="overflow-x-auto mb-2">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                {th.map((header, idx) => (
                                    <th key={idx} className="p-2 text-left text-sm font-medium text-gray-700">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {order.items.map((item, idx) => (
                                <tr key={idx}>
                                    <td className=" p-1.5 sm:p-2 text-xs sm:text-sm">
                                        {typeof item.product === 'string' ? item.product : item.product.productName}
                                    </td>
                                    <td className="p-1.5 sm:p-2 text-xs sm:text-sm flex items-center gap-1">
                                        <span>{item.quantity}</span>
                                        <span className="text-gray-500">×</span>
                                    </td>

                                    <td className="p-1.5 sm:p-2 text-xs sm:text-sm">
                                        {item.price.toLocaleString('en-PH', {
                                            style: 'currency',
                                            currency: 'PHP'
                                        })}
                                    </td>
                                    <td className="p-1.5 sm:p-2 text-xs sm:text-sm">
                                        {item.subtotal.toLocaleString('en-PH', {
                                            style: 'currency',
                                            currency: 'PHP'
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="text-xs space-y-1 mb-3 capitalize">
                    {order.status === 'completed' && (
                        <MarkCompletedUI 
                            orderId={order._id}
                            dateOrdered={new Date(order.createdAt)} 
                            dateCompleted={new Date(order.updatedAt)} 
                        />
                    )}
                </div>

                {order.status == 'pending' && (
                    <Button 
                        disabled={isLoading}
                        onClick={() => handleMarkAsComplete()}
                        className="bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white w-full transition-colors mb-2"
                    >
                        {isLoading ? 'Loading...' : 'Mark as Complete'}
                    </Button>
                )}
        
                <Button onClick={onClose} className="text-text-body border border-gray-400 font-semibold bg-none w-full hover:bg-gray-50">
                    Close
                </Button>
            </div>
        </Modal>
    )
}