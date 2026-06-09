import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Modal } from '../../ui/form/Modal';
import { useInMobileDevice } from '../../hooks/useInMobileDevice';

type ScannedOrder = {
  orderId: string
  orderDate: string
  items: Array<{ name: string; price: number; qty: number}>
}

type ScannerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ScannerModal = ({ isOpen, onClose }: ScannerModalProps) => {

  const isMobile = useInMobileDevice()
  const [scannedOrder, setScannedOrder] = useState<ScannedOrder | null>(null)

  useEffect(() => {
    if (!isOpen || !isMobile || scannedOrder) return;

    const scanner = new Html5Qrcode('qr-reader');

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: 250,
          },
          (decodedText) => {
            console.log('QR:', decodedText);

            try {
              const parsed = JSON.parse(decodedText) as ScannedOrder
              setScannedOrder(parsed)
            } catch {
              console.error('Invalid QR data')
            }

            void scanner.stop()
          },
          () => {
            // qr scan failure per frame (ignore or log if needed)
          }
        );
      } catch (err) {
        console.error(err);
      }
    };

    void startScanner();

    return () => {
      void (async () => {
        try {
          if (scanner.isScanning) {
            await scanner.stop();
          }
          scanner.clear();
        } catch (err) {
          console.error(err);
        }
      })();
    };
  }, [isOpen, isMobile, scannedOrder]);

  useEffect(() => {
    if (!isOpen) setScannedOrder(null)
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
    >
        {scannedOrder ? (
          <>
            <h2>Order details</h2>
            <p>{scannedOrder.orderId}</p>
            {scannedOrder.items.map((item, i) => (
              <div key={i}>
                <p>{item.name}</p>
              </div>
            ))}
            <button onClick={onClose} className='bg-red-500'>Close</button>
          </>
        ) : (
          <div className='relative w-full'>
            <div id="qr-reader" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-xl border-4 border-white shadow-lg" />
            </div>
          </div>
        )}  
    </Modal>
  );
};