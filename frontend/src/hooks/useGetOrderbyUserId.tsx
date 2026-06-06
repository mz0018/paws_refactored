type GetOrderParams = {
    limit?: number
    page?: number
}

export const useGetOrderByUserId = () => {
    const handleGetOrderByUserId = async (params: GetOrderParams = {}) => {

        const query = new URLSearchParams()

        if (params.limit) {
            query.set('limit', params.limit.toString())
        }

        if (params.page) {
            query.set('page', params.page.toString())
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

    return { handleGetOrderByUserId }
}