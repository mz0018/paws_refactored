import { AlarmClockCheck } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { AppointmentValidator } from '../utils/AppointmentValidator'

import { toast } from 'sonner'

type AppointmentFormData = {
    name: string
    purpose: string
    selectedDate: string
    selectedTime: string
}

type AppointmentErrors = {
    name?: string
    purpose?: string
    selectedDate?: string
    general?: string
}

type BookedSlot = { 
    date: string; 
    time: string;
}

const fetchBookedSlots = async (): Promise<BookedSlot[]> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointment/booked-slots`)

    if (!res.ok) {
        return []
    }

    return res.json()
}

export const useAppointment = () => {

    const queryClient = useQueryClient()

    const [isRateLimited, setIsRateLimited] = useState<boolean>(false)
    const [hasErrors, setHasErrors] =
        useState<AppointmentErrors>({})

    const [formData, setFormData] =
        useState<AppointmentFormData>({
            name: '',
            purpose: '',
            selectedDate: '',
            selectedTime: ''
        })

    const { data: bookedSlots = [] } = useQuery({
        queryKey: ['booked-slots'],
        queryFn: fetchBookedSlots,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    })

    const bookedTimesSet = useMemo(() => {
        const set = new Set<string>()
        for (const slot of bookedSlots) {
            set.add(`${slot.date} ${slot.time}`)
        }
        return set
    }, [bookedSlots])

    const filterTime = useCallback((time: Date) => {
        const y = time.getFullYear()
        const m = String(time.getMonth() + 1).padStart(2, '0')
        const d = String(time.getDate()).padStart(2, '0')
        const hh = String(time.getHours()).padStart(2, '0')
        const mm = String(time.getMinutes()).padStart(2, '0')
        const key = `${y}-${m}-${d} ${hh}:${mm}`
        return !bookedTimesSet.has(key)
    }, [bookedTimesSet])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setHasErrors((prev) => ({
            ...prev,
            [name]: ''
        }))
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
             const y = date.getFullYear()
             const mo = String(date.getMonth() + 1).padStart(2, '0')
             const d = String(date.getDate()).padStart(2, '0')
             const h = String(date.getHours()).padStart(2, '0')
             const mi = String(date.getMinutes()).padStart(2, '0')

             setFormData(prev => ({
                ...prev,
                selectedDate: `${y}-${mo}-${d}`,
                selectedTime: `${h}:${mi}`
             }))
        } else {
            setFormData(prev => ({
                ...prev,
                selectedDate: '',
                selectedTime: ''
            }))
        }
        setHasErrors(prev => ({ ...prev, selectedDate: '' }))
    }

    const resetForm = () => {
        setFormData({ name: '', purpose: '', selectedDate: '', selectedTime: '' })
        setHasErrors({})
    }

    const mutation = useMutation({
        mutationFn: async (data: AppointmentFormData) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointment/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                if (res.status === 429) {
                    throw { status: 429, message: 'Rate limited' }
                }
                throw new Error('Something went wrong')
            }

            return res.json()
        },
        onSuccess: () => {
            toast.custom(() => (
                <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-4 border-l-4 border-btn-black-bg min-w-[300px]">
                    <AlarmClockCheck size={24} className="text-btn-black-bg" />
                    <div>
                        <p className="font-semibold text-text-body">Appointment Scheduled</p>
                        <p className="text-sm text-gray-500">Your appointment has been successfully booked.</p>
                    </div>
                </div>
            ))
            resetForm()
            queryClient.invalidateQueries({ queryKey: ['booked-slots'] })
        },
        onError: (error) => {
            if ((error as any)?.status === 429) {
                setIsRateLimited(true)
                setHasErrors({
                    general: 'You\'ve reached your limit of 1 appointment attempts for today. Please try again tomorrow.'
                })
            } else {
                setHasErrors({ general: 'Something went wrong' })
                console.error(error)
            }
        }
    })

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {

        e.preventDefault()

        const newErrors = AppointmentValidator(formData)

        if (Object.keys(newErrors).length > 0) {
            setHasErrors(newErrors)
            return
        }

        mutation.mutate(formData)
    }

    return { formData, hasErrors, isLoading: mutation.isPending, filterTime, isRateLimited, handleChange, handleDateChange, handleSubmit }
}
