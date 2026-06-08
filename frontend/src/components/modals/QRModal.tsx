import { useRef, useState } from 'react'
import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'
import { QRCode } from 'react-qr-code'
import { Download } from 'lucide-react'

import { toPng } from 'html-to-image'

type QRModalProps = {
    isOpen: boolean
    onClose: () => void
    qrValue: string | null
    orderId: string | null
    orderDate: string | null
}

export const QRModal = ({
    isOpen,
    qrValue,
    onClose,
    orderId,
    orderDate
}: QRModalProps) => {

    const qrRef = useRef<HTMLDivElement | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const handleScreenShot = async () => {
        if (!qrRef.current) return

        setLoading(true)

        try {
            window.scrollTo(0, 0)

            const dataUrl = await toPng(qrRef.current, {
                cacheBust: true,
                backgroundColor: '#ffffff',
                pixelRatio: Math.max(window.devicePixelRatio || 2, 2),
            })

            const link = document.createElement('a')
            link.href = dataUrl
            link.download = `qr-order-${orderId ?? 'receipt'}.png`

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        } catch (err) {
            console.error('Screenshot failed:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false}>

            <div ref={qrRef} className="bg-white">

                <div className="text-text-body font-semibold text-sm md:text-md border-b border-gray-300 pb-2 p-2">
                    {orderId && <p>Order: {orderId}</p>}

                    {orderDate && (
                        <p>
                            Date:{' '}
                            {new Date(orderDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                            })}
                        </p>
                    )}
                </div>

                <div className="flex flex-col items-center text-center">

                    {qrValue && (
                        <div className="bg-white p-3 rounded-lg shadow-sm aspect-square flex items-center justify-center">
                            <QRCode value={qrValue} size={200} />
                        </div>
                    )}

                    <p className="text-sm md:text-md text-text-body max-w-xs font-semibold pt-5">
                        Show this to the veterinarian as your official receipt.
                    </p>

                </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full p-5">

                <Button
                    onClick={handleScreenShot}
                    disabled={loading}
                    className="border bg-btn-black-bg text-white hover:bg-btn-black-hover-header-bg transition font-semibold flex-1 flex items-center justify-center gap-2"
                >
                    <Download size={16} />
                    {loading ? 'Processing...' : 'Download'}
                </Button>

            </div>

        </Modal>
    )
}