import express from 'express'
import AdminController from '../controllers/AdminController.js'

const router = express.Router()

router.get('/add-product', AdminController.addProduct)

export default router