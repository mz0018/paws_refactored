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
}

const fetchAppointments = async ({ month, year }: GetAppointmentParams): Promise<AppointmentProps[]> => {

    const params = new URLSearchParams()
    if (month) {
        params.set('month', String(month))
    }

    if (year) {
        params.set('year', String(year))
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/appointments/?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch appointments')
    }

    const data = await res.json()
    return data.appointments
}

export const useGetAppointments = (month?: number, year?: number) => {
    return useQuery({
        queryKey: ['appointments', month, year],
        queryFn: () => fetchAppointments({ month, year }),
        staleTime: 5 * 60 * 1000,
    })
}
