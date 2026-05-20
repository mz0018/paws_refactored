import { Form } from '../ui/form/Form'
import { Input } from '../ui/form/Input'
import { Button } from '../ui/form/Buttons'
import { Select } from '../ui/form/Select'
import { useAppointment } from '../hooks/useAppointment'
import { ErrorText } from '../ui/form/ErrorText'
import { ClipLoader } from 'react-spinners'
import { Send } from 'lucide-react'

const Appointment = () => {

    const { formData, hasErrors, isLoading, handleChange, handleSubmit } = useAppointment()

    return (
        <div className="flex min-h-dvh items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <Form
                onSubmit={handleSubmit}
                className="w-full max-w-lg rounded-xl p-6 sm:p-8"
            >

                <div className="space-y-1 text-center sm:text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Veterinary <span className="text-btn-black-bg">Appointment</span>
                    </h1>

                    <p className="text-md tracking-wide text-text-body">
                        Book an appointment for veterinary consultation and services.
                    </p>
                </div>

                <div className="my-2 relative">
                    <div className="h-px w-full bg-text-body/10" />
                    <div className="absolute inset-0 shadow-md" />
                </div>

                <Input
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    error={hasErrors.name}
                />

                <Input
                    type="datetime-local"
                    name="selectedDate"
                    label="Please select a specified date"
                    value={formData.selectedDate}
                    onChange={handleChange}
                    error={hasErrors.selectedDate}
                />

                <Select
                    name="purpose"
                    label="Purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    error={hasErrors.purpose}
                >
                    <option value="">Select purpose</option>
                    <option value="consultation">Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="checkup">Checkup</option>
                </Select>

                <ErrorText message={hasErrors.name || hasErrors.selectedDate || hasErrors.purpose} />

                <Button
                    type="submit"
                    className="font-semibold tracking-wide mt-2 flex w-full items-center justify-center gap-2 bg-btn-black-bg hover:bg-btn-black-hover-header-bg py-3 text-white transition"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ClipLoader size={18} color="white" />
                    ) : (
                        <>
                            <Send size={18} />
                            Submit
                        </>
                    )}
                </Button>

            </Form>
        </div>
    )
}

export default Appointment