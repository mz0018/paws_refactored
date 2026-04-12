type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    error?: string
    children: React.ReactNode
}

export const Select = ({ className = '', error, children, ...props }: SelectProps) => {
    return (
        <select
            {...props}
            className={`p-4 rounded-sm focus:outline-none border
                ${error ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-500'}
                ${className}`}
        >
            {children}
        </select>
    )
}