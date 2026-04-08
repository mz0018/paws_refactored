import { useState } from 'react'

export const useAddProduct = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [files, setFiles] = useState<File[]>([])
    const [hasError, setHasError] = useState<{ 
        productName?: string
        productCategory?: string
        productDescription?: string
        productPrice?: string
        productStock?: string
        productImages?: string
        general?: string
     }>({})
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget

        if (!input.files) return

        const selectedFiles = Array.from(input.files)

        setFiles(prev => [...prev, ...selectedFiles])
    }

    const resetForm = (form: HTMLFormElement) => {
        form.reset()
        setFiles([])
        setHasError({})
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const newErrors: { [key: string]: string } = {}

        const form = e.currentTarget
        const formData = new FormData(form)

        const name = formData.get('productName') as string
        const category = formData.get('productCategory') as string
        const description = formData.get('productDescription') as string
        const price = formData.get('productPrice') as string
        const stock = formData.get('stock') as string

        if (!name.trim()) newErrors.productName = 'Product name is required'
        if (!category.trim()) newErrors.productCategory = 'Product category is required'
        if (!description.trim()) newErrors.productDescription = 'Product description is required'
        if (!price.trim()) newErrors.productPrice = 'Product price is required'
        if (!stock.trim()) newErrors.productStock = 'Product stock is required'
        if (files.length === 0) newErrors.productImages = 'At least one image is required'

        if (Object.keys(newErrors).length > 0) {
            setHasError(newErrors)
            setIsLoading(false)
            return
        }

        try {
            files.forEach(file => formData.append('images', file))

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/add-product`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })

            if (res.ok) {
                console.log(Object.fromEntries(formData.entries()))
                console.log(formData.getAll('images'))
                resetForm(form)
            } else {
                if (res.status === 409) {
                    setHasError({ general: 'A product with the same name already exists' })
                } else if (res.status === 429) {
                    setHasError({ general: 'Too many requests. Please try again later.' })
                } else if (res.status === 400) {
                    setHasError({ productImages: 'Invalid file type. Only JPEG, PNG, and WEBP are allowed.' })
                }
            }

            
        } catch (error) {
            setHasError({ general: 'Something went wrong. Please try again later.' })
            console.error('Add product failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, hasError, files, handleFileChange, handleSubmit }
}