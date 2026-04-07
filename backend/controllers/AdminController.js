import AdminService from '../services/AdminService.js'

class AdminController {

    async addProduct(req, res, next) {
        console.log('Received body:', req.body)
        console.log('Received files:', req.files)
        try {
            const result = await AdminService.addProduct(req.body, req.files.images)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

}

export default new AdminController()