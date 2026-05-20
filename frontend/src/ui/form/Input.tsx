import React, { forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string
    label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', error, label, ...props }, ref) => {
        return (
            <div className="flex flex-col">
                {label && (
                    <label className="font-semibold text-sm text-gray-600 mb-1">
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    {...props}
                    className={`p-4 rounded-sm bg-white focus:outline-none
                    ${error ? 'border-red-500 border text-red-500' : 'border-gray-300 border text-gray-500'}
                    ${className}`}
                />
            </div>
        )
    }
)