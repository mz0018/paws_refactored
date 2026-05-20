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
        <div className="min-h-screen flex items-center justify-center">
            <Form onSubmit={handleSubmit}>

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

                <Button type="submit" className="bg-btn-black-bg text-white hover:bg-btn-black-hover-header-bg transition duration-300" disabled={isLoading}>
                    {isLoading ? (
                        <ClipLoader size={18} color='white' />
                    ) : (
                        <>
                        <Send size={18} color='white' />
                        Submit
                        </>
                    )}
                </Button>

            </Form>
        </div>
    )
}

export default Appointment