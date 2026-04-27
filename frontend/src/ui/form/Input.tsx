import React, { forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', error, ...props }, ref) => {
        return (
            <input
                ref={ref}
                {...props}
                className={`p-4 rounded-sm focus:outline-none
                ${error ? 'border-red-500 border text-red-500' : 'border-gray-300 border text-gray-500'}
                ${className}`}
            />
        )
    }
)