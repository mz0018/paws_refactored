import ClientService from '../services/ClientService.js'
class ClientController {
    async getProducts(req, res, next) {
        try {
            const { cursor, limit, search, category, sort } = req.query
            const parsedLimit = limit ? parseInt(limit, 10) : 10
            const result = await ClientService.getProducts({ cursor, limit: parsedLimit, search, category, sort })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    
    async saveClientOrder(req, res, next) {
        try {
            const result = await ClientService.saveClientOrder(req.body)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getOrders(req, res, next) {
        try {
            const result = await ClientService.getOrders()
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    
}

export default new ClientController()