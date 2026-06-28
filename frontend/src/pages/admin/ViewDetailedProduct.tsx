import { useState } from 'react'
import { Image } from '../../ui/form/Image'
import { Button } from '../../ui/form/Buttons'
import { Error } from '../../components/Error'
import { NotFound } from '../../components/NotFound'
import { Loader } from '../../components/Loader'
import { useViewDetailedProduct } from '../../hooks/useViewDetailedProduct'
import { ProductUpdateModal } from '../../components/modals/ProductUpdateModal'

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import { Image as ImageIcon, Package, Clock, SquarePen, Trash } from 'lucide-react'

const ViewDetailedProduct = () => {
    const { product, loading, error, fetchProduct } = useViewDetailedProduct()

    const [activeImage, setActiveImage] = useState(0)
    const [imageOpen, setImageOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    if (loading) {
        return <Loader label="Loading product..." />
    }

    if (error) {
        return  (
            <Error label={error.message} />
        )
    }

    if (!product) {
        return (
            <NotFound 
                label="The product was not found or may have been removed."
                childLabel="Please refresh the page and try again."
            />
        )
    }

    const images = product.images || []

    return (
        <section className="w-full">
            <div className="bg-white p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-text-body">
                        View{' '}
                        <span className="text-btn-black-bg">
                            Product
                        </span>
                    </h1>

                    <p className="mt-1 text-text-body tracking-wide">
                        Review the complete details of the selected product.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="border border-gray-200 rounded-xl p-6">
                            <div
                                className="
                                    border border-gray-200 rounded-xl
                                    h-[300px] md:h-[360px]
                                    flex items-center justify-center 
                                    overflow-hidden bg-gray-50
                                    cursor-zoom-in
                                "
                                onClick={() => setImageOpen(true)}
                            >
                                <Image
                                    src={images[activeImage]?.url}
                                    alt="Main product"
                                    className="w-full h-full aspect-square object-cover"
                                />
                            </div>
                        </div>

                        <Lightbox
                            open={imageOpen}
                            close={() => setImageOpen(false)}
                            index={activeImage}
                            slides={images.map(img => ({ src: img.url }))}
                        />

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-text-body">
                                    Images
                                </h3>

                                <span className="text-sm text-gray-500">
                                    {images.length}/5
                                </span>
                            </div>

                            <div className="grid grid-cols-5 gap-3">
                                {Array.from({ length: 5 }).map((_, index) => {
                                    const item = images[index]

                                    return (
                                        <div key={index}>
                                            {item ? (
                                                <button
                                                    onClick={() => setActiveImage(index)}
                                                    className={`
                                                        relative overflow-hidden rounded-lg aspect-square border
                                                        ${activeImage === index ? 'ring-2 ring-btn-black-bg border-btn-black-bg' : 'border-gray-200'}
                                                    `}
                                                >
                                                    <Image
                                                        src={item.url}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ) : (
                                                <div className="aspect-square rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                                    <ImageIcon className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="lg:col-span-7">
                        {/* Product Information */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-text-body mb-5">
                                Product Information
                            </h3>

                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold capitalize text-text-body">
                                    {product.productName}
                                </h1>

                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {product.productDescription}
                                </p>
                            </div>
                        </div>

                        {/* Pricing & Category */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-text-body mb-5">
                                Pricing & Category
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Price
                                    </label>

                                    <p className="text-2xl font-bold text-btn-black-bg">
                                        ₱{product.productPrice}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Category
                                    </label>

                                    <p className="text-base font-medium text-text-body">
                                        {product.productCategory}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Stock Quantity
                                </label>

                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded text-sm font-medium text-text-body">
                                    <Package className="w-4 h-4" />
                                    {product.stock} units
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-400 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            Created at: {new Date(product.createdAt).toLocaleString()}
                        </p>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
                            <Button
                                type="button"
                                onClick={() => alert('Delete product functionality coming soon!')}
                                className="text-xs sm:text-sm  cursor-pointer p-4 rounded-sm tracking-wide flex items-center justify-center gap-2 w-full border border-btn-black-bg font-semibold text-btn-black-bg hover:bg-btn-black-bg/10 transition"
                            >
                                <Trash />
                                Move to Trash
                            </Button>

                            <Button
                                type="button"
                                className="text-xs sm:text-sm  cursor-pointer p-4 rounded-sm tracking-wide flex items-center justify-center gap-2 w-full text-white font-semibold bg-btn-black-bg hover:bg-btn-black-hover-header-bg transition"
                                onClick={() => setIsEditOpen(true)}
                            >
                                <SquarePen />
                                Edit Product
                            </Button>
                        </div>
                    </div>
                </div>

                <ProductUpdateModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    product={product}
                    onUpdateSuccess={fetchProduct}
                />
            </div>
        </section>
    )
}

export default ViewDetailedProduct
