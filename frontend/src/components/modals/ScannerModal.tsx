import { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Modal } from '../../ui/form/Modal';
import { useInMobileDevice } from '../../hooks/useInMobileDevice';

type ScannerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ScannerModal = ({ isOpen, onClose }: ScannerModalProps) => {

  const isMobile = useInMobileDevice()

  useEffect(() => {
    if (!isOpen || !isMobile) return;

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

            void scanner.stop().then(() => {
              onClose();
            });
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
  }, [isOpen, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
    >
      <div className="relative w-full">
        <div id="qr-reader" />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-64 w-64 rounded-xl border-4 border-white shadow-lg" />
        </div>
      </div>
    </Modal>
  );
};