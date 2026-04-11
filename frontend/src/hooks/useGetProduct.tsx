import { useState } from 'react'

export const useGetProduct = () => {    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/get-product`, {
                method: 'GET',
                credentials: 'include'
            })

            if (res.ok) {
                const data = await res.json()
                setProducts(data)
            } else {
                setError('Failed to fetch products')
            }
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, products, error, fetchProducts}
}