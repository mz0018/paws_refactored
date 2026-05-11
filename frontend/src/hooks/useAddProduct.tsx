import { useState } from 'react'
import { productInputValidator } from '../utils/productInputValidator'
import { useProductFiles } from './useProductFiles'

export const useAddProduct = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [conflictName, setConflictName] = useState<string>('')
    const [productName, setProductName] = useState<string>('')

    const { files, handleFileChange, handleRemoveFile, resetFiles, hasError, setHasError } = useProductFiles()

    const resetForm = (form: HTMLFormElement) => {
        form.reset()
        resetFiles()
        setHasError({})
        setConflictName('')
        setProductName('')
    } 

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const form = e.currentTarget
        const formData = new FormData(form)
        const name = formData.get('productName') as string

        const newErrors = productInputValidator(formData, files.length)

        if (Object.keys(newErrors).length > 0) {
            setHasError(newErrors)
            setIsLoading(false)
            return
        }

        try {
            files.forEach(({ file }) => formData.append('images', file))

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/add-product`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })

            if (res.ok) {
                resetForm(form)
            } else {
                if (res.status === 409) {
                    setHasError({ general: 'A product with the same name already exists' })
                    setConflictName(name)
                } else if (res.status === 429) {
                    setHasError({ general: 'Too many requests. Please try again later.' })
                } else if (res.status === 413) {
                    setHasError({ productImages: 'File size too large. Please upload images under 2MB.' })
                } else if (res.status === 400) {
                    const data = await res.json()

                    if (data.errors) {
                        const fieldErrors: Record<string, string> = {}

                        data.errors.forEach((error: { field: string, message: string }) => {
                            fieldErrors[error.field] = error.message
                        })

                        setHasError(fieldErrors)
                    } else {
                        setHasError({ general: data.message || 'Invalid request data' })
                    }
                } else {
                    setHasError({ general: 'Something went wrong. Please try again.' })
                }
            }
        } catch (error) {
            setHasError({ general: 'Something went wrong. Please try again later.' })
            console.error('Add product failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, hasError, files, handleFileChange, handleRemoveFile, handleSubmit, setProductName, conflictName, productName }
}