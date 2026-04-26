import { useState, useEffect, useRef } from 'react'

type FileWithPreview = {
    file: File
    preview: string
}

export const useAddProduct = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const previewsRef = useRef<string[]>([])
    const [hasError, setHasError] = useState<{ 
        productName?: string
        productCategory?: string
        productDescription?: string
        productPrice?: string
        productStock?: string
        productImages?: string
        general?: string
    }>({})

    const MAX_SIZE = 2 * 1024 * 1024

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return

        const selected = Array.from(e.currentTarget.files).map(file => {
            const preview = URL.createObjectURL(file)
            previewsRef.current.push(preview)
            return { file, preview }
        })

        for (const { file } of selected) {
            if (!file.type.startsWith('image/')) {
                setHasError(prev => ({ ...prev, productImages: 'Only image files are allowed' }))
                return
            }

            if (file.size > MAX_SIZE) {
                setHasError(prev => ({ ...prev, productImages: 'Each image must be under 2MB' }))
                return
            }
        }

        setFiles(prev => {
            const newFiles = selected.filter(
                newFile =>
                    !prev.some(
                        f =>
                            f.file.name === newFile.file.name &&
                            f.file.lastModified === newFile.file.lastModified
                    )
            )
            return [...prev, ...newFiles]
        })

        e.currentTarget.value = ''
    }

    const handleRemoveFile = (fileToRemove: FileWithPreview) => {
        URL.revokeObjectURL(fileToRemove.preview)
        previewsRef.current = previewsRef.current.filter(p => p !== fileToRemove.preview)
        setFiles(prev =>
            prev.filter(f => f.preview !== fileToRemove.preview)
        )
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        if (fileInput) fileInput.value = ''
    }

    const resetForm = (form: HTMLFormElement) => {
        previewsRef.current.forEach(preview => URL.revokeObjectURL(preview))
        previewsRef.current = []

        form.reset()
        setFiles([])
        setHasError({})
    }

    useEffect(() => {
        return () => {
            previewsRef.current.forEach(preview => URL.revokeObjectURL(preview))
        }
    }, []) 

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

        if (!price || isNaN(Number(price)) || Number(price) <= 0) {
            newErrors.productPrice = 'Valid price is required'
        }

        if (!stock || isNaN(Number(stock)) || Number(stock) < 0) {
            newErrors.productStock = 'Valid stock is required'
        }

        if (files.length === 0) {
            newErrors.productImages = 'At least one image is required'
        }

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
                } else if (res.status === 429) {
                    setHasError({ general: 'Too many requests. Please try again later.' })
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

    return {
        isLoading,
        hasError,
        files,
        handleFileChange,
        handleRemoveFile,
        handleSubmit
    }
}