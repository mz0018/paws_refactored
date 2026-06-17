import { useQuery } from '@tanstack/react-query'

type AppointmentProps = {
    _id: string
    name: string
    purpose: string
    selectedDate: string
    selectedTime: string
}

const fetchAppointments = async (): Promise<AppointmentProps[]> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/appointments/`, {
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

export const useGetAppointments = () => {
    return useQuery({
        queryKey: ['appointments'],
        queryFn: fetchAppointments,
        staleTime: 5 * 60 * 1000,
    })
}
