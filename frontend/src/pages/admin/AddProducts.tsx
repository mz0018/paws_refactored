import { useEffect, useRef } from 'react'
import { Form } from '../../ui/form/Form'
import { Input } from '../../ui/form/Input'
import { Button } from '../../ui/form/Buttons'
import { Select } from '../../ui/form/Select'
import { ErrorText } from '../../ui/form/ErrorText'
import { Textarea } from '../../ui/form/Textarea'
import { ProductImages } from '../../ui/form/ProductImages'
import { useAddProduct } from '../../hooks/useAddProduct'
import { ClipLoader } from 'react-spinners'
import {
    Upload,
    UploadCloud,
    Image,
    Send,
    Save
} from 'lucide-react'

import { PRODUCT_CATEGORIES } from '../../mocks/categories'

const AddProducts = () => {
    const fileRef = useRef<HTMLInputElement | null>(null)

    const {
        isLoading,
        hasError,
        files,
        handleFileChange,
        handleRemoveFile,
        handleSubmit,
        setProductName,
        conflictName,
        productName
    } = useAddProduct()

    const isDisabled =
        isLoading ||
        (conflictName !== '' &&
            productName.trim() === conflictName.trim())

    useEffect(() => {
        if (hasError) {
            document.getElementById('form-add-error')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }
    }, [hasError])

    return (
        <section className="w-full">
            <div className="bg-white p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-text-body">
                        Add{' '}
                        <span className="text-btn-black-bg">
                            Product
                        </span>
                    </h1>

                    <p className="mt-1 text-text-body tracking-wide">
                        Create a new product and publish it to your
                        inventory.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="border border-gray-200 rounded-xl p-6">
                            <div
                                className="
                                    border-2 border-dashed border-gray-300
                                    rounded-xl
                                    min-h-[360px]
                                    flex flex-col
                                    justify-center
                                    items-center
                                    text-center
                                    p-6
                                "
                            >
                                <UploadCloud className="w-14 h-14 text-gray-400 mb-5" />

                                <h3 className="text-lg font-semibold text-text-body">
                                    Upload Product Images
                                </h3>

                                <p className="text-sm text-gray-500 mt-2 max-w-xs">
                                    Drag and drop images here or
                                    browse your device to upload
                                    product photos.
                                </p>

                                <Input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    error={hasError.productImages}
                                />

                                <Button
                                    type="button"
                                    onClick={() =>
                                        fileRef.current?.click()
                                    }
                                    className="mt-6 flex items-center gap-2"
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload Images
                                </Button>
                            </div>
                        </div>

                        {/* Images */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-text-body">
                                    Images
                                </h3>

                                <span className="text-sm text-gray-500">
                                    {files.length}/5
                                </span>
                            </div>

                            <div className="grid grid-cols-5 gap-3">
                                {Array.from({ length: 5 }).map(
                                    (_, index) => {
                                        const item = files[index]

                                        return (
                                            <div
                                                key={index}
                                                className="relative"
                                            >
                                                {item ? (
                                                    <>
                                                        <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                                                            <ProductImages
                                                                src={
                                                                    item.preview
                                                                }
                                                                alt={
                                                                    item
                                                                        .file
                                                                        .name
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoveFile(
                                                                    item
                                                                )
                                                            }
                                                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors"
                                                        >
                                                            ✕
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="aspect-square rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                                        <Image className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="lg:col-span-7">
                        <Form
                            onSubmit={handleSubmit}
                            className="space-y-8"
                        >
                            {/* Product Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-text-body mb-5">
                                    Product Information
                                </h3>

                                <div className="space-y-6">
                                    <Input
                                        type="text"
                                        name="productName"
                                        label="Product name"
                                        placeholder="e.g. Ibuprofen 200mg Capsule"
                                        error={
                                            hasError.productName
                                        }
                                        onChange={(e) =>
                                            setProductName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Textarea
                                        name="productDescription"
                                        label="Description"
                                        placeholder="Describe dosage, usage, and important medical information."
                                        error={
                                            hasError.productDescription
                                        }
                                        className="
                                            min-h-[140px]
                                            max-h-[220px]
                                            resize-none
                                            overflow-y-auto
                                        "
                                    />
                                </div>
                            </div>

                            {/* Inventory */}
                            <div>
                                <h3 className="text-lg font-semibold text-text-body mb-5">
                                    Inventory
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        type="number"
                                        name="productPrice"
                                        label="Price"
                                        placeholder="₱0.00"
                                        error={
                                            hasError.productPrice
                                        }
                                    />

                                    <Select
                                        name="productCategory"
                                        label="Category"
                                        error={
                                            hasError.productCategory
                                        }
                                    >
                                        <option value="">
                                            Select Category
                                        </option>

                                        {PRODUCT_CATEGORIES.map(
                                            (category) => (
                                                <option
                                                    key={category}
                                                    value={
                                                        category
                                                    }
                                                >
                                                    {category}
                                                </option>
                                            )
                                        )}
                                    </Select>
                                </div>

                                <div className="mt-6">
                                    <Input
                                        type="number"
                                        name="stock"
                                        label="Stock Quantity"
                                        placeholder="Enter stock quantity"
                                        error={hasError.stock}
                                    />
                                </div>
                            </div>

                            <ErrorText
                                id="form-add-error"
                                message={
                                    hasError.productName ||
                                    hasError.productCategory ||
                                    hasError.productDescription ||
                                    hasError.productPrice ||
                                    hasError.stock ||
                                    hasError.productImages ||
                                    hasError.general
                                }
                            />

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    className="bg-gray-100 hover:bg-gray-200 text-text-body flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Draft
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={isDisabled}
                                    className="flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <ClipLoader
                                            size={20}
                                            color="white"
                                        />
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Publish Product
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddProducts