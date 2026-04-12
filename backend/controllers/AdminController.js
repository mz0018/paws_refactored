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
            const { cursor, limit, search, category } = req.query
            const parsedLimit = limit ? parseInt(limit, 10) : 10
            const result = await AdminService.getProduct(req.user_id, { cursor, limit: parsedLimit, search, category })
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

}

export default new AdminController()