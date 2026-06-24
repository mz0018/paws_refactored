import React, { forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string
    label?: string
    rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', error, label, rightIcon, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}

                <div className="relative">
                    <input
                        ref={ref}
                        {...props}
                        className={`
                            w-full
                            px-4
                            py-3
                            rounded-sm
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
                            hover:border-btn-black-bg
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            ${rightIcon ? 'pr-8' : ''}
                            ${
                                error
                                    ? 'border-red-500 text-red-500 focus:ring-red-500/20 focus:border-red-500'
                                    : 'border-gray-200 focus:border-btn-black-bg focus:ring-btn-black-bg/20 focus:placeholder:text-gray-200'
                            }
                            ${className}
                        `}
                    />

                    {rightIcon && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            {rightIcon}
                        </div>
                    )}
                </div>

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