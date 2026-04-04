type ErrorProps = {
    message?: string
}

export const ErrorText = ({ message }: ErrorProps) => {
    if (!message) return null

    return (
        <small className='text-red-500'>{message}</small>
    )
}