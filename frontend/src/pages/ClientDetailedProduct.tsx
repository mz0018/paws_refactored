import { useState } from 'react'
import { Image } from '../ui/form/Image'
import { Loader } from '../components/Loader'
import { NotFound } from '../components/NotFound'
import { useViewDetailedProduct } from '../hooks/useViewDetailedProduct'

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

const ClientDetailedProduct = () => {
    const { product, loading } = useViewDetailedProduct()

    const [activeImage, setActiveImage] = useState(0)
    const [imageOpen, setImageOpen] = useState(false)

    if (loading) {
        return <Loader label="Loading product..." />
    }

    if (!product) {
        return <NotFound label="The product was not found or may have been removed." />
    }

    const images = product.images || []

    return (
        <section className="min-h-dvh p-4">
            <div className="max-w-6xl mx-auto">

                {/* Main Image */}
                <div
                    onClick={() => setImageOpen(true)}
                    className="
                        border border-gray-300 rounded-sm
                        h-[300px] md:h-[440px] lg:h-[500px]
                        flex items-center justify-center
                        overflow-hidden bg-gray-50
                        cursor-zoom-in
                    "
                >
                    <Image
                        src={images[activeImage]?.url}
                        alt="Main product"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Thumbnails */}
                <div className="mt-4">
                    <p className="font-semibold text-sm text-gray-500 mb-2">
                        Images:
                    </p>

                    <div className="grid grid-cols-5 gap-3">
                        {images.slice(0, 5).map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`
                                    overflow-hidden rounded-sm aspect-square
                                    border
                                    ${activeImage === index
                                        ? 'ring-2 ring-blue-500 border-blue-500'
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
            </div>

            {/* Lightbox */}
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