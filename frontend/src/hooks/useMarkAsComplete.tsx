import { useState } from 'react'

export const useMarkAsComplete = (orderId: string) => {

    const [isMarkLoading, setIsMarkLoading] = useState<boolean>(false)
    const [hasError, setHasError] = useState<{
        orderId?: string
        general?: string
    }>({})

    const handleMarkAsComplete = async () => {

        if (!orderId) {
            setHasError({ orderId: 'Order ID not found.' })
        }

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