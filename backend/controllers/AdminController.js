import AdminService from '../services/AdminService.js'

class AdminController {

    async addProduct(req, res, next) {
        try {
            const result = await AdminService.addProduct(req.body)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

}

export default new AdminController()