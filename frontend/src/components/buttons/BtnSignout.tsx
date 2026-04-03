import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const BtnSignout = () => {
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/signin')
    }

    return (
        <button className='border p-1' onClick={handleSignOut}>
            {"Sign out"}
        </button>
    )
}