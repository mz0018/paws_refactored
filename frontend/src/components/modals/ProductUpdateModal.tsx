import { useState } from 'react'
import { Modal } from '../../ui/form/Modal'
import { Input } from '../../ui/form/Input'
import { Image } from '../../ui/form/Image'
import { Select } from '../../ui/form/Select'
import { Button } from '../../ui/form/Buttons'
import { Textarea } from '../../ui/form/Textarea'

import { PRODUCT_CATEGORIES } from '../../mocks/categories'

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

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

  const [openImage, setOpenImage] = useState(false)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
      className="w-full sm:max-w-md"
    >
      <h2 className="text-lg font-bold mb-4">Edit Product</h2>

      <div className="space-y-3">

        <div>
          <label className="block text-sm font-medium mb-1">Product Image(s)</label>
          {product?.images?.[0]?.url ? (
            <>
              <div
                className="cursor-pointer"
                onClick={() => setOpenImage(true)}
              >
                <Image
                  src={product.images[0].url}
                  alt="Product Image"
                />
              </div>

              <Lightbox
                open={openImage}
                close={() => setOpenImage(false)}
                slides={(product?.images || []).map((img: any) => ({
                  src: img.url
                }))}
              />
            </>
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
        </div>

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