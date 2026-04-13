import { useState } from 'react'

export const useGetProduct = () => {    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<any[]>([])
    const [nextCursor, setNextCursor] = useState<string | undefined>(undefined)
    const [hasNextPage, setHasNextPage] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = async (cursor?: string, searchQuery?: string, category?: string, sortBy?: string) => {
        setIsLoading(true)
        setError(null)

        let url = `${import.meta.env.VITE_API_URL}/api/admin/get-product?limit=10`

        if (cursor) {
            url += `&cursor=${cursor}`
        }

        if (searchQuery && searchQuery.trim()) {
            url += `&search=${encodeURIComponent(searchQuery.trim())}`
        }

        if (category && category.trim()) {
            url += `&category=${encodeURIComponent(category.trim())}`
        }

        if (sortBy && sortBy.trim()) {
            url += `&sort=${encodeURIComponent(sortBy.trim())}`
        }

        try {
            const res = await fetch(url, {
                credentials: 'include'
            })

            if (res.ok) {
                const data = await res.json()
                
                if (cursor) {
                    setProducts(prev => [...prev, ...data.products])
                    setNextCursor(data.pagination.nextCursor || undefined)
                    setHasNextPage(data.pagination.hasNextPage)
                } else {
                    setProducts(data.products)
                    setNextCursor(data.pagination.nextCursor || undefined)
                    setHasNextPage(data.pagination.hasNextPage)
                }

            } else {
                setError('Failed to fetch products')
            }
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, products, error, fetchProducts, nextCursor, hasNextPage }
}