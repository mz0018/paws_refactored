import { Form } from '../../ui/form/Form'
import { Input } from '../../ui/form/Input'
import { Button } from '../../ui/form/Buttons'
import { Select } from '../../ui/form/Select'
import { ErrorText } from '../../ui/form/ErrorText'
import { ProductImages } from '../../ui/form/ProductImages'
import { useAddProduct } from '../../hooks/useAddProduct'
import { ClipLoader } from 'react-spinners'
import { Upload, UploadCloud } from 'lucide-react'

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
            <h1 className="text-2xl font-semibold text-start mb-6">
                Product Upload
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* LEFT SIDE */}
                <div className="space-y-6">
                    
                    {/* Upload Box */}
                    <div className="border-4 border-gray-300 border-dashed rounded-lg min-h-[500px] flex flex-col justify-center items-center text-center p-6">
    
                        <UploadCloud className="mb-4 w-12 h-12 text-gray-400" />

                        <p className="font-semibold text-gray-500 mb-3">
                            Drag & Drop Images Here
                        </p>

                        <p className="text-gray-400 text-sm mb-4">or</p>

                        {/* Hidden input */}
                        <Input
                            id="fileUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            multiple
                            className="hidden"
                            error={hasError.productImages}
                        />

                        {/* Button */}
                        <label htmlFor="fileUpload" className="flex justify-center">
                            <Button type="button">
                                <Upload className="mr-2" />
                                Upload Images
                            </Button>
                        </label>
                    </div>

                    {/* Thumbnails */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Thumbnails:</p>

                        <div className="grid grid-cols-3 gap-3">
                            {files.map(({ file, preview }) => (
                                <div key={preview} className="relative">
                                    <ProductImages src={preview} alt={file.name} />

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile({ file, preview })}
                                        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div>
                    <Form onSubmit={handleSubmit} className="space-y-4">

                        <Input
                            type="text"
                            name="productName"
                            placeholder="Product Name"
                            error={hasError.productName}
                        />

                        <Input
                            type="text"
                            name="productDescription"
                            placeholder="Description"
                            error={hasError.productDescription}
                        />

                        <Input
                            type="number"
                            name="productPrice"
                            placeholder="Price"
                            error={hasError.productPrice}
                            className='w-1/2'
                        />

                        <Select name="productCategory" className='w-1/2' error={hasError.productCategory}>
                            <option value="">Select Category</option>
                            {PRODUCT_CATEGORIES.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>

                        <Input
                            type="number"
                            name="stock"
                            placeholder="Stock Quantity"
                            error={hasError.productStock}
                            className='w-1/2'
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

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <Button type="button" className="bg-gray-200 text-black">
                                Save
                            </Button>

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <ClipLoader size={20} color="white" />
                                ) : (
                                    'Publish'
                                )}
                            </Button>
                        </div>

                    </Form>
                </div>
            </div>
        </>
    )
}

export default AddProducts