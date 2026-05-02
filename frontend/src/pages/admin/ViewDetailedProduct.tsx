import { useState } from 'react'
import { useViewDetailedProduct } from '../../hooks/useViewDetailedProduct'
import { Image } from '../../ui/form/Image'

const ViewDetailedProduct = () => {
    const { product, loading } = useViewDetailedProduct()
    const [activeImage, setActiveImage] = useState(0)

    if (loading) return <p className="p-4">Loading...</p>
    if (!product) return <p className="p-4">Product not found</p>

    const images = product.images || []

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* LEFT SIDE */}
            <div className="space-y-6">

                {/* Main Image Box (same feel as upload box) */}
                <div className="
                    border border-gray-300 rounded-sm
                    h-[300px] md:h-[440px] lg:h-[500px]
                    flex items-center justify-center 
                    overflow-hidden bg-gray-50
                ">
                    <Image
                        src={images[activeImage]?.url}
                        alt="Main product"
                        className="w-full h-full aspect-square object-cover"
                    />
                </div>

                {/* Thumbnails */}
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
                                    ${activeImage === index ? 'ring-2 ring-green-500' : ''}
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
            <div className="md:border-l md:border-gray-300 md:pl-6 space-y-4">

                <h1 className="text-2xl font-bold">
                    {product.productName}
                </h1>

                <p className="text-xl text-green-600 font-semibold">
                    ₱{product.productPrice}
                </p>

                <p className="text-sm text-gray-500">
                    Category: {product.productCategory}
                </p>

                <p className="text-gray-700">
                    {product.productDescription}
                </p>

                <div className="flex items-center gap-4">
                    <span className="font-medium">Stock:</span>
                    <span className="px-2 py-1 bg-gray-200 rounded">
                        {product.stock}
                    </span>
                </div>

                <p className="text-xs text-gray-400">
                    Created at: {new Date(product.createdAt).toLocaleString()}
                </p>
            </div>

        </div>
    )
}

export default ViewDetailedProduct