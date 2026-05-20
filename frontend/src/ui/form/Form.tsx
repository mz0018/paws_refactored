import React from 'react'

type FormProps = React.FormHTMLAttributes<HTMLFormElement>

export const Form = ({ className = '', ...props }: FormProps) => {
  return (
    <form
      {...props}
      className={`w-full max-w-lg flex flex-col gap-4 sm:gap-5 ${className}`}
    />
  )
}