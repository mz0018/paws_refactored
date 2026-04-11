import jwt, { decode } from 'jsonwebtoken'
import ErrorController from '../controllers/ErrorController.js'

export const authorizeViaCookie = (req, res, next) => {
    
    const token = req.cookies.authToken

    if (!token) {
        return next(new ErrorController('Unauthorized', 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded.id) {
            return next(new ErrorController('User Id not found in token', 401))
        }

        req.user = decoded
        req.user_id = decoded.id
        next()
    } catch (error) {
        return next(new ErrorController('Invalid or expired token', 401))
    }
}