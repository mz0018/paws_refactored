export const useGetOrderByUserId = () => {
    const handleGetOrderByUserId = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/get-order`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (!response.ok) throw new Error('Failed to fetch orders')
        return response.json()
    }

    return { handleGetOrderByUserId }
}