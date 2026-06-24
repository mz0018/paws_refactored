import mongoose from 'mongoose'
import Order from '../models/order.model.js'
import Product from '../models/product.model.js'
import Appointment from '../models/appointment.model.js'

import R2Service from '../services/R2Service.js'
import ErrorController from '../controllers/ErrorController.js'

import { updateProductSchema } from '../schemas/product.schema.js'
import { getSortOptions, getSortDetails } from '../utils/sortOptions.js'

class AdminService {


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

        const { cursor, limit = 10, search, category, sort } = options

        const query = { createdBy: user_id }

        if (cursor) {
            try {
                const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString())
                console.log('Decoded cursor:', decoded)
                const { value, _id: lastId } = decoded
                const { field, direction } = getSortDetails(sort)
                
                let queryValue = value
                if (field === '_id') {
                    query._id = direction === 1 
                    ? { $gt: queryValue }
                    : { $lt: queryValue };
                } else {
                query.$or = direction === 1 
                    ? [{ [field]: { $gt: queryValue } }, { [field]: queryValue, _id: { $gt: new mongoose.Types.ObjectId(lastId) } }]
                    : [{ [field]: { $lt: queryValue } }, { [field]: queryValue, _id: { $gt: new mongoose.Types.ObjectId(lastId) } }];
                }

            } catch (e) { 
                console.error('Invalid cursor', e)
            }
        }

        if (search && search.trim()) {
            query.productName = { $regex: search.trim(), $options: 'i' }
        }

        if (category && category.trim()) {
            query.productCategory = category.trim()
        }

        const sortOpts = getSortOptions(sort)
        const sortQuery = { ...sortOpts }
        if (!sortOpts._id) sortQuery._id = 1
        
        const products = await Product.find(
            query,
            { productName: 1, productPrice: 1, images: 1, createdBy: 1 }
        )
        .populate('createdBy', 'userName')
        .sort(sortQuery)
        .limit(limit + 1)

        const hasNextPage = products.length > limit
        if (hasNextPage) {
            products.pop()
        }
        
        const nextCursor = products.length > 0 ? (() => {
            const last = products[products.length - 1]
            const { field } = getSortDetails(sort)
            return Buffer.from(JSON.stringify({ value: last[field], _id: last._id.toString() })).toString('base64')
        })() : null

        return {
            products,
            updatedAt: products[0]?.updatedAt,
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

        return {
            product,
            updatedAt: product.updatedAt
        }
    }

    async updateProductById(req) {

        const userId = req.user_id
        const productId = req.params.id

        if (!userId) {
            throw new ErrorController('Unauthorized access', 401)
        }

        const product = await Product.findById(productId)

        if (!product) {
            throw new ErrorController('Product not found', 404)
        }

        if (!product.createdBy.equals(userId)) {
            throw new ErrorController('Forbidden: You do not own this product', 403)
        }

        const fieldChanges = req.body.updated
            ? JSON.parse(req.body.updated)
            : {}

        const validation = updateProductSchema.safeParse(fieldChanges)
        
        if (!validation.success) {
            const errors = validation.error.issues.map(issue => ({
                field: issue.path[0],
                message: issue.message
            }))
            throw new ErrorController(JSON.stringify(errors), 400)
        }

        const removedImg = req.body.removed
            ? JSON.parse(req.body.removed)
            : []

        const addedImg = req.files?.images || []

        product.set(fieldChanges)

        if (removedImg.length > 0) {
            const removeUrls = removedImg.map(img => img.url)
            product.images = product.images.filter(
                img => !removeUrls.includes(img.url)
            )
        }

        const newImages = []
        for (const img of addedImg) {
            const imageUrl = await R2Service.uploadImage(img)
            newImages.push({ url: imageUrl })
        }
        product.images.push(...newImages)

        await product.save()

        return { message: 'Product updated successfully', product }
    }

    async getOrderByUserId(user_id, limit = 10, page = 1, search = '', status = '', sort = '') {
        if (!user_id) {
            throw new ErrorController('Unauthorized access', 401)
        }

        const skip = (page - 1) * limit
        const query = { 'items.createdBy': user_id }

        if (search.trim()) {
            query.$expr = {
                $regexMatch: {
                    input: { $toString: '$_id' },
                    regex: search.trim(),
                    options: 'i'
                }
            }
        }

        if (status) {
            query.status = status
        }

        const sortOption = sort === 'date_asc' ? { createdAt: 1 } : { createdAt: -1 }

        const [orders, total] = await Promise.all([
            Order.find(query)
                .select('_id createdAt status items.subtotal')
                .sort(sortOption)
                .skip(skip)
                .limit(limit)
                .lean(),
            Order.countDocuments(query)
        ])

        const onlyNeededData = orders.map(o => ({
            _id: o._id,
            createdAt: o.createdAt,
            status: o.status,
            totalAmount: o.items.reduce((sum, item) => sum + item.subtotal, 0)
        }))

        return { orders: onlyNeededData, total, page, limit, totalPages: Math.ceil(total / limit) }
    }

    async getOrderById(orderId) {
        const order = await Order.findById(orderId).populate('items.product')

        if (!order) {
            throw new ErrorController('Order not found', 404)
        }

        return order
    }

    async markAsComplete(req) {
        const orderId = req.params.id

        if (!orderId) {
            throw new ErrorController('Order id not found', 401)
        }

        const order = await Order.findById(orderId)

        if (!order) {
            throw new ErrorController('Order not found', 404)
        }

        if (order.status === 'completed') {
            throw new ErrorController('Order is already completed', 409)
        }

        order.status = 'completed'
        order.completedAt = new Date()
        await order.save()

        return order._id
    }

    async getAppointments(month, year, limit = 10, page = 1, status) {
        const now = new Date()
        const m = month !== undefined ? parseInt(month) - 1 : now.getMonth()
        const y = year !== undefined ? parseInt(year) : now.getFullYear()

        const start = new Date(y, m, 1)
        start.setHours(0, 0, 0, 0)

        const end = new Date(y, m + 1, 1)
        end.setHours(0, 0, 0, 0)

        const query = {
            selectedDate: { $gte: start, $lt: end }
        }

        if (status) query.status = status

        const skip = (page - 1) * limit

        const [appointments, total] = await Promise.all([
            Appointment.find(query)
                .sort({ selectedTime: 1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Appointment.countDocuments(query)
        ])

        return {
            appointments,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }

    async getFollowUpCheckups(limit = 10, page = 1, search = '') {
        const skip = (page - 1) * limit
        const query = { status: 'follow-up' }

        if (search?.trim()) {
            query.$or = [
                { name: { $regex: search.trim(), $options: 'i' } },
                { purpose: { $regex: search.trim(), $options: 'i' } }
            ]
        }

        const [appointments, total] = await Promise.all([
            Appointment.find(query)
                .select('name purpose')
                .sort({ updatedAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Appointment.countDocuments(query)
        ])

        return {
            appointments,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }

    async getAppointmentById(id) {
        const appointment = await Appointment.findById(id).lean()

        if (!appointment) {
            throw new ErrorController('Appointment not found', 404)
        }

        return appointment
    }

    async updateAppointmentStatus(id, status, followUpReason) {
        const validStatuses = ['mark-done', 'follow-up']

        if (!validStatuses.includes(status)) {
            throw new ErrorController('Invalid status update', 400)
        }

        const appointment = await Appointment.findById(id)
        if (!appointment) {
            throw new ErrorController('Appointment not found', 404)
        }

        if (status === 'mark-done') {
            if (appointment.status === 'completed') {
                throw new ErrorController('Appointment is already completed', 409)
            }

            appointment.status = 'completed'
            appointment.completedAt = new Date()
        } else if (status === 'follow-up') {
            appointment.status = 'follow-up'
            if (followUpReason) {
                appointment.followUpReason = followUpReason
            }
        }

        await appointment.save()
        return { message: 'Appointment status updated', id}
    }
}

export default new AdminService()