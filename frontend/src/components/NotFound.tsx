type NotFoundProps = {
    label?: string
}

export const NotFound = ({ label }: NotFoundProps) => {
    return (
        <div className="flex items-center justify-center px-4 py-16 sm:py-20 md:py-24">
            <div className="text-center max-w-sm sm:max-w-md">
                <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700">
                    No {label} Found
                </p>

                <p className="mt-2 text-sm sm:text-base text-gray-400">
                    Try adjusting your search or filters
                </p>
            </div>
        </div>
    )
}