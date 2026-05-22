import React, { forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string
    label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', error, label, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    {...props}
                    className={`
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        bg-white
                        text-sm
                        text-gray-700
                        placeholder:text-gray-400
                        shadow-sm
                        transition-all
                        duration-200
                        focus:outline-none
                        focus:ring-4
                        hover:border-gray-400
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        ${
                            error
                                ? 'border-red-500 text-red-500 focus:ring-red-500/20 focus:border-red-500'
                                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                        }
                        ${className}
                    `}
                />

                {error && (
                    <span className="text-sm text-red-500">
                        {error}
                    </span>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'