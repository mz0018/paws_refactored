import React from 'react'

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  children?: React.ReactNode
}

export const Image = ({ className = '', children, ...props }: ImageProps) => {
  return (
    <div className="relative group overflow-hidden rounded-md">
      <img 
        {...props}
        className={`rounded-sm ${className}`}
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        
        {children && (
          <div className="absolute bottom-2 right-2 text-white tracking-wide">
            {children}
          </div>
        )}

      </div>
    </div>
  )
}