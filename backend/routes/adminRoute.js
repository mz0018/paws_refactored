import express from 'express'
import AdminController from '../controllers/AdminController.js'
import { upload } from '../middleware/upload.js'
import { validate } from '../middleware/validate.js'
import { addProductSchema } from '../schemas/product.schema.js'

const router = express.Router()

router.post(
    '/add-product',
    upload.fields([{ name: 'images', maxCount: 5 }]),
    validate(addProductSchema),
    AdminController.addProduct
)

export default router