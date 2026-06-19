import { Select } from '../ui/form/Select'
interface FilterByProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value: string
    options?: readonly string[]
    placeholder?: string
    label?: string
}

export const FilterBy = ({ onChange, value, options, placeholder, label }: FilterByProps) => {
    return (
        <Select
            label={label}
            value={value}
            onChange={onChange}
            className="p-2 border rounded-sm capitalize"
        >
            <option value="">{placeholder || 'All Categories'}</option>

            {options?.map(opt => (
                <option key={opt} value={opt} className="">
                    {opt}
                </option>
            ))}
        </Select>
    )
}