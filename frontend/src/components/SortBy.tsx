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
}

export const SortBy = ({ onChange, value, options, placeholder }: SortByProps) => {
    return (
        <Select value={value} onChange={onChange}>
            <option value="">{placeholder || 'Default'}</option>
            {options?.map(opt => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </Select>
    )
}