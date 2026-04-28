import { Form } from '../../ui/form/Form'
import { Input } from '../../ui/form/Input'
import { Button } from '../../ui/form/Buttons'
import { Select } from '../../ui/form/Select'
import { ErrorText } from '../../ui/form/ErrorText'
import { Textarea } from '../../ui/form/Textarea'
import { ProductImages } from '../../ui/form/ProductImages'
import { useAddProduct } from '../../hooks/useAddProduct'
import { ClipLoader } from 'react-spinners'
import { Upload, UploadCloud, Image } from 'lucide-react'
import { useRef } from 'react'

import { PRODUCT_CATEGORIES } from '../../mocks/categories'

const AddProducts = () => {

    const fileRef = useRef<HTMLInputElement | null>(null)

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* LEFT SIDE */}
                <div className="space-y-6">
                    
                    {/* Upload Box */}
                    <div className="border-3 border-gray-300 border-dashed rounded-lg min-h-[440px] flex flex-col justify-center items-center text-center p-6">
    
                        <UploadCloud className="mb-4 w-12 h-12 text-gray-400" />

                        <p className="font-semibold text-gray-500 mb-3">
                            Drag & Drop Images Here
                        </p>

                        <p className="text-gray-400 text-sm mb-4">or</p>

                        <Input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            multiple
                            className="hidden"
                            error={hasError.productImages}
                        />

                        <Button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                        >
                            <Upload className="mr-2" />
                            Upload Images
                        </Button>
                    </div>

                    {/* Thumbnails */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Thumbnails:</p>

                        <div className="grid grid-cols-5 gap-3">
                            {Array.from({ length: 5 }).map((_, index) => {
                                const item = files[index]

                                return (
                                    <div key={index} className="relative">
                                        {item ? (
                                            <>
                                                <ProductImages src={item.preview} alt={item.file.name} />

                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFile(item)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                                >
                                                    ✕
                                                </button>
                                            </>
                                        ) : (
                                            <div
                                                className="border border-gray-300 rounded-sm w-full aspect-square flex flex-col items-center justify-center text-gray-400"
                                            >
                                                <Image className="w-6 h-6 mb-1" />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="md:border-l md:border-gray-300 md:pl-6">
                    <Form onSubmit={handleSubmit} className="space-y-4">

                        <Input
                            type="text"
                            name="productName"
                            label="Product name"
                            placeholder="e.g. Ibuprofen 200mg Capsule"
                            error={hasError.productName}
                        />

                        <Textarea
                            name="productDescription"
                            label="Description"
                            placeholder="e.g. Describe dosage, usage, and important medical information"
                            error={hasError.productDescription}
                        />

                        <Input
                            type="number"
                            name="productPrice"
                            label="Price"
                            placeholder="₱0.00"
                            error={hasError.productPrice}
                            className='w-1/2'
                        />

                        <Select name="productCategory" className='w-1/2' label='Category' error={hasError.productCategory}>
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
                            label="Stock quantity"
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