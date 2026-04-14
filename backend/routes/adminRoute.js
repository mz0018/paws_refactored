import express from 'express'
import AdminController from '../controllers/AdminController.js'
import { upload } from '../middleware/upload.js'
import { validate } from '../middleware/validate.js'
import { addProductSchema } from '../schemas/product.schema.js'
import { authorizeViaCookie } from '../middleware/authorizeViaCookie.js'
import { productUploadLimiter } from '../middleware/productUploadLimiter.js'
import { productFetchLimiter } from '../middleware/productFetchLimiter.js'

const router = express.Router()

router.post(
    '/add-product',
    authorizeViaCookie,
    productUploadLimiter,
    upload.fields([{ name: 'images', maxCount: 5 }]),
    validate(addProductSchema),
    AdminController.addProduct
)

router.get(
    '/get-product',
    authorizeViaCookie,
    productFetchLimiter,
    AdminController.getProduct
)

router.get(
    '/get-product/:id',
    authorizeViaCookie,
    AdminController.getProductById
)

export default router