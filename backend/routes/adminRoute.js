import express from 'express'
import AdminController from '../controllers/AdminController.js'
import { upload } from '../middleware/upload.js'
import { validate } from '../middleware/validate.js'
import { addProductSchema } from '../schemas/product.schema.js'
import { productUploadLimiter } from '../middleware/productUploadLimiter.js'

const router = express.Router()

router.post(
    '/add-product/:user_id',
    productUploadLimiter,
    upload.fields([{ name: 'images', maxCount: 5 }]),
    validate(addProductSchema),
    AdminController.addProduct
)

router.get(
    '/get-product/:user_id',
    AdminController.getProduct
)

export default router