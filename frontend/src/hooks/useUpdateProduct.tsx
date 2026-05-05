import { useState, useEffect } from 'react'

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

    const [productCopy, setProductCopy] = useState<Product>(product)

    useEffect(() => {
        setProductCopy(product)
    }, [product])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        const numberFields = ['productPrice', 'stock']

        setProductCopy((prev) => ({
            ...prev,
            [name]: numberFields.includes(name) ? Number(value) : value
        }))
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isThereChanges: any = {}
        
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

        console.log(isThereChanges)
    }

    return { handleSubmit, handleChange }
    
}