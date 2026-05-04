import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'

type ProductUpdateModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const ProductUpdateModal = ({
  isOpen,
  onClose,
}: ProductUpdateModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false} className="w-full sm:max-w-md">
      <h2 className="text-lg font-bold mb-2">Edit Product</h2>
      <p>Product Update Modal</p>

      <div className="flex justify-end gap-2 mt-4">

        <Button
            onClick={() => onClose()}
            className="text-gray-500 bg-white border border-gray-300 hover:bg-gray-50/90 w-full font-semibold"
        >
        Cancel
        </Button>

        <Button type="button" onClick={() => alert('Save changes functionality coming soon!')} className="text-white w-full">
          Save Changes
        </Button>
      </div>

    </Modal>
  )
}