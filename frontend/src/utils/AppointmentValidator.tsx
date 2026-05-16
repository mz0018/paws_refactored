type AppointmentFormData = {
    name: string
    purpose: string
    selectedDate: string
}

export const AppointmentValidator = (formData: AppointmentFormData) => {

    const errors: Partial<AppointmentFormData> = {}

    if (!formData.name.trim()) {
        errors.name = 'Name is required'
    } else if (formData.name.trim().length > 50) {
        errors.name = 'Name must not exceed 50 characters'
    }

    if (!formData.selectedDate.trim()) {
        errors.selectedDate = 'Date is required'
    } else {
        const selectedDate = new Date(formData.selectedDate)
        const currentDate = new Date()

        if (selectedDate < currentDate) {
            errors.selectedDate = 'Please select a future date and time'
        }
    }

    if (!formData.purpose.trim()) {
        errors.purpose = 'Purpose is required'
    } else if (formData.purpose.trim().length > 100) {
        errors.purpose = 'Purpose must not exceed 100 characters'
    }

    return errors
}