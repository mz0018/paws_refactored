import React from 'react'
import { PRODUCT_CATEGORIES } from '../../mocks/categories'
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    error?: string
}
export const Select = ({ className = '', error, ...props }: SelectProps) => {
    return (
        <select
            {...props}
            className={`p-4 rounded-sm focus:outline-none border
                ${error ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-500'}
                ${className}`}
        >
            <option value=''>Select Category</option>
            {PRODUCT_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
            ))}
        </select>
    )
}