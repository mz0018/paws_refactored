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
            console.log(formData)
            console.log('Sent 200')
            resetForm()
        } catch (err) {
            setHasErrors({ general: 'Something went wrong' })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return { formData, hasErrors, isLoading, handleChange, handleSubmit }
}