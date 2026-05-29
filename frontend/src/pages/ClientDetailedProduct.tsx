import { useState } from 'react'
import { Image } from '../ui/form/Image'
import { Loader } from '../components/Loader'
import { Error } from '../components/Error'
import { NotFound } from '../components/NotFound'
import { BtnBuyNow } from '../components/buttons/BtnBuyNow'
import { BtnAddToCart } from '../components/buttons/BtnAddToCart'
import { useViewDetailedProduct } from '../hooks/useViewDetailedProduct'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const ClientDetailedProduct = () => {
    const { product, loading, error } = useViewDetailedProduct()

    const [activeImage, setActiveImage] = useState<number>(0)
    const [imageOpen, setImageOpen] = useState<boolean>(false)
    const [productQty, setProductQty] = useState<number>(1)

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

    const increaseQty = () => {
        if (productQty < product.stock) {
            setProductQty(prev => prev + 1)
        }
    }

    const decreaseQty = () => {
        if (productQty > 1) {
            setProductQty(prev => prev - 1)
        }
    }

    return (
        <section className="mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

            <div className="bg-white p-5 rounded-md grid grid-cols-1 md:grid-cols-2 gap-2 max-w-5xl mx-auto shadow-lg">

                {/* LEFT SIDE */}
                <div className="space-y-2">
                    <div
                        onClick={() => setImageOpen(true)}
                        className="rounded-sm overflow-hidden"
                    >
                        <Image
                            src={images[activeImage]?.url}
                            alt="Product"
                            className="w-full h-[380px] object-cover border-b border-gray-200"
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
                                            ? 'border-btn-black-bg'
                                            : 'border-gray-200'
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
                <div className="flex flex-col lg:pl-4">
    
                    <div>
                        <h1 className="capitalize text-lg sm:text-1xl md:text-2xl font-semibold text-text-body mt-1">
                            {product?.productName}
                        </h1>
                        <p className="text-sm text-gray-500 capitalize tracking-wide flex items-center gap-1">
                            {product?.productCategory}
                        </p>
                    </div>

                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-btn-black-bg tracking-wide">
                        <span className="text-[24px]">₱</span>{Number(product?.productPrice).toLocaleString()}.00
                    </p>

                    <div className="py-4">
                        <p className="text-sm text-gray-500 mb-1">
                            Description:
                        </p>

                        <p className="text-footer-bg leading-none text-sm sm:text-base">
                            {product?.productDescription}.
                        </p>
                    </div>

                    <div className="flex items-center">
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
                                ? `${product?.stock} pcs`
                                : 'Out of stock'}
                        </span>
                    </div>

                    <div className="pt-4">
                        <p className="text-sm text-footer-bg mb-2">
                            Quantity:
                        </p>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={decreaseQty}
                                className="w-10 h-10 border border-gray-200 rounded-sm text-lg font-semibold"
                            >
                                -
                            </button>

                            <span className="w-10 text-center font-medium text-lg">
                                {productQty}
                            </span>

                            <button
                                onClick={increaseQty}
                                className="w-10 h-10 border border-gray-200 rounded-sm text-lg font-semibold"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <BtnBuyNow product={product} productQty={productQty} selectedImageIndex={activeImage} />
                        <BtnAddToCart product={product} selectedImageIndex={activeImage} />
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