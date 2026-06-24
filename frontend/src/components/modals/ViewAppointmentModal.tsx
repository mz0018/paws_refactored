import { Modal } from '../../ui/form/Modal'
import { Button } from '../../ui/form/Buttons'
import { Loader } from '../Loader'
import { Error } from '../Error'
import { useGetDetailedAppointment } from '../../hooks/useGetDetailedAppointment'

type ViewAppointmentModalProps = {
    isOpen: boolean
    onClose: () => void
    appointmentId: string | null
}

export const ViewAppointmentModal = ({ isOpen, onClose, appointmentId }: ViewAppointmentModalProps) => {
    const { data: appointment, isLoading, isError, error } = useGetDetailedAppointment(appointmentId)

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false}>
            <div className="p-3 sm:p-4 text-text-body">
                <h2 className="text-xl font-bold mb-4 text-footer-bg leading-tight">
                    Appointment <span className="text-btn-black-bg">Details</span>
                </h2>

                {isLoading && <Loader label="Loading appointment..." />}

                {isError && <Error label={(error as Error)?.message ?? 'Failed to load appointment'} />}

                {appointment && (
                    <div className="space-y-3 mb-4 text-sm">
                        <div>
                            <span className="font-semibold">Appointment ID: </span>
                            <span className="text-gray-600 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {appointment._id}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold">Name: </span>
                            <span className="text-gray-600">{appointment.name}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Purpose: </span>
                            <span className="text-gray-600 capitalize">{appointment.purpose}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Date Scheduled: </span>
                            <span className="text-gray-600">
                                {new Date(appointment.selectedDate).toLocaleDateString("en-US", {
                                    weekday: "short", year: "numeric", month: "long", day: "numeric"
                                })}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold">Time Scheduled: </span>
                            <span className="text-gray-600">
                                {new Date(`1970-01-01T${appointment.selectedTime}`).toLocaleTimeString("en-US", {
                                    hour: "numeric", minute: "2-digit", hour12: true
                                })}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold">Status: </span>
                            <span className="text-gray-600 capitalize">{appointment.status}</span>
                        </div>
                        {appointment.followUpReason && (
                            <div>
                                <span className="font-semibold">Follow-Up Reason: </span>
                                <span className="text-gray-600">{appointment.followUpReason}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex gap-2">
                    <Button
                        onClick={onClose}
                        className="text-text-body border border-gray-400 font-semibold bg-none w-full hover:bg-gray-50"
                    >
                        Close
                    </Button>

                    <Button
                        onClick={onClose}
                        className="w-full text-xs sm:text-sm  cursor-pointer p-4 rounded-sm tracking-wide flex items-center justify-center gap-2 bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white transition-colors font-semibold whitespace-nowrap"
                    >
                        Follow up
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
