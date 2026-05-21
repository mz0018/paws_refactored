import { useInfiniteQuery } from '@tanstack/react-query'
export const useGetClientProducts = (searchQuery?: string, category?: string, sortBy?: string) => {
    return useInfiniteQuery({
        queryKey: ['client-products', { searchQuery, category, sortBy }],
        queryFn: async ({ pageParam }) => {
            let url = `${import.meta.env.VITE_API_URL}/api/products?limit=10`
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
            const res = await fetch(url)
            if (!res.ok) throw new Error('Failed to fetch products')
            return res.json()
        },
        getNextPageParam: (lastPage) => lastPage.pagination.nextCursor || undefined,
        initialPageParam: undefined,
    })
}