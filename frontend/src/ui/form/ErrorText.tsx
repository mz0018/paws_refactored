import { CircleAlert } from 'lucide-react'

type ErrorProps = {
    message?: string
}

export const ErrorText = ({ message }: ErrorProps) => {
    if (!message) return null

    return (
        <div className="bg-red-50 p-2 flex items-center gap-2 text-red-500 tracking-wide font-semibold rounded">
            <CircleAlert size={18} />
            <small>{message}</small>
        </div>
    )
}