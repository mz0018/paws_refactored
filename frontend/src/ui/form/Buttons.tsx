import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ className = '', children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`cursor-pointer p-4 rounded-sm bg-blue-500 text-white tracking-wider flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  )
}