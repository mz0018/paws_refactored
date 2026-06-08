import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'
import { QRCode } from 'react-qr-code'
import { Camera, Download } from 'lucide-react'

type QRModalProps = {
    isOpen: boolean
    onClose: () => void
    qrValue: string | null
    orderId: string | null
    orderDate: string | null
}

export const QRModal = ({ isOpen, qrValue, onClose, orderId, orderDate }: QRModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false}>
            <div className="text-text-body font-semibold text-sm md:text-md border-b border-gray-300 pb-2">
                {orderId && (
                    <p>Order: {orderId}</p>
                )}
                {orderDate && (
                    <p>Date: {new Date(orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    })}</p>
                )}
            </div>
            <div className="flex flex-col items-center gap-2 p-2 text-center">
                
                {qrValue && (
                    <div className="bg-white p-3 rounded-lg shadow-sm aspect-square">

                        <QRCode value={qrValue} size={200} />
                    </div>
                )}

                <p className="text-sm md:text-md text-text-body max-w-xs font-semibold">
                    Show this to the veterinarian — acts as your receipt
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full border-t border-gray-300 p-5">
                    <Button className="border border-btn-black-bg text-btn-black-bg font-semibold flex-1 flex items-center justify-center gap-2">
                        <Camera size={16} />
                        Take screenshot
                    </Button>

                    <Button className="bg-btn-black-bg text-white flex-1 flex items-center justify-center gap-2">
                        <Download size={16} />
                        Download QR
                    </Button>
                </div>
            </div>
        </Modal>
    )
}