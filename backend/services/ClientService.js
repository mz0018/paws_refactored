import mongoose from 'mongoose'
import Order from '../models/order.model.js'
import Product from '../models/product.model.js'
import ErrorController from '../controllers/ErrorController.js'
import { getSortOptions, getSortDetails } from '../utils/sortOptions.js'
class ClientService {
    async getProducts(options = {}) {
        const { cursor, limit = 10, search, category, sort } = options
        const query = {}
        if (cursor) {
            try {
                const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString())
                const { value, _id: lastId } = decoded
                const { field, direction } = getSortDetails(sort)
                let queryValue = value
                if (field === '_id') {
                    query._id = direction === 1
                        ? { $gt: queryValue }
                        : { $lt: queryValue }
                } else {
                    query.$or = direction === 1
                        ? [{ [field]: { $gt: queryValue } }, { [field]: queryValue, _id: { $gt: new mongoose.Types.ObjectId(lastId) } }]
                        : [{ [field]: { $lt: queryValue } }, { [field]: queryValue, _id: { $gt: new mongoose.Types.ObjectId(lastId) } }]
                }
            } catch (e) {
                console.error('Invalid cursor', e)
            }
        }
        if (search?.trim()) {
            query.productName = { $regex: search.trim(), $options: 'i' }
        }
        if (category?.trim()) {
            query.productCategory = category.trim()
        }
        const sortOpts = getSortOptions(sort)
        const sortQuery = { ...sortOpts }
        if (!sortOpts._id) sortQuery._id = 1
        const products = await Product.find(
            query,
            { productName: 1, productPrice: 1, stock: 1, images: 1, createdBy: 1 }
        )
            .populate('createdBy', 'userName')
            .sort(sortQuery)
            .limit(limit + 1)
        const hasNextPage = products.length > limit
        if (hasNextPage) products.pop()
        const nextCursor = products.length > 0
            ? Buffer.from(JSON.stringify({
                value: products[products.length - 1][getSortDetails(sort).field],
                _id: products[products.length - 1]._id.toString()
              })).toString('base64')
            : null
        return {
            products,
            pagination: { nextCursor, hasNextPage, limit }
        }
    }

    async saveClientOrder(data) {
        if (!data?.items?.length) {
            throw new ErrorController('No items provided', 400)
        }

        const ids = data.items.map(item => item._id)
        const products = await Product.find({ _id: { $in: ids } })
        const productMap = new Map(
            products.map(p => [p._id.toString(), p])
        )

        let totalAmount = 0
        const orderItems = []

        for (const item of data.items) {
            const product = productMap.get(item._id)
            if (!product) {
                throw new ErrorController(`Product with ID ${item._id} not found`, 404)
            }
            if (product.stock < item.quantity) {
                throw new ErrorController(`Insufficient stock for product ${product.productName}`, 400)
            }

            const subtotal = product.productPrice * item.quantity
            totalAmount += subtotal

            orderItems.push({
                product: item._id,
                quantity: item.quantity,
                price: product.productPrice,
                subtotal,
                createdBy: product.createdBy
            })
        }

        const orders = new Order({ items: orderItems })
        await orders.save()

        return {
            totalAmount,
            orders
        }
    }    

    async saveAppointment(appointment) {
        console.log('from services: ', appointment)
    }
}
export default new ClientService()
