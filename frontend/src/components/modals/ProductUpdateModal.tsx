import { useEffect } from 'react'
import { Modal } from '../../ui/form/Modal'
import { Input } from '../../ui/form/Input'
import { Select } from '../../ui/form/Select'
import { Button } from '../../ui/form/Buttons'
import { Textarea } from '../../ui/form/Textarea'
import { ErrorText } from '../../ui/form/ErrorText'
import { PreviewImageProduct } from '../../utils/PreviewImageProduct'

import { useUpdateProduct } from '../../hooks/useUpdateProduct'
import { PRODUCT_CATEGORIES } from '../../mocks/categories'

import { Save } from 'lucide-react'

type ProductUpdateModalProps = {
  isOpen: boolean
  onClose: () => void
  product: any
}

export const ProductUpdateModal = ({ isOpen, onClose, product }: ProductUpdateModalProps) => {

  const { changesMade, hasError, isLoading, handleRemoveImage, handleAddImage, handleSubmit, handleChange, productCopy, isRateLimited } = useUpdateProduct({ product })

  useEffect(() => {
    if (hasError) {
      document.getElementById('form-update-error')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })
    }
  }, [hasError])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
      className="w-full sm:max-w-lg"
    >
      <div className="space-y-3">

        <div>
          <PreviewImageProduct images={productCopy?.images} onRemove={handleRemoveImage} onAdd={handleAddImage} />
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            name="productName"
            label="Product name"
            defaultValue={productCopy?.productName}
            onChange={handleChange}
            error={hasError.productName}
            className="w-full border p-2 rounded"
          />

          <Input
            name="productPrice"
            type="number"
            label="Price"
            defaultValue={productCopy?.productPrice}
            onChange={handleChange}
            error={hasError.productPrice}
            className="w-full border p-2 rounded"
          />

          <Select
            name="productCategory"
            label="Category"
            defaultValue={productCopy?.productCategory}
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
            defaultValue={productCopy?.stock}
            onChange={handleChange}
            error={hasError.stock}
            className="w-full border p-2 rounded"
          />

          <Textarea
            name="productDescription"
            label="Description"
            defaultValue={productCopy?.productDescription}
            onChange={handleChange}
            error={hasError.productDescription}
            className="w-full border p-2 rounded mb-2"
          />

          <ErrorText id='form-update-error' message={ hasError.productName || hasError.productCategory || hasError.productDescription || hasError.productPrice || hasError.stock || hasError.productImages || hasError.general }/>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-4">
            <Button
              onClick={onClose}
              className="text-gray-500 bg-white border font-semibold border-gray-300 w-full"
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
              disabled={isLoading || !changesMade || isRateLimited}
            >
              {isLoading
                ? 'Updating...'
                : !changesMade
                ? 'No changes to update'
                : <>
                <Save className="w-5 h-5" />
                <span>Save changes</span>
                </>}
            </Button>
            
          </div>

        </form>
      </div>
    </Modal>
  )
}
