import React from 'react'

type ProductImagesProps = React.ImgHTMLAttributes<HTMLImageElement>

export const ProductImages = ({ className = '', ...props }: ProductImagesProps) => {
    return (
        <img
            {...props}
            className={`rounded-sm object-cover w-full aspect-square ${className}`} 
        />
    )
}