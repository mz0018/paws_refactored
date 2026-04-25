import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../ui/form/Buttons'
import { LogOut } from 'lucide-react'

type BtnSignoutProps = {
    collapsed?: boolean
}

export const BtnSignout = ({ collapsed = false }: BtnSignoutProps) => {
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/signin', { replace: true })
    }

    return (
        <Button
            className={`w-full bg-transparent hover:bg-white/10 ${
                collapsed ? 'justify-center' : 'justify-start'
            }`}
            onClick={handleSignOut}
        >
            <LogOut size={18} />
            {!collapsed && 'Log out'}
        </Button>
    )
}