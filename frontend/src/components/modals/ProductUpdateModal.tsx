import { Modal } from '../../ui/form/Modal'
import { Input } from '../../ui/form/Input'
import { Select } from '../../ui/form/Select'
import { Button } from '../../ui/form/Buttons'
import { Textarea } from '../../ui/form/Textarea'
import { ErrorText } from '../../ui/form/ErrorText'
import { PreviewImageProduct } from '../../utils/PreviewImageProduct'

import { useUpdateProduct } from '../../hooks/useUpdateProduct'

import { PRODUCT_CATEGORIES } from '../../mocks/categories'

type ProductUpdateModalProps = {
  isOpen: boolean
  onClose: () => void
  product: any
}

export const ProductUpdateModal = ({ isOpen, onClose, product }: ProductUpdateModalProps) => {

  // const { isLoading, hasError, files, handleFileChange, handleRemoveFile, handleSubmit } = useUpdateProduct({ product})
  const { changesMade, hasError, isLoading, handleSubmit, handleChange } = useUpdateProduct({ product })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
      className="w-full sm:max-w-lg"
    >
      <h2 className="text-lg font-bold mb-4">Edit Product</h2>

      <div className="space-y-3">

        <div>
          <label className="block text-sm font-medium mb-1">Product Image(s)</label>
          <PreviewImageProduct images={product?.images} />
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            name="productName"
            label="Product name"
            defaultValue={product?.productName}
            onChange={handleChange}
            error={hasError.productName}
            className="w-full border p-2 rounded"
          />

          <Input
            name="productPrice"
            type="number"
            label="Price"
            defaultValue={product?.productPrice}
            onChange={handleChange}
            error={hasError.productPrice}
            className="w-full border p-2 rounded"
          />

          <Select
            name="productCategory"
            label="Category"
            defaultValue={product?.productCategory}
            onChange={handleChange}
            error={hasError.productCategory}
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
            name="stock"
            type="number"
            label="Stock"
            defaultValue={product?.stock}
            onChange={handleChange}
            error={hasError.stock}
            className="w-full border p-2 rounded"
          />

          <Textarea
            name="productDescription"
            label="Description"
            defaultValue={product?.productDescription}
            onChange={handleChange}
            error={hasError.productDescription}
            className="w-full border p-2 rounded mb-2"
          />

          <ErrorText message={ hasError.productName || hasError.productCategory || hasError.productDescription || hasError.productPrice || hasError.stock || hasError.productImages || hasError.general }/>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={onClose}
              className="text-gray-500 bg-white border border-gray-300 w-full"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className={`w-full text-white ${
                isLoading || !changesMade
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={isLoading || !changesMade}
            >
              {isLoading
                ? 'Updating...'
                : !changesMade
                ? 'No changes to update'
                : 'Update'}
            </Button>
            
          </div>

        </form>
      </div>
    </Modal>
  )
}