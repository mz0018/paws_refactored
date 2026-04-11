import mongoose from 'mongoose'
import Product from '../models/product.model.js'

import ErrorController from '../controllers/ErrorController.js'
import R2Service from '../services/R2Service.js'
class AdminService {

    //authorizeViaCookie handles the user_id checker!

    async addProduct(product_data, user_id, product_images) {

        const existingProduct = await Product.findOne({ productName: product_data.productName })

        if (existingProduct) {
            throw new ErrorController('Product with this name already exists', 409)
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
            createdBy: user_id,
        }

        const newProduct = new Product(product);
        await newProduct.save();

        return { message: 'Product added successfully' };
    }

    async getProduct(user_id, options = {}) {

        const { cursor, limit = 10 } = options

        const query = { createdBy: user_id }

        if (cursor) {
            query._id = { $gt: new  mongoose.Types.ObjectId(cursor) }
        }

        const products = await Product.find(
            query,
            { productName: 1, productPrice: 1, images: 1, _id: 1 }
        ).sort({ _id: 1 }).limit(limit + 1)

        const hasNextPage = products.length > limit
        if (hasNextPage) {
            products.pop()
        }
        
        const nextCursor = products.length > 0 
            ? products[products.length - 1]._id.toString() 
            : null

        return {
            products,
            pagination: {
                nextCursor,
                hasNextPage,
                limit
            }
        }
        
    }

    async getProductById(product_id) {
        const id = product_id?.id

        if (!id) {
            throw new ErrorController('Product ID is required.')
        }

        const product = await Product.findById(id)

        return product
    }

}

export default new AdminService()