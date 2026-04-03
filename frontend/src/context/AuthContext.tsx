import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface AuthUser {
  id: string
  userName: string
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  verifyAuth: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const verifyAuth = async () => {

    if (!document.cookie.includes('authToken=')) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/verify`, { credentials: 'include' })

      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    verifyAuth()
  }, [])

  const signOut = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/users/signout`, { method: 'POST' })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, verifyAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}