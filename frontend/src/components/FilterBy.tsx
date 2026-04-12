import { PRODUCT_CATEGORIES } from '../mocks/categories'

interface FilterByProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value: string
}

export const FilterBy = ({ onChange, value }: FilterByProps) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className="p-2 border rounded-md"
        >
            <option value="">All Categories</option>

            {PRODUCT_CATEGORIES.map(category => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    )
}