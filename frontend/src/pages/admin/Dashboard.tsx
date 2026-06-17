import { useGetAppointments } from '../../hooks/useGetAppointments'

const Dashboard = () => {

    const { isLoading, list } = useGetAppointments()

    if (isLoading) return <>Loading...</>
    
    return (
        <>
        Hello user, welcome to the admin dashboard!
        <table border={1}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Purpose</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {list.length <= 0 ? (
                    <p>No appointments found</p>
                ) : (
                    <>
                    {list?.map(appt => (
                        <tr key={appt._id}>
                            <td>{appt.name}</td>
                            <td>{appt.purpose}</td>
                            <td>
                            {new Date(appt.selectedDate).toLocaleDateString("en-US", {
                                weekday: "short",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                            </td>
                            <td>
                            {new Date(`1970-01-01T${appt.selectedTime}`).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })}
                            </td>
                        </tr>
                    ))}
                    </>
                )}
            </tbody>
        </table>
        </>
    )
}

export default Dashboard