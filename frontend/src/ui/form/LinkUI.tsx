import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

export const LinkUI = ({ className = '', ...props }: LinkProps) => {
    return (
        <Link
            {...props}
            className={`inline-block p-4 rounded-sm border bg-blue-500 text-white hover:bg-blue-700 w-1/2 text-center ${className}`}
        />
    )
}