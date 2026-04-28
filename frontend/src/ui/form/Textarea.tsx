import React from 'react'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: string
    label?: string
}

export const Textarea = ({ className = '', error, label, ...props }: TextareaProps) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label className="text-sm text-gray-600 mb-1">
                    {label}
                </label>
            )}

            <textarea
                {...props}
                className={`p-4 rounded-sm focus:outline-none w-full
                ${error ? 'border-red-500 border text-red-500' : 'border-gray-300 border text-gray-500'}
                ${className}`}
            />
        </div>
    )
}