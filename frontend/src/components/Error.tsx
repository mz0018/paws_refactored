import { CircleX } from 'lucide-react'

type ErrorProps = {
    label?: string
}

export const Error = ({ label }: ErrorProps) => {
    return (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center max-w-sm sm:max-w-md">
                <CircleX className="mx-auto mb-4 text-red-500" size={48} />

                <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700">
                    {label || "Something went wrong."}
                </p>

                <p className="mt-2 text-sm sm:text-base text-gray-400">
                    We’re sorry for the inconvenience. Please refresh the page or try again later.
                </p>
            </div>
        </div>
    )
}