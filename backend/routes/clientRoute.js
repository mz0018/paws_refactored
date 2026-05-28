import express from 'express'
import ClientController from '../controllers/ClientController.js'
import { cacheHeaders } from '../middleware/cacheHeaders.js'
import { productFetchLimiter } from '../middleware/productFetchLimiter.js'
const router = express.Router()
const getProductUpdateAt = (data) => data.updatedAt
router.get(
    '/products',
    productFetchLimiter,
    cacheHeaders(getProductUpdateAt),
    ClientController.getProducts
)
router.post(
    '/save-order',
    ClientController.saveClientOrder
)
export default router