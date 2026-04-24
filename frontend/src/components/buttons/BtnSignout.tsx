import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../ui/form/Buttons'
import { LogOut } from 'lucide-react'

export const BtnSignout = () => {
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/signin', { replace: true })
    }

    return (
        <Button className='w-full bg-red-500 hover:bg-red-700' onClick={handleSignOut}>
            <LogOut size={18} />Sign out
        </Button>
    )
}