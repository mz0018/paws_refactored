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
                {list?.map(appt => (
                    <tr key={appt._id}>
                        <td>{appt.name}</td>
                        <td>{appt.purpose}</td>
                        <td>{new Date(appt.selectedDate).toLocaleDateString()}</td>
                        <td>{appt.selectedTime}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default Dashboard