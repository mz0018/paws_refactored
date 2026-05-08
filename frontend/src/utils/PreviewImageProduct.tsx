import { useState } from 'react'
import { Image } from '../ui/form/Image'
import { Input } from '../ui/form/Input'
import { useRef } from 'react'

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import { Image as ImageIcon } from 'lucide-react'

type Props = {
    images?: any[]
    onRemove?: (index: number) => void
    onAdd?: (file: File, imageUrl: string, index: number) => void
}

export const PreviewImageProduct = ({ images, onRemove, onAdd }: Props) => {

    const fileRef = useRef<HTMLInputElement | null>(null)
    // const [targetIndex, setTargetIndex] = useState<number | null>(null)
    const [targetIndex, setTargetIndex] = useState(0)
    const [openImage, setOpenImage] = useState(false)
    const [activeImage, setActiveImage] = useState(0)

    return (
        <>
            {images?.length ? (
                <>
                    <div
                        className="cursor-pointer mb-2"
                        onClick={() => setOpenImage(true)}
                    >
                        <Image
                            src={images[activeImage].url}
                            alt="Product Image"
                        />
                    </div>

                    <Lightbox
                        open={openImage}
                        close={() => setOpenImage(false)}
                        slides={(images || []).map((img: any) => ({
                            src: img.url
                        }))}
                    />

                    <div className="grid grid-cols-5 gap-2">
                        {Array.from({ length: 5 }).map((_, index) => {
                            const img = images[index]

                            return img ? (
                                <div key={index} className="flex flex-col items-center">
                                    <button
                                        onClick={() => setActiveImage(index)}
                                        className={`aspect-square overflow-hidden rounded-sm w-full ${
                                            activeImage === index ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                    >
                                        <Image
                                            src={img.url}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>

                                    <button
                                        onClick={() => onRemove?.(index)}
                                        className="mt-1 text-xs text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="border border-gray-300 rounded-sm w-full aspect-square flex flex-col items-center justify-center text-gray-400">
                                        <ImageIcon className="w-5 h-5" />
                                    </div>

                                    <button
                                        onClick={() => {
                                            setTargetIndex(index)
                                            fileRef.current?.click()
                                        }}
                                        className="mt-1 text-xs text-blue-500 hover:underline"
                                    >
                                        Add
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </>
            ) : (
                <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="border border-gray-300 rounded-sm w-full aspect-square flex flex-col items-center justify-center text-gray-400">
                                <ImageIcon className="w-5 h-5" />
                            </div>

                            <button
                                onClick={() => {
                                    setTargetIndex(index)
                                    fileRef.current?.click()
                                }}
                                className="mt-1 text-xs text-blue-500 hover:underline"
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <Input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const files = Array.from(e.target.files || [])

                    files.forEach((f) => {
                        const imageUrl = URL.createObjectURL(f)
                        onAdd?.(f, imageUrl, targetIndex)
                    })

                    e.target.value = ''
                    setTargetIndex(0)
                }}
            />
        </>
    )
}