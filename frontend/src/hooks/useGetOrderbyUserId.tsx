import { useQuery } from '@tanstack/react-query'

type GetOrderParams = {
    limit?: number
    page?: number
    search?: string
}

const fetchOrders = async (params: GetOrderParams) => {
    
    const query = new URLSearchParams()

    if (params.limit) {
        query.set('limit', params.limit.toString())
    }

    if (params.page) {
        query.set('page', params.page.toString())
    }

    if (params.search) {
        query.set('search', params.search)
    }

    const qs = query.toString()
    const url = `${import.meta.env.VITE_API_URL}/api/admin/get-order?${qs}`

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error('Failed to fetch orders')
    }

    return response.json()

}

export const useGetOrderByUserId = (limit = 10, page = 1, search = '') => {
    return useQuery({
        queryKey: ['orders', page, search],
        queryFn: () => fetchOrders({ limit, page, search }),
        placeholderData: (previousData) => previousData,
        staleTime: 5 * 60 * 1000,
    })
}
