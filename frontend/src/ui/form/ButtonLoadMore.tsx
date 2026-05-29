import React from 'react'
import { Button } from './Buttons'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonLoadMore = ({ className = '', ...props }: ButtonProps) => {
    return (
        <Button
            {...props}
            className={`bg-footer-bg text-white cursor-pointer p-4 rounded-sm border border-gray-200 m-2 ${className}`} 
        />
    )
}