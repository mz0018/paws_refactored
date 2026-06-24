import { useState, useEffect } from 'react'
import { RefreshCcw, SquareArrowOutUpRight, CircleCheckBig, Search } from 'lucide-react'
import { Loader } from '../../components/Loader'
import { NotFound } from '../../components/NotFound'
import { Error } from '../../components/Error'
import { Button } from '../../ui/form/Buttons'
import { PaginationUI } from '../../ui/form/PaginationUI'
import { ViewAppointmentModal } from '../../components/modals/ViewAppointmentModal'

import { useGetFollowUpCheckup } from '../../hooks/useGetFollowUpCheckup'
import { useUpdateAppointment } from '../../hooks/useUpdateAppointment'
import { SearchBar } from '../../components/SearchBar'
import { useDebounce } from '../../hooks/useDebounce'

type FollowUpCheckUpProps = {
    _id: string
}

const TABLE_HEADERS = ['Name', 'Purpose', 'Actions']

const FollowUpCheckup = () => {
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearch = useDebounce(searchQuery, 300)
    const [selectedAppointment, setSelectedAppointment] = useState<FollowUpCheckUpProps | null>(null)
    const { data, isLoading, isFetching, isError, error, refetch } = useGetFollowUpCheckup(page, debouncedSearch)
    const { handleUpdateAppointment } = useUpdateAppointment()

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch])

    const appointments = data?.appointments ?? []
    const totalPages = data?.totalPages ?? 1

    if (isLoading) return <Loader label="Loading follow-up checkups..." />

    if (isError) {
        return <Error label={(error as Error)?.message ?? 'Failed to load follow-up checkups'} />
    }

    return (
        <section className="w-full">
            <div className="bg-white p-5">
                <h1 className="text-2xl font-bold text-text-body">
                    Follow-Up <span className="text-btn-black-bg">Checkups</span>
                </h1>
                <p className="mb-4 text-text-body tracking-wider">
                    View and manage appointments scheduled for follow-up checkups.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-5 items-end">
                    <div className="sm:col-span-2 lg:col-span-4 xl:col-span-3 min-w-0">
                        <SearchBar
                            label="Search"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            icon={<Search size={16} />}
                            placeholder="Search by name or purpose"
                        />
                    </div>

                    <div className="lg:col-span-8 flex items-center justify-end gap-2">
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

                {appointments.length === 0 ? (
                    <NotFound
                        label="No follow-up checkups found"
                        childLabel="There are no appointments currently marked for follow-up."
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
                                                label="Fetching follow-up checkups..."
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
                                            <td className="capitalize px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500 whitespace-nowrap">
                                                {appoint.purpose}
                                            </td>
                                            <td className="px-2 py-2 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 text-gray-500">
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => setSelectedAppointment({ _id: appoint._id })}
                                                        className="border border-btn-black-bg font-semibold text-btn-black-bg hover:bg-btn-black-bg/10 transition whitespace-nowrap"
                                                    >
                                                        <SquareArrowOutUpRight />
                                                        View Appointment
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleUpdateAppointment(appoint._id, 'mark-done')}
                                                        className="bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white transition-colors font-semibold whitespace-nowrap"
                                                    >
                                                        <CircleCheckBig />
                                                        Mark As Done
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
            <ViewAppointmentModal
                isOpen={!!selectedAppointment}
                onClose={() => setSelectedAppointment(null)}
                appointmentId={selectedAppointment?._id ?? null}
            />
        </section>
    )
}

export default FollowUpCheckup
