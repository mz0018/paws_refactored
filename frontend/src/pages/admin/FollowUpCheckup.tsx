import { useGetFollowUpCheckup } from '../../hooks/useGetFollowUpCheckup'

const FollowUpCheckup = () => {

    const { handleGetFollowUpCheckUps } = useGetFollowUpCheckup()

    return (
        <>
        List of Follow up checkups
        </>
    )
}

export default FollowUpCheckup