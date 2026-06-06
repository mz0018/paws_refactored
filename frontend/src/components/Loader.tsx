type LoaderProps = {
    label?: string
    size?: 'sm' | 'md' | 'lg'
    fullScreen?: boolean
}

const SPINNER_SIZES = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-10 w-10 border-4'
}

export const Loader = ({ label, size = 'lg', fullScreen = true }: LoaderProps) => {

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className={`animate-spin ${SPINNER_SIZES[size]} border-btn-black-bg border-t-transparent rounded-full`} />
            {label && (
                <p className="text-sm text-text-body font-medium">{label}</p>
            )}
        </div>
    )

    if (fullScreen) {
        return (
            <div className="flex min-h-screen bg-gray-100">
                <main className="flex-1 flex flex-col items-center justify-center">{spinner}</main>
            </div>
        )
    }

    return spinner
}