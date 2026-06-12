import { useEffect, useState, useRef } from 'react';
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
  onOrderScanned: (order: ScannedOrder) => void;
};

export const ScannerModal = ({ isOpen, onClose, onOrderScanned }: ScannerModalProps) => {

  const isMobile = useInMobileDevice()
  const [isInitializing, setIsInitializing] = useState(false)
  const onOrderScannedRef = useRef(onOrderScanned)
  onOrderScannedRef.current = onOrderScanned

  useEffect(() => {
    if (!isOpen || !isMobile) return;

    const scanner = new Html5Qrcode('qr-reader');

    const startScanner = async () => {
      setIsInitializing(true)
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
              if (!parsed || typeof parsed.orderId !== 'string' || !parsed.orderId.trim()) {
                alert('Invalid QR data: missing orderId')
                return
              }
              const scanned = parsed as ScannedOrder
              onOrderScannedRef.current(scanned)
              onClose()
            } catch {
              console.error('Invalid QR data')
            }

            void scanner.stop()
          },
          () => {
            // qr scan failure per frame (ignore or log if needed)
          }
        );
        setIsInitializing(false)
      } catch (err) {
        console.error(err);
        setIsInitializing(false)
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
  }, [isOpen, isMobile]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
    >
      {isInitializing ? (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-btn-black-bg rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Initializing scanner...</p>
          </div>
        </div>
      ) : (
        <div className='relative w-full h-72 sm:h-80 md:h-96 overflow-hidden rounded-lg bg-black'>
          <div id="qr-reader" />
          <style>{`
            #qr-reader {
              position: absolute !important;
              inset: 0 !important;
              width: 100% !important;
              height: 100% !important;
              border: none !important;
              padding: 0 !important;
            }
            #qr-reader video {
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
            }
            #qr-reader__dashboard {
              display: none !important;
            }
          `}</style>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative h-64 w-64 animate-pulse" />
          </div>
        </div>
      )}
      <Button onClick={onClose} className='bg-none border border-gray-400 hover:bg-gray-50 w-full font-semibold text-text-body tracking-wide mt-2'>Close</Button>
    </Modal>
  );
};
