import { useEffect, useState } from 'react'

type AppointmentProps = {
    _id: string
    name: string
    purpose: string
    selectedDate: string
    selectedTime: string
}

export const useGetAppointments = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [list, setList] = useState<AppointmentProps[]>([])

    const handleGet = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/appointments/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            if (!res.ok) {
                throw new Error('Failed to fetch appointments')
            }
            const data = await res.json()
            setList(data.appointments)
        } catch (err) {
            console.error('Failed to fetch appointments', err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleGet()
    }, [])

    return { isLoading, list }
}