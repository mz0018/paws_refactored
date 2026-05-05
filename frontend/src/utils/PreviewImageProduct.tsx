import { useState } from 'react'
import { Image } from '../ui/form/Image'

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import { Image as ImageIcon } from 'lucide-react'

type Props = {
    images?: any[]
}

export const PreviewImageProduct = ({ images }: Props) => {

    if (!images?.length) {
        return (
            <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-sm w-full aspect-square flex flex-col items-center justify-center text-gray-400"
                    >
                        <ImageIcon className="w-5 h-5" />
                    </div>
                ))}
            </div>
        )
    }

    const [openImage, setOpenImage] = useState(false)
    const [activeImage, setActiveImage] = useState(0)

    return (
        <>
        {images?.[0]?.url ? (
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
                    <button
                      key={index}
                      onClick={() => {
                        setActiveImage(index)
                        console.log(img)
                      }}
                      className={`aspect-square overflow-hidden rounded-sm ${
                        activeImage === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full aspect-square object-cover"
                      />
                    </button>
                  ) : (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-sm w-full aspect-square flex flex-col items-center justify-center text-gray-400"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-sm w-full aspect-square flex flex-col items-center justify-center text-gray-400"
                    >
                        <ImageIcon className="w-5 h-5" />
                    </div>
                ))}
            </div>
          )}
        </>
    )
}