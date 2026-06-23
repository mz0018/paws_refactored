import { useState, useEffect } from 'react'
import { Select } from '../../ui/form/Select'
import { CircleCheckBig, RefreshCcw } from 'lucide-react'
import { Loader } from '../../components/Loader'
import { NotFound } from '../../components/NotFound'
import { Error } from '../../components/Error'
import { Button } from '../../ui/form/Buttons'
import { PaginationUI } from '../../ui/form/PaginationUI'
import { useGetAppointments } from '../../hooks/useGetAppointments'
import { useUpdateAppointment } from '../../hooks/useUpdateAppointment'
import { FollowUpModal } from '../../components/modals/FollowUpModal'

type AppointmentProps = {
    _id: string
    name: string
    purpose: string
    selectedDate: string
    selectedTime: string
}

const TABLE_HEADERS = ['Name', 'Purpose', 'Date', 'Time', 'Actions']

const Dashboard = () => {

    const now = new Date()
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1)
    const [selectedYear, setSelectedYear] = useState(now.getFullYear())
    const [page, setPage] = useState(1)
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentProps | null>(null)

    const { handleUpdateAppointment, statusLoading } = useUpdateAppointment()
    const { data, isLoading, isFetching, isError, error, refetch } = useGetAppointments(selectedMonth, selectedYear, page, 10, 'pending')

    const appointments = data?.appointments ?? []
    const totalPages = data?.totalPages ?? 1

    useEffect(() => {
        setPage(1)
    }, [selectedMonth, selectedYear])

    const handleFollowUpSubmit = async (appointmentId: string, reason: string) => {
        await handleUpdateAppointment(appointmentId, 'follow-up', reason)
        setSelectedAppointment(null)
    }

    if (isLoading) return <Loader label="Loading appointments..." />

    if (isError) {
        return <Error label={(error as Error)?.message ?? 'Failed to load appointments'} />
    }

    return (
        <section className="w-full">
            <div className="bg-white p-5">
                <h1 className="text-2xl font-bold text-text-body">
                    Appointment{' '}
                    <span className="text-btn-black-bg">List</span>
                </h1>
                <p className="mb-4 text-text-body tracking-wider">
                    Track active appointments in a centralized table and update their status to completed or follow-up as needed.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mb-4 items-end">
                    {/* Month */}
                    <div className="lg:col-span-4">
                        <Select
                            value={selectedMonth}
                            onChange={e => setSelectedMonth(Number(e.target.value))}
                            label="Month"
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {new Date(0, i).toLocaleDateString('default', {
                                        month: 'long',
                                    })}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* Year */}
                    <div className="lg:col-span-4">
                        <Select
                            value={selectedYear}
                            onChange={e => setSelectedYear(Number(e.target.value))}
                            label="Year"
                        >
                            {Array.from(
                                { length: 7 },
                                (_, i) => now.getFullYear() - 3 + i
                            ).map(y => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* Refresh + Pagination */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-2 lg:justify-start">
                            <PaginationUI
                                page={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />

                            <button
                                title="Refresh List"
                                onClick={() => refetch()}
                                className="border border-gray-200 shadow-sm w-[46px] h-[46px] flex items-center justify-center rounded-full hover:bg-surface-muted/10 text-gray-400 hover:text-btn-black-bg transition-colors"
                            >
                                <RefreshCcw size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {appointments.length === 0 ? (
                    <NotFound
                        label="No appointments found"
                        childLabel={`There are no appointments scheduled for ${new Date(0, selectedMonth - 1).toLocaleDateString('default', { month: 'long' })} ${selectedYear}`}
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="text-footer-bg min-w-full rounded-sm overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    {TABLE_HEADERS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="text-left px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 font-medium text-text-body capitalize"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {isFetching && appointments.length > 0 ? (
                                    <tr>
                                        <td
                                            colSpan={TABLE_HEADERS.length}
                                            className="text-center py-8"
                                        >
                                            <Loader
                                                label="Fetching appointments..."
                                                size="sm"
                                                fullScreen={false}
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    appointments.map(appoint => (
                                        <tr key={appoint._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 capitalize whitespace-nowrap">
                                                {appoint.name}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 whitespace-nowrap">
                                                {appoint.purpose}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 whitespace-nowrap">
                                                {new Date(appoint.selectedDate).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 whitespace-nowrap">
                                                {new Date(`1970-01-01T${appoint.selectedTime}`).toLocaleTimeString("en-US", {
                                                    hour: "numeric",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500">
                                                <div className="flex gap-2">
                                                    <Button 
                                                        onClick={() => setSelectedAppointment(appoint)}
                                                        className="border border-btn-black-bg font-semibold text-btn-black-bg hover:bg-btn-black-bg/10 transition whitespace-nowrap"
                                                    >
                                                        Schedule Follow-up
                                                    </Button>
                                                    <Button 
                                                        onClick={() => handleUpdateAppointment(appoint._id, 'mark-done')}
                                                        className="bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white transition-colors font-semibold whitespace-nowrap"
                                                    >
                                                        <CircleCheckBig />
                                                        Mark as done
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <FollowUpModal
                isOpen={!!selectedAppointment}
                onClose={() => setSelectedAppointment(null)}
                appointment={selectedAppointment}
                onSubmit={handleFollowUpSubmit}
                isLoading={statusLoading}
            />
        </section>
    )
}

export default Dashboard
