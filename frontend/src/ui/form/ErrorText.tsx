type ErrorProps = {
    message?: string
}

export const ErrorText = ({ message }: ErrorProps) => {
    if (!message) return null

    return (
        <small className='border border-red-500 p-2  rounded  bg-red-50 text-red-500'>{message}</small>
    )
}