import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CircleCheckBig } from 'lucide-react'

export const useMarkAsComplete = (orderId: string) => {

    const queryClient = useQueryClient()

    const [isMarkLoading, setIsMarkLoading] = useState<boolean>(false)
    const [hasError, setHasError] = useState<{
        orderId?: string
        general?: string
    }>({})

    const handleMarkAsComplete = async () => {

        if (!orderId) {
            setHasError({ orderId: 'Order ID not found.' })
        }

        toast.custom(() => (
            <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-4 border-l-4 border-btn-black-bg min-w-[300px]">
                <CircleCheckBig
                    size={24}
                    className="text-btn-black-bg"
                />

                <div>
                    <p className="font-semibold text-text-body">
                        {orderId}
                    </p>

                    <p className="text-sm text-gray-500">
                        Marked as complete
                    </p>
                </div>
            </div>
        ))

        setIsMarkLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/order/${orderId}/complete`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                }
            )

            if (res.ok) {
                setHasError({})
                const data = await res.json()
                console.table(data)
                queryClient.invalidateQueries({ queryKey: ['order', orderId] })
            } else {
                alert('Error on backend')
            }

        } catch (error) {
            setHasError({ general: 'Something went wrong. Please try again later.' })
            console.error('Error updating status of order: ', error)
        } finally {
            setIsMarkLoading(false)
        }
    }

    return { handleMarkAsComplete, isMarkLoading, hasError }
}