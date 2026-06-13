import { Form } from '../ui/form/Form'
import { Input } from '../ui/form/Input'
import { Button } from '../ui/form/Buttons'
import { Select } from '../ui/form/Select'
import { useAppointment } from '../hooks/useAppointment'
import { ErrorText } from '../ui/form/ErrorText'
import { ClipLoader } from 'react-spinners'
import { Send } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../AppointmentDatePicker.css'

const Appointment = () => {

    const { formData, hasErrors, isLoading, handleChange, handleDateChange, handleSubmit } = useAppointment()

    return (
        <div className="flex flex-col">

            <div className="hidden md:flex relative min-h-[300px] w-full items-center justify-center bg-[url('/img/appointment_bg.webp')] bg-cover bg-center bg-no-repeat rounded-b-md">

                <div className="absolute inset-0 bg-black/80 z-0" />

                <div className="relative z-10 space-y-1 text-center sm:text-left text-white">
                    <h1 className="text-5xl font-bold tracking-tight">
                        Veterinary <span className="text-btn-black-bg">Appointment</span>
                    </h1>

                    <p className="text-md tracking-wide">
                        Book an appointment for veterinary consultation and services.
                    </p>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <DatePicker
                        selected={formData.selectedDate ? new Date(formData.selectedDate) : null}
                        onChange={(date: Date | null) => handleDateChange(date)}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select a date and time"
                        customInput={
                            <Input
                                label="Please select a specified date"
                                error={hasErrors.selectedDate}
                            />
                        }
                        inline
                    />
                </div>

                <Form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg rounded-xl p-6 sm:p-8"
                >
                    <Input
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        error={hasErrors.name}
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

                    <ErrorText
                        message={
                            hasErrors.name ||
                            hasErrors.selectedDate ||
                            hasErrors.purpose
                        }
                    />

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

        </div>
    )
}

export default Appointment