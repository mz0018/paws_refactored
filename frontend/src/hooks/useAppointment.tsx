import { useState } from 'react'
import { AppointmentValidator } from '../utils/AppointmentValidator'

type AppointmentFormData = {
    name: string
    purpose: string
    selectedDate: string
}

type AppointmentErrors = {
    name?: string
    purpose?: string
    selectedDate?: string
    general?: string
}

export const useAppointment = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [hasErrors, setHasErrors] =
        useState<AppointmentErrors>({})

    const [formData, setFormData] =
        useState<AppointmentFormData>({
            name: '',
            purpose: '',
            selectedDate: ''
        })

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
        setFormData((prev) => ({
            ...prev,
            selectedDate: date ? date.toISOString() : ''
        }))

        setHasErrors((prev) => ({
            ...prev,
            selectedDate: ''
        }))
    }

    const resetForm = () => {
        setFormData({ name: '', purpose: '', selectedDate: '' })
        setHasErrors({})
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        const newErrors = AppointmentValidator(formData)

        if (Object.keys(newErrors).length > 0) {
            setHasErrors(newErrors)
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointment/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
        
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                resetForm()
            }
        } catch (err) {
            setHasErrors({ general: 'Something went wrong' })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return { formData, hasErrors, isLoading, handleChange, handleDateChange, handleSubmit }
}