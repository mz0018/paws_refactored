import { useState } from 'react'
import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'
import { Loader } from '../Loader'

type AppointmentProps = {
    _id: string
    name: string
    purpose: string
    selectedDate: string
    selectedTime: string
}

type FollowUpModalProps = {
    isOpen: boolean
    onClose: () => void
    appointment: AppointmentProps | null
    onSubmit: (appointmentId: string, reason: string) => Promise<void>
    isLoading?: boolean
}

export const FollowUpModal = ({
    isOpen,
    onClose,
    appointment,
    onSubmit,
    isLoading
}: FollowUpModalProps) => {
    const [reason, setReason] = useState('')

    if (!appointment) return null

    const handleSubmit = () => {
        onSubmit(appointment._id, reason)
    }

    const handleClose = () => {
        setReason('')
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} closeOnBackdrop={false}>
            <div className="p-3 sm:p-4 text-text-body">
                <h2 className="text-xl font-bold mb-4 text-footer-bg leading-tight">
                    Schedule <span className="text-btn-black-bg">Follow-Up</span>
                </h2>

                <div className="mb-4">
                    <p>
                        <span className="font-semibold capitalize">Client:</span> {appointment.name}
                    </p>

                    <p>
                        <span className="font-semibold capitalize">Purpose:</span> {appointment.purpose}
                    </p>

                    <p>
                        <span className="font-semibold">Scheduled:</span>{" "}
                        {new Date(appointment.selectedDate).toLocaleDateString("en-US", {
                                weekday: "short",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })} at {new Date(`1970-01-01T${appointment.selectedTime}`).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })} 
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                        Reason for Follow-Up
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter the reason for this follow-up..."
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-btn-black-bg/20 focus:border-btn-black-bg resize-none"
                    />
                </div>

                <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !reason.trim()}
                    className="bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white w-full transition-colors mb-2 disabled:opacity-50"
                >
                    {isLoading ? <Loader size="sm" fullScreen={false} /> : 'Submit Follow-Up'}
                </Button>

                <Button
                    onClick={handleClose}
                    disabled={isLoading}
                    className="text-text-body border border-gray-400 font-semibold bg-none w-full hover:bg-gray-50"
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}
