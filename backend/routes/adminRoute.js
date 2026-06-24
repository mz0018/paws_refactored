import express from 'express'
import AdminController from '../controllers/AdminController.js'
import { validate } from '../middleware/validate.js'
import { cacheHeaders } from '../middleware/cacheHeaders.js'
import { addProductSchema } from '../schemas/product.schema.js'
import { authorizeViaCookie } from '../middleware/authorizeViaCookie.js'
import { productUploadLimiter } from '../middleware/productUploadLimiter.js'
import { productFetchLimiter } from '../middleware/productFetchLimiter.js'
import { productFileSize } from '../middleware/productFileSize.js'

const router = express.Router()

const getProductUpdateAt = (data) => data.updatedAt

router.post(
    '/add-product',
    authorizeViaCookie,
    productUploadLimiter,
    productFileSize,
    validate(addProductSchema),
    AdminController.addProduct
)

router.get(
    '/get-product',
    authorizeViaCookie,
    productFetchLimiter,
    cacheHeaders(getProductUpdateAt),
    AdminController.getProduct
)

router.get(
    '/get-product/:id',
    // authorizeViaCookie,
    cacheHeaders(getProductUpdateAt),
    AdminController.getProductById
)

router.patch(
    '/update-product/:id',
    authorizeViaCookie,
    productFileSize,
    productFetchLimiter,
    AdminController.updateProduct
)

router.get(
    '/get-order',
    authorizeViaCookie,
    AdminController.getOrderByUserId
)

router.get(
    '/order/:id/view',
    authorizeViaCookie,
    AdminController.getOrderById
)

router.patch(
    '/order/:id/complete',
    authorizeViaCookie,
    AdminController.markAsComplete
)

router.get(
    '/appointments',
    authorizeViaCookie,
    AdminController.getAppointments
)

router.patch(
    '/appointment/:status/:id',
    authorizeViaCookie,
    AdminController.updateStatusAppointment

)

router.get(
    '/follow-up-checkups',
    authorizeViaCookie,
    AdminController.getFollowUpCheckups
)

router.get(
    '/appointment/:id',
    authorizeViaCookie,
    AdminController.getAppointmentById
)

export default router