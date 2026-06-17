import { RefreshCcw } from 'lucide-react'
import { useGetAppointments } from '../../hooks/useGetAppointments'
import { Loader } from '../../components/Loader'
import { NotFound } from '../../components/NotFound'
import { Error } from '../../components/Error'
import { Button } from '../../ui/form/Buttons'

const TABLE_HEADERS = ['Name', 'Purpose', 'Date', 'Time', 'Actions']

const Dashboard = () => {

    const { data: appointments = [], isLoading, isError, error, refetch } = useGetAppointments()

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
                    Showing today's active appointments.
                </p>

                <div className="flex items-center justify-end mb-4">
                    <button
                        title="Refresh List"
                        onClick={() => refetch()}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-muted/10 text-gray-400 hover:text-btn-black-bg transition-colors cursor-pointer shrink-0"
                    >
                        <RefreshCcw size={16} />
                    </button>
                </div>

                {appointments.length === 0 ? (
                    <NotFound
                        label="No appointments found"
                        childLabel="No appointments have been made yet."
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
                                {appointments.map(appoint => (
                                    <tr key={appoint._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                        <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 capitalize">
                                            {appoint.name}
                                        </td>
                                        <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500">
                                            {appoint.purpose}
                                        </td>
                                        <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500">
                                            {new Date(appoint.selectedDate).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500">
                                            {new Date(`1970-01-01T${appoint.selectedTime}`).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </td>
                                        <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500">
                                            <div className="flex gap-2">
                                                <Button className="bg-btn-black-bg text-white">
                                                    Mark as done
                                                </Button>

                                                <Button className="bg-btn-black-bg text-white">
                                                    Schedule Follow-up
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Dashboard
