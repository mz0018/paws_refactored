import { Form } from '../ui/form/Form'
import { Input } from '../ui/form/Input'
import { Button } from '../ui/form/Buttons'
import { Select } from '../ui/form/Select'
import { useAppointment } from '../hooks/useAppointment'
import { ErrorText } from '../ui/form/ErrorText'
import { ClipLoader } from 'react-spinners'
import { Send } from 'lucide-react'
import AppointmentCalendar from '../components/AppointmentCalendar'

const Appointment = () => {

    const { formData, hasErrors, isLoading, filterTime, isRateLimited, handleChange, handleDateChange, handleSubmit } = useAppointment()

    const handleTimeSelect = (time: string) => {
        handleChange({
            target: { name: 'selectedTime', value: time }
        } as React.ChangeEvent<HTMLInputElement>)
    }

    return (
        <div className="flex flex-col bg-white">

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

            <div className="max-w-7xl mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

                    {/* Calendar */}
                    <div className="flex justify-center lg:justify-start">
                        <AppointmentCalendar
                            selectedDate={formData.selectedDate}
                            selectedTime={formData.selectedTime}
                            onDateChange={handleDateChange}
                            onTimeSelect={handleTimeSelect}
                            filterTime={filterTime}
                            error={hasErrors.selectedDate}
                        />
                    </div>

                    {/* Form Section */}
                    <div className="space-y-5">

                        <Form
                            onSubmit={handleSubmit}
                            className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8"
                        >

                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-text-body">
                                    Appointment Details
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Fill in the information below to complete your appointment request.
                                </p>
                            </div>

                            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                                <p className="text-sm text-amber-800">
                                    <span className="font-semibold">Reminder:</span> Only <span className="font-semibold">one appointment may be booked per day</span>. If you need additional assistance, please schedule another appointment on a different day.
                                </p>
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
                                    hasErrors.purpose ||
                                    hasErrors.general
                                }
                            />

                            <Button
                                type="submit"
                                className="font-semibold tracking-wide mt-4 flex w-full items-center justify-center gap-2 bg-btn-black-bg hover:bg-btn-black-hover-header-bg py-3 text-white transition"
                                disabled={isLoading || isRateLimited}
                            >
                                {isLoading ? (
                                    <ClipLoader size={18} color="white" />
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Submit Appointment
                                    </>
                                )}
                            </Button>
                        </Form>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Appointment