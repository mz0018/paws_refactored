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

        const name = formData.get('name') as string
        const category = formData.get('category') as string
        const description = formData.get('description') as string
        const price = formData.get('price') as string
        const stock = formData.get('stock') as string

        if (!name) newErrors.productName = 'Product name is required'
        if (!category) newErrors.productCategory = 'Product category is required'
        if (!description) newErrors.productDescription = 'Product description is required'
        if (!price) newErrors.productPrice = 'Product price is required'
        if (!stock) newErrors.productStock = 'Product stock is required'
        if (files.length === 0) newErrors.productImages = 'At least one image is required'

        if (Object.keys(newErrors).length > 0) {
            setHasError(newErrors)
            setIsLoading(false)
            return
        }

        try {
            files.forEach(file => formData.append('images', file))

            console.log(Object.fromEntries(formData.entries()))
            console.log(formData.getAll('images'))

            resetForm(form)
            
        } catch (error) {
            setHasError({ general: 'Something went wrong' })
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, hasError, files, handleFileChange, handleSubmit }
}