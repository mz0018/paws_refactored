import { useState, useEffect } from 'react'

type OrderItems = {
    product: {
        _id: string
        name: string
        price: number
    }
    quantity: number
    subtotal: number
    createdBy: string
}

type OrderData = {
    _id: string
    items: OrderItems[]
    status: string
    completedAt: string | null
    createdAt: string
}

type IdFromModalProps = {
    id_from_modal: string
    isOpen: boolean
}

export const useGetOrderById = ({ id_from_modal, isOpen }:IdFromModalProps ) => {

    const [orderData, setOrderData] = useState<OrderData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleFetch = async () => {
        if (!id_from_modal) {
            setOrderData(null)
            setIsLoading(false)
        }
        setIsLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/order/${id_from_modal}/view`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            
            if (!response.ok) {
                throw new Error('Failed to fetch this order')
            }

            const data = await response.json()

            setOrderData(data)

        } catch (error) {
            console.error('Something went wrong', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen && id_from_modal) {
            handleFetch()
        } else {
            setOrderData(null)
        }
    }, [id_from_modal, isOpen])
    
    return { isLoading, orderData }
}