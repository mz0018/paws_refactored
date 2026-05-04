import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'
import { Input } from '../../ui/form/Input'
import { Select } from '../../ui/form/Select'
import { Textarea } from '../../ui/form/Textarea'

import { PRODUCT_CATEGORIES } from '../../mocks/categories'

type ProductUpdateModalProps = {
  isOpen: boolean
  onClose: () => void
  product: any
}

export const ProductUpdateModal = ({
  isOpen,
  onClose,
  product,
}: ProductUpdateModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
      className="w-full sm:max-w-md"
    >
      <h2 className="text-lg font-bold mb-4">Edit Product</h2>

      <div className="space-y-3">
        <Input
          defaultValue={product?.productName}
          className="w-full border p-2 rounded"
        />

        <Input
          defaultValue={product?.productPrice}
          className="w-full border p-2 rounded"
        />

        <Select
          defaultValue={product?.productCategory}
          className="w-full"
        >
          <option value="" disabled>
            Select category
          </option>

          {PRODUCT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Input
          type="number"
          defaultValue={product?.stock}
          className="w-full border p-2 rounded"
        />

        <Textarea
          defaultValue={product?.productDescription}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          onClick={onClose}
          className="text-gray-500 bg-white border border-gray-300 w-full"
        >
          Cancel
        </Button>

        <Button
          type="button"
          className="text-white w-full"
          onClick={() => alert('Save changes coming soon!')}
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  )
}