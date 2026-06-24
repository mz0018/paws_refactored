import { Input } from '../ui/form/Input'

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
        <Input
            label={label} 
            type='text'
            placeholder={placeholder}
            value={value} 
            onChange={onChange}
            className="w-full placeholder:text-text-body"
            rightIcon={icon}
        />
    ) 
}