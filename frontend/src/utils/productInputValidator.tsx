export type ProductFormErrors = {
    productName?: string
    productCategory?: string
    productDescription?: string
    productPrice?: string
    productStock?: string
    productImages?: string
    general?: string
}

export const productInputValidator = ( formData: FormData, filesLength: number): ProductFormErrors => {
    
    const errors: ProductFormErrors = {}
    
    const name = formData.get('productName') as string
    const category = formData.get('productCategory') as string
    const description = formData.get('productDescription') as string
    const price = formData.get('productPrice') as string
    const stock = formData.get('stock') as string

    if (!name?.trim()) {
        errors.productName = 'Product name is required'
    }

    if (!category?.trim()) {
        errors.productCategory = 'Product category is required'
    }

    if (!description?.trim()) {
        errors.productDescription = 'Product description is required'
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
        errors.productPrice = 'Valid price is required'
    }

    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) {
        errors.productStock = 'Valid stock is required'
    }

    if (filesLength === 0) {
        errors.productImages = 'At least one image is required'
    }

    return errors
}