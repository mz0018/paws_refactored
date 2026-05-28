import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useCheckoutItems = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [hasError, setHasError] = useState<{
        general?: string
    }>({})
    const [isRateLimit, setIsRateLimit] = useState<boolean>(false)
    
    const handleSaveOrder = async (items: any) => {
        setLoading(true)
        try {
            const payload = items.map((item: any) => ({
                _id: item._id,
                quantity: item.quantity
            })) 
            
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/save-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: payload })
            })

            if (res.ok) {
                alert('submit 200')
                const orderedIds = items.map((item: any) => item._id)
                const cart = JSON.parse(localStorage.getItem('shopping_cart') ?? '[]')
                const updatedCart = cart.filter((item: any) => !orderedIds.includes(item._id))

                localStorage.setItem('shopping_cart', JSON.stringify(updatedCart))
                window.dispatchEvent(new Event('cart-updated'))
                sessionStorage.removeItem('checkout_items')
                navigate('/')
            } else {
                if (res.status === 429) {
                    setHasError({ general: 'You’ve reached your limit of 3 order attempts for today. Please try again tomorrow.'})
                    setIsRateLimit(true)
                }
            }
        } catch (err) {
            console.error('Something went wrong: ', err)
        } finally {
            setLoading(false)
        }
    }
    
    return { loading, hasError, isRateLimit, handleSaveOrder }
}