import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetProduct = (searchQuery?: string, category?: string, sortBy?: string) => {

    return useInfiniteQuery({

        queryKey: ['admin-products', { searchQuery, category, sortBy }],
        
        queryFn: async ({ pageParam }) => {
            let url = `${import.meta.env.VITE_API_URL}/api/admin/get-product?limit=10`
            if (pageParam) {
                url += `&cursor=${encodeURIComponent(pageParam)}`
            }
            if (searchQuery?.trim()) {
                url += `&search=${encodeURIComponent(searchQuery.trim())}`
            }
            if (category?.trim()) {
                url += `&category=${encodeURIComponent(category.trim())}`
            }
            if (sortBy?.trim()) {
                url += `&sort=${encodeURIComponent(sortBy.trim())}`
            }
            const res = await fetch(url, { credentials: 'include' })
            if (!res.ok) throw new Error('Failed to fetch products')
            return res.json()
        },

        getNextPageParam: (lastPage) => lastPage.pagination.nextCursor || undefined,
        initialPageParam: undefined,
    })
}