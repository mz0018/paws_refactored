import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const useSignin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [hasError, setHasError] = useState<string>("")

    const { verifyAuth } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ userName, password })
            })

            if (res.ok) {
                navigate('/admin/dashboard')
            } else {
                if (res.status === 401) {
                    setHasError("Invalid credentials. Please try again.")
                } else if (res.status === 429) {
                    setHasError("Too many requests. Please try again later.")
                } else {
                    setHasError("An error occurred during sign-in. Please try again later.")
                }
            }

        } catch (error) {
            console.error("Signin failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return { handleSubmit, isLoading, setUserName, userName, setPassword, password, hasError }

}