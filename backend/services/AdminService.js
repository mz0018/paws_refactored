import Product from '../models/product.model.js'

import ErrorController from '../controllers/ErrorController.js'
import R2Service from '../services/R2Service.js'
class AdminService {

    async addProduct(product_data, product_images) {

        const existingProduct = await Product.findOne({ productName: product_data.productName });

        if (existingProduct) {
            throw new ErrorController('Product with this name already exists', 409);
        }

        let images = []

        if (product_images && product_images.length > 0) {
            console.log(`Uploading ${product_images.length} images to R2...`)

            for (const img of product_images) {
                try {
                    const imageUrls = await R2Service.uploadImage(img)
                    images.push({ url: imageUrls })
                    console.log('Images uploaded successfully:', images)
                } catch (error) {
                    console.error('Error uploading image to R2:', error)
                    throw new ErrorController('Failed to upload product image', 500)
                }
            }
        }

        const product = {
            ...product_data,
            images: images,
        }

        const newProduct = new Product(product);
        await newProduct.save();

        return { message: 'Product added successfully' };
    }

}

export default new AdminService()