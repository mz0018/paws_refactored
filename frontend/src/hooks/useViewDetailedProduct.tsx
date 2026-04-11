import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

type Product = {
    productName: string
    productPrice: number
    productCategory: string
    productDescription: string
    stock: number
    images: {
        url: string
    }[]
    createdAt: string
}

export const useViewDetailedProduct = () => {

    const { id } = useParams()

    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (id) {
            fetchProduct()
        } else {
            console.log('Product id not found 404')
        }
    }, [id])

    const fetchProduct = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/get-product/${id}`, {
                credentials: 'include'
            })
            const data = await res.json()
            setProduct(data)
            console.log(data)
        } catch (err) {
            console.error('Something went wrong: ', err)
        } finally {
            setLoading(false)
        }
    }

    return { id, product, loading }
}