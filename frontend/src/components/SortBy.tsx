import { Select } from '../ui/form/Select'

interface SortOption {
    value: string
    label: string
}

interface SortByProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value: string
    options?: readonly SortOption[]
    placeholder?: string
    label?: string
}

export const SortBy = ({ onChange, value, options, placeholder, label }: SortByProps) => {
    return (
        <Select label={label} value={value} onChange={onChange}>
            <option value="">{placeholder || 'Default'}</option>
            {options?.map(opt => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </Select>
    )
}