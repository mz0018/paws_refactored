import React from 'react'

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export const Image = ({ className = '', ...props }: ImageProps) => {
    return (
        <img 
            {...props}
            className={`rounded-md ${className}`}
        />
    )
}