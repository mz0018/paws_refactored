import React from 'react'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: string
}

export const Textarea = ({ className = '', error, ...props }: TextareaProps) => {
    return (
        <textarea
            {...props}
            className={`p-4 rounded-sm focus:outline-none w-full
            ${error ? 'border-red-500 border text-red-500' : 'border-gray-300 border text-gray-500'}
            ${className}`}
        />
    )
}