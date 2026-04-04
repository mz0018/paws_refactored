import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string
}

export const Input = ({ className = '', error, ...props }: InputProps) => {
    return (
        <input 
            {...props}
            className={`p-4 rounded-sm focus:outline-none
            ${error ? 'border-red-500 border text-red-500' : 'border-gray-300 border text-gray-500'}
            ${className}`} 
        />
    )
}