import { Form } from '../../ui/form/Form'
import { Input } from '../../ui/form/Input'
import { Button } from '../../ui/form/Buttons'
import { Select } from '../../ui/form/Select'
import { ErrorText } from '../../ui/form/ErrorText'
import { ProductImages } from '../../ui/form/ProductImages'
import { useAddProduct } from '../../hooks/useAddProduct'
import { ClipLoader } from 'react-spinners'

import { PRODUCT_CATEGORIES } from '../../mocks/categories'

const AddProducts = () => {
    const {
        isLoading,
        hasError,
        files,
        handleFileChange,
        handleRemoveFile,
        handleSubmit
    } = useAddProduct()

    return (
        <>
            <h1 className="text-2xl font-bold mb-2">Add Product</h1>
            <p className="mb-6 text-gray-500">This is the add product page.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-3">
                    {files.length === 0 && (
                        <p className="text-sm text-gray-400">No images selected</p>
                    )}

                    <div className={`grid gap-3 ${
                        files.length > 1 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'
                    }`}>
                        {files.map(({ file, preview }) => (
                            <div key={preview} className="relative">
                                <ProductImages src={preview} alt={file.name} />

                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile({ file, preview })}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <Form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="text"
                            name="productName"
                            placeholder="Product Name"
                            error={hasError.productName}
                        />

                        <Select name="productCategory" error={hasError.productCategory}>
                            <option value="">Select Category</option>
                            {PRODUCT_CATEGORIES.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>

                        <Input
                            type="text"
                            name="productDescription"
                            placeholder="Product Description"
                            error={hasError.productDescription}
                        />

                        <Input
                            type="number"
                            name="productPrice"
                            placeholder="Product Price"
                            error={hasError.productPrice}
                        />

                        <Input
                            type="number"
                            name="stock"
                            placeholder="Product Stock"
                            error={hasError.productStock}
                        />

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            multiple
                            error={hasError.productImages}
                        />

                        <ErrorText
                            message={
                                hasError.productName ||
                                hasError.productCategory ||
                                hasError.productDescription ||
                                hasError.productPrice ||
                                hasError.productStock ||
                                hasError.productImages ||
                                hasError.general
                            }
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? (
                                <ClipLoader size={20} color="white" />
                            ) : (
                                'Add Product'
                            )}
                        </Button>
                    </Form>
                </div>

            </div>
        </>
    )
}

export default AddProducts