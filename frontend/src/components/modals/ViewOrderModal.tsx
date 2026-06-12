import { Loader } from '../Loader'
import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'
import { MarkCompletedUI } from '../../ui/form/MarkCompletedUI'
import { useGetOrderById } from '../../hooks/useGetOrderById'
import { useMarkAsComplete } from '../../hooks/useMarkAsComplete'


type ViewOrderModalProps = {
    isOpen: boolean
    onClose: () => void
    orderId: string
}

export const ViewOrderModal = ({
    isOpen,
    onClose,
    orderId,
}: ViewOrderModalProps) => {
    const { isLoading, orderData } = useGetOrderById({ id_from_modal: orderId, isOpen })
    const { handleMarkAsComplete, isMarkLoading } = useMarkAsComplete(orderId)

    if (!orderId) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnBackdrop={false}
        >
            <div className="p-3 sm:p-4 text-text-body">
                <h2 className="text-xl font-bold mb-4 text-footer-bg leading-tight">
                    Order <span className="text-btn-black-bg">Details</span>
                </h2>

                <>
                {isLoading ? (
                    <Loader label='Loading Order' size='md' fullScreen={false} />
                ) : (
                    <div>
                        <p><strong>ID:</strong> {orderData?._id}</p>
                        <p><strong>Status:</strong> {orderData?.status}</p>
                        <p>
                            <strong>Created:</strong>{' '}
                            {orderData?.createdAt}
                        </p>
                        <p>
                            <strong>Completed:</strong>{' '}
                            {orderData?.completedAt ?? 'Not completed'}
                        </p>

                        <h3>Items</h3>

                        {orderData?.items.map((item, index) => (
                            <div key={index}>
                                <p>Product: {item.product.productName}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Subtotal: {item.subtotal}</p>
                                <hr />
                            </div>
                        ))}
                    </div>
                )}
                </>

                <div className="text-xs space-y-1 mb-3 capitalize">
                     {orderData?.status === 'completed' && (
                        <MarkCompletedUI 
                            orderId={orderData._id}
                            dateOrdered={new Date(orderData.createdAt)} 
                            dateCompleted={new Date(orderData.updatedAt)} 
                        />
                    )}
                </div>

                {orderData?.status == 'pending' && (
                    <Button 
                        disabled={isMarkLoading}
                        onClick={() => handleMarkAsComplete()}
                        className="bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white w-full transition-colors mb-2"
                    >
                        {isMarkLoading ? 'Loading...' : 'Mark as Complete'}
                    </Button>
                )}

                <Button
                    onClick={onClose}
                    className="text-text-body border border-gray-400 font-semibold bg-none w-full hover:bg-gray-50"
                >
                    Close
                </Button>
            </div>
        </Modal>
    )
}