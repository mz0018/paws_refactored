import { useQuery } from '@tanstack/react-query'

type FollowUpCheckupProps = {
    _id: string
    name: string
    purpose: string
    selectedDate: string
    selectedTime: string
}

type FollowUpResponse = {
    appointments: FollowUpCheckupProps[]
    total: number
    page: number
    limit: number
    totalPages: number
}

const fetchFollowUpCheckups = async (page: number, limit: number): Promise<FollowUpResponse> => {
    const params = new URLSearchParams()
    params.set('page', String(page))
    params.set('limit', String(limit))

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

export const useGetFollowUpCheckup = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ['follow-up-checkups', page],
        queryFn: () => fetchFollowUpCheckups(page, limit),
        placeholderData: (previousData) => previousData,
        staleTime: 5 * 60 * 1000,
    })
}
