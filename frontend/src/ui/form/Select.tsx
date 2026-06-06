type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    error?: string
    label?: string
    children: React.ReactNode
}

export const Select = ({
    className = '',
    error,
    label,
    children,
    ...props
}: SelectProps) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative">
                <select
                    {...props}
                    className={`
                        w-full
                        appearance-none
                        px-4
                        py-3
                        pr-10
                        rounded-xl
                        border
                        bg-white
                        text-sm
                        shadow-sm
                        transition-all
                        duration-200
                        focus:outline-none
                        focus:ring-4
                        hover:border-btn-black-bg
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        ${
                            error
                                ? 'border-red-500 text-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-gray-200 text-gray-700 focus:border-btn-black-bg focus:ring-btn-black-bg/20'
                        }
                        ${className}
                    `}
                >
                    {children}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    )
}