import { useQuery } from '@tanstack/react-query'

type OrderItems = {
    product: {
        _id: string
        productName: string
        productPrice: number
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
    updatedAt: string
}

type IdFromModalProps = {
    id_from_modal: string
}

const fetchOrderById = async (id: string): Promise<OrderData> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/order/${id}/view`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error('Failed to fetch this order')
    }

    return response.json()
}

export const useGetOrderById = ({ id_from_modal }: IdFromModalProps) => {
    const { data: orderData, isLoading } = useQuery({
        queryKey: ['order', id_from_modal],
        queryFn: () => fetchOrderById(id_from_modal),
        enabled: !!id_from_modal,
        staleTime: Infinity,
    })

    return { isLoading, orderData: orderData ?? null }
}
