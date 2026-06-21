import { useState } from 'react'

type AppointmentStatus = 'mark-done' | 'follow-up'

export const useUpdateAppointment = () => {
    const [statusLoading, setStatusLoading] = useState(false)

    const updateStatus = async (appointmentId: string, status: AppointmentStatus): Promise<boolean> => {
        setStatusLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/appointment/${status}/${appointmentId}`, {
                method: 'PATCH',
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error('Failed to update appointment')
            }

            return true
        } catch (error) {
            console.error('Failed to update appointment:', error)
            return false
        } finally {
            setStatusLoading(false)
        }
    }

    const handleUpdateAppointment = async (appointmentId: string, status: AppointmentStatus) => {
        const success = await updateStatus(appointmentId, status)

        if (!success) return

    }

    return { handleUpdateAppointment, statusLoading }
}