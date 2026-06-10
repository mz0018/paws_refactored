import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

export const PaginationUI = ({ page, totalPages, onPageChange, className = '' }: PaginationProps) => {
    if (totalPages <= 1) return null

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <button
                onClick={
                    () => onPageChange(Math.max(1, page - 1))
                }
                disabled={page === 1}
                className="px-2 py-1 cursor-pointer disabled:opacity-50"
            >
                <ChevronLeft size={16} color="gray" />
            </button>

            <span className="px-3 py-1 text-sm text-text-body whitespace-nowrap">
                Page {page} of {totalPages}
            </span>

            <button
                onClick={
                    () => onPageChange(Math.min(totalPages, page + 1))
                }
                disabled={page === totalPages}
                className="px-2 py-1 cursor-pointer disabled:opacity-50"
            >
                <ChevronRight size={16} color="gray" />
            </button>
        </div>
    )
}