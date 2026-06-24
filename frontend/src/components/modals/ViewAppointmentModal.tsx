import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'

type AppointmentData = {
    _id: string
    name: string
    purpose: string
}

type ViewAppointmentModalProps = {
    isOpen: boolean
    onClose: () => void
    appointment: AppointmentData | null
}

export const ViewAppointmentModal = ({ isOpen, onClose, appointment }: ViewAppointmentModalProps) => {

    if (!appointment) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false}>
            <div className="p-3 sm:p-4 text-text-body">
                <h2>Details</h2>
                <p>{appointment.name}</p>
                <p>{appointment.purpose}</p>
                <span>{appointment._id}</span>
            </div>
            <Button 
                onClick={onClose}
                className="text-text-body border border-gray-400 font-semibold bg-none w-full hover:bg-gray-50"
            >
                Close
            </Button>
        </Modal>
    )
}