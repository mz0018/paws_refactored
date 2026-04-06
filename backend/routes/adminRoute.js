import express from 'express'
import AdminController from '../controllers/AdminController.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

router.post('/add-product', upload.array('images', 5), AdminController.addProduct)

export default router