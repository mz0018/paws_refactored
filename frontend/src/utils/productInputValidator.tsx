export type ProductFormErrors = {
    productName?: string
    productCategory?: string
    productDescription?: string
    productPrice?: string
    stock?: string
    productImages?: string
    general?: string
}

export const productInputValidator = (
    formData: FormData,
    filesLength: number
): ProductFormErrors => {

    const errors: ProductFormErrors = {}

    const name = formData.get('productName') as string
    const category = formData.get('productCategory') as string
    const description = formData.get('productDescription') as string
    const price = formData.get('productPrice') as string
    const stock = formData.get('stock') as string

    if (!name?.trim()) {
        errors.productName = 'Product name is required'
    } else if (name.trim().length > 100) {
        errors.productName = 'Product name must not exceed 100 characters'
    }

    if (!category?.trim()) {
        errors.productCategory = 'Product category is required'
    }

    if (!description?.trim()) {
        errors.productDescription = 'Product description is required'
    } else if (description.trim().length > 255) {
        errors.productDescription = 'Product description must not exceed 255 characters'
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
        errors.productPrice = 'Valid price is required'
    }

    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) {
        errors.stock = 'Valid stock is required'
    }

    if (filesLength === 0) {
        errors.productImages = 'At least one image is required'
    }

    return errors
}