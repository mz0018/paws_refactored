import { CircleAlert } from 'lucide-react'

type NotFoundProps = {
    label?: string
    childLabel?: string
}

export const NotFound = ({ label, childLabel }: NotFoundProps) => {
    return (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center max-w-sm sm:max-w-md">
                <CircleAlert className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700">
                    {label}
                </p>

                <p className="text-sm sm:text-base text-gray-400">
                    {childLabel}
                </p>
            </div>
        </div>
    )
}