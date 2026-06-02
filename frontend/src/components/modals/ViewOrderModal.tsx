import { Modal } from '../../ui/form/Modal'

type ViewOrderModalProps = {
    isOpen: boolean
    onClose: () => void
    order: {
        _id: string
        items: { product: { productName: string } | string; quantity: number; price: number; subtotal: number }[]
        createdAt: string
        status: string
    } | null
}

export const ViewOrderModal = ({ isOpen, onClose, order }: ViewOrderModalProps) => {
    if (!order) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <p className="mb-2">Order ID: {order._id}</p>
                <p className="mb-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="mb-4">Status: {order.status}</p>

                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Product</th>
                            <th className="border p-2">Qty</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, idx) => (
                            <tr key={idx}>
                                <td className="border p-2">
                                    {typeof item.product === 'string' ? item.product : item.product.productName}
                                </td>
                                <td className="border p-2">{item.quantity}</td>
                                <td className="border p-2">${item.price.toFixed(2)}</td>
                                <td className="border p-2">${item.subtotal.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Close
                </button>
            </div>
        </Modal>
    )
}