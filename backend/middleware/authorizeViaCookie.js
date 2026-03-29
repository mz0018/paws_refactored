import jwt from 'jsonwebtoken'
import ErrorController from '../controllers/ErrorController.js'

export const authorizeViaCookie = (req, res, next) => {
    
    const token = req.cookies.authToken

    if (!token) {
        return next(new ErrorController('Unauthorized', 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return next(new ErrorController('Invalid or expired token', 401))
    }
}