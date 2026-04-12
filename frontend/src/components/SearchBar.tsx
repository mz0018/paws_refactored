import { Input } from '../ui/form/Input'

interface SearchBarProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

export const SearchBar = ({ onChange, value }: SearchBarProps) => {

    return (
        <Input 
            type='text'
            placeholder='Search product by name'
            value={value} 
            onChange={onChange} />
    ) 
}