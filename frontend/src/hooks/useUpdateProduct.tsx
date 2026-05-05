import { useState, useEffect } from 'react'
import { productInputValidator } from '../utils/productInputValidator'

type Product = {
  _id: string
  productName: string
  productCategory: string
  productDescription: string
  productPrice: number
  stock: number
  images: string[]
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        const numberFields = ['productPrice', 'stock']

        setProductCopy((prev) => ({
            ...prev,
            [name]: numberFields.includes(name) ? Number(value) : value
        }))

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

            if (JSON.stringify(productCopy.images) !== JSON.stringify(product.images)) {
                isThereChanges.images = productCopy.images
            }

            setHasError({})

        } catch (error) {
            console.error('Error updating product:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return { changesMade, hasError, isLoading, handleSubmit, handleChange }
    
}