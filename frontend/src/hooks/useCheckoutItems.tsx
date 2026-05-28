import { useState } from 'react'

export const useCheckoutItems = () => {

    const [loading, setLoading] = useState<boolean>(false)
    
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
                alert('Save 200')
            }
        } catch (err) {
            console.error('Something went wrong: ', err)
        } finally {
            setLoading(false)
        }
    }
    
    return { loading, handleSaveOrder }
}