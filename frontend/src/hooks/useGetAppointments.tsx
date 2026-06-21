import { useQuery } from '@tanstack/react-query'

type AppointmentProps = {
    _id: string
    name: string
    purpose: string
    selectedDate: string
    selectedTime: string
}

type GetAppointmentParams = {
    month?: number
    year?: number
    limit?: number
    page?: number
    status?: string
}

type AppointmentsResponse = {
    appointments: AppointmentProps[]
    total: number
    page: number
    limit: number
    totalPages: number
}

const fetchAppointments = async (params: GetAppointmentParams): Promise<AppointmentsResponse> => {
    const paramsObj = new URLSearchParams()
    if (params.month) paramsObj.set('month', String(params.month))
    if (params.year) paramsObj.set('year', String(params.year))
    if (params.limit) paramsObj.set('limit', String(params.limit))
    if (params.page) paramsObj.set('page', String(params.page))
    if (params.status) paramsObj.set('status', String(params.status))

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/appointments/?${paramsObj}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch appointments')
    }

    return res.json()
}

export const useGetAppointments = (month?: number, year?: number, page = 1, limit = 10, status?: string) => {
    return useQuery({
        queryKey: ['appointments', month, year, page],
        queryFn: () => fetchAppointments({ month, year, page, limit, status }),
        placeholderData: (previousData) => previousData,
        staleTime: 5 * 60 * 1000,
    })
}
