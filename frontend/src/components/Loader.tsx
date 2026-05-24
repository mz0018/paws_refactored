type LoaderProps = {
    label?: string
}

export const Loader = ({ label }: LoaderProps) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <main className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />

                {label && (
                    <p className="text-sm text-gray-600 font-medium">
                        {label}
                    </p>
                )}
            </main>
        </div>
    )
}