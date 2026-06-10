import { useState } from 'react'

export const useMarkAsComplete = (orderId: string) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleMarkAsComplete = () => {
        setIsLoading(true)
        try {
            alert(orderId)
        } catch (err) {

        } finally {
            setIsLoading(false)
        }
    }

    return { handleMarkAsComplete, isLoading }
}