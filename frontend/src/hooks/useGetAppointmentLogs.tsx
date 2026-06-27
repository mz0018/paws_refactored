import { useQuery } from '@tanstack/react-query'

export type AppointmentLog = {
    _id: string
    appointmentId: {
        _id: string
        name: string
        purpose: string
        selectedDate: string
        selectedTime: string
    }
    action: 'created' | 'follow-up_added' | 'completed'
    previousStatus: string | null
    newStatus: string | null
    followUpReason: string | null
    performedBy: { _id: string; userName: string } | null
    createdAt: string
}

type LogsResponse = {
    logs: AppointmentLog[]
    total: number
    page: number
    limit: number
    totalPages: number
}

const fetchLogs = async (page: number, limit: number): Promise<LogsResponse> => {
    const params = new URLSearchParams()
    params.set('page', String(page))
    params.set('limit', String(limit))

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/appointment-logs?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch appointment logs')
    }

    return res.json()
}

export const useGetAppointmentLogs = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ['appointment-logs', page],
        queryFn: () => fetchLogs(page, limit),
        placeholderData: (previousData) => previousData,
        staleTime: 5 * 60 * 1000,
    })
}
