import { Modal } from '../../ui/form/Modal'
import { QRCode } from 'react-qr-code'

type QRModalProps = {
    isOpen: boolean
    onClose: () => void
    qrValue: string | null
}

export const QRModal = ({ isOpen, qrValue, onClose }: QRModalProps) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false}>
            {qrValue && <QRCode value={qrValue} size={200} />}
            <p>Show this to the veterinarian - acts as your receipt</p>
            <button>Take a screenshot!</button>
            <button>Download QR</button>
        </Modal>
    )
}