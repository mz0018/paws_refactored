import { useState, useEffect } from 'react'
import { productInputValidator } from '../utils/productInputValidator'

type Product = {
  _id: string
  productName: string
  productCategory: string
  productDescription: string
  productPrice: number
  stock: number
  images: { 
    url: string
    file?: File
  }[]
}

type UseUpdateProductProps = {
  product: Product
}

export const useUpdateProduct = ({ product }: UseUpdateProductProps) => {
    
    const [changesMade, setChangesMade] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [productCopy, setProductCopy] = useState<Product>(product)
    const [hasError, setHasError] = useState<{
        productName?: string
        productCategory?: string
        productDescription?: string
        productPrice?: string
        stock?: string
        productImages?: string
        general?: string
    }>({})

    useEffect(() => {
        setProductCopy(product)
        setHasError({})
        setChangesMade(false)
    }, [product])

    useEffect(() => {
        const hasChanges =
            productCopy.productName !== product.productName ||
            productCopy.productCategory !== product.productCategory ||
            productCopy.productDescription !== product.productDescription ||
            productCopy.productPrice !== product.productPrice ||
            productCopy.stock !== product.stock ||
            JSON.stringify(productCopy.images) !== JSON.stringify(product.images)

        setChangesMade(hasChanges)
    }, [productCopy, product])

    const handleRemoveImage = (index: number) => {

        setProductCopy((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))

        setHasError((prev) => ({
            ...prev,
            productImages: undefined
        }))
    }

    const handleAddImage = (file: File, imageUrl: string) => {

        const allowedTypes = ['image/jpeg','image/jpg','image/png','image/webp']

        const maxSize = 2 * 1024 * 1024

        if (!allowedTypes.includes(file.type)) {

            setHasError((prev) => ({
                ...prev,
                productImages: 'Only JPG, JPEG, PNG, and WEBP files are allowed.'
            }))

            return
        }

        if (file.size > maxSize) {

            setHasError((prev) => ({
                ...prev,
                productImages: 'Image size must not exceed 2MB.'
            }))

            return
        }

        if (productCopy.images.length >= 5) {

            setHasError((prev) => ({
                ...prev,
                productImages: 'Maximum of 5 images only.'
            }))

            return
        }

        setProductCopy((prev) => ({
            ...prev,
            images: [...prev.images, { url: imageUrl, file }]
        }))

        setHasError((prev) => ({
            ...prev,
            productImages: undefined
        }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        const numberFields = ['productPrice', 'stock']

        setProductCopy((prev) => ({
            ...prev,
            [name]: numberFields.includes(name) ? Number(value) : value
        }))

        // console.log('Updated product copy:', { ...productCopy, [name]: value })

        setHasError((prev) => ({
            ...prev,
            [name]: undefined
        }))
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const productImageLength = productCopy.images ? productCopy.images.length : 0

        const formData = new FormData()

        formData.append('productName', productCopy.productName)
        formData.append('productCategory', productCopy.productCategory)
        formData.append('productDescription', productCopy.productDescription)
        formData.append('productPrice', String(productCopy.productPrice))
        formData.append('stock', String(productCopy.stock))

        const newErrors = productInputValidator(formData, productImageLength)

        if (Object.keys(newErrors).length > 0) {
            setHasError(newErrors)
            setIsLoading(false)
            return
        }

        try {
            const isThereChanges: Partial<Product> = {}

            if (productCopy.productName !== product.productName) {
                isThereChanges.productName = productCopy.productName
            }

            if (productCopy.productCategory !== product.productCategory) {
                isThereChanges.productCategory = productCopy.productCategory
            }

            if (productCopy.productDescription !== product.productDescription) {
                isThereChanges.productDescription = productCopy.productDescription
            }

            if (productCopy.productPrice !== product.productPrice) {
                isThereChanges.productPrice = productCopy.productPrice
            }

            if (productCopy.stock !== product.stock) {
                isThereChanges.stock = productCopy.stock
            }

            // if (JSON.stringify(productCopy.images) !== JSON.stringify(product.images)) {
            //     isThereChanges.images = productCopy.images
            // }

            const removedImages = product.images.filter(
                img => !productCopy.images.some(p => p.url === img.url)
            )

            const addedImages = productCopy.images.filter(
                img => img.file
            )

            const changes = {
                ...(Object.keys(isThereChanges).length > 0 && {
                    updated: isThereChanges
                }),

                ...(addedImages.length > 0 && {
                    added: addedImages
                }),

                ...(removedImages.length > 0 && {
                    removed: removedImages
                })
            }

            console.log(changes)
            // console.log(user?.id) Don't include the user id not best practice
            console.log(product._id)

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/update-product/${product._id}`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(changes)
                }
            )

            if (res.ok) {
                console.log('Sent successfully! 201')
            }

            setHasError({})

        } catch (error) {
            console.error('Error updating product:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return { changesMade, hasError, isLoading, handleRemoveImage, handleAddImage, handleSubmit, handleChange, productCopy }
    
}