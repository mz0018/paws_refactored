import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Modal } from '../../ui/form/Modal';
import { Button } from '../../ui/form/Buttons';
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
            <Button className='bg-btn-black-bg hover:bg-btn-black-hover-header-bg transition-colors text-white w-full mb-2'>Mark as Done</Button>
          </>
        ) : (
          <div className='relative w-full h-72 sm:h-80 md:h-96'>
            <div id="qr-reader" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-xl border-4 border-white shadow-lg" />
            </div>
          </div>
        )}  
        <Button onClick={onClose} className='bg-none border border-gray-400 hover:bg-gray-50 w-full font-semibold text-text-body tracking-wide'>Close</Button>
    </Modal>
  );
};