import { useState, useEffect } from 'react'

import { Loader } from '../Loader'
import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'
import { useGetOrderById } from '../../hooks/useGetOrderById'


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

    const [readyToShow, setReadyToShow] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setReadyToShow(true), 5000)
            return () => clearTimeout(timer)
        } else {
            setReadyToShow(false)
        }
    }, [isLoading])

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
                {isLoading || !readyToShow ? (
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
                            <div key={item.product._id || index}>
                                <p>Product: {item.product.name}</p>
                                <p>Price: {item.product.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Subtotal: {item.subtotal}</p>
                                <hr />
                            </div>
                        ))}
                    </div>
                )}
                </>

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