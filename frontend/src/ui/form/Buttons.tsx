import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ className = '', children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`text-xs sm:text-sm  cursor-pointer p-4 rounded-sm tracking-wide flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  )
}