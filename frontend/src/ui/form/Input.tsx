import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ className = '', ...props }: InputProps) => {
    return (
        <input 
            {...props}
            className={`p-4 rounded-sm text-gray-500 focus:outline-none ${className}`} 
        />
    )
}