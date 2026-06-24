import { useQuery } from '@tanstack/react-query'

type FollowUpCheckupProps = {
    _id: string
    name: string
    purpose: string
    selectedDate: string
    selectedTime: string
    followUpReason?: string | null
}

type FollowUpResponse = {
    appointments: FollowUpCheckupProps[]
    total: number
    page: number
    limit: number
    totalPages: number
}

const fetchFollowUpCheckups = async (page: number, limit: number, search: string): Promise<FollowUpResponse> => {
    const params = new URLSearchParams()
    params.set('page', String(page))
    params.set('limit', String(limit))
    if (search) params.set('search', search)

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/follow-up-checkups?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch follow-up checkups')
    }

    return res.json()
}

export const useGetFollowUpCheckup = (page = 1, search = '', limit = 10) => {
    return useQuery({
        queryKey: ['follow-up-checkups', page, search],
        queryFn: () => fetchFollowUpCheckups(page, limit, search),
        placeholderData: (previousData) => previousData,
        staleTime: 5 * 60 * 1000,
    })
}
