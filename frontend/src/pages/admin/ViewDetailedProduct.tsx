import { useState } from 'react'
import { Image } from '../../ui/form/Image'
import { Button } from '../../ui/form/Buttons'
import { NotFound } from '../../components/NotFound'
import { Loader } from '../../components/Loader'
import { useViewDetailedProduct } from '../../hooks/useViewDetailedProduct'
import { ProductUpdateModal } from '../../components/modals/ProductUpdateModal'

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

const ViewDetailedProduct = () => {
    const { product, loading, fetchProduct } = useViewDetailedProduct()

    const [activeImage, setActiveImage] = useState(0)
    const [imageOpen, setImageOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    if (loading) {
        return <Loader label="Loading product..." />
    }

    if (!product) {
        return <NotFound label="The product was not found or may have been removed." />
    }

    const images = product.images || []

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

            {/* LEFT SIDE */}
            <div className="space-y-6">

                <div
                    className="
                        border border-gray-300 rounded-sm
                        h-[300px] md:h-[440px] lg:h-[500px]
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

                <Lightbox
                    open={imageOpen}
                    close={() => setImageOpen(false)}
                    index={activeImage}
                    slides={images.map(img => ({ src: img.url }))}
                />

                <div>
                    <p className="font-semibold text-sm text-gray-500 mb-2">
                        Images:
                    </p>

                    <div className="grid grid-cols-5 gap-3">
                        {images.slice(0, 5).map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`
                                    relative overflow-hidden rounded-sm aspect-square
                                    ${activeImage === index ? 'ring-2 ring-blue-500' : ''}
                                `}
                            >
                                <Image
                                    src={img.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full aspect-square object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:pl-6 flex flex-col h-full">

                <div className="space-y-4 flex-1">

                    <div className="border-b border-gray-300 pb-4 space-y-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold capitalize">
                            {product.productName}
                        </h1>

                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {product.productDescription}
                        </p>
                    </div>

                    <p className="text-xl sm:text-2xl md:text-3xl text-green-600 font-semibold">
                        ₱{product.productPrice}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500">
                        Category: {product.productCategory}
                    </p>

                    <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
                        <span className="font-medium">Stock:</span>
                        <span className="px-2 py-1 bg-gray-200 rounded text-xs sm:text-sm">
                            {product.stock}
                        </span>
                    </div>

                    <p className="text-[10px] sm:text-xs text-gray-400">
                        Created at: {new Date(product.createdAt).toLocaleString()}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-6 mt-auto">

                    <Button
                        type="button"
                        onClick={() => alert('Delete product functionality coming soon!')}
                        className="w-full py-3 sm:py-4 md:py-5 px-4"
                    >
                        Delete Product
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setIsEditOpen(true)}
                        className="w-full py-3 sm:py-4 md:py-5 px-4"
                    >
                        Edit Product
                    </Button>

                </div>

            </div>

            <ProductUpdateModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                product={product}
                onUpdateSuccess={fetchProduct}
            />

        </div>
    )
}

export default ViewDetailedProduct