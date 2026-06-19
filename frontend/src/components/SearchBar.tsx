import { Input } from '../ui/form/Input'
import React from 'react'

interface SearchBarProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    placeholder?: string
    icon?: React.ReactNode
    label?: string
}

export const SearchBar = ({ 
    onChange, 
    value, 
    placeholder = 'Search...', 
    icon,
    label 
}: SearchBarProps) => {

    return (
        <div className="relative w-full">
            {icon && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    {icon}
                </div>
            )}

            <Input
                label={label} 
                type='text'
                placeholder={placeholder}
                value={value} 
                onChange={onChange}
                className={`w-full ${icon ? 'pr-8' : ''} placeholder:text-text-body`}
            />
        </div>
    ) 
}