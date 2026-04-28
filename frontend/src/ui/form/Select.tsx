type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    error?: string
    label?: string
    children: React.ReactNode
}

export const Select = ({ className = '', error, label, children, ...props }: SelectProps) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label className="font-semibold text-sm text-gray-600 mb-1">
                    {label}
                </label>
            )}

            <select
                {...props}
                className={`p-4 rounded-sm focus:outline-none border
                    ${error ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-500'}
                    ${className}`}
            >
                {children}
            </select>
        </div>
    )
}