import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  return user ? <Outlet /> : <Navigate to="/signin" replace />
}

export default ProtectedRoutes
