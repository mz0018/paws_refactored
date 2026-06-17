type AppointmentFormData = {
    name: string
    purpose: string
    selectedDate: string
    selectedTime: string
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
        const today = new Date()
        const todayStr = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, '0'),
            String(today.getDate()).padStart(2, '0')
        ].join('-')

        if (formData.selectedDate < todayStr) {
            errors.selectedDate = 'Please select a future date'
        }
    }

    if (!formData.purpose.trim()) {
        errors.purpose = 'Purpose is required'
    } else if (formData.purpose.trim().length > 100) {
        errors.purpose = 'Purpose must not exceed 100 characters'
    }

    return errors
}