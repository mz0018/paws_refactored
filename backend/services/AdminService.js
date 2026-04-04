import Product from '../models/product.model.js'

import ErrorController from '../controllers/ErrorController.js'
class AdminService {

    async addProduct(product) {

        const existingProduct = await Product.findOne({ productName: product.productName });

        if (existingProduct) {
            throw new ErrorController('Product with this name already exists', 409);
        }

        const newProduct = new Product(product);
        await newProduct.save();

        return { message: 'Product added successfully' };
    }

}

export default new AdminService()