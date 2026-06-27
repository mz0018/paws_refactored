import { useQuery } from '@tanstack/react-query'

export type DetailedAppointment = {
    _id: string
    name: string
    purpose: string
    selectedDate: string
    selectedTime: string
    status: string
    followUpReason?: string[] | null
    completedAt?: string | null
}

const fetchDetailedAppointment = async (id: string): Promise<DetailedAppointment> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/appointment/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch appointment')
    }

    return res.json()
}

export const useGetDetailedAppointment = (id: string | null) => {
    return useQuery({
        queryKey: ['appointment', id],
        queryFn: () => fetchDetailedAppointment(id!),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    })
}
