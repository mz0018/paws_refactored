import React from 'react'
import { Button } from './Buttons'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonLoadMore = ({ className = '', ...props }: ButtonProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full border-t border-gray-200 my-4" />

      <Button
        {...props}
        className={`hover:bg-gray-50 font-semibold text-text-body w-1/4 cursor-pointer p-4 rounded-sm border border-gray-200 shadow-sm ${className}`}
      />
    </div>
  )
}