import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ className = '', ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={`cursor-pointer px-4 py-2 rounded-sm bg-blue-500 text-white ${className}`} 
        />
    )
}