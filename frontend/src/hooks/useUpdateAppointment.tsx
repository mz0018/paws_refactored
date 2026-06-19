type AppointmentStatus = 'mark-done' | 'follow-up'

export const useUpdateAppointment = () => {
    const handleUpdateAppointment = (status: AppointmentStatus) => {
        switch (status) {
            case 'mark-done':
                // logic
                alert('Appointment done')
                break

            case 'follow-up':
                // logic
                alert('To be followed')
                break
        }
    }

    return { handleUpdateAppointment }
}