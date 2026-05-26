import { useState } from 'react'
import { Image } from '../ui/form/Image'
import { Loader } from '../components/Loader'
import { Button } from '../ui/form/Buttons'
import { Error } from '../components/Error'
import { NotFound } from '../components/NotFound'
import { BtnAddToCart } from '../components/buttons/BtnAddToCart'
import { useViewDetailedProduct } from '../hooks/useViewDetailedProduct'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const ClientDetailedProduct = () => {
    const { product, loading, error } = useViewDetailedProduct()

    const [activeImage, setActiveImage] = useState<number>(0)
    const [imageOpen, setImageOpen] = useState<boolean>(false)

    if (loading) {
        return <Loader label="Loading product..." />
    }

    if (error) {
        return (
            <Error label={error?.message} />
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
        <section className="bg-surface/50 mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">

                {/* LEFT SIDE */}
                <div className="space-y-4">
                    <div
                        onClick={() => setImageOpen(true)}
                        className="rounded-sm overflow-hidden bg-gray-50 cursor-zoom-in"
                    >
                        <Image
                            src={images[activeImage]?.url}
                            alt="Product"
                            className="w-full h-[400px] object-cover"
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {images.slice(0, 5).map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`
                                    w-20 h-20 overflow-hidden rounded border
                                    ${
                                        activeImage === index
                                            ? 'border-blue-500'
                                            : 'border-gray-300'
                                    }
                                `}
                            >
                                <Image
                                    src={img.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col gap-3 lg:pl-4">
    
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">
                            {product?.productCategory}
                        </p>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-body mt-1">
                            {product?.productName}
                        </h1>
                    </div>

                    <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-btn-black-bg">
                        ₱{Number(product?.productPrice).toLocaleString()}
                    </p>

                    <div className="py-4">
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            {product?.productDescription}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                            Stock:
                        </span>

                        <span
                            className={`
                                text-sm font-medium px-2 py-1 rounded
                                ${
                                    product?.stock > 0
                                        ? 'text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }
                            `}
                        >
                            {product?.stock > 0
                                ? `${product?.stock}`
                                : 'Out of stock'}
                        </span>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <BtnAddToCart product={product} />

                        <Button className="w-full md:w-auto px-6 py-3 rounded bg-footer-bg text-white hover:bg-black/90 transition shadow-sm capitalize font-semibold">
                            Buy now
                        </Button>
                    </div>
                </div>
            </div>

            <Lightbox
                open={imageOpen}
                close={() => setImageOpen(false)}
                index={activeImage}
                slides={images.map((img) => ({
                    src: img.url,
                }))}
            />
        </section>
    )
}

export default ClientDetailedProduct