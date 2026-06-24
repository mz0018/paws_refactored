import { useState } from 'react'
import { toast } from 'sonner'
import { CircleCheckBig } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

type AppointmentStatus = 'mark-done' | 'follow-up'

export const useUpdateAppointment = () => {
    const queryClient = useQueryClient()
    const [statusLoading, setStatusLoading] = useState(false)

    const updateStatus = async (
        appointmentId: string,
        status: AppointmentStatus,
        reason?: string
    ): Promise<boolean> => {
        toast.custom(() => (
            <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-4 border-l-4 border-btn-black-bg min-w-[300px]">
                <CircleCheckBig
                    size={24}
                    className="text-btn-black-bg"
                />

                <div>
                    <p className="font-semibold text-text-body">
                        {appointmentId}
                    </p>

                    <p className="text-sm text-gray-500">
                        Marked as {status}
                    </p>
                </div>
            </div>
        ))

        setStatusLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/appointment/${status}/${appointmentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: reason ? JSON.stringify({ followUpReason: reason }) : undefined
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

    const handleUpdateAppointment = async (
        appointmentId: string,
        status: AppointmentStatus,
        reason?: string
    ) => {
        const success = await updateStatus(appointmentId, status, reason)

        if (!success) return

        const removeFromCache = (oldData: any) => {
            if (!oldData) return oldData
            return {
                ...oldData,
                appointments: oldData.appointments.filter(
                    (appointment: any) => appointment._id !== appointmentId
                ),
                total: oldData.total - 1,
            }
        }

        queryClient.setQueriesData(
            { queryKey: ['appointments'] },
            removeFromCache
        )

        queryClient.setQueriesData(
            { queryKey: ['follow-up-checkups'] },
            removeFromCache
        )

    }

    return { handleUpdateAppointment, statusLoading }
}
