import { parse } from 'dotenv'
import AdminService from '../services/AdminService.js'

class AdminController {

    async addProduct(req, res, next) {
        try {
            const result = await AdminService.addProduct(req.body, req.user_id, req.files.images)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getProduct(req, res, next) {
        try {
            const { cursor, limit, search, category, sort } = req.query
            const parsedLimit = limit ? parseInt(limit, 10) : 10
            const result = await AdminService.getProduct(req.user_id, { cursor, limit: parsedLimit, search, category, sort })
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getProductById(req, res, next) {
        try {
            const result = await AdminService.getProductById(req.params)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async updateProduct(req, res, next) {
        try {
            const result = await AdminService.updateProductById(req)
            res.status(200).json(result)
        } catch (error) {
            console.error('Error:', error)
            next(error)
        }
    }

    async getOrderByUserId(req, res, next) {
        try {
            const limit = parseInt(req.query.limit) || 10
            const page = parseInt(req.query.page) || 1
            const result = await AdminService.getOrderByUserId(req.user_id, limit, page)
            res.status(200).json(result)
        } catch (error) {
            console.error('Error:', error)
            next(error)
        }
    }

    async markAsComplete(req, res, next) {
        try {
            const result = await AdminService.markAsComplete(req)
            res.status(200).json(result)
        } catch (error) {
            console.error('Error:', error)
            next(error)
        }
    }

}

export default new AdminController()