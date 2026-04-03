import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoutes = () => {
    const { user, loading } = useAuth()

    if (loading) return <div>Signing you in....</div>

    return user ? <Outlet /> : <Navigate to="/signin" />
}

export default ProtectedRoutes