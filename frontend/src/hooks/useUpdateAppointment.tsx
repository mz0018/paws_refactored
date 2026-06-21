import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

type AppointmentStatus = 'mark-done' | 'follow-up'

export const useUpdateAppointment = () => {
    const queryClient = useQueryClient()
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

        queryClient.setQueriesData(
            { queryKey: ['appointments'] },
            (oldData: any) => {
                if (!oldData) return oldData
                return {
                    ...oldData,
                    appointments: oldData.appointments.filter(
                        (appointment: any) => appointment._id !== appointmentId
                    ),
                    total: oldData.total - 1,
                }
            }
        )

    }

    return { handleUpdateAppointment, statusLoading }
}