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
    const { isLoading, orderData } = useGetOrderById({ id_from_modal: orderId })
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
                        <>
                        {orderData?.status === 'pending' && (
                            <div className="mx-auto max-w-md rounded-sm border border-gray-200 bg-white p-2 font-mono">                            

                                <div>
                                    <h3 className="mb-2 text-center font-bold tracking-wider">
                                        ITEMS
                                    </h3>

                                    <div className="space-y-2">
                                        {orderData?.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="border-b border-gray-200 border-dashed pb-3 last:border-b-0"
                                            >
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-text-body">
                                                        {item.product.productName}
                                                    </span>
                                                    <span>x{item.quantity}</span>
                                                </div>

                                                <div className="mt-1 flex justify-between text-sm text-text-body">
                                                    <span>Subtotal</span>
                                                    <span>{item.subtotal.toLocaleString('en-PH', {
                                                        style: 'currency',
                                                        currency: 'PHP'
                                                    })}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="my-4 border-t border-gray-200 border-dashed" />

                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between capitalize">
                                        <span className="font-semibold">Status</span>
                                        <span>{orderData?.status}</span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="font-semibold">Created</span>
                                        <span className="text-right">
                                            {new Date(orderData?.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="font-semibold">Completed</span>
                                        <span className="text-right">
                                            {orderData?.completedAt ?? 'Not completed'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        </>
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