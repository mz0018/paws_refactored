import { useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { Loader } from '../../components/Loader'
import { Error } from '../../components/Error'
import { NotFound } from '../../components/NotFound'
import { PaginationUI } from '../../ui/form/PaginationUI'
import { useGetAppointmentLogs } from '../../hooks/useGetAppointmentLogs'

const TABLE_HEADERS = ['Client', 'Purpose', 'Action', 'Previous Status', 'New Status', 'Follow-Up Reason', 'Performed By', 'Date']

const AppointmentLogs = () => {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError, error, refetch, isFetching } = useGetAppointmentLogs(page)

    const logs = data?.logs ?? []
    const totalPages = data?.totalPages ?? 1

    if (isLoading) return <Loader label="Loading appointment logs..." />

    if (isError) {
        return <Error label={(error as Error)?.message ?? 'Failed to load appointment logs'} />
    }

    return (
        <section className="w-full">
            <div className="bg-white p-5">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-5">
                    <div>
                        <h1 className="text-2xl font-bold text-text-body">
                            Appointment <span className="text-btn-black-bg">Activity Logs</span>
                        </h1>

                        <p className="mt-1 text-text-body tracking-wider">
                            Track all changes and updates made to appointments.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 lg:self-end">
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

                {logs.length === 0 ? (
                    <NotFound
                        label="No activity logs found"
                        childLabel="There are no appointment activity records yet."
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="text-footer-bg min-w-full rounded-sm overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    {TABLE_HEADERS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="text-left px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 font-medium text-text-body capitalize whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {isFetching && logs.length > 0 ? (
                                    <tr>
                                        <td
                                            colSpan={TABLE_HEADERS.length}
                                            className="text-center py-8"
                                        >
                                            <Loader
                                                label="Fetching logs..."
                                                size="sm"
                                                fullScreen={false}
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map(log => (
                                        <tr key={log._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 capitalize whitespace-nowrap">
                                                {log.appointmentId?.name ?? 'N/A'}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 capitalize whitespace-nowrap">
                                                {log.appointmentId?.purpose ?? 'N/A'}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 capitalize whitespace-nowrap">
                                                <span className="font-medium capitalize">
                                                    {log.action.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 capitalize whitespace-nowrap">
                                                {log.previousStatus ?? '-'}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 capitalize whitespace-nowrap">
                                                {log.newStatus ?? '-'}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 whitespace-nowrap max-w-[200px] truncate">
                                                {log.followUpReason ?? '-'}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 capitalize whitespace-nowrap">
                                                {log.performedBy?.userName ?? '-'}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 whitespace-nowrap">
                                                {new Date(log.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    )
}

export default AppointmentLogs
